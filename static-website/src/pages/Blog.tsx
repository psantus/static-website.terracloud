import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Calendar, Clock, Tag, Search } from 'lucide-react'
import { getBlogPosts, getAllTags, getAllCategories, BlogPost } from '../data/blogPosts'
import BackToTop from '../components/BackToTop'

const Blog = () => {
  const { t, i18n } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // Helper function to create language-aware URLs
  const createUrl = (path: string) => {
    if (i18n.language === 'en') {
      return path === '/' ? '/en/' : `/en${path}`
    }
    return path
  }

  // Load blog data when component mounts or language changes
  useEffect(() => {
    const loadBlogData = async () => {
      setLoading(true)
      try {
        const [posts, cats, tagList] = await Promise.all([
          getBlogPosts(i18n.language),
          getAllCategories(i18n.language),
          getAllTags(i18n.language)
        ])
        setBlogPosts(posts)
        setCategories(cats)
        setTags(tagList)
      } catch (error) {
        console.error('Error loading blog data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogData()
  }, [i18n.language])

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag)
    
    return matchesSearch && matchesCategory && matchesTag
  })

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

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracloud-orange mx-auto"></div>
            <p className="mt-4 text-terracloud-gray">{t('common.loading', 'Loading...')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{t('blog.title')}</title>
        <meta name="description" content={t('blog.description')} />
      </Helmet>

      <div className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-terracloud-dark mb-4">
              {t('blog.hero.title')}
            </h1>
            <p className="text-xl text-terracloud-gray max-w-3xl mx-auto">
              {t('blog.hero.description')}
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={t('blog.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracloud-orange focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracloud-orange focus:border-transparent"
              >
                <option value="all">{t('blog.filters.allCategories')}</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryLabel(category)}
                  </option>
                ))}
              </select>

              {/* Tag Filter */}
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracloud-orange focus:border-transparent"
              >
                <option value="all">{t('blog.filters.allTags')}</option>
                {tags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <article key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                {post.image && (
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                )}
                
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      post.category === 'tech' ? 'bg-blue-100 text-blue-800' :
                      post.category === 'opinion' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {getCategoryLabel(post.category)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-terracloud-dark mb-3 line-clamp-2">
                    <Link 
                      to={createUrl(`/blog/${post.slug}`)}
                      className="hover:text-terracloud-orange transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-terracloud-gray mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readingTime} {t('blog.readingTime')}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{post.tags.length - 3} {t('blog.moreTags')}
                      </span>
                    )}
                  </div>

                  {/* Read More */}
                  <Link
                    to={createUrl(`/blog/${post.slug}`)}
                    className="text-terracloud-orange hover:text-terracloud-blue transition-colors font-medium"
                  >
                    {t('blog.readMore')} →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-terracloud-gray">
                {t('blog.noResults')}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedTag('all')
                }}
                className="mt-4 text-terracloud-orange hover:text-terracloud-blue transition-colors"
              >
                {t('blog.resetFilters')}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <BackToTop />
    </>
  )
}

export default Blog
