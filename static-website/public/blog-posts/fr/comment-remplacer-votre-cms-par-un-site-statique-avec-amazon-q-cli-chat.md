## Relever le Défi AWS Builder Challenge

J'ai décidé de relever le **AWS Builder Challenge #cloud-launch-challenge-1** en reconstruisant complètement mon site de conseil à partir de zéro. Le défi ? Remplacer un CMS WordPress traditionnel par une architecture de site statique moderne - et le faire rapidement.

**Spoiler alert** : Tout le processus a pris moins de 5 heures, grâce à Amazon Q CLI Chat comme partenaire de programmation en binôme IA.

## Le Problème des Solutions CMS Traditionnelles

Quand j'ai commencé le conseil, faire un site WordPress était le moyen le plus rapide, mais cela a des points de friction attachés :

### Problèmes de Performance = Problèmes SEO
Les sites WordPress, même bien optimisés, se chargent généralement en 2-4 secondes. Les Core Web Vitals de Google ont clairement indiqué que tout ce qui dépasse 2,5 secondes nuit à votre classement dans les moteurs de recherche. Mon site WordPress affichait une moyenne de 3,2 secondes sur mobile - pas terrible, mais pas génial non plus.

### Surcharge d'Infrastructure
Faire tourner WordPress signifie que vous avez besoin de :
- Un serveur web (Apache/Nginx)
- Une base de données (MySQL/PostgreSQL)
- Un runtime PHP
- Des mises à jour de sécurité régulières
- Des systèmes de sauvegarde
- De la surveillance

Cela se traduit par des coûts d'hébergement plus élevés et une empreinte environnementale plus importante. Mon ancienne configuration coûtait environ 45€/mois pour des performances décentes.

### Enfermement Propriétaire avec les Page Builders
Des solutions comme Webflow sont belles mais chères - à partir de 23€/mois pour les fonctionnalités de base, montant jusqu'à 212€/mois pour les fonctionnalités avancées. Vous êtes aussi enfermé dans leur écosystème, rendant la migration difficile.

Pour un simple site d'entreprise qui se met à jour peut-être une fois par semaine, cela semblait excessif. J'avais besoin de quelque chose de plus rapide, moins cher et plus maintenable.

## La Solution du Site Statique

Les sites statiques résolvent ces problèmes élégamment :
- **Performance** : Fichiers servis directement depuis le CDN, temps de chargement sous la seconde
- **Coût** : S3 + CloudFront coûte moins de 5€/mois pour la plupart des sites d'entreprise
- **Sécurité** : Pas de code côté serveur = surface d'attaque minimale
- **Scalabilité** : Le CDN gère automatiquement les pics de trafic
- **Impact environnemental** : Consommation d'énergie significativement plus faible

## Mon Parcours : De WordPress au Statique avec Amazon Q CLI Chat (Moins de 5 Heures !)

### Étape 1 : La Grande Migration Commence (45 minutes)

**Le Défi** : Extraire le contenu de mon site WordPress existant sans perdre la structure ou le formatage.

**La Solution** : J'ai utilisé Amazon Q CLI Chat pour générer un crawler de site web. Voici comment cette conversation s'est déroulée :

```
Moi : "J'ai besoin de télécharger une copie complète de mon site WordPress pour migration. 
Pouvez-vous m'aider à construire un crawler qui préserve la structure du site ?"

Q : "Je vais vous aider à créer un crawler de site web complet. Laissez-moi construire 
quelque chose qui gère les patterns spécifiques à WordPress..."
```

Le résultat était ce crawler : [ai-example-website-downloader](https://github.com/psantus/ai-example-website-downloader)

**Apprentissage Clé** : Q CLI Chat excelle à comprendre le contexte et à construire des outils pratiques rapidement. Ce qui m'aurait pris des heures de recherche et de codage a été fait en minutes.

**Moment "Aha !"** : Le crawler n'a pas seulement téléchargé le contenu mais a aussi mappé la structure des URL, rendant le chemin de migration clair.

### Étape 2 : Construire les Fondations React (1 heure)

**Le Défi** : Créer une application React statique qui pourrait répliquer la fonctionnalité de mon site WordPress.

J'ai donné ce prompt à Q CLI Chat :

> "Je veux que vous construisiez un site web statique. Le site web sera hébergé sur S3 et distribué via CloudFront. Ainsi, il ne devrait pas inclure de rendu côté serveur. Dans ./terracloud_fr vous trouverez une copie du site web actuel (utilise le rendu côté serveur avec wordpress). Vous devriez inclure les mêmes menus / pages statiques. Pour la section blog, il devrait être assez facile d'ajouter du contenu au site web, idéalement en créant un fichier formaté en markdown (et en le référençant dans une liste d'articles), à interpréter par l'application frontend."

**La Magie s'est Produite** : Q CLI Chat a analysé ma structure WordPress et a généré :
- Une application React complète avec routage
- Un design responsive correspondant à mon site original
- Des balises meta optimisées pour le SEO et des données structurées

**Note Importante** : Le moteur de blog Markdown a en fait été implémenté dans une itération séparée. Avec le développement agentique, vous devez encore garder l'IA en laisse courte - les fonctionnalités complexes fonctionnent mieux quand elles sont décomposées en tâches focalisées.

### Étape 3 : Le Défi i18n (1,5 heure)

**Le Défi** : Mon site avait besoin de versions française et anglaise. Cela s'est avéré être la partie la plus délicate.

**Le Problème** : Les LLM ont du mal avec les gros objets JSON. Quand j'ai demandé à Q d'ajouter l'internationalisation, il :
- Générait des fichiers de traduction incomplets
- Perdait le contexte entre différentes clés de langue
- Créait des conventions de nommage incohérentes

**La Solution** : J'ai décomposé en plus petits morceaux :
1. D'abord, générer la structure i18n
2. Ensuite, traduire page par page
3. Enfin, intégrer la logique de routage

**Moment "Aha !"** : Les outils IA fonctionnent mieux avec des tâches incrémentales et focalisées plutôt qu'avec des opérations larges et complexes.

**Apprentissage Clé** : **L'IA n'est pas bonne pour traiter les gros fichiers JSON**. Quand on travaille avec l'IA sur des fonctionnalités complexes, décomposer le problème en pièces plus petites et gérables.

### Étape 4 : Infrastructure as Code (1 heure)

**Le Défi** : Déployer tout avec Terraform tout en gardant le processus de build intégré.

J'aurais pu mettre en place un pipeline CI/CD approprié, mais honnêtement, j'étais paresseux et je voulais voir jusqu'où je pouvais pousser le concept "infrastructure as code".

**La Solution** : Intégrer le processus de build React directement dans Terraform :

```hcl
resource "null_resource" "build_react_app_with_env" {
  provisioner "local-exec" {
    command = <<-EOT
      cd ../static-website
      npm install
      echo "VITE_CONTACT_FORM_URL=${aws_lambda_function_url.contact_form_url.function_url}" > .env.production
      npm run build
    EOT
  }
  
  depends_on = [aws_lambda_function_url.contact_form_url]
}
```

**Apprentissage Clé** : Parfois la solution "rapide et sale" est parfaitement adéquate pour les petits projets.

### Étape 5 : Ajouter des Fonctionnalités Dynamiques (1 heure)

**Le Défi** : Un site statique a encore besoin de certaines fonctionnalités dynamiques - formulaires de contact et réservation de rendez-vous.

**Les Solutions** :

1. **Formulaire de Contact** : Utilisé AWS Lambda + SNS en suivant cet excellent guide : [Contact Form: Making Your Website Interactive](https://builder.aws.com/content/31c6EGIZUe9a5eLwMKBv2TuDn2l/contact-form-making-your-website-interactive)

2. **Réservation de Rendez-vous** : Intégré le widget Microsoft Bookings - pas besoin de backend personnalisé !

**Moment "Aha !"** : Vous n'avez pas besoin de tout construire à partir de zéro. Combiner l'hébergement statique avec des fonctions serverless et des widgets tiers vous donne le meilleur de tous les mondes.

## Les Résultats : Une Histoire de Succès Personnel

### Améliorations de Performance
- **Temps de chargement** : De 3,2s à 0,8s (75% d'amélioration)
- **Lighthouse Performance** : De 39 à 96 (146% d'amélioration !)
- **Lighthouse Accessibilité** : De 89 à 91
- **Lighthouse Meilleures Pratiques** : De 85 à 100 (score parfait !)
- **Lighthouse SEO** : Maintenu à 92
- **Core Web Vitals** : Tout au vert

### Réduction des Coûts
- **Avant** : 80€/an (hébergement WordPress partagé)
- **Après** : 0€/an (le niveau gratuit AWS couvre S3 + CloudFront + Lambda pour les petits sites)
- **Économies** : 100% de réduction des coûts

### Expérience de Développement
La plus grande surprise était à quel point le processus de développement est devenu agréable. Avec Q CLI Chat comme partenaire de programmation en binôme, je pouvais :
- Prototyper rapidement des idées
- Obtenir des retours instantanés sur les décisions d'architecture
- Générer du code boilerplate rapidement
- Déboguer les problèmes avec l'assistance IA

## Apprentissages Clés et Moments "Aha !"

### 1. L'IA comme Accélérateur de Développement
Q CLI Chat n'a pas remplacé ma réflexion - il l'a amplifiée. Les meilleurs résultats sont venus quand j'ai fourni un contexte et des contraintes clairs.

### 2. Le Pouvoir des Contraintes
Être spécifique sur les contraintes (hébergement S3/CloudFront) a aidé Q à générer des solutions appropriées. Me limiter à l'hébergement S3/CloudFront a forcé de meilleures décisions architecturales et a résulté en un site plus performant.

### 3. L'IA Lutte avec les Grandes Structures de Données
**L'IA n'est pas bonne pour traiter les gros fichiers JSON**. L'implémentation i18n m'a appris que les LLM fonctionnent beaucoup mieux avec des tâches plus petites et focalisées qu'avec des transformations de données complexes.

### 4. Statique ≠ Ennuyeux
Les sites statiques modernes peuvent être incroyablement dynamiques en utilisant :
- JavaScript côté client pour l'interactivité
- Fonctions serverless pour la logique backend
- APIs tierces pour les fonctionnalités complexes

### 5. La Migration Incrémentale Fonctionne
Je n'avais pas besoin de tout reconstruire d'un coup. Le crawler m'a permis de migrer le contenu graduellement tout en préservant la valeur SEO.

## Conseils pour les Futurs Constructeurs

### 1. Commencez par un Audit de Contenu
Avant de migrer, cataloguez ce dont vous avez réellement besoin. Vous serez surpris de combien de cruft WordPress vous pouvez éliminer.

### 2. Embrassez la Philosophie JAMstack
- **J**avaScript pour la fonctionnalité dynamique
- **A**PIs pour les services backend
- **M**arkup pour la structure de contenu

### 3. Utilisez les Outils IA Stratégiquement
- Excellent pour : Génération de boilerplate, suggestions d'architecture, débogage
- Pas excellent pour : Transformations de grandes données, logique métier complexe

### 4. Comprenez Quand Garder l'IA en Laisse Courte
**Insight critique** : Vous devez comprendre quand vous pouvez laisser un peu de liberté au LLM et quand vous devez le garder en laisse courte. Les fonctionnalités complexes comme l'i18n avec de gros fichiers JSON nécessitent de décomposer en tâches plus petites et gérables.

### 5. Planifiez Vos Fonctionnalités Dynamiques Tôt
Identifiez ce qui a vraiment besoin de traitement côté serveur vs ce qui peut être géré côté client ou via des services tiers.

### 6. Ne Surchargez pas le Processus de Build
Mon processus de build intégré à Terraform n'est pas une "meilleure pratique", mais il fonctionne parfaitement pour un petit site. Optimisez quand vous en avez besoin, pas parce que vous devriez.

## Les Services AWS Qui l'ont Rendu Possible

- **S3** : Hébergement de fichiers statiques (5GB niveau gratuit, puis 0,023€/GB/mois)
- **CloudFront** : CDN global (1TB niveau gratuit, puis 0,085€/GB)
- **Route 53** : Gestion DNS (0,50€/zone hébergée/mois)
- **Lambda** : Traitement du formulaire de contact (1M requêtes gratuites par mois)
- **SNS** : Notifications email (1 000 notifications gratuites par mois)
- **ACM** : Certificats SSL gratuits (toujours gratuit)

**Coût mensuel total pour les petits sites d'entreprise** : 0€ (dans les limites du niveau gratuit)

## Conclusion : L'Avenir est Statique (Mais Intelligent)

Cette migration m'a appris que l'avenir ne consiste pas à choisir entre statique et dynamique - il s'agit d'être intelligent sur ce qui doit être dynamique.

En combinant l'hébergement statique avec des fonctions serverless et le développement assisté par IA, j'ai construit un site qui est :
- Plus rapide que mon ancien site WordPress
- Moins cher à faire tourner
- Plus sécurisé
- Plus facile à maintenir
- Meilleur pour le SEO

Le meilleur ? Amazon Q CLI Chat a fait que tout le processus ressemble à une conversation plutôt qu'à un marathon de codage. Il ne s'agit pas seulement de la technologie - il s'agit d'avoir les bons outils pour exécuter votre vision efficacement.

Si vous faites tourner un site d'entreprise sur WordPress, Drupal, ou payez des prix premium pour Webflow, considérez faire le changement. Vos utilisateurs (et votre portefeuille) vous remercieront.

---

*Vous voulez voir le code ? Consultez mon [dépôt GitHub](https://github.com/psantus/static-website.terracloud) pour l'implémentation complète.*

*Des questions sur le processus de migration ? N'hésitez pas à [me contacter](https://www.terracloud.fr/contact) - je suis toujours heureux d'aider mes collègues développeurs à optimiser leur présence web.*
