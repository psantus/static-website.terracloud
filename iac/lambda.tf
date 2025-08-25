# Create a ZIP file with the Lambda function code
data "archive_file" "contact_form_lambda_zip" {
  type        = "zip"
  output_path = "${path.module}/contact_form_function.zip"
  
  source {
    content = templatefile("${path.module}/lambda_function.py", {
      sns_topic_arn = aws_sns_topic.contact_form_notifications.arn
    })
    filename = "lambda_function.py"
  }

  depends_on = [aws_sns_topic.contact_form_notifications]
}

# Lambda function for processing contact form submissions
resource "aws_lambda_function" "contact_form_function" {
  filename         = data.archive_file.contact_form_lambda_zip.output_path
  function_name    = "${var.project_name}-${var.environment}-contact-form-function"
  role            = aws_iam_role.contact_form_lambda_role.arn
  handler         = "lambda_function.lambda_handler"
  runtime         = "python3.12"
  timeout         = 30

  source_code_hash = data.archive_file.contact_form_lambda_zip.output_base64sha256

  environment {
    variables = {
      SNS_TOPIC_ARN = aws_sns_topic.contact_form_notifications.arn
    }
  }

  tags = local.common_tags

  depends_on = [
    aws_iam_role_policy_attachment.contact_form_lambda_basic,
    aws_iam_role_policy_attachment.contact_form_sns_publish,
  ]
}

# Create a function URL for the Lambda function
resource "aws_lambda_function_url" "contact_form_url" {
  function_name      = aws_lambda_function.contact_form_function.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = false
    allow_origins     = ["https://${var.subdomain}.${var.domain}"]
    allow_methods     = ["POST"]
    allow_headers     = ["content-type"]
    max_age          = 86400
  }
}
