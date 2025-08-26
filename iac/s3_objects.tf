# Upload built React app files to S3
resource "aws_s3_object" "static_website_files" {
  # Use fileset to get the files from the dist directory
  # The depends_on ensures this is evaluated after the build completes
  for_each = fileset("../static-website/dist", "**/*")
  
  bucket = aws_s3_bucket.static_website.bucket
  key    = each.value
  source = "../static-website/dist/${each.value}"
  etag   = filemd5("../static-website/dist/${each.value}")
  
  # Set appropriate content types based on file extensions
  content_type = lookup({
    "txt"    = "text/plain; charset=utf-8"
    "html"   = "text/html; charset=utf-8"
    "htm"    = "text/html; charset=utf-8"
    "xhtml"  = "application/xhtml+xml"
    "css"    = "text/css; charset=utf-8"
    "js"     = "application/javascript"
    "mjs"    = "application/javascript"
    "xml"    = "application/xml"
    "json"   = "application/json"
    "jsonld" = "application/ld+json"
    "gif"    = "image/gif"
    "jpeg"   = "image/jpeg"
    "jpg"    = "image/jpeg"
    "png"    = "image/png"
    "svg"    = "image/svg+xml"
    "webp"   = "image/webp"
    "weba"   = "audio/webm"
    "webm"   = "video/webm"
    "3gp"    = "video/3gpp"
    "3g2"    = "video/3gpp2"
    "pdf"    = "application/pdf"
    "swf"    = "application/x-shockwave-flash"
    "atom"   = "application/atom+xml"
    "rss"    = "application/rss+xml"
    "ico"    = "image/vnd.microsoft.icon"
    "jar"    = "application/java-archive"
    "ttf"    = "font/ttf"
    "otf"    = "font/otf"
    "eot"    = "application/vnd.ms-fontobject"
    "woff"   = "font/woff"
    "woff2"  = "font/woff2"
    "map"    = "application/json"
    "wasm"   = "application/wasm"
  }, split(".", each.value)[length(split(".", each.value)) - 1], "application/octet-stream")

  # Set cache control headers for better performance
  cache_control = lookup({
    "html" = "no-cache, no-store, must-revalidate"
    "htm"  = "no-cache, no-store, must-revalidate"
    "json" = "no-cache, no-store, must-revalidate"
  }, split(".", each.value)[length(split(".", each.value)) - 1], "public, max-age=31536000")

  lifecycle {
    create_before_destroy = true
  }

  # Ensure the build with environment variables completes before uploading files
  # This is the key dependency that ensures proper ordering
  depends_on = [data.external.build_react_app_with_env]

  tags = local.common_tags
}
