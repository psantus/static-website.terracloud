# IAM role for the contact form Lambda function
resource "aws_iam_role" "contact_form_lambda_role" {
  name = "${var.project_name}-${var.environment}-contact-form-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = local.common_tags
}

# Policy to allow Lambda to publish to SNS
resource "aws_iam_policy" "contact_form_sns_publish" {
  name        = "${var.project_name}-${var.environment}-contact-form-sns-publish"
  description = "Allows Lambda to publish messages to the contact form SNS topic"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "sns:Publish"
        ]
        Resource = aws_sns_topic.contact_form_notifications.arn
      }
    ]
  })

  tags = local.common_tags
}

# Attach the SNS publish policy to the Lambda role
resource "aws_iam_role_policy_attachment" "contact_form_sns_publish" {
  role       = aws_iam_role.contact_form_lambda_role.name
  policy_arn = aws_iam_policy.contact_form_sns_publish.arn
}

# Attach the basic Lambda execution role
resource "aws_iam_role_policy_attachment" "contact_form_lambda_basic" {
  role       = aws_iam_role.contact_form_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
