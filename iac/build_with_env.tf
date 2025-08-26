# Build the React application with environment variables at plan time
data "external" "build_react_app_with_env" {
  program = ["bash", "-c", <<-EOT
    set -e
    
    # Calculate hash of all source files to determine if build is needed
    SRC_HASH=$(find ../static-website/src -type f -exec md5sum {} \; 2>/dev/null | sort | md5sum | cut -d' ' -f1 || echo "no-src")
    PUBLIC_HASH=$(find ../static-website/public -type f -exec md5sum {} \; 2>/dev/null | sort | md5sum | cut -d' ' -f1 || echo "no-public")
    PKG_HASH=$(md5sum ../static-website/package.json 2>/dev/null | cut -d' ' -f1 || echo "no-pkg")
    CONFIG_HASH=$(md5sum ../static-website/vite.config.ts ../static-website/tsconfig.json ../static-website/tailwind.config.js ../static-website/postcss.config.js 2>/dev/null | sort | md5sum | cut -d' ' -f1 || echo "no-config")
    LAMBDA_URL="${aws_lambda_function_url.contact_form_url.function_url}"
    
    CURRENT_HASH="$${SRC_HASH}-$${PUBLIC_HASH}-$${PKG_HASH}-$${CONFIG_HASH}-$${LAMBDA_URL}"
    
    # Check if we need to rebuild
    LAST_HASH=""
    if [ -f "../static-website/.build-hash" ]; then
      LAST_HASH=$(cat ../static-website/.build-hash)
    fi
    
    if [ "$CURRENT_HASH" != "$LAST_HASH" ] || [ ! -d "../static-website/dist" ]; then
      echo "Build needed - hash changed or dist missing" >&2
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
      echo "VITE_CONTACT_FORM_URL=$${LAMBDA_URL}" > .env.production
      echo "VITE_BASE_URL=https://web.terracloud.fr" >> .env.production
      
      # Build the application
      echo "Building application..." >&2
      npm run build >&2
      
      # Verify build output
      if [ ! -d "dist" ] || [ -z "$(ls -A dist 2>/dev/null)" ]; then
        echo "Error: Build failed or dist directory is empty" >&2
        exit 1
      fi
      
      # Save the hash
      echo "$CURRENT_HASH" > .build-hash
      
      # Clean up environment file
      rm -f .env.production
      
      echo "Build completed successfully" >&2
    else
      echo "Build up to date - skipping" >&2
    fi
    
    # Return JSON with build info
    echo "{\"hash\":\"$CURRENT_HASH\",\"timestamp\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}"
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
      rm -f ../static-website/.build-hash
    EOT
  }
}
