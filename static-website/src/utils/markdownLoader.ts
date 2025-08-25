// Markdown loader utility for static blog posts with multilingual support
export async function loadMarkdownContent(slug: string, language: string = 'fr'): Promise<string> {
  try {
    // Try to load from the requested language folder first
    let response = await fetch(`/blog-posts/${language}/${slug}.md`)
    
    if (response.ok) {
      return await response.text()
    }
    
    // Fallback to the other language if the requested one doesn't exist
    const fallbackLanguage = language === 'fr' ? 'en' : 'fr'
    console.warn(`Blog post not found in ${language}, trying ${fallbackLanguage}: ${slug}`)
    
    response = await fetch(`/blog-posts/${fallbackLanguage}/${slug}.md`)
    if (response.ok) {
      return await response.text()
    }
    
    console.warn(`Could not load blog post in any language: ${slug}`)
    return ''
    
  } catch (error) {
    console.warn(`Error loading blog post ${slug}:`, error)
    return ''
  }
}

// Markdown content cache for performance (includes language in key)
const markdownCache = new Map<string, string>()

function getCacheKey(slug: string, language: string): string {
  return `${language}:${slug}`
}

export async function preloadMarkdownContent(slugs: string[], language: string = 'fr'): Promise<void> {
  const loadPromises = slugs.map(async (slug) => {
    const cacheKey = getCacheKey(slug, language)
    if (!markdownCache.has(cacheKey)) {
      const content = await loadMarkdownContent(slug, language)
      if (content) {
        markdownCache.set(cacheKey, content)
      }
    }
  })
  
  await Promise.all(loadPromises)
}

export function getCachedMarkdownContent(slug: string, language: string = 'fr'): string | null {
  const cacheKey = getCacheKey(slug, language)
  return markdownCache.get(cacheKey) || null
}

export function setCachedMarkdownContent(slug: string, content: string, language: string = 'fr'): void {
  const cacheKey = getCacheKey(slug, language)
  markdownCache.set(cacheKey, content)
}
