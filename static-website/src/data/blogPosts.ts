export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  updatedAt?: string
  category: 'tech' | 'opinion' | 'blog'
  tags: string[]
  image?: string
  readingTime: number
  canonicalUrl?: string // Optional canonical URL for SEO
}

interface BlogPostData {
  id: string
  title: string
  description: string
  date: string
  category: 'tech' | 'opinion' | 'blog'
  tags: string[]
  featuredImage: string
  slug: string
  canonicalUrl?: string // Optional canonical URL
}

interface BlogData {
  posts: BlogPostData[]
}

// Cache for loaded blog data
let blogDataCache: { [key: string]: BlogData } = {}

// Function to calculate reading time (average 200 words per minute)
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Function to load blog data from JSON files
async function loadBlogData(language: string = 'fr'): Promise<BlogData> {
  const cacheKey = language
  
  // Return cached data if available
  if (blogDataCache[cacheKey]) {
    return blogDataCache[cacheKey]
  }

  try {
    const response = await fetch(`/blog/posts-${language}.json`)
    if (!response.ok) {
      throw new Error(`Failed to load blog data for language: ${language}`)
    }
    
    const data: BlogData = await response.json()
    blogDataCache[cacheKey] = data
    return data
  } catch (error) {
    console.error('Error loading blog data:', error)
    // Return empty data as fallback
    return { posts: [] }
  }
}

// Convert BlogPostData to BlogPost format
function convertToBlogPost(postData: BlogPostData): BlogPost {
  return {
    id: postData.id,
    slug: postData.slug,
    title: postData.title,
    excerpt: postData.description,
    content: '', // Will be loaded dynamically when needed
    author: 'TerraCloud',
    publishedAt: postData.date,
    category: postData.category,
    tags: postData.tags,
    image: postData.featuredImage || undefined,
    readingTime: 5, // Default, will be calculated when content is loaded
    canonicalUrl: postData.canonicalUrl // Pass through canonical URL if provided
  }
}

// Get blog posts for a specific language
export async function getBlogPosts(language: string = 'fr'): Promise<BlogPost[]> {
  const data = await loadBlogData(language)
  return data.posts.map(convertToBlogPost)
}

// Legacy synchronous export for backward compatibility (will be empty initially)
export const blogPosts: BlogPost[] = []

// Function to get a blog post by slug
export async function getPostBySlug(slug: string, language: string = 'fr'): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts(language)
  return posts.find(post => post.slug === slug)
}

// Function to get all categories
export async function getAllCategories(language: string = 'fr'): Promise<string[]> {
  const posts = await getBlogPosts(language)
  return [...new Set(posts.map(post => post.category))]
}

// Function to get all tags
export async function getAllTags(language: string = 'fr'): Promise<string[]> {
  const posts = await getBlogPosts(language)
  return [...new Set(posts.flatMap(post => post.tags))].sort()
}

// Function to get posts by category
export async function getBlogPostsByCategory(category: string, language: string = 'fr'): Promise<BlogPost[]> {
  const posts = await getBlogPosts(language)
  return posts.filter(post => post.category === category)
}

// Function to get posts by tag
export async function getBlogPostsByTag(tag: string, language: string = 'fr'): Promise<BlogPost[]> {
  const posts = await getBlogPosts(language)
  return posts.filter(post => post.tags.includes(tag))
}

// Function to get recent posts
export async function getRecentBlogPosts(limit: number = 5, language: string = 'fr'): Promise<BlogPost[]> {
  const posts = await getBlogPosts(language)
  return posts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}
