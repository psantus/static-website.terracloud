import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { 
  Briefcase, 
  Users, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Code
} from 'lucide-react'

const PartTimeCTO = () => {
  const { t, i18n } = useTranslation()

  // Helper function to create language-aware URLs
  const createUrl = (path: string) => {
    if (i18n.language === 'en') {
      return path === '/' ? '/en/' : `/en${path}`
    }
    return path
  }

  const services = t('services.partTimeCTO.services', { returnObjects: true }) as Array<{
    title: string
    description: string
  }>

  const benefits = t('services.partTimeCTO.benefits', { returnObjects: true }) as string[]
  const idealProfileItems = t('services.partTimeCTO.idealProfile.items', { returnObjects: true }) as string[]
  const methodologySteps = t('services.partTimeCTO.methodology.steps', { returnObjects: true }) as Array<{
    step: string
    title: string
    description: string
  }>

  return (
    <>
      <Helmet>
        <title>{t('services.partTimeCTO.pageTitle')}</title>
        <meta name="description" content={t('services.partTimeCTO.pageDescription')} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <Briefcase className="h-8 w-8" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold">
                  {t('services.partTimeCTO.hero.title')}
                </h1>
              </div>
              <p className="text-xl text-purple-100 mb-8">
                {t('services.partTimeCTO.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={createUrl('/prendre-rendez-vous')} className="btn-primary bg-white text-purple-600 hover:bg-gray-100">
                  {t('services.partTimeCTO.hero.cta1')}
                </Link>
                <Link to={createUrl('/nous-contacter')} className="btn-secondary border-white text-white hover:bg-white hover:text-purple-600">
                  {t('services.partTimeCTO.hero.cta2')}
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">15+</div>
                    <div className="text-purple-100 text-sm">{t('services.partTimeCTO.stats.experience')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">50+</div>
                    <div className="text-purple-100 text-sm">{t('services.partTimeCTO.stats.projects')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">20+</div>
                    <div className="text-purple-100 text-sm">{t('services.partTimeCTO.stats.teams')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">100%</div>
                    <div className="text-purple-100 text-sm">{t('services.partTimeCTO.stats.satisfaction')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
              {t('services.partTimeCTO.servicesSection.title')}
            </h2>
            <p className="text-xl text-terracloud-gray max-w-3xl mx-auto">
              {t('services.partTimeCTO.servicesSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const icons = [
                <Target className="h-8 w-8" />,
                <Code className="h-8 w-8" />,
                <Users className="h-8 w-8" />,
                <TrendingUp className="h-8 w-8" />
              ]
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 text-purple-600">
                      {icons[index]}
                    </div>
                    <h3 className="text-xl font-semibold text-terracloud-dark">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-terracloud-gray">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-6">
                {t('services.partTimeCTO.benefitsSection.title')}
              </h2>
              <p className="text-xl text-terracloud-gray mb-8">
                {t('services.partTimeCTO.benefitsSection.subtitle')}
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-terracloud-orange mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-terracloud-gray">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-terracloud-dark mb-6">
                {t('services.partTimeCTO.idealProfile.title')}
              </h3>
              <div className="space-y-4">
                {idealProfileItems.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-terracloud-gray">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
              {t('services.partTimeCTO.methodology.title')}
            </h2>
            <p className="text-xl text-terracloud-gray max-w-3xl mx-auto">
              {t('services.partTimeCTO.methodology.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodologySteps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-terracloud-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-terracloud-gray">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-terracloud-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {t('services.partTimeCTO.cta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('services.partTimeCTO.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createUrl('/prendre-rendez-vous')} className="btn-primary">
              {t('services.partTimeCTO.cta.cta1')}
            </Link>
            <Link to={createUrl('/nous-contacter')} className="btn-secondary border-white text-white hover:bg-white hover:text-terracloud-dark">
              {t('services.partTimeCTO.cta.cta2')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default PartTimeCTO
