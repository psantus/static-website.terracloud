# Data source to get the hosted zone
data "aws_route53_zone" "main" {
  name         = var.domain
  private_zone = false
}

# Route53 records for certificate validation
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.static_website.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.main.zone_id
}

# Route53 record pointing to CloudFront distribution
resource "aws_route53_record" "static_website" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = local.full_domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.static_website.domain_name
    zone_id                = aws_cloudfront_distribution.static_website.hosted_zone_id
    evaluate_target_health = false
  }
}
