Cloud 101 - Episode 2 - SysOps: 10 services pour votre infra sur site

## Cloud 101 - Episode 2 - SysOps: 10 services pour votre infra sur site

## De plus en plus d'organisations adoptent en effet un modèle de cloud hybride, conservant sur site les applicatifs ayant des exigences plus faibles de scalabilité ou de haute disponibilité. Dans ce cadre, la valeur du cloud n'est pas limitée aux charges de travail qui y sont hébergées.

Après un [premier article sur la valeur principale du cloud](../../../10/17/cloud-101-episode-1-quelle-est-la-vraie-valeur-ajoutee-du-cloud/index.html) (TL;DR: aligner vos équipes IT sur vos enjeux métier), je vous propose un panorama de la manière dont **le cloud peut vous aider à gérer votre infrastructure sur site**, avec des services dont certains sont gratuits et les autres tarifés uniquement à l’utilisation (sans coût d’investissement initial).

## 1. Un PRA/PCA activable (et facturé) à la demande

Un sinistre est vite arrivé 🔥, que ce soit un incendie de votre infrastructure hébergée sur site ou dans un datacenter, (oui, même dans un datacenter, cf. GlobalSwich Clichy ou OVH Strasbourg) ou bien un ransomware. Avec Disaster Recovery service, vous pouvez disposer d’une réplication quasi-synchrone de vos machines sur le cloud, avec des instances prêtes à démarrer en cas d’incident (éventuellement depuis un point de sauvegarde que vous choisissez en cas de ransomware). En fin d’incident, vous pouvez rapatrier votre infrastructure sur site (y compris les modifications opérées depuis le début d’incident).

![](/images/blog/1699283880015-1024x671.png)

## 2. Inventaire et Patch management

Un des principaux services AWS pour les Administrateurs Systèmes est [AWS Systems Manager (SSM)](https://aws.amazon.com/fr/systems-manager/features/). Parmi les nombreuses fonctionnalités de ce service, il est possible de **gérer gratuitement ses machines Windows et Linux sur site**, de façon unifiée avec les instances EC2. SSM Inventory permet de centraliser et visualiser facilement les systèmes d’exploitation déployés, les patches appliqués ou pas, mais aussi la liste des applicatifs et packages installés, leur version, et même de lister les fichiers ou (pour Windows) les clés de registre paramétrées. SSM Patch Manager permet d’appliquer automatiquement les mises à jour d’OS et de packages en gérant des vagues/lots de mise à jour (par ex. les serveurs de test un jour, la prod le lendemain), des politiques (par ex. installer les correctifs critiques à J0, les moins critiques à J-7) et en respectant les plages de maintenance définies pour chaque application.

## 3. Observabilité

Toutes les DSI n’ont pas la capacité de maintenir un cluster ElasticSearch / Logstash / Kibana, ou le budget 💰 pour Datadog. L’ensemble des outils d’observabilité d’AWS peut recevoir des données émises par vos applications sur site, sans surcoût par rapport aux applications hébergées sur le cloud.   - **Les logs** peuvent être transférés vers Cloudwatch (ils deviennent ainsi requêtables aisément et peuvent être convertis en métriques pour détecter par exemple une augmentation anormale des erreurs) - **Les métriques **(ex. l’espace disque restant sur votre serveur) peuvent être transférées vers CloudWatch ou vers AWS Managed Service for Prometheus (et ainsi visualisées avec Grafana) - **Les traces applicatives** peuvent être traitées par X-Ray (vous permettant d’analyse la cause de lenteurs, par ex.)

## 4. Bastion

Se connecter à distance sur une machine, en SSH (Linux 🐧) ou bureau distant (Windows) sans pour autant exposer la machine publiquement, c’est l’objet d’un bastion. Avec SSM, il est possible de faire cela en disposant de fonctionnalités avancées, comme par exemple un log de l’ensemble des commandes lancées via le bastion ou la gestion de droits par groupes. En plus des sessions interactives, il est possible de définir des « run books », c’est à dire des ensemble de commandes prédéfinis, permettant à un utilisateur par exemple de redémarrer un service donné, sans accès à la totalité de la machine. Ces runbooks peuvent être déclenchés automatiquement, par exemple en cas de détection d’une indisponibilité de l’application.

## 5. Conformité et sécurité

Deux exemples de services dans ce domaine :   - Outre l’état de mise à jour / patch management, l’outil de conformité AWS Config permet également de définir des règles (par ex. « *aucune application ne tourne avec les privilèges de l’utilisateur root sur une machine Linux*« ) et de détecter et tracer pour remédiation les écarts constatés. - Avec AWS Verified Access, le Cloud peut être une porte d’entrée sûre de vos applicatifs sur site : seul le traffic associé à des utilisateurs authentifiés est passant, et il est possible d’appliquer des règles de Web Application Firewall (WAF).

## 6. Sauvegarde et restauration

Particulièrement depuis l’avènement des cryptolockers, pouvoir disposer de sauvegardes réellement inaltérables est clé pour être en mesurer de restaurer vos systèmes. Le cloud offre diverses solutions pour synchroniser vos données, avec la possibilité de revenir dans le temps (« *point-in-time recovery*« ) ; ainsi, par exemple :   - AWS Backup peut [gérer les sauvegardes des machines de votre environnement VMWare sur site](https://aws.amazon.com/blogs/storage/backup-and-restore-on-premises-vmware-virtual-machines-using-aws-backup/). - AWS DataSync peut cloner vos disques durs réseau et en maintenir des copies sur le cloud.   Dans tous les cas, le stockage S3 sous-jacent permet de conserver ces enregistrements (et leurs versions successives) de façon inaltérable et économique (à partir de $0,0036/Go/mois !), sans devoir maintenir soi-même des systèmes de sauvegarde sur bande.

## 7. SD-WAN, communication inter-sites

Si vous avez plusieurs sites répartis dans le monde, vous pouvez les interconnecter (et les connecter avec vos datacenters) en passant par le réseau mondial d’AWS pour minimiser la latence.

![](/images/blog/1699311094360-1024x535.png)

## 8. Provisioning

Le provisioning consiste à gérer le déploiement de composants applicatifs au sein de machines virtuelles. Plusieurs technologies permettent cette automatisation : Chef, Ansible ou Salt pour citer les plus connues. Systems Manager Stage Manager supporte l’ensemble de ces langages pour l’exécution de playbooks / recettes et peut ainsi assurer leur exécution.

## 9. Les services AWS hébergés sur site

Parfois, certaines contraintes imposent une exécution locale de charges de travail. Par exemple, pour pré-traiter des flux vidéos et éviter l’envoi massif de données vers le cloud et la saturation des liens réseau. Cependant, on peut vouloir même dans ce contexte bénéficier de certains des avantages des services managés qu’offre le cloud.   - Avec ECS/EKS Anywhere, il est possible d’utiliser ses propres serveurs pour déployer des conteneurs, AWS restant en charge de l’orchestration des conteneurs (scalabilité, gestion des images, etc.) - Avec Outposts, il est possible d’acheter des serveurs capables de faire tourner les services EC2, S3, RDS, ECS, EKS,.. sur site.

## 10. Last but not least...

Créer de la valeur pour votre infrastructure sur site passe par une bonne appropriation de ces technologies par vos admins systèmes. Et pour ça, il n’y a pas de service AWS, mais heureusement, il y a [TerraCloud](https://www.linkedin.com/company/terracloud/) ! Si vous souhaitez mettre en oeuvre concrètement tout ou partie des cas d’usage évoqués ci-dessus, [TerraCloud](https://www.linkedin.com/company/terracloud/) est là pour vous aider ! [Prenons rendez-vous](../../../../../nous-contacter/prendre-rendez-vous/index.html) ! ![](https://media.licdn.com/dms/image/D4E12AQGF6_MhPKdJYA/article-inline_image-shrink_1500_2232/0/1699313449526?e=1704931200&v=beta&t=WrHh3drreUisq11ajewKHfRHHx4fRD6SWlXDdmq2AXU) Freelance Architecture and Cloud Consulting