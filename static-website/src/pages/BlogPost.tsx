import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Calendar, Clock, Tag, ArrowLeft, User } from 'lucide-react'
import { getPostBySlug, calculateReadingTime, BlogPost as BlogPostType } from '../data/blogPosts'
import { loadMarkdownContent } from '../utils/markdownLoader'
import BackToTop from '../components/BackToTop'

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const [post, setPost] = useState<BlogPostType | undefined>(undefined)
  const [markdownContent, setMarkdownContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [actualReadingTime, setActualReadingTime] = useState<number | null>(null)
  
  // Helper function to create language-aware URLs
  const createUrl = (path: string) => {
    if (i18n.language === 'en') {
      return path === '/' ? '/en/' : `/en${path}`
    }
    return path
  }

  const generatePlaceholderContent = (title: string, excerpt: string) => {
    return `# ${title}

${excerpt}

## Introduction

Cet article a été migré depuis l'ancien site WordPress. Le contenu complet sera bientôt disponible.

## Contenu à venir

En attendant, vous pouvez consulter d'autres articles de notre blog ou nous contacter pour plus d'informations sur ce sujet.

---

*Article en cours de migration - TerraCloud*`
  }

  useEffect(() => {
    const loadPostData = async () => {
      if (!slug) {
        setLoading(false)
        return
      }

      try {
        const postData = await getPostBySlug(slug, i18n.language)
        setPost(postData)

        if (postData) {
          console.log(`Loading markdown for: ${postData.slug} in language: ${i18n.language}`)
          
          const content = await loadMarkdownContent(postData.slug, i18n.language)
          if (content) {
            console.log(`Loaded content for ${postData.slug}, length:`, content.length)
            setMarkdownContent(content)
            // Calculate actual reading time based on content
            setActualReadingTime(calculateReadingTime(content))
          } else {
            console.log(`No content found for ${postData.slug}, using placeholder`)
            const placeholder = generatePlaceholderContent(postData.title, postData.excerpt)
            setMarkdownContent(placeholder)
            setActualReadingTime(calculateReadingTime(placeholder))
          }
        }
      } catch (error) {
        console.error(`Error loading post data for ${slug}:`, error)
        if (post) {
          const placeholder = generatePlaceholderContent(post.title, post.excerpt)
          setMarkdownContent(placeholder)
          setActualReadingTime(calculateReadingTime(placeholder))
        }
      } finally {
        setLoading(false)
      }
    }

    loadPostData()
  }, [slug, i18n.language])

  const formatDate = (dateString: string) => {
    const locale = i18n.language === 'en' ? 'en-US' : 'fr-FR'
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      'tech': t('blog.categories.tech', 'Technique'),
      'opinion': t('blog.categories.opinion', 'Opinion'),
      'blog': t('blog.categories.blog', 'Blog')
    }
    return labels[category] || category
  }

  if (!post && !loading) {
    return <Navigate to={createUrl('/blog')} replace />
  }

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return <Navigate to={createUrl('/blog')} replace />
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - TerraCloud</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        {post.image && <meta property="og:image" content={post.image} />}
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={getCategoryLabel(post.category)} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        {/* Canonical URL - use provided canonical or default to current page */}
        <link 
          rel="canonical" 
          href={post.canonicalUrl || `${window.location.origin}${createUrl(`/blog/${post.slug}`)}`} 
        />
        {/* If there's a canonical URL different from current page, add alternate link */}
        {post.canonicalUrl && post.canonicalUrl !== `${window.location.origin}${createUrl(`/blog/${post.slug}`)}` && (
          <link 
            rel="alternate" 
            href={`${window.location.origin}${createUrl(`/blog/${post.slug}`)}`}
            hrefLang={i18n.language}
          />
        )}
      </Helmet>

      <div className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Back to Blog */}
            <div className="mb-8">
              <Link
                to={createUrl('/blog')}
                className="inline-flex items-center text-terracloud-orange hover:text-terracloud-blue transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('blog.backToBlog', 'Retour au blog')}
              </Link>
            </div>

            {/* Article Header */}
            <header className="mb-8">
              {/* Canonical URL Notice */}
              {post.canonicalUrl && post.canonicalUrl !== `${window.location.origin}${createUrl(`/blog/${post.slug}`)}` && (
                <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        {t('blog.canonicalNotice', 'Cet article a été publié originalement sur')} {' '}
                        <a 
                          href={post.canonicalUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium underline hover:text-blue-800"
                        >
                          {new URL(post.canonicalUrl).hostname}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Category Badge */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                  post.category === 'tech' ? 'bg-blue-100 text-blue-800' :
                  post.category === 'opinion' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {getCategoryLabel(post.category)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-terracloud-gray mb-6">
                {post.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(post.publishedAt)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {actualReadingTime || post.readingTime} {t('blog.readingTime', 'min de lecture')}
                </div>
              </div>

              {/* Featured Image */}
              {post.image && (
                <div className="mb-8">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 lg:h-96 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </header>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-gray-800">
              <div className="text-terracloud-dark">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Custom styling for code blocks - force dark theme
                    pre: ({ children }: { children?: React.ReactNode }) => (
                      <pre className="!bg-gray-900 !text-gray-100 p-4 rounded-lg overflow-x-auto border border-gray-700 font-mono text-sm leading-relaxed shadow-lg my-4 whitespace-pre">
                        {children}
                      </pre>
                    ),
                    code: ({ inline, className, children, ...props }: {
                      inline?: boolean;
                      className?: string;
                      children?: React.ReactNode;
                      [key: string]: any;
                    }) => {
                      // Check if this should be a code block based on content length or newlines
                      const codeContent = String(children).replace(/\n$/, '');
                      const isLongCode = codeContent.length > 50 || codeContent.includes('\n') || codeContent.includes('{');
                      
                      if (inline && !isLongCode) {
                        // Short inline code - light background, dark text
                        return (
                          <code className="!bg-gray-200 !text-gray-900 px-2 py-1 rounded text-sm font-mono border" {...props}>
                            {codeContent}
                          </code>
                        );
                      } else {
                        // Long code or code blocks - treat as block code
                        return (
                          <code className="!text-gray-100 font-mono block bg-gray-900 p-3 rounded my-2 overflow-x-auto whitespace-pre" {...props}>
                            {codeContent}
                          </code>
                        );
                      }
                    },
                    // Custom styling for links
                    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
                      <a
                        href={href}
                        className="text-terracloud-orange hover:text-terracloud-blue transition-colors"
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    ),
                    // Custom styling for headings
                    h1: ({ children }: { children?: React.ReactNode }) => (
                      <h1 className="text-3xl font-bold text-terracloud-dark mt-8 mb-4">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }: { children?: React.ReactNode }) => (
                      <h2 className="text-2xl font-bold text-terracloud-dark mt-6 mb-3">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }: { children?: React.ReactNode }) => (
                      <h3 className="text-xl font-bold text-terracloud-dark mt-4 mb-2">
                        {children}
                      </h3>
                    ),
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              </div>
            </article>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-terracloud-dark mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <Link
                  to={createUrl('/blog')}
                  className="inline-flex items-center text-terracloud-orange hover:text-terracloud-blue transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t('blog.backToBlog', 'Retour au blog')}
                </Link>
                
                <Link
                  to={createUrl('/nous-contacter')}
                  className="bg-terracloud-orange text-white px-6 py-2 rounded-lg hover:bg-terracloud-blue transition-colors"
                >
                  {t('common.contact', 'Contact')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BackToTop />
    </>
  )
}

export default BlogPost
