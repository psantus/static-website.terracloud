# Build the React application with environment variables at plan time
data "external" "build_react_app_with_env" {
  program = ["bash", "-c", <<-EOT
    set -e
    
    echo "Starting build process..." >&2
    cd ../static-website
    
    # Clean previous build
    rm -rf dist
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ] || [ ! -f "package-lock.json" ]; then
      echo "Installing dependencies..." >&2
      rm -rf node_modules
      rm -f package-lock.json
      npm install >&2
    fi
    
    # Create .env.production file with environment variables
    LAMBDA_URL="${aws_lambda_function_url.contact_form_url.function_url}"
    echo "VITE_CONTACT_FORM_URL=$${LAMBDA_URL}" > .env.production
    echo "VITE_BASE_URL=https://${local.full_domain_name}" >> .env.production
    
    # Build the application
    echo "Building application..." >&2
    npm run build >&2
    
    # Verify build output
    if [ ! -d "dist" ] || [ -z "$(ls -A dist 2>/dev/null)" ]; then
      echo "Error: Build failed or dist directory is empty" >&2
      exit 1
    fi
    
    # Clean up environment file
    rm -f .env.production
    
    echo "Build completed successfully" >&2
    
    # Return JSON with build info
    echo "{\"status\":\"success\",\"timestamp\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}"
  EOT
  ]

  depends_on = [aws_lambda_function_url.contact_form_url]
}

# Create a null resource that depends on the build to handle cleanup
resource "null_resource" "build_cleanup" {
  # Clean up build directory on destroy
  provisioner "local-exec" {
    when    = destroy
    command = <<-EOT
      echo "Cleaning up build directory..."
      rm -rf ../static-website/dist
      rm -f ../static-website/.env.production
    EOT
  }
}
