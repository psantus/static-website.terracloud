Les architectures orientées événement offrent de nombreux bénéfices : le découplage entre les composants applicatifs permet une meilleure résilience à la panne, un flux de traitement adapté aux ressources disponibles, un faible temps d'attente pour l'utilisateur (pourquoi traiter de façon synchrone ce qu'il peut l'être après lui avoir répondu ?).

[](https://dev.to/t/eventdriven)

## Les architectures orientées événement offrent de nombreux bénéfices : le découplage entre les composants applicatifs permet une meilleure résilience à la panne, un flux de traitement adapté aux ressources disponibles, un faible temps d'attente pour l'utilisateur (pourquoi traiter de façon synchrone ce qu'il peut l'être après lui avoir répondu ?).

![](/images/blog/NotificationVsECST.png)

Cependant, leur conception n’est pas aisée et peut entraîner de nombreux débats : faut-il des événements très légers, à charge pour le consommateur de demander un éventuel complément d’information ? faut-il des événements complets ? .. Dans ce billet, j’expose les différents types d’événements et propose une manière de réconcilier simplement les différentes approches en s’appuyant sur AWS EventBridge (un repo Github avec un exemple pleinement fonctionnel vous attend en fin de billet !).

## Les différents types d'événements

Un premier pattern est d’utiliser l’événement « Notification », qui contient juste un identifiant. En voici un exemple :

```
{ "orderId": "1234567" }
```

Cet événement minimaliste a pour avantage de ne nécessiter aucune connaissance de la modélisation du domaine métier : il y a peu de risque de violer le contrat d’interface notamment en cas d’évolution. Si un consommateur veut en savoir plus, il peut aller chercher la donnée à partir de l’identifiant communiqué (et si le système source présente une API GraphQL, il pourra aller chercher uniquement la donnée qui est nécessaire pour lui). Une seconde approche se nomme « Event-carried State Transfer » (par analogie avec le « REpresentational State Transfer » qui caractérise les API REST), c’est à dire que l’événement porte l’état courant. En voici un exemple :

```
{
   "id": "1234567", 
   "status": "PAYMENT_ACCEPTED",
   "customer": "Bob",
   "content": [ ... ]  
}
```

Ce type d’événement a l’avantage de porter toute l’information disponible et ainsi d’épargner une requête au consommateur, mais aussi d’améliorer les options de filtrage dont on disposera au niveau du bus d’événement : on pourra par exemple choisir de ne consommer que les événements représentant une commande au statut `PAYMENT_ACCEPTED` (par exemple pour envoyer un mail de confirmation de commande). Une troisième voie consiste à faire un « Delta », i.e. transmettre également l’état précédent en complément de l’état courant. Voici un résumé des avantages et limites de chaque approche :

![](/images/blog/NotificationVsECST-FR.png)

## Réconcilier l'approche Notification et l'approche Event-carried State Transfer

Dès lors, on peut vouloir tirer parti des bénéfices de chaque approche - sans pour autant complexifier inutilement l’architecture des applications qui publient les événements comme de celles qui les consomment. - sans parfois avoir la main sur le code source des applications. C’est là qu’une approche serverless mêlant bus d’événement EventBridge et Lambda a tout son sens. Dans cette approche, on va mettre en place - sur le bus d’événement des règles qui capturent les événements de type « *Notification*«  - et des micro-services d’enrichissement qui vont récupérer la donnée du domaine métier correspondant et republier l’événement enrichi. Je commencerai par un exemple simple, avant de montrer comment on peut étendre ce pattern. En bas de cet article, vous trouverez un lien vers les deux implémentations qui suivent.

### La version simple : un seul enrichissement

Dans cet exemple, une application de gestion de paiement publie un événement de type `PAYMENT` portant uniquement l’id de l’événement (un événement de notification, donc).

![](/images/blog/EventBridge-NotificationToECST-Simple-1024x798.png)

Côté EventBridge, une règle va explicitement viser ces événements en vérifiant qu’aucune donnée supplémentaire n’est associée

```
{
  "detail-type": ["PAYMENT"],
  "detail.payment_data.id": [{ "exists": false }]
}
```

Si cette règle capture un événement, elle va l’envoyer vers une Lambda qui va publier le même événement enrichi. On va donc trouver successivement dans le bus d’événement deux événements (ayant le même id métier) : - la notification

```
{
    "version": "0",
    "id": "a23a7513-b67a-d455-f90c-1f9ddbd14820",
    "detail-type": "PAYMENT",
    "source": "PaymentSystem",
    "account": "112233445566",
    "time": "2024-07-04T09:06:47Z",
    "region": "eu-west-1",
    "resources": [],
    "detail": {
        "id": "2237082"
    }
}
```

- et l’événement complet (ECST):

```
{
    "version": "0",
    "id": "51bbf35e-97d8-8f80-1cc2-debac66460e6",
    "detail-type": "PAYMENT",
    "source": "PaymentSystem",
    "account": "112233445566",
    "time": "2024-07-04T09:06:49Z",
    "region": "eu-west-1",
    "resources": [],
    "detail": {
        "id": "2237082",
        "payment_data": {
            "id": "2237082",
            "type": "Credit",
            "description": "Credit Card - HSBC",
            "status": "Confirmed",
            "state": "Paid",
            "value": 1700,
            "currency": "EUR",
            "date": "2018-12-15"
        }
    }
}
```

(la structure d’événement est un peu plus complexe que dans la partie théorique : on retrouve ici la structure typique d’un événement EventBridge qui encapsule le contenu métier.) Cet événement « pleinement qualifié » est ensuite envoyé Le bus d’événement EventBridge fournit notamment : - Le découplage entre Producteurs et Consommateurs avec un middleware scalable et hautement disponible - Une logique avancée de filtrage/capture d’événements - La possibilité de logger les événements et de les archiver pour re-jeu - La gestion du retry pour les invocations synchrones faites par le bus d’événement. - La transformation de l’événement pour l’adapter au format attendu par le consommateur, sans avoir à déployer cette transformation dans une fonction Lambda. L’ensemble de ces fonctionnalités sont démontrées dans le code disponible en fin d’article.

### Un enrichissement plus complexe

Imaginons un cas plus complexe : le système de paiement publie un événement de paiement. Mais ce paiement est lié à une commande, qui a son propre cycle de vie, géré dans une plusieurs autres applications. Et cette commande est liée à un client, qui a également un cycle de vie propre, géré dans un CRM. Ici on va mettre en place une logique de filtrage / capture plus complexe, mais le code des fonctions d’enrichissement ne change pas !

![](/images/blog/EventBridge-NotificationToECST-971x1024.png)

### Démo / mise en oeuvre concrète !

Nous avons démontré dans ce blog post comment réconcilier les deux principaux modèles de gestion d’événements, grâce à AWS EventBridge et AWS Lambda Vous trouverez dans [ce repo Github](https://github.com/psantus/event-driven-notification-vs-ecst) deux modèles CloudFormation permettant de déployer ces exemples pleinement fonctionnels.