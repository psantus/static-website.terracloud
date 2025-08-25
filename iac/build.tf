# Build the React application
resource "null_resource" "build_react_app" {
  # Trigger rebuild when source files change
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
    # Add timestamp to ensure rebuild when needed
    timestamp = timestamp()
  }

  # Install dependencies and build the app
  provisioner "local-exec" {
    command = <<-EOT
      set -e
      echo "Starting build process..."
      cd ../static-website
      
      # Clean previous build
      rm -rf dist
      
      # Install dependencies
      echo "Installing dependencies..."
      npm ci
      
      # Build the application
      echo "Building application..."
      npm run build
      
      # Verify build output
      if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
        echo "Error: Build failed or dist directory is empty"
        exit 1
      fi
      
      echo "Build completed successfully"
      echo "Built files:"
      find dist -type f | head -10
    EOT
  }

  # Clean up build directory on destroy
  provisioner "local-exec" {
    when    = destroy
    command = <<-EOT
      echo "Cleaning up build directory..."
      rm -rf ../static-website/dist
    EOT
  }
}
