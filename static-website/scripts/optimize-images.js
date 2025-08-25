import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicPath = path.resolve(__dirname, '../public')
const distPath = path.resolve(__dirname, '../dist')

// Image optimization configurations
const imageOptimizations = {
  'paul-santus.jpg': {
    sizes: [400, 800, 1200],
    formats: ['webp', 'jpg'],
    quality: 85
  },
  'logo-orange.png': {
    sizes: [32, 64, 128, 256],
    formats: ['webp', 'png'],
    quality: 90
  }
}

function generateResponsiveImageHTML(imageName, alt, className = '') {
  const config = imageOptimizations[imageName]
  if (!config) return `<img src="/${imageName}" alt="${alt}" class="${className}">`
  
  const baseName = imageName.split('.')[0]
  const webpSources = config.sizes.map(size => 
    `/${baseName}-${size}w.webp ${size}w`
  ).join(', ')
  
  const jpgSources = config.sizes.map(size => 
    `/${baseName}-${size}w.jpg ${size}w`
  ).join(', ')
  
  return `
    <picture>
      <source srcset="${webpSources}" type="image/webp" sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px">
      <source srcset="${jpgSources}" type="image/jpeg" sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px">
      <img src="/${imageName}" alt="${alt}" class="${className}" loading="lazy" decoding="async">
    </picture>
  `.trim()
}

function optimizeImagesInHTML() {
  console.log('Optimizing images in HTML files...')
  
  // Find all HTML files
  const htmlFiles = []
  
  function findHtmlFiles(dir) {
    const files = fs.readdirSync(dir)
    
    for (const file of files) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        findHtmlFiles(fullPath)
      } else if (file.endsWith('.html')) {
        htmlFiles.push(fullPath)
      }
    }
  }
  
  findHtmlFiles(distPath)
  
  // Process each HTML file
  for (const htmlFile of htmlFiles) {
    let html = fs.readFileSync(htmlFile, 'utf-8')
    let modified = false
    
    // Replace hero image with optimized version
    const heroImageRegex = /<img[^>]*src="\/paul-santus\.jpg"[^>]*>/g
    if (heroImageRegex.test(html)) {
      html = html.replace(heroImageRegex, (match) => {
        const altMatch = match.match(/alt="([^"]*)"/)
        const classMatch = match.match(/class="([^"]*)"/)
        const alt = altMatch ? altMatch[1] : 'Paul Santus'
        const className = classMatch ? classMatch[1] : ''
        
        return generateResponsiveImageHTML('paul-santus.jpg', alt, className)
      })
      modified = true
    }
    
    // Add fetchpriority="high" to LCP images
    html = html.replace(
      /<img([^>]*src="\/paul-santus\.jpg"[^>]*)>/g,
      '<img$1 fetchpriority="high">'
    )
    
    // Add loading="lazy" to non-critical images
    html = html.replace(
      /<img(?![^>]*loading=)([^>]*src="(?!\/paul-santus\.jpg|\/logo-orange)[^"]*"[^>]*)>/g,
      '<img$1 loading="lazy" decoding="async">'
    )
    
    if (modified) {
      fs.writeFileSync(htmlFile, html)
    }
  }
  
  console.log(`✓ Optimized images in ${htmlFiles.length} HTML files`)
}

// Generate image size variants (placeholder - in real implementation you'd use sharp or similar)
function generateImageVariants() {
  console.log('Note: Image variants should be generated using a tool like sharp or imagemin')
  console.log('For now, ensure you have optimized versions of your images in WebP format')
  
  // This is where you'd implement actual image resizing and format conversion
  // For example, using sharp:
  /*
  import sharp from 'sharp'
  
  for (const [imageName, config] of Object.entries(imageOptimizations)) {
    const inputPath = path.join(publicPath, imageName)
    const baseName = imageName.split('.')[0]
    
    for (const size of config.sizes) {
      for (const format of config.formats) {
        const outputPath = path.join(distPath, `${baseName}-${size}w.${format}`)
        await sharp(inputPath)
          .resize(size)
          .toFormat(format, { quality: config.quality })
          .toFile(outputPath)
      }
    }
  }
  */
}

optimizeImagesInHTML()
generateImageVariants()
