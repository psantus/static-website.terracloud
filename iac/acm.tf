# ACM Certificate
resource "aws_acm_certificate" "static_website" {
  provider          = aws.us-east-1
  domain_name       = local.full_domain_name
  validation_method = "DNS"

  tags = local.common_tags

  lifecycle {
    create_before_destroy = true
  }
}

# Certificate validation
resource "aws_acm_certificate_validation" "static_website" {
  provider        = aws.us-east-1
  certificate_arn = aws_acm_certificate.static_website.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]

  timeouts {
    create = "5m"
  }
}
