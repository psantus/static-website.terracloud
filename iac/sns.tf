# SNS Topic for contact form notifications
resource "aws_sns_topic" "contact_form_notifications" {
  name = "${var.project_name}-${var.environment}-contact-form-notifications"

  tags = local.common_tags
}

# SNS Topic subscription for email notifications
resource "aws_sns_topic_subscription" "contact_form_email" {
  topic_arn = aws_sns_topic.contact_form_notifications.arn
  protocol  = "email"
  endpoint  = var.notification_email
}
