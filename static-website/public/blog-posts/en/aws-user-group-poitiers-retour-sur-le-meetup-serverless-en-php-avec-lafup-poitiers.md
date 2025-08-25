# AWS User Group Poitiers: Recap of the Serverless PHP Meetup with AFUP Poitiers

Last month, the AWS User Group Poitiers organized a joint meetup with AFUP Poitiers focused on serverless PHP development. Here's a recap of this successful event that brought together cloud and PHP enthusiasts.

## Event Overview

The meetup attracted over 50 developers, architects, and tech enthusiasts from the Poitiers region and beyond. The collaboration between AWS User Group Poitiers and AFUP (Association Française des Utilisateurs de PHP) created a unique opportunity to explore how traditional PHP development can embrace serverless architectures.

## Key Presentations

### "PHP in the Serverless Era" by Paul Santus

The opening presentation explored how PHP, traditionally associated with server-based architectures, can thrive in serverless environments:

- **Bref Framework:** Introduction to the leading PHP serverless framework
- **AWS Lambda Layers:** Optimizing PHP runtime for Lambda
- **Performance Considerations:** Cold starts, memory optimization, and execution time
- **Real-world Examples:** Case studies from production deployments

### "Building a Serverless PHP API with AWS Lambda" - Live Demo

A hands-on demonstration showing:

```php
<?php
// Simple Lambda handler using Bref
require __DIR__ . '/vendor/autoload.php';

use Bref\Context\Context;
use Bref\Event\Http\HttpRequestEvent;
use Bref\Event\Http\HttpResponse;

return function (HttpRequestEvent $event, Context $context) {
    $method = $event->getMethod();
    $path = $event->getPath();
    
    // Simple routing
    if ($method === 'GET' && $path === '/users') {
        return new HttpResponse(
            json_encode(['users' => getUsersFromDynamoDB()]),
            ['Content-Type' => 'application/json']
        );
    }
    
    return new HttpResponse('Not Found', [], 404);
};

function getUsersFromDynamoDB() {
    $dynamodb = new Aws\DynamoDb\DynamoDbClient([
        'region' => 'eu-west-1',
        'version' => 'latest'
    ]);
    
    $result = $dynamodb->scan([
        'TableName' => 'Users'
    ]);
    
    return $result['Items'];
}
```

### "Serverless PHP: Performance and Cost Optimization"

This technical deep-dive covered:

- **Memory vs. CPU optimization** for PHP Lambda functions
- **Connection pooling** strategies for database access
- **Caching patterns** using ElastiCache and DynamoDB
- **Cost analysis** comparing traditional hosting vs. serverless

## Technical Highlights

### Bref Framework Deep Dive

The audience was particularly interested in Bref, the framework that makes PHP serverless possible:

```yaml
# serverless.yml configuration
service: php-serverless-api

provider:
  name: aws
  runtime: provided.al2
  region: eu-west-1

plugins:
  - ./vendor/bref/bref

functions:
  api:
    handler: index.php
    layers:
      - ${bref:layer.php-81-fpm}
    events:
      - httpApi: '*'
  
  worker:
    handler: worker.php
    layers:
      - ${bref:layer.php-81}
    events:
      - sqs:
          arn: !GetAtt Queue.Arn
```

### Performance Benchmarks

Live performance comparisons showed:

- **Cold start times:** 200-500ms for PHP Lambda functions
- **Warm execution:** Sub-50ms response times
- **Memory efficiency:** Optimal performance at 512MB-1GB
- **Cost comparison:** 60-80% cost reduction for variable workloads

## Community Discussions

### Q&A Session Highlights

**Q: How does PHP serverless compare to Node.js or Python?**
A: While PHP has slightly higher cold start times, the ecosystem maturity and developer familiarity often outweigh the performance differences for many use cases.

**Q: What about existing PHP applications?**
A: Migration strategies vary from lift-and-shift approaches using containers to gradual refactoring using the Strangler Fig pattern.

**Q: Database connections in serverless PHP?**
A: Connection pooling is crucial. Solutions include RDS Proxy, connection pooling libraries, and designing for stateless operations.

### Networking and Knowledge Sharing

The event fostered valuable connections between:
- Traditional PHP developers curious about cloud adoption
- Cloud architects looking to support PHP workloads
- Startups considering serverless-first approaches
- Enterprise teams evaluating modernization strategies

## Practical Workshops

### Hands-on Lab: Deploy Your First PHP Lambda

Participants worked through a guided lab:

1. **Setup:** Installing Bref and Serverless Framework
2. **Development:** Creating a simple PHP API
3. **Deployment:** Deploying to AWS Lambda
4. **Testing:** Load testing and monitoring
5. **Optimization:** Performance tuning and cost optimization

### Code Examples Shared

```php
// Event-driven processing example
<?php
use Bref\Event\Sqs\SqsEvent;
use Bref\Event\Sqs\SqsHandler;

class EmailProcessor extends SqsHandler
{
    public function handleSqs(SqsEvent $event, Context $context): void
    {
        foreach ($event->getRecords() as $record) {
            $message = json_decode($record->getBody(), true);
            
            // Process email sending
            $this->sendEmail($message);
        }
    }
    
    private function sendEmail(array $message): void
    {
        $ses = new Aws\Ses\SesClient([
            'region' => 'eu-west-1',
            'version' => 'latest'
        ]);
        
        $ses->sendEmail([
            'Source' => $message['from'],
            'Destination' => ['ToAddresses' => [$message['to']]],
            'Message' => [
                'Subject' => ['Data' => $message['subject']],
                'Body' => ['Text' => ['Data' => $message['body']]]
            ]
        ]);
    }
}

return new EmailProcessor();
```

## Key Takeaways

### For PHP Developers
- Serverless doesn't mean abandoning PHP
- Existing skills translate well to serverless architectures
- Focus on stateless design and efficient resource usage
- Consider gradual migration strategies

### For Cloud Architects
- PHP serverless is production-ready for many use cases
- Performance characteristics are acceptable for most applications
- Cost benefits are significant for variable workloads
- Ecosystem support continues to improve

### For Organizations
- Serverless PHP can reduce operational overhead
- Faster time-to-market for new features
- Better resource utilization and cost control
- Easier scaling for unpredictable workloads

## Future Meetups

Based on the positive feedback, future meetups will explore:

- **Advanced PHP serverless patterns**
- **Migration strategies for legacy applications**
- **Multi-cloud PHP deployments**
- **Serverless PHP for enterprise applications**

## Resources Shared

### Documentation and Guides
- [Bref Documentation](https://bref.sh/)
- [AWS Lambda PHP Runtime](https://docs.aws.amazon.com/lambda/latest/dg/lambda-php.html)
- [Serverless Framework PHP Guide](https://www.serverless.com/framework/docs/providers/aws/examples/hello-world/php/)

### Code Repositories
- [Meetup Demo Code](https://github.com/aws-user-group-poitiers/serverless-php-demo)
- [PHP Lambda Examples](https://github.com/brefphp/examples)
- [Performance Benchmarks](https://github.com/aws-user-group-poitiers/php-lambda-benchmarks)

## Community Impact

The meetup strengthened the local tech community by:
- Bridging the gap between traditional and cloud-native development
- Encouraging knowledge sharing between different technology communities
- Providing practical, hands-on learning opportunities
- Building lasting professional relationships

## Conclusion

The serverless PHP meetup demonstrated that the PHP community is actively embracing cloud-native architectures. The combination of mature frameworks like Bref, strong AWS integration, and growing community support makes serverless PHP a viable option for modern applications.

The collaboration between AWS User Group Poitiers and AFUP Poitiers proved highly successful, and we look forward to organizing more joint events that bring together different aspects of the tech community.

## Join Us

Interested in joining future AWS User Group Poitiers events? 

- Follow us on [LinkedIn](https://www.linkedin.com/company/aws-user-group-poitiers/)
- Join our [Meetup group](https://www.meetup.com/aws-user-group-poitiers/)
- Connect with [AFUP Poitiers](https://afup.org/association/antennes/poitiers)

Want to speak at a future event or suggest topics? [Contact TerraCloud](../../../../../index.html) to get involved in the local cloud community!
