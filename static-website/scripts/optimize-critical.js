import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distPath = path.resolve(__dirname, '../dist')

// Critical CSS for above-the-fold content
const criticalCSS = `
/* Critical CSS for LCP optimization */
.container-custom {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
}

.section-padding {
  padding-top: 4rem;
  padding-bottom: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .section-padding {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .section-padding {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* Hero section critical styles */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-terracloud-blue {
  --tw-gradient-from: #0570b8;
  --tw-gradient-to: rgb(5 112 184 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.to-terracloud-orange {
  --tw-gradient-to: #cc5200;
}

.text-white {
  color: rgb(255 255 255);
}

.font-bold {
  font-weight: 700;
}

.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

@media (min-width: 1024px) {
  .lg\\:text-6xl {
    font-size: 3.75rem;
    line-height: 1;
  }
}

/* Button critical styles */
.btn-primary {
  background-color: #cc5200;
  color: rgb(255 255 255);
  font-weight: 500;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-radius: 0.5rem;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.btn-primary:hover {
  background-color: rgb(180 83 9);
}

/* Header critical styles */
header {
  background-color: rgb(255 255 255);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  position: sticky;
  top: 0;
  z-index: 50;
}

.h-16 {
  height: 4rem;
}

.h-8 {
  height: 2rem;
}

.w-auto {
  width: auto;
}

/* Grid critical styles */
.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .lg\\:col-span-3 {
    grid-column: span 3 / span 3;
  }
}

.gap-12 {
  gap: 3rem;
}

.items-center {
  align-items: center;
}

/* Font loading optimization */
@font-face {
  font-family: 'Outfit';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url('https://fonts.gstatic.com/s/outfit/v11/QGYvz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G8.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url('https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

body {
  font-family: 'Poppins', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Outfit', sans-serif;
}
`

function inlineCriticalCSS() {
  console.log('Inlining critical CSS...')
  
  // Find all HTML files in dist
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
    
    // Inline critical CSS
    html = html.replace(
      '</head>',
      `  <style>${criticalCSS}</style>\n</head>`
    )
    
    // Add resource hints for better performance
    const resourceHints = `
    <!-- Resource hints for better LCP -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    `
    
    html = html.replace(
      '<link rel="preconnect" href="https://fonts.googleapis.com">',
      resourceHints
    )
    
    fs.writeFileSync(htmlFile, html)
  }
  
  console.log(`✓ Inlined critical CSS in ${htmlFiles.length} HTML files`)
}

inlineCriticalCSS()
