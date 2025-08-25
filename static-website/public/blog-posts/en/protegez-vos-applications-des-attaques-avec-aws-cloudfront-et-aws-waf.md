# Protect Your Applications from Attacks with AWS CloudFront and AWS WAF

Web applications face constant threats from malicious actors. AWS CloudFront and AWS WAF provide a powerful combination to protect your applications from common attacks while improving performance and availability.

## Understanding the Threat Landscape

### Common Web Application Attacks

**SQL Injection:** Malicious SQL code inserted into application queries
**Cross-Site Scripting (XSS):** Injecting malicious scripts into web pages
**DDoS Attacks:** Overwhelming servers with traffic
**Bot Attacks:** Automated attacks from malicious bots
**OWASP Top 10:** The most critical web application security risks

### The Cost of Security Breaches

- **Financial Impact:** Average cost of a data breach is $4.45 million
- **Reputation Damage:** Loss of customer trust and brand value
- **Regulatory Fines:** GDPR, CCPA, and other compliance penalties
- **Operational Disruption:** Downtime and recovery costs

## AWS CloudFront: Your First Line of Defense

### What is CloudFront?

AWS CloudFront is a content delivery network (CDN) that distributes content globally through edge locations, providing both performance and security benefits.

### Security Benefits of CloudFront

**DDoS Protection:** Built-in protection against network and transport layer attacks
**Geographic Blocking:** Block traffic from specific countries or regions
**SSL/TLS Termination:** Encrypt traffic between users and your application
**Origin Shielding:** Hide your origin servers from direct access

### CloudFront Security Features

```json
{
  "Distribution": {
    "Origins": [{
      "DomainName": "example.com",
      "CustomOriginConfig": {
        "HTTPPort": 80,
        "HTTPSPort": 443,
        "OriginProtocolPolicy": "https-only"
      }
    }],
    "DefaultCacheBehavior": {
      "ViewerProtocolPolicy": "redirect-to-https",
      "TrustedSigners": {
        "Enabled": true,
        "Items": ["self"]
      }
    }
  }
}
```

## AWS WAF: Application Layer Protection

### What is AWS WAF?

AWS WAF is a web application firewall that helps protect web applications from common web exploits and bots.

### Key WAF Features

**Managed Rules:** Pre-configured rule sets for common threats
**Custom Rules:** Create rules specific to your application
**Rate Limiting:** Control request rates from individual IPs
**IP Reputation:** Block known malicious IP addresses
**Bot Control:** Identify and manage bot traffic

### WAF Rule Types

#### IP-based Rules
```json
{
  "Name": "BlockMaliciousIPs",
  "Priority": 1,
  "Statement": {
    "IPSetReferenceStatement": {
      "ARN": "arn:aws:wafv2:region:account:global/ipset/malicious-ips"
    }
  },
  "Action": {
    "Block": {}
  }
}
```

#### Geographic Rules
```json
{
  "Name": "BlockSpecificCountries",
  "Priority": 2,
  "Statement": {
    "GeoMatchStatement": {
      "CountryCodes": ["CN", "RU", "KP"]
    }
  },
  "Action": {
    "Block": {}
  }
}
```

#### Rate Limiting Rules
```json
{
  "Name": "RateLimitRule",
  "Priority": 3,
  "Statement": {
    "RateBasedStatement": {
      "Limit": 2000,
      "AggregateKeyType": "IP"
    }
  },
  "Action": {
    "Block": {}
  }
}
```

## Implementing CloudFront + WAF Protection

### Step 1: Create a WAF Web ACL

```bash
aws wafv2 create-web-acl \
  --name "MyApplicationWAF" \
  --scope CLOUDFRONT \
  --default-action Allow={} \
  --rules file://waf-rules.json \
  --region us-east-1
```

### Step 2: Configure CloudFront Distribution

```yaml
# CloudFormation template
Resources:
  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        WebACLId: !GetAtt WebACL.Arn
        Origins:
          - Id: MyOrigin
            DomainName: !GetAtt LoadBalancer.DNSName
            CustomOriginConfig:
              HTTPPort: 80
              HTTPSPort: 443
              OriginProtocolPolicy: https-only
        DefaultCacheBehavior:
          TargetOriginId: MyOrigin
          ViewerProtocolPolicy: redirect-to-https
          CachePolicyId: 4135ea2d-6df8-44a3-9df3-4b5a84be39ad
```

### Step 3: Configure Managed Rule Groups

```python
import boto3

wafv2 = boto3.client('wafv2', region_name='us-east-1')

# Add AWS Managed Core Rule Set
managed_rule = {
    'Name': 'AWSManagedRulesCommonRuleSet',
    'Priority': 1,
    'OverrideAction': {'None': {}},
    'Statement': {
        'ManagedRuleGroupStatement': {
            'VendorName': 'AWS',
            'Name': 'AWSManagedRulesCommonRuleSet'
        }
    },
    'VisibilityConfig': {
        'SampledRequestsEnabled': True,
        'CloudWatchMetricsEnabled': True,
        'MetricName': 'CommonRuleSetMetric'
    }
}
```

## Advanced Protection Strategies

### Bot Management

```json
{
  "Name": "BotControlRule",
  "Priority": 10,
  "Statement": {
    "ManagedRuleGroupStatement": {
      "VendorName": "AWS",
      "Name": "AWSManagedRulesBotControlRuleSet",
      "ManagedRuleGroupConfigs": [{
        "AWSManagedRulesBotControlRuleSet": {
          "InspectionLevel": "TARGETED"
        }
      }]
    }
  },
  "OverrideAction": {
    "None": {}
  }
}
```

### Custom Application Logic Protection

```python
# Custom rule for application-specific protection
def create_custom_rule():
    return {
        'Name': 'ProtectAdminPanel',
        'Priority': 5,
        'Statement': {
            'AndStatement': {
                'Statements': [
                    {
                        'ByteMatchStatement': {
                            'SearchString': '/admin',
                            'FieldToMatch': {'UriPath': {}},
                            'TextTransformations': [
                                {'Priority': 0, 'Type': 'LOWERCASE'}
                            ],
                            'PositionalConstraint': 'STARTS_WITH'
                        }
                    },
                    {
                        'NotStatement': {
                            'Statement': {
                                'IPSetReferenceStatement': {
                                    'ARN': 'arn:aws:wafv2:region:account:global/ipset/admin-whitelist'
                                }
                            }
                        }
                    }
                ]
            }
        },
        'Action': {'Block': {}}
    }
```

## Monitoring and Alerting

### CloudWatch Metrics

```python
import boto3

cloudwatch = boto3.client('cloudwatch')

# Create custom dashboard
dashboard_body = {
    "widgets": [
        {
            "type": "metric",
            "properties": {
                "metrics": [
                    ["AWS/WAFV2", "BlockedRequests", "WebACL", "MyApplicationWAF"],
                    [".", "AllowedRequests", ".", "."],
                    ["AWS/CloudFront", "Requests", "DistributionId", "E1234567890"]
                ],
                "period": 300,
                "stat": "Sum",
                "region": "us-east-1",
                "title": "WAF and CloudFront Metrics"
            }
        }
    ]
}

cloudwatch.put_dashboard(
    DashboardName='SecurityDashboard',
    DashboardBody=json.dumps(dashboard_body)
)
```

### Automated Response

```python
# Lambda function for automated response to attacks
import json
import boto3

def lambda_handler(event, context):
    wafv2 = boto3.client('wafv2')
    
    # Parse CloudWatch alarm
    message = json.loads(event['Records'][0]['Sns']['Message'])
    
    if message['NewStateValue'] == 'ALARM':
        # Increase rate limiting during attack
        update_rate_limit(wafv2, limit=500)
        
        # Add suspicious IPs to block list
        add_ips_to_blocklist(wafv2, get_suspicious_ips())
    
    return {'statusCode': 200}

def update_rate_limit(wafv2, limit):
    # Update rate limiting rule
    pass

def add_ips_to_blocklist(wafv2, ips):
    # Add IPs to IP set
    pass
```

## Performance Optimization

### Caching Strategies

```json
{
  "CacheBehaviors": [
    {
      "PathPattern": "/api/*",
      "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
      "OriginRequestPolicyId": "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf",
      "ViewerProtocolPolicy": "https-only"
    },
    {
      "PathPattern": "/static/*",
      "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
      "ViewerProtocolPolicy": "redirect-to-https"
    }
  ]
}
```

### Origin Shield

```yaml
Origins:
  - Id: MyOrigin
    DomainName: example.com
    OriginShield:
      Enabled: true
      OriginShieldRegion: us-east-1
```

## Cost Optimization

### WAF Pricing Considerations

- **Web ACL:** $1.00 per month per Web ACL
- **Rules:** $0.60 per month per rule
- **Requests:** $0.60 per million requests
- **Managed Rules:** Additional costs for AWS Managed Rules

### CloudFront Pricing

- **Data Transfer:** Varies by region and volume
- **Requests:** $0.0075 per 10,000 HTTP requests
- **SSL Certificates:** Free with AWS Certificate Manager

### Cost Optimization Tips

1. **Use appropriate cache policies** to reduce origin requests
2. **Implement efficient WAF rules** to minimize processing costs
3. **Monitor usage patterns** and adjust configurations
4. **Use Reserved Capacity** for predictable workloads

## Best Practices

### Security Best Practices

1. **Defense in Depth:** Use multiple layers of security
2. **Regular Updates:** Keep managed rules updated
3. **Monitoring:** Implement comprehensive logging and alerting
4. **Testing:** Regularly test your security configurations
5. **Incident Response:** Have a plan for security incidents

### Performance Best Practices

1. **Optimize Cache Policies:** Maximize cache hit ratios
2. **Compress Content:** Enable compression for text-based content
3. **Use HTTP/2:** Enable HTTP/2 for better performance
4. **Monitor Metrics:** Track performance and security metrics

## Conclusion

AWS CloudFront and AWS WAF provide a powerful, scalable solution for protecting web applications from attacks while improving performance. The combination offers:

- **Comprehensive Protection:** Against OWASP Top 10 and other threats
- **Global Scale:** Protection at AWS edge locations worldwide
- **Cost-Effective:** Pay-as-you-go pricing model
- **Easy Integration:** Simple setup with existing AWS services

By implementing these services correctly, you can significantly improve your application's security posture while providing better user experience through improved performance.

Ready to secure your web applications with AWS CloudFront and WAF? [Contact TerraCloud](../../../../../index.html) for expert guidance on implementing comprehensive web application security!
