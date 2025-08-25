# Deploy a Simple Data Storage API with Very Little Code Using Amazon API Gateway and DynamoDB

Building a serverless data storage API doesn't require complex application servers or extensive code. This article shows how to create a fully functional REST API using only Amazon API Gateway and DynamoDB with minimal custom code.

## Architecture Overview

```
Client → API Gateway → DynamoDB
   ↓         ↓           ↓
HTTP     VTL Mapping   NoSQL
Request  Templates     Storage
```

## Benefits of This Approach

### Serverless and Scalable
- No servers to manage or provision
- Automatic scaling based on demand
- Pay only for requests processed

### Low Latency
- Direct integration eliminates Lambda cold starts
- DynamoDB provides single-digit millisecond latency
- Global distribution with API Gateway edge locations

### Cost Effective
- No compute costs for simple CRUD operations
- DynamoDB on-demand pricing
- API Gateway request-based pricing

## Setting Up DynamoDB

### Create the Table

```bash
aws dynamodb create-table \
  --table-name UserData \
  --attribute-definitions \
    AttributeName=userId,AttributeType=S \
    AttributeName=timestamp,AttributeType=N \
  --key-schema \
    AttributeName=userId,KeyType=HASH \
    AttributeName=timestamp,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES
```

### Table Structure

```json
{
  "userId": "user123",
  "timestamp": 1634567890,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {
      "theme": "dark",
      "notifications": true
    }
  },
  "ttl": 1735689600
}
```

## API Gateway Configuration

### Create REST API

```bash
# Create API
API_ID=$(aws apigateway create-rest-api \
  --name "UserDataAPI" \
  --description "Simple data storage API" \
  --query 'id' --output text)

# Get root resource ID
ROOT_ID=$(aws apigateway get-resources \
  --rest-api-id $API_ID \
  --query 'items[0].id' --output text)
```

### Create Resources and Methods

```bash
# Create /users resource
USERS_RESOURCE_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $ROOT_ID \
  --path-part "users" \
  --query 'id' --output text)

# Create /users/{userId} resource
USER_RESOURCE_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $USERS_RESOURCE_ID \
  --path-part "{userId}" \
  --query 'id' --output text)
```

## VTL Mapping Templates

### POST Method - Create Item

Request Mapping Template:
```vtl
{
  "TableName": "UserData",
  "Item": {
    "userId": {
      "S": "$input.params('userId')"
    },
    "timestamp": {
      "N": "$context.requestTimeEpoch"
    },
    "data": {
      "S": "$util.escapeJavaScript($input.body)"
    }
    #if($input.params('ttl'))
    ,"ttl": {
      "N": "$input.params('ttl')"
    }
    #end
  }
}
```

Response Mapping Template:
```vtl
#if($input.path('$.ConsumedCapacity'))
{
  "success": true,
  "userId": "$input.params('userId')",
  "timestamp": $context.requestTimeEpoch,
  "message": "Data stored successfully"
}
#else
{
  "success": false,
  "error": "Failed to store data"
}
#end
```

### GET Method - Retrieve Item

Request Mapping Template:
```vtl
{
  "TableName": "UserData",
  "Key": {
    "userId": {
      "S": "$input.params('userId')"
    }
    #if($input.params('timestamp'))
    ,"timestamp": {
      "N": "$input.params('timestamp')"
    }
    #end
  }
  #if(!$input.params('timestamp'))
  ,"ScanIndexForward": false,
  "Limit": 1
  #end
}
```

Response Mapping Template:
```vtl
#if($input.path('$.Item'))
{
  "userId": "$input.path('$.Item.userId.S')",
  "timestamp": $input.path('$.Item.timestamp.N'),
  "data": $util.parseJson($input.path('$.Item.data.S'))
  #if($input.path('$.Item.ttl'))
  ,"ttl": $input.path('$.Item.ttl.N')
  #end
}
#else
{
  "error": "Item not found"
}
#end
```

### PUT Method - Update Item

Request Mapping Template:
```vtl
{
  "TableName": "UserData",
  "Key": {
    "userId": {
      "S": "$input.params('userId')"
    },
    "timestamp": {
      "N": "$input.params('timestamp')"
    }
  },
  "UpdateExpression": "SET #data = :data, #updated = :updated",
  "ExpressionAttributeNames": {
    "#data": "data",
    "#updated": "lastUpdated"
  },
  "ExpressionAttributeValues": {
    ":data": {
      "S": "$util.escapeJavaScript($input.body)"
    },
    ":updated": {
      "N": "$context.requestTimeEpoch"
    }
  },
  "ReturnValues": "ALL_NEW"
}
```

### DELETE Method - Remove Item

Request Mapping Template:
```vtl
{
  "TableName": "UserData",
  "Key": {
    "userId": {
      "S": "$input.params('userId')"
    },
    "timestamp": {
      "N": "$input.params('timestamp')"
    }
  },
  "ReturnValues": "ALL_OLD"
}
```

## Advanced Features

### Query with Filters

Request Mapping Template for Query:
```vtl
{
  "TableName": "UserData",
  "KeyConditionExpression": "userId = :userId",
  "ExpressionAttributeValues": {
    ":userId": {
      "S": "$input.params('userId')"
    }
    #if($input.params('startTime'))
    ,":startTime": {
      "N": "$input.params('startTime')"
    }
    #end
    #if($input.params('endTime'))
    ,":endTime": {
      "N": "$input.params('endTime')"
    }
    #end
  }
  #if($input.params('startTime') && $input.params('endTime'))
  ,"KeyConditionExpression": "userId = :userId AND #timestamp BETWEEN :startTime AND :endTime",
  "ExpressionAttributeNames": {
    "#timestamp": "timestamp"
  }
  #elseif($input.params('startTime'))
  ,"KeyConditionExpression": "userId = :userId AND #timestamp >= :startTime",
  "ExpressionAttributeNames": {
    "#timestamp": "timestamp"
  }
  #end
  #if($input.params('limit'))
  ,"Limit": $input.params('limit')
  #end
  ,"ScanIndexForward": #if($input.params('order') == 'asc')true#{else}false#end
}
```

### Batch Operations

Request Mapping Template for Batch Write:
```vtl
{
  "RequestItems": {
    "UserData": [
      #foreach($item in $input.path('$.items'))
      {
        "PutRequest": {
          "Item": {
            "userId": {
              "S": "$item.userId"
            },
            "timestamp": {
              "N": "$context.requestTimeEpoch"
            },
            "data": {
              "S": "$util.escapeJavaScript($util.toJson($item.data))"
            }
          }
        }
      }#if($foreach.hasNext),#end
      #end
    ]
  }
}
```

## Error Handling

### Custom Error Responses

```vtl
#if($input.path('$.errorType') == 'ValidationException')
#set($context.responseOverride.status = 400)
{
  "error": "ValidationError",
  "message": "$input.path('$.errorMessage')"
}
#elseif($input.path('$.errorType') == 'ResourceNotFoundException')
#set($context.responseOverride.status = 404)
{
  "error": "NotFound",
  "message": "Resource not found"
}
#elseif($input.path('$.errorType') == 'ConditionalCheckFailedException')
#set($context.responseOverride.status = 409)
{
  "error": "ConflictError",
  "message": "Item already exists or condition not met"
}
#else
#set($context.responseOverride.status = 500)
{
  "error": "InternalError",
  "message": "An unexpected error occurred"
}
#end
```

## Security Implementation

### IAM Role for API Gateway

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:BatchWriteItem"
      ],
      "Resource": [
        "arn:aws:dynamodb:region:account:table/UserData",
        "arn:aws:dynamodb:region:account:table/UserData/index/*"
      ]
    }
  ]
}
```

### API Key and Usage Plans

```bash
# Create API key
API_KEY_ID=$(aws apigateway create-api-key \
  --name "UserDataAPIKey" \
  --description "API key for UserData API" \
  --enabled \
  --query 'id' --output text)

# Create usage plan
USAGE_PLAN_ID=$(aws apigateway create-usage-plan \
  --name "UserDataUsagePlan" \
  --description "Usage plan for UserData API" \
  --throttle burstLimit=100,rateLimit=50 \
  --quota limit=10000,period=DAY \
  --query 'id' --output text)

# Associate API key with usage plan
aws apigateway create-usage-plan-key \
  --usage-plan-id $USAGE_PLAN_ID \
  --key-id $API_KEY_ID \
  --key-type API_KEY
```

### Request Validation

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    }
  },
  "required": ["name", "email"],
  "additionalProperties": false
}
```

## CloudFormation Template

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Simple Data Storage API with API Gateway and DynamoDB'

Resources:
  UserDataTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: UserData
      AttributeDefinitions:
        - AttributeName: userId
          AttributeType: S
        - AttributeName: timestamp
          AttributeType: N
      KeySchema:
        - AttributeName: userId
          KeyType: HASH
        - AttributeName: timestamp
          KeyType: RANGE
      BillingMode: PAY_PER_REQUEST
      StreamSpecification:
        StreamViewType: NEW_AND_OLD_IMAGES
      TimeToLiveSpecification:
        AttributeName: ttl
        Enabled: true

  APIGatewayRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: apigateway.amazonaws.com
            Action: sts:AssumeRole
      Policies:
        - PolicyName: DynamoDBAccess
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:GetItem
                  - dynamodb:PutItem
                  - dynamodb:UpdateItem
                  - dynamodb:DeleteItem
                  - dynamodb:Query
                Resource: !GetAtt UserDataTable.Arn

  UserDataAPI:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: UserDataAPI
      Description: Simple data storage API
      EndpointConfiguration:
        Types:
          - REGIONAL

Outputs:
  APIEndpoint:
    Description: API Gateway endpoint URL
    Value: !Sub 'https://${UserDataAPI}.execute-api.${AWS::Region}.amazonaws.com/prod'
  
  TableName:
    Description: DynamoDB table name
    Value: !Ref UserDataTable
```

## Testing the API

### Using curl

```bash
# Create item
curl -X POST \
  https://api-id.execute-api.region.amazonaws.com/prod/users/user123 \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Get item
curl -X GET \
  https://api-id.execute-api.region.amazonaws.com/prod/users/user123 \
  -H "x-api-key: your-api-key"

# Update item
curl -X PUT \
  https://api-id.execute-api.region.amazonaws.com/prod/users/user123?timestamp=1634567890 \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{"name": "John Smith", "email": "john.smith@example.com"}'

# Delete item
curl -X DELETE \
  https://api-id.execute-api.region.amazonaws.com/prod/users/user123?timestamp=1634567890 \
  -H "x-api-key: your-api-key"
```

### JavaScript Client

```javascript
class UserDataAPI {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async createUser(userId, data) {
    const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async getUser(userId, timestamp = null) {
    const url = timestamp 
      ? `${this.baseUrl}/users/${userId}?timestamp=${timestamp}`
      : `${this.baseUrl}/users/${userId}`;
    
    const response = await fetch(url, {
      headers: {
        'x-api-key': this.apiKey
      }
    });
    return response.json();
  }

  async updateUser(userId, timestamp, data) {
    const response = await fetch(`${this.baseUrl}/users/${userId}?timestamp=${timestamp}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async deleteUser(userId, timestamp) {
    const response = await fetch(`${this.baseUrl}/users/${userId}?timestamp=${timestamp}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': this.apiKey
      }
    });
    return response.json();
  }
}
```

## Monitoring and Optimization

### CloudWatch Metrics

```bash
# Create custom dashboard
aws cloudwatch put-dashboard \
  --dashboard-name "UserDataAPI" \
  --dashboard-body '{
    "widgets": [
      {
        "type": "metric",
        "properties": {
          "metrics": [
            ["AWS/ApiGateway", "Count", "ApiName", "UserDataAPI"],
            [".", "Latency", ".", "."],
            [".", "4XXError", ".", "."],
            [".", "5XXError", ".", "."]
          ],
          "period": 300,
          "stat": "Sum",
          "region": "us-east-1",
          "title": "API Gateway Metrics"
        }
      }
    ]
  }'
```

### Performance Optimization

1. **Enable Caching:** Use API Gateway caching for frequently accessed data
2. **DynamoDB Optimization:** Use appropriate partition keys and avoid hot partitions
3. **Request Validation:** Validate requests at the API Gateway level
4. **Compression:** Enable response compression for large payloads

## Conclusion

This serverless approach to building a data storage API offers several advantages:

- **Minimal Code:** No Lambda functions required for basic CRUD operations
- **High Performance:** Direct DynamoDB integration eliminates cold starts
- **Cost Effective:** Pay only for actual usage
- **Scalable:** Automatic scaling without configuration
- **Secure:** Built-in authentication and authorization

While this approach works well for simple CRUD operations, consider adding Lambda functions for complex business logic, data validation, or integration with external systems.

Ready to build serverless APIs with minimal code? [Contact TerraCloud](../../../../../index.html) for expert guidance on serverless architecture patterns!
