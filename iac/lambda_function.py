import json
import boto3
import os
from datetime import datetime

def lambda_handler(event, context):
    # Set basic headers (CORS is handled by Lambda Function URL)
    headers = {
        'Content-Type': 'application/json'
    }
    
    # Handle preflight OPTIONS request
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'CORS preflight'})
        }
    
    try:
        # Parse the form data from the request
        if 'body' not in event:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'No request body provided'})
            }
            
        body = json.loads(event['body'])
        name = body.get('name', '').strip()
        email = body.get('email', '').strip()
        message = body.get('message', '').strip()

        # Validate that all required fields are present
        if not all([name, email, message]):
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Missing required fields: name, email, and message are all required'})
            }

        # Basic email validation
        if '@' not in email or '.' not in email:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Invalid email address format'})
            }

        # Get current timestamp
        timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')

        # Format the notification message
        notification_message = f"""New Contact Form Submission - {timestamp}

Name: {name}
Email: {email}

Message:
{message}

---
This message was sent from the contact form on www.terracloud.fr"""

        # Send notification via SNS
        sns = boto3.client('sns')
        
        # Get SNS topic ARN from environment variable
        topic_arn = os.environ.get('SNS_TOPIC_ARN', '${sns_topic_arn}')
        
        response = sns.publish(
            TopicArn=topic_arn,
            Subject=f'Contact Form: Message from {name}',
            Message=notification_message
        )

        # Log the SNS response for debugging
        print(f"SNS publish response: {response}")

        # Return success response
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'message': 'Message sent successfully! Thank you for reaching out.',
                'timestamp': timestamp
            })
        }

    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Invalid JSON in request body'})
        }
    except Exception as e:
        # Log the error for debugging
        print(f"Error processing contact form: {str(e)}")
        
        # Return error response if anything goes wrong
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Failed to send message. Please try again later.'})
        }
