Protégez vos apps des attaques avec AWS CloudFront et AWS WAF

## Protégez vos apps des attaques avec AWS CloudFront et AWS WAF

## Je travaille sur la migration vers AWS de mon client, e-commerçant, quand je reçois un coup de fil : « Paul, on est mal, ça va fait une semaine que notre site est attaqué par déni de service ; on perd du CA ! Est-ce que tu as une solution ? »

Pas question de bâcler la fin de la migration. Le client n’a pas encore conteneurisé son appli, on n’a pas fait de test de migration de données, et encore moins de test de charge. Mais [comme je l’avais indiqué dans un précédent blog post](../../../../2023/11/07/cloud-101-episode-2-sysops-10-services-pour-votre-infra-sur-site/index.html), le Cloud peut aussi rendre des services à l’infrastructure on-premise. C’est le moment de le prouver !

Les premières analyses faites révèlent que l’attaque vient de multiples IPs (points de sortie du réseau TOR) et cible la page de connexion. Pas de chance, cette page fait des appels en base de données et celle-ci est saturée, entraînant de la latence (puis une absence de réponse) sur l’ensemble du système.

![WAF Sampled requests](/images/blog/waf5.avif)

Ni une, ni deux, je me mets au travail. Grâce à Terraform, en une demi-journée, j’ai une stack fonctionnelle en test.

## La stack technique

Voici un schéma de la stack technique déployée pour contrer l’attaque que subit mon client :

![WAF - Stack technique](/images/blog/waf6.avif)

Les principales modifications par rapport à l’existant sont les suivantes : - Au lieu de renvoyer directement sur l’infra sur site de mon client, le DNS va désormais renvoyer les requêtes vers CloudFront.[CloudFront](https://aws.amazon.com/fr/cloudfront/) est un Content-Delivery Network (CDN) managé. C’est à dire qu’il permet de servir du contenu mis en cache (ou pas) depuis des localisations proches des clients - Pendant l’incident, dans un premier temps, ce n’est pas la fonctionnalité de cache (qui permet de réduire la charge sur les serveurs, et la latence côté client) que la possibilité d’exposer un frontal HTTPS qui va s’interposer entre les clients et l’infrastructure de mon client. Avant de relayer les requêtes vers mon « origine » (l’infra existante), CloudFront va les passer à AWS WAF - [WAF](https://aws.amazon.com/fr/waf/) est un Web Application Firewall, qui permet l’inspection des requêtes HTTP. Sur le WAF, nous avons paramétré un certain nombre de règles en nous appuyant sur [les jeux de règles gérées d’AWS](https://docs.aws.amazon.com/fr_fr/waf/latest/developerguide/aws-managed-rule-groups-list.html). Voici celles qui ont été le plus utiles pour stopper l’attaque : - Le groupe de règles `AWSManagedRulesAnonymousIpList` [contient une règle](https://docs.aws.amazon.com/fr_fr/waf/latest/developerguide/aws-managed-rule-groups-ip-rep.html) qui recense précisément les IPs de sortie connues du réseau TOR ainsi que des VPNs les plus fréquemment utilisés, et une seconde recensant les hébergeurs (dont les clients ont pu se faire corrompre une machine, la transformant en zombie). Cette règle va faire 95% du job. - La seconde `AWSManagedRulesATPRuleSet` permet [précisément de protéger les pages](https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-atp.html) de connexion, en analysant les requêtes qui sont faites : comportent-elles l’ensemble des champs de formulaires attendus ? une IP qui a déjà échoué à l’authentification persiste-t-elle de façon étrange ? - En complément de ces règles, par mesure de prudence, on mets en place les règles classiques : prévention des injections SQL, d’attaques sur faille PHP, un anti-top10 OWASP etc. - Enfin, on ajoute une règle permet de whitelister des IPs (le modèle économique de notre e-commerçant impliquant un trafic assez important depuis quelques partenaires).

## Mise en oeuvre et résultat

Nous avons basculé côté AWS, sur le [service Route53](https://aws.amazon.com/fr/route53/), la zone DNS principale du domaine de mon client (coup de chance, tout le travail préparatoire de recensement avait été effectué en amont). Cela apporte au moins deux bénéfices : - L’automatisation qu’offre Route53, en lien avec Terraform, permet de générer rapidement les entrées DNS nécessaires pour que le service Certificate Manager accepte de générer des certificats SSL au nom du domaine de mon client. - Le service permet de définir un enregistrement « A » dynamique (un [alias](https://docs.aws.amazon.com/fr_fr/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html)) à la racine du domaine, alors que la RFC 1034 ne permet pas de positionner un CNAME (qui ne peut co-exister avec d’autres enregistrements) à la racine. Nous avons créé dans cette zone des enregistrements de type `origine.mondomaine.fr` et mon client a fait le nécessaire pour que son serveur web traite les requêtes sur cette adresse en servant son application (y compris avec un certificat TLS). Une fois cela testé, nous avons basculé le traffic associé aux urls `mondomaine.fr` et `api.mondomaine.fr` vers CloudFront. Pour éviter le contournement (au cas où le pirate découvrirait les urls en *origine* ou simplement utiliserait directement l’IP du serveur de mon client), CloudFront est paramétré pour envoyer un header « secret » à chaque appel de l’infra de mon client. Il devient beaucoup plus simple pour celui-ci de filtrer quelqu’un qui contournerait le CDN. Le résultat est immédiat : à 20h nous faisons la bascule. Le site redevient pleinement disponible. A 21h le pirate cesse l’attaque (avant de retenter sa chance le lendemain)

![](/images/blog/waf7.avif)

Sur l’image ci-dessous on peut voir en orange le trafic passant, légitime, et en bleu le trafic bloqué. Nous avions donc 6000 requêtes par minute, soit plus de deux fois le trafic habituel :

![](/images/blog/waf3.avif)

## Coût : un petit point d'attention !

WAF coûte $0,60 par million de requêtes analysées à l’aide des règles managées de base (groupe dont font partie toutes nos règles ***sauf une***) soit moins de $5 par jour pour mon client. Attention cependant, les règles avancées comme l’Account Takeover Protection sont facturées (après un tier gratuit de 10000 appels) $1 pour 1000 (oui, 1000, pas 1 000 000) d’appels. Et au début, notre paramétrage donnait cela :

![](/images/blog/waf2.avif)

En 24h, on a brûlé pour $700 de WAF. Heureusement, votre serviteur avait mis en place une alarme d’anomalie de coût ! Un ticket au support (catégorie « *dispute a charge* ») et AWS nous a fait grâce de la facture ! [Nb : dans mon expérience, AWS efface toujours les ardoises élevées provenant d’erreurs de paramétrage ; cette très bonne politique commerciale est l’une des raisons, avec la qualité de leur support, qui en font mon cloud préféré]. Bref, on a corrigé en plaçant la règle d’ATP en dernière position par ordre de priorité et, surtout, en conditionnant son exécution à la présence d’une étiquette posée par une autre règle qui identifie les requêtes sur le chemin `/connexion`

![](/images/blog/waf1.avif)

Soulagement tout de même quand on voit le trafic passant par la règle ATP descendre !

## Un bénéfice supplémentaire de Cloudfront

Après le repos du guerrier heureux d’avoir bloqué son ennemi, il est l’heure d’ajouter un bénéfice supplémentaire pour mon client : l’activation du cache pour toutes les ressource statiques servies par l’application. Grâce à Terraform, ça n’est pas très compliqué : le bloc suivant permet de cacher tous les gifs.

```
ordered_cache_behavior {
    path_pattern             = "*.gif"
    allowed_methods          = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods           = ["GET", "HEAD", "OPTIONS"]
    target_origin_id         = local.origin_domain
    viewer_protocol_policy   = "redirect-to-https"
    cache_policy_id          = aws_cloudfront_cache_policy.cachingoptimizez_with_v_header.id
    origin_request_policy_id = "b689b0a8-53d0-40ab-baf2-68738e2966ac" #Hard-Coded: Forward all headers EXCEPT HOST, cookies and query strings
  }
```

Là aussi, l’effet est immédiat. Quelques minutes après c’est près de 90% des requêtes qui seront servies par CloudFront, allégeant ainsi l’infra de mon client d’une charge certaine et améliorant le temps de chargement pour les clients !

![Effet de CloudFront](/images/blog/waf4.avif)

Une question ? vous avez besoin d’aide pour démarrer ou progresser sur le Cloud AWS ? [Contactez-nous !](../../../../../nous-contacter/index.html)