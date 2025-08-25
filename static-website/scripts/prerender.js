import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Routes to pre-render
const routes = [
  '/',
  '/services',
  '/services/devops',
  '/services/cto-a-temps-partage-a-poitiers-freelance',
  '/services/demarrer-sur-le-cloud',
  '/services/architecte-solutions-aws',
  '/services/architecture-logicielle',
  '/services/migration-vers-aws',
  '/services/formation-aws',
  '/blog',
  '/a-propos',
  '/a-propos/ils-nous-font-confiance',
  '/nous-contacter',
  '/prendre-rendez-vous',
  '/mentions-legales',
  // English routes
  '/en/',
  '/en/services',
  '/en/services/devops',
  '/en/services/cto-a-temps-partage-a-poitiers-freelance',
  '/en/services/demarrer-sur-le-cloud',
  '/en/services/architecte-solutions-aws',
  '/en/services/architecture-logicielle',
  '/en/services/migration-vers-aws',
  '/en/services/formation-aws',
  '/en/blog',
  '/en/a-propos',
  '/en/a-propos/ils-nous-font-confiance',
  '/en/nous-contacter',
  '/en/prendre-rendez-vous',
  '/en/mentions-legales'
]

const distPath = path.resolve(__dirname, '../dist')
const templatePath = path.join(distPath, 'index.html')

// Read the built template
const template = fs.readFileSync(templatePath, 'utf-8')

async function prerenderRoute(route) {
  try {
    // For now, we'll create static HTML files with the template
    // This is a simplified approach - in a full SSR setup, you'd render the React components
    
    const routePath = route === '/' ? '/index.html' : `${route}/index.html`
    const fullPath = path.join(distPath, routePath)
    
    // Create directory if it doesn't exist
    const dir = path.dirname(fullPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    // For now, just copy the template - this ensures all routes have HTML files
    // In a full implementation, you'd render the React components server-side here
    let html = template
    
    // Add route-specific optimizations
    if (route.includes('/blog')) {
      html = html.replace('<title>', '<title>Blog - ')
    } else if (route.includes('/services')) {
      html = html.replace('<title>', '<title>Services - ')
    } else if (route.includes('/a-propos')) {
      html = html.replace('<title>', '<title>À propos - ')
    }
    
    fs.writeFileSync(fullPath, html)
    console.log(`✓ Pre-rendered: ${route}`)
  } catch (error) {
    console.error(`✗ Failed to pre-render ${route}:`, error.message)
  }
}

async function prerender() {
  console.log('Starting pre-rendering...')
  
  for (const route of routes) {
    await prerenderRoute(route)
  }
  
  console.log(`✓ Pre-rendered ${routes.length} routes`)
}

prerender().catch(console.error)
