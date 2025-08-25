# Use Your ECS Container (Even on Fargate) as a Bastion to Access Your Database with Local Port Forwarding

Accessing databases in private subnets securely can be challenging. This article shows how to use ECS containers, even on Fargate, as bastions for database access using local port forwarding.

## The Challenge: Secure Database Access

### Traditional Bastion Hosts
- Dedicated EC2 instances for secure access
- Always-on costs even when not in use
- Manual maintenance and patching required
- Single point of failure

### The ECS Container Solution
- On-demand bastion containers
- No infrastructure maintenance
- Cost-effective (pay only when running)
- Scalable and highly available

## Architecture Overview

```
[Developer] → [ECS Task] → [RDS Database]
     ↑              ↑            ↑
Local Port    Private Subnet  Private Subnet
Forwarding    (Fargate)      (Multi-AZ)
```

## Implementation Steps

### Step 1: Create the Bastion Container

Create a Dockerfile for your bastion container:

```dockerfile
FROM alpine:latest

# Install necessary tools
RUN apk add --no-cache \
    openssh-client \
    mysql-client \
    postgresql-client \
    netcat-openbsd \
    curl

# Create non-root user
RUN adduser -D -s /bin/sh bastion

# Copy connection scripts
COPY scripts/ /usr/local/bin/
RUN chmod +x /usr/local/bin/*

USER bastion
WORKDIR /home/bastion

# Keep container running
CMD ["tail", "-f", "/dev/null"]
```

### Step 2: ECS Task Definition

```json
{
  "family": "database-bastion",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::account:role/bastionTaskRole",
  "containerDefinitions": [
    {
      "name": "bastion",
      "image": "your-account.dkr.ecr.region.amazonaws.com/database-bastion:latest",
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/database-bastion",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "environment": [
        {
          "name": "DB_HOST",
          "value": "database.cluster-xxx.us-east-1.rds.amazonaws.com"
        },
        {
          "name": "DB_PORT",
          "value": "5432"
        }
      ]
    }
  ]
}
```

### Step 3: IAM Roles and Policies

#### Task Execution Role
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
```

#### Task Role
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds-db:connect"
      ],
      "Resource": "arn:aws:rds-db:region:account:dbuser:db-cluster-id/bastion-user"
    }
  ]
}
```

### Step 4: Security Groups Configuration

#### ECS Security Group
```bash
# Allow outbound to RDS
aws ec2 authorize-security-group-egress \
  --group-id sg-ecs-bastion \
  --protocol tcp \
  --port 5432 \
  --source-group sg-rds-database
```

#### RDS Security Group
```bash
# Allow inbound from ECS
aws ec2 authorize-security-group-ingress \
  --group-id sg-rds-database \
  --protocol tcp \
  --port 5432 \
  --source-group sg-ecs-bastion
```

## Using AWS CLI for Port Forwarding

### Start the Bastion Task

```bash
#!/bin/bash

# Start ECS task
TASK_ARN=$(aws ecs run-task \
  --cluster my-cluster \
  --task-definition database-bastion \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-ecs-bastion],assignPublicIp=ENABLED}" \
  --query 'tasks[0].taskArn' \
  --output text)

echo "Started task: $TASK_ARN"

# Wait for task to be running
aws ecs wait tasks-running \
  --cluster my-cluster \
  --tasks $TASK_ARN

echo "Task is now running"
```

### Execute Port Forwarding

```bash
#!/bin/bash

# Get task details
TASK_ID=$(echo $TASK_ARN | cut -d'/' -f3)

# Start port forwarding session
aws ecs execute-command \
  --cluster my-cluster \
  --task $TASK_ARN \
  --container bastion \
  --interactive \
  --command "/bin/sh"
```

### Alternative: SSM Session Manager

Enable ECS Exec for more secure access:

```bash
# Update service to enable execute command
aws ecs update-service \
  --cluster my-cluster \
  --service bastion-service \
  --enable-execute-command

# Start session with port forwarding
aws ssm start-session \
  --target ecs:my-cluster_$TASK_ID_bastion \
  --document-name AWS-StartPortForwardingSession \
  --parameters '{"portNumber":["5432"],"localPortNumber":["5432"]}'
```

## Automation Scripts

### Python Script for Automated Bastion

```python
import boto3
import time
import subprocess
import sys

class ECSBastion:
    def __init__(self, cluster_name, task_definition):
        self.ecs = boto3.client('ecs')
        self.cluster_name = cluster_name
        self.task_definition = task_definition
        self.task_arn = None
    
    def start_task(self):
        """Start the bastion ECS task"""
        response = self.ecs.run_task(
            cluster=self.cluster_name,
            taskDefinition=self.task_definition,
            launchType='FARGATE',
            networkConfiguration={
                'awsvpcConfiguration': {
                    'subnets': ['subnet-xxx'],
                    'securityGroups': ['sg-ecs-bastion'],
                    'assignPublicIp': 'ENABLED'
                }
            }
        )
        
        self.task_arn = response['tasks'][0]['taskArn']
        print(f"Started task: {self.task_arn}")
        
        # Wait for task to be running
        waiter = self.ecs.get_waiter('tasks_running')
        waiter.wait(
            cluster=self.cluster_name,
            tasks=[self.task_arn]
        )
        print("Task is running")
    
    def port_forward(self, local_port, remote_port):
        """Start port forwarding session"""
        task_id = self.task_arn.split('/')[-1]
        
        cmd = [
            'aws', 'ecs', 'execute-command',
            '--cluster', self.cluster_name,
            '--task', self.task_arn,
            '--container', 'bastion',
            '--interactive',
            '--command', f'socat TCP-LISTEN:{remote_port},fork TCP:$DB_HOST:$DB_PORT'
        ]
        
        subprocess.run(cmd)
    
    def stop_task(self):
        """Stop the bastion task"""
        if self.task_arn:
            self.ecs.stop_task(
                cluster=self.cluster_name,
                task=self.task_arn
            )
            print("Task stopped")

# Usage
if __name__ == "__main__":
    bastion = ECSBastion('my-cluster', 'database-bastion')
    
    try:
        bastion.start_task()
        bastion.port_forward(5432, 5432)
    except KeyboardInterrupt:
        print("\nStopping bastion...")
    finally:
        bastion.stop_task()
```

### Shell Script Wrapper

```bash
#!/bin/bash

# bastion.sh - ECS Fargate Bastion Helper

set -e

CLUSTER_NAME="my-cluster"
TASK_DEFINITION="database-bastion"
LOCAL_PORT="5432"
REMOTE_PORT="5432"

usage() {
    echo "Usage: $0 [start|stop|connect|status]"
    echo "  start   - Start bastion task"
    echo "  stop    - Stop bastion task"
    echo "  connect - Connect to database through bastion"
    echo "  status  - Show bastion task status"
    exit 1
}

start_bastion() {
    echo "Starting bastion task..."
    
    TASK_ARN=$(aws ecs run-task \
        --cluster $CLUSTER_NAME \
        --task-definition $TASK_DEFINITION \
        --launch-type FARGATE \
        --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-ecs-bastion],assignPublicIp=ENABLED}" \
        --query 'tasks[0].taskArn' \
        --output text)
    
    echo $TASK_ARN > /tmp/bastion-task-arn
    
    echo "Waiting for task to start..."
    aws ecs wait tasks-running \
        --cluster $CLUSTER_NAME \
        --tasks $TASK_ARN
    
    echo "Bastion is ready!"
}

stop_bastion() {
    if [ -f /tmp/bastion-task-arn ]; then
        TASK_ARN=$(cat /tmp/bastion-task-arn)
        echo "Stopping bastion task..."
        aws ecs stop-task \
            --cluster $CLUSTER_NAME \
            --task $TASK_ARN
        rm -f /tmp/bastion-task-arn
        echo "Bastion stopped"
    else
        echo "No bastion task found"
    fi
}

connect_database() {
    if [ ! -f /tmp/bastion-task-arn ]; then
        echo "No bastion task running. Start it first."
        exit 1
    fi
    
    TASK_ARN=$(cat /tmp/bastion-task-arn)
    
    echo "Connecting to database through bastion..."
    aws ecs execute-command \
        --cluster $CLUSTER_NAME \
        --task $TASK_ARN \
        --container bastion \
        --interactive \
        --command "psql -h \$DB_HOST -p \$DB_PORT -U postgres"
}

show_status() {
    if [ -f /tmp/bastion-task-arn ]; then
        TASK_ARN=$(cat /tmp/bastion-task-arn)
        aws ecs describe-tasks \
            --cluster $CLUSTER_NAME \
            --tasks $TASK_ARN \
            --query 'tasks[0].lastStatus' \
            --output text
    else
        echo "No bastion task running"
    fi
}

case "$1" in
    start)
        start_bastion
        ;;
    stop)
        stop_bastion
        ;;
    connect)
        connect_database
        ;;
    status)
        show_status
        ;;
    *)
        usage
        ;;
esac
```

## Advanced Features

### Multi-Database Support

```yaml
# docker-compose.yml for local development
version: '3.8'
services:
  postgres-bastion:
    build: .
    environment:
      - DB_TYPE=postgresql
      - DB_HOST=postgres.cluster-xxx.rds.amazonaws.com
      - DB_PORT=5432
    ports:
      - "5432:5432"
  
  mysql-bastion:
    build: .
    environment:
      - DB_TYPE=mysql
      - DB_HOST=mysql.cluster-yyy.rds.amazonaws.com
      - DB_PORT=3306
    ports:
      - "3306:3306"
```

### Connection Pooling

```python
# connection_pool.py
import psycopg2.pool
import os

class DatabasePool:
    def __init__(self):
        self.pool = psycopg2.pool.ThreadedConnectionPool(
            minconn=1,
            maxconn=10,
            host=os.environ['DB_HOST'],
            port=os.environ['DB_PORT'],
            database=os.environ['DB_NAME'],
            user=os.environ['DB_USER'],
            password=os.environ['DB_PASSWORD']
        )
    
    def get_connection(self):
        return self.pool.getconn()
    
    def put_connection(self, conn):
        self.pool.putconn(conn)
```

## Security Best Practices

### Network Security
- Use private subnets for ECS tasks when possible
- Implement least-privilege security groups
- Enable VPC Flow Logs for monitoring
- Use AWS PrivateLink for service connections

### Access Control
- Use IAM roles instead of hardcoded credentials
- Implement database user authentication
- Enable CloudTrail for audit logging
- Rotate credentials regularly

### Monitoring
```python
# monitoring.py
import boto3
import json

def create_cloudwatch_alarm():
    cloudwatch = boto3.client('cloudwatch')
    
    cloudwatch.put_metric_alarm(
        AlarmName='ECS-Bastion-HighConnections',
        ComparisonOperator='GreaterThanThreshold',
        EvaluationPeriods=2,
        MetricName='ActiveConnections',
        Namespace='ECS/Bastion',
        Period=300,
        Statistic='Average',
        Threshold=50.0,
        ActionsEnabled=True,
        AlarmActions=[
            'arn:aws:sns:region:account:bastion-alerts'
        ],
        AlarmDescription='High number of bastion connections'
    )
```

## Cost Optimization

### Fargate Spot
```json
{
  "capacityProviders": ["FARGATE_SPOT"],
  "defaultCapacityProviderStrategy": [
    {
      "capacityProvider": "FARGATE_SPOT",
      "weight": 1
    }
  ]
}
```

### Scheduled Scaling
```python
# scheduled_bastion.py
import boto3
from datetime import datetime, time

def should_run_bastion():
    """Only run bastion during business hours"""
    now = datetime.now().time()
    business_start = time(9, 0)  # 9 AM
    business_end = time(18, 0)   # 6 PM
    
    return business_start <= now <= business_end

def lambda_handler(event, context):
    if should_run_bastion():
        # Start bastion task
        pass
    else:
        # Stop bastion task
        pass
```

## Conclusion

Using ECS containers as database bastions provides a modern, cost-effective alternative to traditional bastion hosts. Key benefits include:

- **Cost Efficiency:** Pay only when running
- **No Maintenance:** Fully managed infrastructure
- **Security:** Isolated containers with least-privilege access
- **Scalability:** Multiple bastions for different databases
- **Automation:** Easy to script and integrate into workflows

This approach is particularly valuable for development teams that need occasional database access without the overhead of maintaining dedicated bastion infrastructure.

Ready to implement secure database access with ECS bastions? [Contact TerraCloud](../../../../../index.html) for expert guidance on modern cloud security patterns!
