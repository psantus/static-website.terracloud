# Build the React application with environment variables
resource "null_resource" "build_react_app_with_env" {
  # Trigger rebuild when source files change or Lambda URL changes
  triggers = {
    package_json = filemd5("../static-website/package.json")
    package_lock = filemd5("../static-website/package-lock.json")
    src_hash     = sha256(join("", [for f in fileset("../static-website/src", "**/*") : filemd5("../static-website/src/${f}")]))
    public_hash  = sha256(join("", [for f in fileset("../static-website/public", "**/*") : filemd5("../static-website/public/${f}")]))
    config_files = sha256(join("", [
      filemd5("../static-website/vite.config.ts"),
      filemd5("../static-website/tsconfig.json"),
      filemd5("../static-website/tailwind.config.js"),
      filemd5("../static-website/postcss.config.js")
    ]))
    lambda_url = aws_lambda_function_url.contact_form_url.function_url
    timestamp  = timestamp()
  }

  # Install dependencies and build the app with environment variables
  provisioner "local-exec" {
    command = <<-EOT
      set -e
      echo "Starting build process with environment variables..."
      cd ../static-website
      
      # Clean previous build more thoroughly
      rm -rf dist
      find . -name "dist" -type d -exec rm -rf {} + 2>/dev/null || true
      
      # Fix Vite corruption by cleaning and reinstalling dependencies
      echo "Cleaning and reinstalling dependencies to fix Vite corruption..."
      rm -rf node_modules
      rm -f package-lock.json
      npm install
      
      # Create .env.production file with environment variables
      echo "VITE_CONTACT_FORM_URL=${aws_lambda_function_url.contact_form_url.function_url}" > .env.production
      echo "VITE_BASE_URL=https://web.terracloud.fr" >> .env.production
      
      # Build the application with all optimizations
      echo "Building application with optimizations..."
      npm run build
      
      # Verify build output
      if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
        echo "Error: Build failed or dist directory is empty"
        exit 1
      fi
      
      echo "Build completed successfully with optimizations"
      echo "Pre-rendered routes:"
      find dist -name "index.html" | head -10
      echo "Total files built:"
      find dist -type f | wc -l
      
      # Clean up environment file
      rm -f .env.production
    EOT
  }

  # Clean up build directory on destroy
  provisioner "local-exec" {
    when    = destroy
    command = <<-EOT
      echo "Cleaning up build directory..."
      rm -rf ../static-website/dist
      rm -f ../static-website/.env.production
    EOT
  }

  depends_on = [aws_lambda_function_url.contact_form_url]
}
