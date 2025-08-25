export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  updatedAt?: string
  category: 'tech' | 'opinion' | 'blog'
  tags: string[]
  image?: string
  readingTime: number
}

// Multilingual blog data
const blogDataFr = {
  "posts": [
    {
      "id": "aws-user-group-poitiers-retour-sur-le-meetup-serverless-en-php-avec-lafup-poitiers",
      "title": "AWS User Group Poitiers : retour sur le Meetup «Serverless en PHP» avec l'AFUP Poitiers",
      "description": "Lambda était à l'honneur lors de la dernière réunion du AWS User Group Poitiers, ainsi que Bref, un runtime PHP dédié à au serverless.",
      "date": "2024-09-23",
      "category": "blog",
      "tags": ["aws", "aws user group", "bref", "lambda", "php", "Poitiers", "serverless"],
      "featuredImage": "/images/blog/1726812299969.jpeg",
      "slug": "aws-user-group-poitiers-retour-sur-le-meetup-serverless-en-php-avec-lafup-poitiers"
    },
    {
      "id": "architecture-orientee-evenement-reconcilier-notifications-et-evenements-complets",
      "title": "Architecture orientée événement : réconcilier Notifications et Evénements \"Complets\"",
      "description": "Evénement minimaliste ou complet ? En architecture orientée événement, les différents modèles existent. Nous proposons ici une manière de réconcilier simplement les différentes approches",
      "date": "2024-07-04",
      "category": "blog",
      "tags": ["architecture", "aws", "event", "event-driven architure", "eventbridge"],
      "featuredImage": "/images/blog/NotificationVsECST.png",
      "slug": "architecture-orientee-evenement-reconcilier-notifications-et-evenements-complets"
    },
    {
      "id": "les-objets-de-votre-bucket-s3-sont-peut-etre-publics-meme-si-la-console-aws-vous-dit-le-contraire",
      "title": "Les objets de votre bucket S3 sont peut-être publics (même si la console AWS vous dit le contraire)",
      "description": "S3 est un service de stockage incroyable, capable de stocker durablement des données à l'échelle. Dans cet article de blog, je vais vous montrer une manière peu connue par laquelle vos objets pourraient devenir publics par erreur .",
      "date": "2024-05-02",
      "category": "blog",
      "tags": ["aws", "s3", "sécurité"],
      "featuredImage": "",
      "slug": "les-objets-de-votre-bucket-s3-sont-peut-etre-publics-meme-si-la-console-aws-vous-dit-le-contraire"
    },
    {
      "id": "protegez-vos-applications-des-attaques-avec-aws-cloudfront-et-aws-waf",
      "title": "Protégez vos applications des attaques avec AWS CloudFront et AWS WAF",
      "description": "Découvrez comment protéger efficacement vos applications web contre les attaques malveillantes en utilisant AWS CloudFront et AWS WAF.",
      "date": "2024-03-18",
      "category": "tech",
      "tags": ["aws", "cloudfront", "sécurité", "waf", "web-application-firewall"],
      "featuredImage": "",
      "slug": "protegez-vos-applications-des-attaques-avec-aws-cloudfront-et-aws-waf"
    },
    {
      "id": "utilisez-votre-conteneur-ecs-meme-sur-fargate-comme-bastion-pour-acceder-a-votre-base-de-donnee-grace-au-local-port-forwarding",
      "title": "Utilisez votre conteneur ECS même sur Fargate comme bastion pour accéder à votre base de donnée grâce au local port forwarding",
      "description": "Découvrez comment utiliser un conteneur ECS sur Fargate comme bastion pour accéder à vos bases de données privées.",
      "date": "2024-03-04",
      "category": "tech",
      "tags": ["architecture", "aws", "bastion", "container", "docker", "ecs"],
      "featuredImage": "",
      "slug": "utilisez-votre-conteneur-ecs-meme-sur-fargate-comme-bastion-pour-acceder-a-votre-base-de-donnee-grace-au-local-port-forwarding"
    },
    {
      "id": "cloud-101-episode-3-7-cles-pour-eviter-le-gachis-💰-finops",
      "title": "Cloud 101 - Episode 3 : 7 clés pour éviter le gâchis !💰 #FinOps",
      "description": "Blague récurrente entre ingénieurs cloud : « ce qui coûte cher sur le cloud, ce n'est pas tant les ressources qu'on utilise que celles qu'on a oublié d'éteindre ».",
      "date": "2024-02-12",
      "category": "blog",
      "tags": ["aws", "cloud", "finops"],
      "featuredImage": "/images/blog/29f15494-c167-4586-8e90-faaa11af450e.jpg",
      "slug": "cloud-101-episode-3-7-cles-pour-eviter-le-gachis-💰-finops"
    },
    {
      "id": "etendez-les-capacites-damazon-connect-avec-lambda-et-lexv2",
      "title": "Etendez les capacités d'Amazon Connect avec Lambda et LexV2",
      "description": "Découvrez comment étendre les fonctionnalités d'Amazon Connect en utilisant AWS Lambda et Amazon Lex V2.",
      "date": "2023-11-15",
      "category": "tech",
      "tags": ["AmazonConnect", "AmazonLex", "AWSLambda", "CX", "CentreDeContact", "RelationClient"],
      "featuredImage": "",
      "slug": "etendez-les-capacites-damazon-connect-avec-lambda-et-lexv2"
    },
    {
      "id": "cloud-101-episode-2-sysops-10-services-pour-votre-infra-sur-site",
      "title": "Cloud 101 - Episode 2 : SysOps, 10 services pour votre infra sur site",
      "description": "Découvrez 10 services AWS essentiels pour gérer votre infrastructure sur site comme un pro.",
      "date": "2023-11-07",
      "category": "blog",
      "tags": ["aws", "backup", "inventory", "management", "patchmanagement", "sysops", "systemsmanager"],
      "featuredImage": "",
      "slug": "cloud-101-episode-2-sysops-10-services-pour-votre-infra-sur-site"
    },
    {
      "id": "cloud-101-episode-1-quelle-est-la-vraie-valeur-ajoutee-du-cloud",
      "title": "Cloud 101 - Episode 1 : Quelle est la vraie valeur ajoutée du cloud ?",
      "description": "Première partie de notre série Cloud 101 : comprendre la vraie valeur ajoutée du cloud computing.",
      "date": "2023-10-17",
      "category": "opinion",
      "tags": ["agilité", "cloud", "valeur"],
      "featuredImage": "",
      "slug": "cloud-101-episode-1-quelle-est-la-vraie-valeur-ajoutee-du-cloud"
    },
    {
      "id": "make-or-buy-assemblez",
      "title": "Make or Buy ? Assemblez !",
      "description": "Réflexion sur les choix technologiques : faut-il développer ou acheter ? Et si la réponse était d'assembler ?",
      "date": "2023-09-26",
      "category": "opinion",
      "tags": ["agnostique", "logiciel", "metier", "natif", "time-to-market"],
      "featuredImage": "",
      "slug": "make-or-buy-assemblez"
    },
    {
      "id": "cloud-agnostique-ou-cloud-natif",
      "title": "Cloud agnostique ou cloud natif ?",
      "description": "Analyse des avantages et inconvénients entre une approche cloud agnostique et cloud native.",
      "date": "2023-09-13",
      "category": "opinion",
      "tags": ["agnostique", "natif"],
      "featuredImage": "",
      "slug": "cloud-agnostique-ou-cloud-natif"
    },
    {
      "id": "lagilite-une-question-de-confiance-a-construire",
      "title": "L'agilité, une question de confiance (à construire)",
      "description": "J'ai eu la chance d'être initié à l'agilité au sein d'une équipe de développeurs aguerris. Plus tard, j'ai eu l'opportunité d'aider à démarrer cinq équipes de développement agiles.",
      "date": "2023-07-02",
      "category": "opinion",
      "tags": ["agilité", "management", "valeur"],
      "featuredImage": "",
      "slug": "lagilite-une-question-de-confiance-a-construire"
    },
    {
      "id": "deployer-une-api-de-stockage-de-donnees-simple-avec-tres-peu-de-code-en-utilisant-amazon-api-gateway-et-dynamodb",
      "title": "Déployer une API de stockage de données simple avec très peu de code en utilisant Amazon API Gateway et DynamoDB",
      "description": "Tutoriel pour créer rapidement une API de stockage avec AWS API Gateway et DynamoDB.",
      "date": "2022-12-17",
      "category": "blog",
      "tags": ["api", "apigateway", "aws", "dynamodb", "serverless"],
      "featuredImage": "",
      "slug": "deployer-une-api-de-stockage-de-donnees-simple-avec-tres-peu-de-code-en-utilisant-amazon-api-gateway-et-dynamodb"
    },
    {
      "id": "aws-reinvent-2022-notre-bilan",
      "title": "AWS re:Invent 2022 : notre bilan",
      "description": "Retour sur l'événement AWS re:Invent 2022 avec nos impressions et les annonces marquantes.",
      "date": "2022-12-05",
      "category": "blog",
      "tags": ["aws", "reinvent"],
      "featuredImage": "",
      "slug": "aws-reinvent-2022-notre-bilan"
    },
    {
      "id": "powerbi-deployer-une-passerelle-sur-aws-pour-0-12-j",
      "title": "PowerBI : déployer une passerelle sur AWS pour 0,12€/j",
      "description": "Guide pour déployer une passerelle PowerBI sur AWS de manière économique.",
      "date": "2022-12-03",
      "category": "blog",
      "tags": ["aws", "ec2", "powerbi"],
      "featuredImage": "",
      "slug": "powerbi-deployer-une-passerelle-sur-aws-pour-0-12-j"
    }
  ]
}

const blogDataEn = {
  "posts": [
    {
      "id": "aws-user-group-poitiers-retour-sur-le-meetup-serverless-en-php-avec-lafup-poitiers",
      "title": "AWS User Group Poitiers: Recap of the Serverless PHP Meetup with AFUP Poitiers",
      "description": "Lambda was in the spotlight at the latest AWS User Group Poitiers meeting, along with Bref, a PHP runtime dedicated to serverless.",
      "date": "2024-09-23",
      "category": "blog",
      "tags": ["aws", "aws user group", "bref", "lambda", "php", "Poitiers", "serverless"],
      "featuredImage": "/images/blog/1726812299969.jpeg",
      "slug": "aws-user-group-poitiers-retour-sur-le-meetup-serverless-en-php-avec-lafup-poitiers"
    },
    {
      "id": "architecture-orientee-evenement-reconcilier-notifications-et-evenements-complets",
      "title": "Event-Driven Architecture: Reconciling Notifications and Complete Events",
      "description": "Minimalist or complete events? In event-driven architecture, different models exist. We propose here a way to simply reconcile the different approaches.",
      "date": "2024-07-04",
      "category": "blog",
      "tags": ["architecture", "aws", "event", "event-driven architecture", "eventbridge"],
      "featuredImage": "/images/blog/NotificationVsECST.png",
      "slug": "architecture-orientee-evenement-reconcilier-notifications-et-evenements-complets"
    },
    {
      "id": "les-objets-de-votre-bucket-s3-sont-peut-etre-publics-meme-si-la-console-aws-vous-dit-le-contraire",
      "title": "Your S3 Bucket Objects Might Be Public Even If the AWS Console Says Otherwise",
      "description": "S3 is an incredible storage service, capable of durably storing data at scale. In this blog article, I'll show you a little-known way your objects could become public by mistake.",
      "date": "2024-05-02",
      "category": "blog",
      "tags": ["aws", "s3", "security"],
      "featuredImage": "",
      "slug": "les-objets-de-votre-bucket-s3-sont-peut-etre-publics-meme-si-la-console-aws-vous-dit-le-contraire"
    },
    {
      "id": "protegez-vos-applications-des-attaques-avec-aws-cloudfront-et-aws-waf",
      "title": "Protect Your Applications from Attacks with AWS CloudFront and AWS WAF",
      "description": "Discover how to effectively protect your web applications against malicious attacks using AWS CloudFront and AWS WAF.",
      "date": "2024-03-18",
      "category": "tech",
      "tags": ["aws", "cloudfront", "security", "waf", "web-application-firewall"],
      "featuredImage": "",
      "slug": "protegez-vos-applications-des-attaques-avec-aws-cloudfront-et-aws-waf"
    },
    {
      "id": "utilisez-votre-conteneur-ecs-meme-sur-fargate-comme-bastion-pour-acceder-a-votre-base-de-donnee-grace-au-local-port-forwarding",
      "title": "Use Your ECS Container (Even on Fargate) as a Bastion to Access Your Database with Local Port Forwarding",
      "description": "Discover how to use an ECS container on Fargate as a bastion to access your private databases.",
      "date": "2024-03-04",
      "category": "tech",
      "tags": ["architecture", "aws", "bastion", "container", "docker", "ecs"],
      "featuredImage": "",
      "slug": "utilisez-votre-conteneur-ecs-meme-sur-fargate-comme-bastion-pour-acceder-a-votre-base-de-donnee-grace-au-local-port-forwarding"
    },
    {
      "id": "cloud-101-episode-3-7-cles-pour-eviter-le-gachis-💰-finops",
      "title": "Cloud 101 - Episode 3: 7 Keys to Avoid Waste 💰 - FinOps",
      "description": "Recurring joke among cloud engineers: 'what's expensive in the cloud isn't so much the resources you use as those you forgot to turn off'.",
      "date": "2024-02-12",
      "category": "blog",
      "tags": ["aws", "cloud", "finops"],
      "featuredImage": "/images/blog/29f15494-c167-4586-8e90-faaa11af450e.jpg",
      "slug": "cloud-101-episode-3-7-cles-pour-eviter-le-gachis-💰-finops"
    },
    {
      "id": "etendez-les-capacites-damazon-connect-avec-lambda-et-lexv2",
      "title": "Extend Amazon Connect Capabilities with Lambda and Lex v2",
      "description": "Discover how to extend Amazon Connect functionalities using AWS Lambda and Amazon Lex V2.",
      "date": "2023-11-15",
      "category": "tech",
      "tags": ["AmazonConnect", "AmazonLex", "AWSLambda", "CX", "ContactCenter", "CustomerRelations"],
      "featuredImage": "",
      "slug": "etendez-les-capacites-damazon-connect-avec-lambda-et-lexv2"
    },
    {
      "id": "cloud-101-episode-2-sysops-10-services-pour-votre-infra-sur-site",
      "title": "Cloud 101 - Episode 2: SysOps, 10 Services for Your On-Premises Infrastructure",
      "description": "Discover 10 essential AWS services to manage your on-premises infrastructure like a pro.",
      "date": "2023-11-07",
      "category": "blog",
      "tags": ["aws", "backup", "inventory", "management", "patchmanagement", "sysops", "systemsmanager"],
      "featuredImage": "",
      "slug": "cloud-101-episode-2-sysops-10-services-pour-votre-infra-sur-site"
    },
    {
      "id": "cloud-101-episode-1-quelle-est-la-vraie-valeur-ajoutee-du-cloud",
      "title": "Cloud 101 - Episode 1: What is the Real Added Value of the Cloud?",
      "description": "First part of our Cloud 101 series: understanding the real added value of cloud computing.",
      "date": "2023-10-17",
      "category": "opinion",
      "tags": ["agility", "cloud", "value"],
      "featuredImage": "",
      "slug": "cloud-101-episode-1-quelle-est-la-vraie-valeur-ajoutee-du-cloud"
    },
    {
      "id": "make-or-buy-assemblez",
      "title": "Make or Buy? Assemble!",
      "description": "Reflection on technological choices: should you develop or buy? What if the answer was to assemble?",
      "date": "2023-09-26",
      "category": "opinion",
      "tags": ["agnostic", "software", "business", "native", "time-to-market"],
      "featuredImage": "",
      "slug": "make-or-buy-assemblez"
    },
    {
      "id": "cloud-agnostique-ou-cloud-natif",
      "title": "Cloud Agnostic or Cloud Native?",
      "description": "Analysis of the advantages and disadvantages between a cloud agnostic and cloud native approach.",
      "date": "2023-09-13",
      "category": "opinion",
      "tags": ["agnostic", "native"],
      "featuredImage": "",
      "slug": "cloud-agnostique-ou-cloud-natif"
    },
    {
      "id": "lagilite-une-question-de-confiance-a-construire",
      "title": "Agility: A Matter of Trust to Build",
      "description": "I was fortunate to be introduced to agility within a team of seasoned developers. Later, I had the opportunity to help start five agile development teams.",
      "date": "2023-07-02",
      "category": "opinion",
      "tags": ["agility", "management", "value"],
      "featuredImage": "",
      "slug": "lagilite-une-question-de-confiance-a-construire"
    },
    {
      "id": "deployer-une-api-de-stockage-de-donnees-simple-avec-tres-peu-de-code-en-utilisant-amazon-api-gateway-et-dynamodb",
      "title": "Deploy a Simple Data Storage API with Very Little Code Using Amazon API Gateway and DynamoDB",
      "description": "Tutorial to quickly create a storage API with AWS API Gateway and DynamoDB.",
      "date": "2022-12-17",
      "category": "blog",
      "tags": ["api", "apigateway", "aws", "dynamodb", "serverless"],
      "featuredImage": "",
      "slug": "deployer-une-api-de-stockage-de-donnees-simple-avec-tres-peu-de-code-en-utilisant-amazon-api-gateway-et-dynamodb"
    },
    {
      "id": "aws-reinvent-2022-notre-bilan",
      "title": "AWS re:Invent 2022: Our Review",
      "description": "Review of the AWS re:Invent 2022 event with our impressions and notable announcements.",
      "date": "2022-12-05",
      "category": "blog",
      "tags": ["aws", "reinvent"],
      "featuredImage": "",
      "slug": "aws-reinvent-2022-notre-bilan"
    },
    {
      "id": "powerbi-deployer-une-passerelle-sur-aws-pour-0-12-j",
      "title": "PowerBI: Deploy a Gateway on AWS for $0.12/day",
      "description": "Guide to deploy a PowerBI gateway on AWS economically.",
      "date": "2022-12-03",
      "category": "blog",
      "tags": ["aws", "ec2", "powerbi"],
      "featuredImage": "",
      "slug": "powerbi-deployer-une-passerelle-sur-aws-pour-0-12-j"
    }
  ]
}

// Function to calculate reading time (average 200 words per minute)
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Get blog data based on language
function getBlogData(language: string = 'fr') {
  return language === 'en' ? blogDataEn : blogDataFr
}

// Convert data to BlogPost format
export function getBlogPosts(language: string = 'fr'): BlogPost[] {
  const data = getBlogData(language)
  return data.posts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.description,
    content: '', // Will be loaded dynamically
    author: 'TerraCloud',
    publishedAt: post.date,
    category: post.category as 'tech' | 'opinion' | 'blog',
    tags: post.tags,
    image: post.featuredImage || undefined,
    readingTime: 5 // Default, will be calculated when content is loaded
  }))
}

// Legacy export for backward compatibility
export const blogPosts: BlogPost[] = getBlogPosts('fr')

// Function to get a blog post by slug
export function getPostBySlug(slug: string, language: string = 'fr'): BlogPost | undefined {
  const posts = getBlogPosts(language)
  return posts.find(post => post.slug === slug)
}

// Function to get all categories
export function getAllCategories(language: string = 'fr'): string[] {
  const posts = getBlogPosts(language)
  return [...new Set(posts.map(post => post.category))]
}

// Function to get all tags
export function getAllTags(language: string = 'fr'): string[] {
  const posts = getBlogPosts(language)
  return [...new Set(posts.flatMap(post => post.tags))].sort()
}

// Function to get posts by category
export function getBlogPostsByCategory(category: string, language: string = 'fr'): BlogPost[] {
  const posts = getBlogPosts(language)
  return posts.filter(post => post.category === category)
}

// Function to get posts by tag
export function getBlogPostsByTag(tag: string, language: string = 'fr'): BlogPost[] {
  const posts = getBlogPosts(language)
  return posts.filter(post => post.tags.includes(tag))
}

// Function to get recent posts
export function getRecentBlogPosts(limit: number = 5, language: string = 'fr'): BlogPost[] {
  const posts = getBlogPosts(language)
  return posts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}
