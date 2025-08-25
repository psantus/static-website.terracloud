# CloudFront invalidation to clear cache when files are updated
resource "null_resource" "cloudfront_invalidation" {
  triggers = {
    always_run = timestamp()
  }

  provisioner "local-exec" {
    command = "aws cloudfront create-invalidation --distribution-id ${aws_cloudfront_distribution.static_website.id} --paths '/*'"
  }

  depends_on = [aws_s3_object.static_website_files]
}

# Note: No separate apex redirect invalidation needed since main distribution handles both domains
