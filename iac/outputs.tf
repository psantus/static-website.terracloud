output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.static_website.bucket
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.static_website.arn
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.static_website.id
}

output "cloudfront_distribution_arn" {
  description = "ARN of the CloudFront distribution"
  value       = aws_cloudfront_distribution.static_website.arn
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.static_website.domain_name
}

output "website_url" {
  description = "URL of the website"
  value       = "https://${local.full_domain_name}"
}

output "acm_certificate_arn" {
  description = "ARN of the ACM certificate"
  value       = aws_acm_certificate.static_website.arn
}

output "domain" {
  description = "Root domain name"
  value       = var.domain
}

output "subdomain" {
  description = "Subdomain"
  value       = var.subdomain
}

output "full_domain_name" {
  description = "Full domain name (subdomain.domain)"
  value       = local.full_domain_name
}

output "route53_zone_id" {
  description = "Route53 hosted zone ID"
  value       = data.aws_route53_zone.main.zone_id
}

# Contact form outputs
output "contact_form_lambda_url" {
  description = "URL of the contact form Lambda function"
  value       = aws_lambda_function_url.contact_form_url.function_url
}

output "sns_topic_arn" {
  description = "ARN of the SNS topic for contact form notifications"
  value       = aws_sns_topic.contact_form_notifications.arn
}

# Build and deployment tracking outputs
output "build_timestamp" {
  description = "Timestamp of the last build"
  value       = null_resource.build_react_app_with_env.triggers.timestamp
}

output "deployed_files_count" {
  description = "Number of files deployed to S3"
  value       = length(keys(aws_s3_object.static_website_files))
}

output "deployment_info" {
  description = "Deployment information"
  value = {
    build_completed    = null_resource.build_react_app_with_env.id != null
    files_deployed     = length(keys(aws_s3_object.static_website_files))
    last_build_time    = null_resource.build_react_app_with_env.triggers.timestamp
    cloudfront_domain  = aws_cloudfront_distribution.static_website.domain_name
    website_url        = "https://${local.full_domain_name}"
    contact_form_url   = aws_lambda_function_url.contact_form_url.function_url
    sns_topic_arn      = aws_sns_topic.contact_form_notifications.arn
  }
}
