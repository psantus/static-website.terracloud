import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Routes to pre-render with their expected content
const routes = [
  { path: '/', title: 'TerraCloud - Les deux pieds sur terre, la tête dans le Cloud' },
  { path: '/services', title: 'Services - TerraCloud' },
  { path: '/services/devops', title: 'DevOps & Automatisation - TerraCloud' },
  { path: '/services/architecte-solutions-aws', title: 'Architecte Solutions AWS - TerraCloud' },
  { path: '/services/migration-vers-aws', title: 'Migration vers AWS - TerraCloud' },
  { path: '/services/formation-aws', title: 'Formation AWS - TerraCloud' },
  { path: '/blog', title: 'Blog - TerraCloud' },
  { path: '/a-propos', title: 'À propos - TerraCloud' },
  { path: '/nous-contacter', title: 'Contact - TerraCloud' },
  { path: '/prendre-rendez-vous', title: 'Prendre rendez-vous - TerraCloud' }
]

const distPath = path.resolve(__dirname, '../dist')
const templatePath = path.join(distPath, 'index.html')

async function prerenderRoute(route) {
  try {
    // Read the template
    let html = fs.readFileSync(templatePath, 'utf-8')
    
    // Create route-specific optimizations
    const routePath = route.path === '/' ? '/index.html' : `${route.path}/index.html`
    const fullPath = path.join(distPath, routePath)
    
    // Create directory if it doesn't exist
    const dir = path.dirname(fullPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    // Inject route-specific meta data
    html = html.replace(
      /<title>.*?<\/title>/,
      `<title>${route.title}</title>`
    )
    
    // Add preload hints for route-specific resources
    const preloadHints = generatePreloadHints(route.path)
    html = html.replace(
      '</head>',
      `${preloadHints}\n</head>`
    )
    
    // Add structured data for better SEO
    const structuredData = generateStructuredData(route)
    html = html.replace(
      '</head>',
      `${structuredData}\n</head>`
    )
    
    fs.writeFileSync(fullPath, html)
    console.log(`✓ Pre-rendered: ${route.path}`)
  } catch (error) {
    console.error(`✗ Failed to pre-render ${route.path}:`, error.message)
  }
}

function generatePreloadHints(routePath) {
  const hints = []
  
  // Add route-specific preload hints
  if (routePath === '/') {
    hints.push('<link rel="preload" href="/paul-santus.jpg" as="image" type="image/jpeg">')
  }
  
  if (routePath.startsWith('/services')) {
    hints.push('<link rel="preload" href="/assets/icons-McOFLr9J.js" as="script">')
  }
  
  if (routePath.startsWith('/blog')) {
    hints.push('<link rel="preload" href="/assets/markdown-C8eUV7xn.js" as="script">')
  }
  
  return hints.join('\n    ')
}

function generateStructuredData(route) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TerraCloud",
    "url": "https://web.terracloud.fr",
    "logo": "https://web.terracloud.fr/logo-orange.png",
    "description": "TerraCloud accompagne ses clients dans toute la France sur des questions d'architecture logicielle, cloud AWS et devops.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR"
    }
  }
  
  let structuredData = baseData
  
  // Add route-specific structured data
  if (route.path.startsWith('/services')) {
    structuredData = {
      ...baseData,
      "@type": "ProfessionalService",
      "serviceType": "Cloud Computing Services"
    }
  }
  
  if (route.path.startsWith('/blog')) {
    structuredData = {
      ...baseData,
      "@type": "Blog",
      "blogPost": []
    }
  }
  
  return `<script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>`
}

async function prerender() {
  console.log('Starting advanced pre-rendering...')
  
  for (const route of routes) {
    await prerenderRoute(route)
  }
  
  // Create English versions
  for (const route of routes) {
    const enRoute = {
      ...route,
      path: route.path === '/' ? '/en/' : `/en${route.path}`,
      title: route.title.replace(' - TerraCloud', ' - TerraCloud (EN)')
    }
    await prerenderRoute(enRoute)
  }
  
  console.log(`✓ Pre-rendered ${routes.length * 2} routes (FR + EN)`)
}

prerender().catch(console.error)
