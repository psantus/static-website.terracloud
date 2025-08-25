# Copy this file to terraform.tfvars and customize the values

# AWS region where resources will be deployed
aws_region = "eu-west-1"

# Project name (used in resource naming)
project_name = "terracloud-website"

# Environment (dev, staging, prod)
environment = "prod"

# Optional: Domain name for the website
# Leave empty to use CloudFront default domain
domain = "terracloud.fr"
subdomain = "web"
