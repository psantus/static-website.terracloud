variable "aws_region" {
  description = "AWS region where resources will be deployed"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "static-website"
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "domain" {
  description = "Root domain name (e.g., example.com)"
  type        = string
}

variable "subdomain" {
  description = "Subdomain (e.g., www, app, blog)"
  type        = string
}
