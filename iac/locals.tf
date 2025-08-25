locals {
  bucket_name      = "${var.project_name}-${var.environment}-static-website"
  full_domain_name = "${var.subdomain}.${var.domain}"
  
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
