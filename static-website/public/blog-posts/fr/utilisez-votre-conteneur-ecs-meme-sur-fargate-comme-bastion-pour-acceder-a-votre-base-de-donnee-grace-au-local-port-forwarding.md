Utilisez votre conteneur ECS (même sur Fargate) comme bastion pour accéder à votre base de donnée grâce au local port forwarding

## Utilisez votre conteneur ECS (même sur Fargate) comme bastion pour accéder à votre base de donnée grâce au local port forwarding

## Si votre infrastructure est bien conçue, votre base de données n'est accessible que depuis l'application qu'elle est censée servir. Et oui, ECS Exec permet de SSH sur vos conteneurs, mais vous ne pouvez pas l'utiliser pour la redirection de port. Ce serait bien s'il était possible d'utiliser vos outils locaux, comme DBeaver ou SQL Developer, pour vous connecter à la base de données de manière sécurisée ? Eh bien, c'est le cas, et ces articles de blog vous montrent comment !

![Utilisez ECS pour faire du local port forwarding vers un hôte distant](/images/blog/ECS-local-port-forwarding.png)

## Résumé des solutions documentées par AWS pour utiliser ECS et EC2 comme bastion

AWS propose deux solutions bastion distinctes pour vos charges de travail. Les deux solutions s’appuient sur IAM pour l’authentification (supprimant le besoin d’informations d’identification statiques/partagées) et permettent la journalisation de toutes les commandes shell saisies par l’opérateur :

1. $1

```
aws ecs execute-command \
--profile  \
--region  \
--cluster  \
--task  \
--container  \
--interactive --command "/bin/sh"
```

Il y a quelques pré-requis : - La tâche doit faire partie d’un service ECS et non être une tâche autonome. - « *Enable execute command* » doit être défini sur true lors de la création du service ECS - Le processus conteneur doit avoir un accès en écriture à quelques répertoires (utilisez des points de montages / *mounts* si vous suivez par ailleurs la bonne pratique de durcissement, en n’accordant pas au processus exécuté par le conteneur l’accès en écriture au système de fichiers hôte), à savoir */managed-agents*, */var/lib/ amazon/ssm* et */var/log/amazon/ssm*. - L’opérateur doit avoir installé le plug-in Session Manager pour AWS CLI.

**2. Sur EC2, la commande [Start-session](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-sessions-start.html#sessions-remote-port-forwarding)** de Systems Manager (SSM) permet d’ouvrir un shell interactif et, via l’utilisation de documents SSM, à savoir le document « AWS-StartPortForwardingSessionToRemoteHost », d’activer la redirection de port vers un hôte distant. - SSM Start-Session nécessite une cible qui est un ID d’instance EC2.

## L'astuce : utiliser SSM sur un conteneur hébergé par Fargate

Le problème sur un conteneur hébergé par Fargate est que, même s’il existe une instance EC2 prenant en charge le conteneur, vous ne le connaissez pas et ne le gérez pas. Voici l’astuce : les tâches ECS ont un identifiant appelé runtimeId que vous pouvez utiliser pour exécuter des commandes de démarrage de session SSM, au lieu de la commande d’exécution de commande. 1. Récupérez le runtimeId de votre conteneur :

Le problème sur un conteneur hébergé par Fargate est que, même s’il existe une instance EC2 prenant en charge le conteneur, vous ne le connaissez pas et ne le gérez pas. Voici l’astuce : les tâches ECS ont un identifiant appelé runtimeId que vous pouvez utiliser pour exécuter des commandes de démarrage de session SSM, au lieu de la commande d’exécution de commande. 1. Récupérez le runtimeId de votre conteneur :

```
aws ecs describe-tasks \
--cluster   \
--task  \
--profile \ 
--region  \ 
--query 'tasks[].containers[?name== ].runtimeId | [0] | [0]'
```

(Le paramètre –query ci-dessus post-traite la sortie de la CLI afin qu’elle renvoie uniquement l’identifiant demandé, pas la sortie complète des tâches de description. Voir [ici pour savoir comment l’utiliser](https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-filter.html).) 2. Démarrez une session à l’aide Start-Session :

```
aws ssm start-session \
--target ecs:__ \
--document-name AWS-StartPortForwardingSessionToRemoteHost \
--parameters '{"host":[""],"portNumber":[""], "localPortNumber":[""]}' \
--profile  \
--region
```

L’astuce ici réside dans le paramètre –target : on concatène « ecs: » puis le nom du cluster, l’ID de la tâche, et enfin le runtimeID récupéré à l’étape précédente. (notez que le taskID est inclus dans runtimeId, de sorte que celui-ci apparaît effectivement deux fois dans le paramètre –target).

## Demo

![CLI to use ECS as bastion](/images/blog/Capture-decran-2024-02-26-a-11.56.51-flou.png)

![Et on peut se connecter à la BDD via localhost!](/images/blog/Capture-decran-2024-02-26-a-11.54.46.png)

Une question ? vous avez besoin d’aide pour démarrer ou progresser sur le Cloud AWS ? [Contactez-nous !](../../../../../nous-contacter/index.html)