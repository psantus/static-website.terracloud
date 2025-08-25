import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Component to handle redirects from old WordPress URLs to new React Router URLs
 * This ensures SEO continuity and prevents 404 errors from indexed pages
 */
const RedirectHandler = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const path = location.pathname
    const search = location.search
    
    // Handle trailing slash redirects (WordPress style → React Router style)
    if (path.endsWith('/') && path.length > 1) {
      const newPath = path.slice(0, -1)
      navigate(newPath + search, { replace: true })
      return
    }

    // Handle specific WordPress URL patterns that might have changed
    const redirectMap: Record<string, string> = {
      // WordPress feed URLs → Blog
      '/feed': '/blog',
      '/feed/': '/blog',
      '/en/feed': '/en/blog',
      '/en/feed/': '/en/blog',
      
      // WordPress JSON API → Not needed, redirect to home
      '/wp-json': '/',
      '/wp-json/': '/',
      '/en/wp-json': '/en/',
      '/en/wp-json/': '/en/',
      
      // WordPress comments → Not supported, redirect to contact
      '/comments': '/nous-contacter',
      '/comments/': '/nous-contacter',
      '/en/comments': '/en/nous-contacter',
      '/en/comments/': '/en/nous-contacter',
      
      // WordPress content URLs → Home (if they exist)
      '/wp-content': '/',
      '/wp-content/': '/',
      
      // Handle any WordPress admin or system URLs
      '/wp-admin': '/',
      '/wp-admin/': '/',
      '/wp-login': '/',
      '/wp-login/': '/',
      
      // Handle blog pagination (WordPress style)
      '/blog/page/1': '/blog',
      '/blog/page/1/': '/blog',
      '/en/blog/page/1': '/en/blog',
      '/en/blog/page/1/': '/en/blog',
      
      // Handle category pages → Blog
      '/blog/category': '/blog',
      '/blog/category/': '/blog',
      '/en/blog/category': '/en/blog',
      '/en/blog/category/': '/en/blog',
      
      // Handle tag pages → Blog
      '/blog/tag': '/blog',
      '/blog/tag/': '/blog',
      '/en/blog/tag': '/en/blog',
      '/en/blog/tag/': '/en/blog',
    }

    // Check for exact matches first
    if (redirectMap[path]) {
      navigate(redirectMap[path] + search, { replace: true })
      return
    }

    // Handle pattern-based redirects
    
    // WordPress blog pagination: /blog/page/2, /blog/page/3, etc.
    if (path.match(/^\/blog\/page\/\d+\/?$/)) {
      navigate('/blog' + search, { replace: true })
      return
    }
    
    if (path.match(/^\/en\/blog\/page\/\d+\/?$/)) {
      navigate('/en/blog' + search, { replace: true })
      return
    }
    
    // WordPress category pages with specific categories
    if (path.match(/^\/blog\/category\/[^/]+\/?$/)) {
      navigate('/blog' + search, { replace: true })
      return
    }
    
    if (path.match(/^\/en\/blog\/category\/[^/]+\/?$/)) {
      navigate('/en/blog' + search, { replace: true })
      return
    }
    
    // WordPress tag pages with specific tags
    if (path.match(/^\/blog\/tag\/[^/]+\/?$/)) {
      navigate('/blog' + search, { replace: true })
      return
    }
    
    if (path.match(/^\/en\/blog\/tag\/[^/]+\/?$/)) {
      navigate('/en/blog' + search, { replace: true })
      return
    }
    
    // Handle WordPress year/month/date archives → Blog
    if (path.match(/^\/blog\/\d{4}\/?$/)) {
      navigate('/blog' + search, { replace: true })
      return
    }
    
    if (path.match(/^\/en\/blog\/\d{4}\/?$/)) {
      navigate('/en/blog' + search, { replace: true })
      return
    }
    
    // Handle WordPress year/month archives
    if (path.match(/^\/blog\/\d{4}\/\d{2}\/?$/)) {
      navigate('/blog' + search, { replace: true })
      return
    }
    
    if (path.match(/^\/en\/blog\/\d{4}\/\d{2}\/?$/)) {
      navigate('/en/blog' + search, { replace: true })
      return
    }
    
    // Handle WordPress author pages (if they existed)
    if (path.match(/^\/psantus\/?/) || path.match(/^\/author\/[^/]+\/?$/)) {
      navigate('/a-propos' + search, { replace: true })
      return
    }
    
    if (path.match(/^\/en\/psantus\/?/) || path.match(/^\/en\/author\/[^/]+\/?$/)) {
      navigate('/en/a-propos' + search, { replace: true })
      return
    }

  }, [location, navigate])

  return null // This component doesn't render anything
}

export default RedirectHandler
