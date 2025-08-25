Dans cet article de blog, je montre une manière peu connue par laquelle vos objets pourraient devenir publics par mégarde

## Dans cet article de blog, je montre une manière peu connue par laquelle vos objets pourraient devenir publics par mégarde

![](/images/blog/https-dev-to-uploads.s3.amazonaws.com-uploads-articles-2atzrs9kam06a0cso3bt.avif)

S3 est un service de stockage incroyable, capable de stocker durablement des données à l’échelle de l’exaoctet et de les présenter avec une latence de quelques millisecondes. Bien que son nom signifie « *Simple* Storage Service », sa puissance comporte certains risques, dont l’un est de découvrir que vos données privées sont devenues publiques. Dans cet article de blog, **j’expose une manière peu connue par laquelle vos objets pourraient devenir publics par mégarde**.

## Comment AWS protège vos données dans S3

Commençons par une banalité qu’il faut néanmoins maîtriser : le fait que S3, en tant que *service Web*, soit accessible au public (c’est-à-dire que vous pouvez utiliser l’API S3 sans configurer de VPN) ne signifie pas que les données *doivent* être publiques. En fait, les buckets S3 ont toujours été privés par défaut. Et depuis 2018, il existe des verrous supplémentaires au niveau du compte et du bucket que vous pouvez définir pour empêcher explicitement les objets d’être publics même si vous avez défini par erreur une politique qui pourrait entraîner un accès public. Et à partir d’avril 2023, ceux-ci sont activés par défaut au niveau du bucket.

![](/images/blog/cb_account_settings_5.png)

Un grand pouvoir implique de grandes responsabilités ! Le modèle de sécurité partagée d’AWS stipule que l’utilisateur, qui a le pouvoir de définir des politiques pour permettre l’accès public, est ensuite responsable de sa bonne mise en œuvre. Voici les méthodes standard qui peuvent être utilisées pour définir des autorisations dans S3 : Via les listes de contrôle d’accès. Les ACL ne sont plus recommandées mais peuvent toujours être utilisées pour accorder l’accès aux ressources S3 (buckets ou objets). Grâce à des politiques basées sur les ressources. Chaque compartiment dispose d’une politique qui peut autoriser (ou refuser explicitement, ce qui a toujours la priorité) l’accès aux objets. C’est la méthode recommandée pour procéder, car il est facile de définir des autorisations granulaires et également d’accorder l’accès à d’autres comptes AWS ou services AWS. Grâce aux politiques basées sur l’identité IAM. Assurez-vous de ne pas utiliser *action = s3:** et *resource = ** ! Chacune de ces autorisations peut être neutralisée [avec les paramètres « Blocage de l’accès public » mentionnés ci-dessus](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html).

## Alors, comment vos objets pourraient-ils encore être publics ?

Outre le modèle bien connu (et volontaire) d’utilisation des distributions de CloudFront CDN pour rendre les données S3 accessibles au public, il existe deux manières de rendre vos objets S3 publics par inadvertance. La raison pour laquelle je voulais faire cet article de blog est que j’ai récemment découvert ces deux fuites chez l’un de mes clients. Il avait un bucket S3 qui était affiché comme « accès public bloqué » dans la console AWS, mais des données ont été divulguées par ces deux failles de sécurité.

### Fuite de la clé d'accès API / clé secrète

La première façon dont les données ont pu fuir était parce que mon client avait distribué la clé d’accès API et la clé secrète dans une application frontale. Dans son cas, l’application était une application mobile, mais il s’agissait toujours d’un code qui s’exécutait côté client et qui pouvait être décompilé / rétroconçu / vidé de la mémoire. La bonne nouvelle est qu’AWS analyse de manière proactive le Web (qui, évidemment, semble inclure les magasins d’applications plutôt que simplement analyser les référentiels publics) à la recherche de secrets et a averti mon client que cette clé API particulière était disponible.

### Fonctionnalité d'invité non authentifié du pool d'identités Cognito

La deuxième façon est plus subtile. Les pools d’identités Cognito offrent la possibilité de fournir des informations d’identification à court terme en échange d’une preuve d’authentification émise par un fournisseur d’identité. Cela s’avère très utile, par exemple pour permettre à toutes les personnes du service marketing d’accéder aux fichiers du compartiment S3 ou pour permettre à l’utilisateur `JohnDoe`d’accéder uniquement aux fichiers du compartiment préfixés par `JohnDoe`. Et parce que cela est parfois nécessaire (par exemple, vous pouvez vouloir que les clients affichent une carte de localisation Amazon même s’ils n’ont pas déjà de compte sur votre application), Cognito offre la possibilité d’autoriser l’accès invité non authentifié, auquel cas les utilisateurs reçoivent des informations d’identification à court terme associées à un rôle de votre choix.

![](/images/blog/https-dev-to-uploads.s3.amazonaws.com-uploads-articles-158rp1ssa85xx5ys3kvs.avif)

Si le rôle dispose d’un accès s3:* au bucket, eh bien… les utilisateurs peuvent faire à peu près ce qu’ils veulent avec votre bucket et/ou vos objets. Voici comment cela peut être exploité par un attaquant qui ne connaît que l’ID du pool d’identités (qui doit être distribué dans l’application frontale) et l’ID du compte AWS (qui est assez facile à trouver si le nom du bucket est également dans le code frontal)

```
# Creating a guest identity from the pool
% aws cognito-identity get-id \ 
--account-id ACCOUNT-ID_HERE \
--identity-pool-id "REGION:IDENTITY_POOL_ID" \
--region REGION

# AWS API replies with a unique user ID
{
    "IdentityId": "REGION:UNIQUE_USER_ID"
}

# Then we ask for short-term credentials attached to this identity
% aws cognito-identity get-credentials-for-identity \
--identity-id "REGION:UNIQUE_USER_ID" \
--region REGION \
--output json
{
    "IdentityId": "REGION:UNIQUE_USER_ID",
    "Credentials": {
        "AccessKeyId": "ASIAY--EDITED-FOR-SECURITY-REASON--4FJ",
        "SecretKey": "I4D2SZ4--EDITED-FOR-SECURITY-REASON--v1AwAp/",
        "SessionToken": "IQoJb3JpZ2luX2VjEIz//////////wEaCWV1LXdlc3QtMyJHMEUCIQCgXefjo82cstPQSS1WcXALUfmq364unN+Y/v5sb--EDITED-FOR-SECURITY-REASON--mBbD+AzASKDK",
        "Expiration": "2024-04-16T22:17:04+02:00"
    }
}
# In the next step you can actually make any API call that the `my-role-for-cognito-guests` is granted permissions for.
```

## Comment accorder en toute sécurité l'accès (téléchargement/téléchargement) à des objets S3 spécifiques sans exposer les secrets et gérer l'identité du client dans AWS / Cognito ?

Un moyen simple de fournir ce cas d’utilisation consiste à utiliser [des URL pré-signées S3 ](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html)**générées par le backend** . Avec les URL pré-signées S3, vous pouvez exécuter votre propre logique d’autorisation d’application personnalisée dans votre code back-end, puis utiliser les informations d’identification d’un utilisateur IAM connues uniquement de l’application back-end pour générer une URL que vous distribuez au client. À l’aide de cette URL, le client peut effectuer uniquement l’opération sélectionnée sur cet objet spécifique pendant une période que vous déterminez, agissant ainsi efficacement comme des informations d’identification à court terme spécifiques à ce client.

## Je suis le responsable de la sécurité de la société X. Comment puis-je m'assurer qu'aucun de mes développeurs n'utilise la fonctionnalité d'invité non authentifié de Cognito ?

Comme pour la plupart des contrôles de conformité, vous pouvez : - Analysez les journaux Cloudtrail et recherchez les opérations d’API AllowUnauthenticatedIdentities des API CreateIdentityPool et UpdateIdentityPool - Utilisez les règles AWS Config. Au moment de la rédaction de cet article, il n’existe aucune règle gérée par AWS qui prenne en charge la détection de l’accès invité non authentifié au pool d’identités Cognito (bonjour, équipe de service AWS !), mais vous pouvez toujours écrire votre propre [règle de configuration personnalisée](https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_develop-rules_nodejs.html) en vous appuyant sur Lambda !