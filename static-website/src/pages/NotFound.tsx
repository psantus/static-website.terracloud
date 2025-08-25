import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Home, ArrowLeft, Search } from 'lucide-react'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('notFound.title')}</title>
        <meta name="description" content={t('notFound.description')} />
      </Helmet>

      <div className="section-padding min-h-[60vh] flex items-center">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="text-8xl font-bold text-terracloud-orange/20 mb-4">404</div>
              <div className="w-32 h-32 bg-gradient-to-br from-terracloud-orange to-terracloud-blue rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold">
                ?
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
              {t('notFound.heading')}
            </h1>
            
            <p className="text-xl text-terracloud-gray mb-8">
              {t('notFound.message')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                to="/" 
                className="btn-primary inline-flex items-center justify-center"
              >
                <Home className="h-5 w-5 mr-2" />
                {t('notFound.backHome')}
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="btn-secondary inline-flex items-center justify-center"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                {t('notFound.previousPage')}
              </button>
            </div>

            {/* Helpful Links */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h2 className="text-xl font-semibold text-terracloud-dark mb-6">
                {t('notFound.suggestions.title')}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                  to="/services" 
                  className="text-terracloud-orange hover:text-terracloud-blue transition-colors font-medium"
                >
                  → {t('notFound.suggestions.services')}
                </Link>
                
                <Link 
                  to="/blog" 
                  className="text-terracloud-orange hover:text-terracloud-blue transition-colors font-medium"
                >
                  → {t('notFound.suggestions.blog')}
                </Link>
                
                <Link 
                  to="/a-propos" 
                  className="text-terracloud-orange hover:text-terracloud-blue transition-colors font-medium"
                >
                  → {t('notFound.suggestions.about')}
                </Link>
                
                <Link 
                  to="/nous-contacter" 
                  className="text-terracloud-orange hover:text-terracloud-blue transition-colors font-medium"
                >
                  → {t('notFound.suggestions.contact')}
                </Link>
              </div>
            </div>

            {/* Search Suggestion */}
            <div className="mt-8 text-terracloud-gray">
              <p className="mb-4">{t('notFound.help.question')}</p>
              <Link 
                to="/nous-contacter" 
                className="inline-flex items-center text-terracloud-orange hover:text-terracloud-blue transition-colors"
              >
                <Search className="h-4 w-4 mr-2" />
                {t('notFound.help.contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
