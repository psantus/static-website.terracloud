Dans cet article, découvrez Amazon Connect, solution très riche de Centre d'appel et comment ses fonctionnalités peuvent encore être étendues grâce à Lambda et Lex.

# Étendre les fonctionnalités d'Amazon Connect avec Lambda et LexV2

## Dans cet article, découvrez Amazon Connect, solution très riche de Centre d'appel et comment ses fonctionnalités peuvent encore être étendues grâce à Lambda et Lex.

Amazon Connect possède de  nombreuses fonctionnalités, allant des enregistrements d’appels à l’analyse des sentiments en direct ou encore la possibilité de proposer aux agents des guides de résolution pas à pas des demandes clients. Mais aucun produit ne possède toutes les fonctionnalités intégrées. L’avantage de Connect est qu’il est entièrement intégrable à d’autres services AWS qui vous aideront à personnaliser votre expérience client. Dans cet article, je montre comment j’ai étendu les capacités de Connect avec Lambda et Lex pour ajouter certaines fonctionnalités demandées par un client : la possibilité de joindre une personne directement à l’aide d’une extension téléphonique et de rechercher un nom dans l’annuaire de l’entreprise.

![](/images/blog/AmazonConnect-1024x576.jpg)

## Qu’est-ce qu’Amazon Connect ?

Amazon Connect est le produit Centre-de-Contact-as-a-Service (CCaaS) d’AWS. Cela signifie que vous pouvez gérer un centre d’appels sans compétences en télécommunications, et sans notamment devoir gérer d’infrastructure IPBX ou SBG. Conformément à la philosophie de paiement à l’utilisation d’Amazon Web Services en matière de tarification des produits, il n’y a pas de licence ni de frais fixes. Cela signifie que vous ne payez que 0,018 $/minute. AWS a réalisé d’énormes investissements dans le produit. Dans mon [article de blog sur le dernier re:Invent](../../../../2022/12/05/aws-reinvent-2022-notre-bilan/index.html), j’ai souligné qu’en dehors des instances EC2, il s’agissait en 2002 du premier service AWS en termes d’annonces de nouvelles fonctionnalités (et ça n’a pas cessé). Dans les références publiques, vous trouverez de grands noms, comme le groupe hôtelier Accor ou la société de location de voitures Sixt, et des entreprises beaucoup plus petites comme Margaritas, un restaurant familial au Texas.

![Le Flow Designer d'Amazon Connect permet une configuration aisée du centre de contact](/images/blog/AmazonConnect_FlowDesigner.png)

## Ajout de la prise en charge des extensions téléphoniques avec AWS Lambda

Le cas d’utilisation principal d’Amazon Connect étant de gérer un centre d’appel, pas un simple standard téléphonique, il n’existe aucune fonctionnalité native permettant d’attribuer à chaque agent un numéro de poste pour un contact direct. (Vous pouvez toujours diriger nativement un appel vers un agent spécifique, par exemple celui qui est affecté au dossier client, ou celui qui est le point de contact unique du client). Heureusement, Amazon Connect (i) est livré avec une API complète, (ii) prend en charge l’ajout d’informations personnalisées d’agent à l’aide de balises et (iii) peut déclencher une fonction Lambda. AWS Lambda est un service dans lequel vous mettez essentiellement du code et AWS s’occupe de toute l’infrastructure sous-jacente (de la machine au runtime). Les invocations coûtent 0,0000133334 $ par Go.seconde (ce qui signifie que ma fonction qui s’exécute sur une Lambda avec 128 Mo de mémoire pendant 130 ms peut s’exécuter environ 5 millions de fois avant de me coûter un seul dollar).

![Architecture Amazon Connect démontrée dans cet article](/images/blog/AmazonConnect-ExtendWithLambdaAndLex-1024x398.png)

Avant d’exposer l’intégration, écoutons d’abord le résultat :

[Paul SANTUS](https://soundcloud.com/paul-santus-44431746) · [AmazonConnect - Transfer based on Extension](https://soundcloud.com/paul-santus-44431746/amazonconnect-transfer-based-1)

Voici comment j’ai procédé : Tout d’abord, j’ai attribué un tag personnalisé appelée « Extension » à chaque agent de l’annuaire. J’ai ensuite conçu un flux qui demande d’abord au client de composer le poste (cette invite est interruptible, afin que les clients puissent enregistrer un contact +12345678910#777 dans leur téléphone). Voici à quoi cela ressemble :

![](/images/blog/GetContactByExtension-Flow-1024x491.png)

La deuxième boîte permet de persister la saisie de l’utilisateur dans la session. La troisième vérifie si le client a saisi une extension. Si ce n’est pas le cas, nous passerons à la partie Répertoire de cet article. La Lambda est appelée avec un événement qui contient des informations sur la session en cours et utilise [l’API Amazon Connect SearchUsers](https://docs.aws.amazon.com/connect/latest/APIReference/API_SearchUsers.html) pour rechercher l’agent associé au numéro d’extension. Voici un aperçu du code

Et voilà ! Nous disposons désormais dans la session Amazon Connect de toutes les informations dont nous avons besoin pour transférer l’appel vers la file d’attente personnelle de l’agent.

## Ajout de la prise en charge de la recherche d'annuaire interactive à l'aide de Lex

Peut-être que le client ne connaît pas le numéro de poste de l’agent… mais seulement son nom. Et vous ne pouvez pas composer un nom, n’est-ce pas ? C’est ici qu’intervient Lex ! Amazon Lex est un agent conversationnel (c’est le moteur d’Alexa, l’enceinte connectée d’Amazon) ; contrairement à ChatGPT, son rôle n’est pas d’engager de longues conversations mais de comprendre l’intention d’un utilisateur (parmi un certain nombre d’intentions prédéterminées) et de collecter des informations (appelées « créneaux ») nécessaires pour  réaliser cette intention. Lex peut fonctionner comme un service autonome et est également capable, à tout moment de la conversation, d’invoquer un Lambda afin d’effectuer certains traitements et de décider de l’étape suivante. Ici, nous avons défini comme intention le fait de vouloir joindre les équipes commerciales et d’assistance, ainsi que le souhait de parler à une personne spécifique.

![L'interface de Lex permet de programmer visuellement l'agent conversationnel](/images/blog/Capture-decran-2023-11-15-a-14.34.14.png)

De nouveau, écoutons le résultat final avant d’ouvrir le capot

[Paul SANTUS](https://soundcloud.com/paul-santus-44431746) · [AmazonConnect - Transfer based on Name](https://soundcloud.com/paul-santus-44431746/amazonconnect-transfer-based)

Dans la première partie de la conversation, Lex détermine que le client souhaite effectuer une recherche dans l’annuaire. Pour ce faire, il m’a suffi de donner à Lex quelques exemples de phrases que le client prononcerait, telles que « Trouver quelqu’un par son nom » ou « Parler à une personne spécifique ». Lorsque j’en ai fourni 8, le bot était tout à fait capable d’interpréter toute demande qui s’en rapproche. Ensuite, Lex essaie d’obtenir le nom de famille de l’appelé. Comme mon nom n’est pas un nom anglais courant, la première recherche dans l’annuaire échoue (elle essaie de trouver « Santos » au lieu de « Santus » – oui, je pourrais le rendre plus intelligent). J’ai écrit mon code Lambda pour que Lambda demande à Lex de demander à nouveau le nom, cette fois en utilisant la possibilité d’épeler au lieu du langage naturel.

``` { "sessionState": { "dialogAction": { "type": "ElicitSlot", "slotToElicit": "Name", "slotElicitationStyle": "SpellByWord" }, "sessionAttributes": { "attemptNumber": 2 }, "intent": { "name": "SpeakToSpecificPerson" } }, "messages": [ { "contentType": "PlainText", "content": "Sorry, we did not find any contact with this family name. Could you please spell it for me?" } ] } ```

Comme vous pouvez le voir, même avec mon accent «frenchie», Lex peut alors capturer le bon nom, puis la recherche dans l’annuaire renvoie les mêmes données que précédemment, nous permettant de transférer l’appel à l’agent et également de fournir gracieusement le numéro de poste pour faciliter la vie du client. plus simple la prochaine fois.

## Envie de démarrer ? Besoin d'aide ?

Dans cet article, j’ai démontré comment j’ai intégré Amazon Connect, Lambda et Lex pour créer une expérience client puissante. Grâce à ces fonctionnalités, vous pouvez ajouter les fonctionnalités de standard téléphonique dont Amazon Connect a besoin pour répondre aux besoins de certaines petites entreprises. Comme toujours, si vous avez besoin d’aide pour démarrer sur les services cloud AWS ou pour améliorer votre expérience client avec Amazon Connect, n’hésitez pas à [prendre rendez-vous](../../../../../nous-contacter/prendre-rendez-vous/index.html) !

![](/images/blog/Logo-orange-1.png)