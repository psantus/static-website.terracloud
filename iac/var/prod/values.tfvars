# Copy this file to terraform.tfvars and customize the values

# AWS region where resources will be deployed
aws_region = "eu-west-1"

# Project name (used in resource naming)
project_name = "terracloud-website"

# Environment (dev, staging, prod)
environment = "prod"

# Domain configuration
domain = "terracloud.fr"
subdomain = "www"  # Changed from "web" to "www"

# Email address to receive contact form notifications
notification_email = "contact@terracloud.fr"