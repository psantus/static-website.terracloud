import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Code, CheckCircle } from 'lucide-react'

const SoftwareArchitecture = () => {
  const { t, i18n } = useTranslation()

  // Helper function to create language-aware URLs
  const createUrl = (path: string) => {
    if (i18n.language === 'en') {
      return path === '/' ? '/en/' : `/en${path}`
    }
    return path
  }

  return (
    <>
      <Helmet>
        <title>{t('services.softwareArchitecture.title')} - TerraCloud</title>
        <meta name="description" content={t('services.softwareArchitecture.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <Code className="h-8 w-8" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                {t('services.softwareArchitecture.title')}
              </h1>
            </div>
            <p className="text-xl text-indigo-100 mb-8">
              {t('services.softwareArchitecture.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createUrl('/prendre-rendez-vous')} className="btn-primary bg-white text-indigo-600 hover:bg-gray-100">
                {t('services.hero.cta1')}
              </Link>
              <Link to={createUrl('/nous-contacter')} className="btn-secondary border-white text-white hover:bg-white hover:text-indigo-600">
                {t('services.hero.cta2')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
              {t('services.whatWeOffer')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(t('services.softwareArchitecture.features', { returnObjects: true }) as string[]).map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-terracloud-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-terracloud-gray">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-terracloud-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {t('services.cta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('services.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createUrl('/prendre-rendez-vous')} className="btn-primary">
              {t('services.cta.cta1')}
            </Link>
            <Link to={createUrl('/nous-contacter')} className="btn-secondary border-white text-white hover:bg-white hover:text-terracloud-dark">
              {t('services.cta.cta2')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default SoftwareArchitecture
