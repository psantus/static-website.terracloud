import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Cloud, Shield, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react'

const Home = () => {
  const { t } = useTranslation()

  const services = [
    {
      icon: <Cloud className="h-8 w-8" />,
      title: t('home.services.architectureCloud.title'),
      description: t('home.services.architectureCloud.description'),
      link: "/services/architecte-solutions-aws"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t('home.services.devops.title'),
      description: t('home.services.devops.description'),
      link: "/services/devops"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: t('home.services.migration.title'),
      description: t('home.services.migration.description'),
      link: "/services/migration-vers-aws"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t('home.services.training.title'),
      description: t('home.services.training.description'),
      link: "/services/formation-aws"
    }
  ]

  const benefits = t('home.whyChoose.benefits', { returnObjects: true }) as string[]

  return (
    <>
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-terracloud-blue to-terracloud-orange text-white section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {t('home.hero.tagline1')}<br />
                <span className="text-yellow-300">{t('home.hero.tagline2')}</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                {t('home.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/prendre-rendez-vous" className="btn-primary bg-white text-terracloud-blue hover:bg-gray-100">
                  {t('home.hero.cta1')}
                </Link>
                <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-terracloud-blue">
                  {t('home.hero.cta2')}
                </Link>
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-2">
              <div className="relative">
                <div className="flex items-center justify-center">
                  <img 
                    src="/paul-santus.jpg" 
                    alt="Paul Santus - Fondateur TerraCloud" 
                    className="max-h-96 w-auto object-contain rounded-2xl shadow-lg"
                  />
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
              {t('home.services.title')}
            </h2>
            <p className="text-xl text-terracloud-gray max-w-3xl mx-auto">
              {t('home.services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-terracloud-orange mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-terracloud-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-terracloud-gray mb-4">
                  {service.description}
                </p>
                <Link 
                  to={service.link}
                  className="text-terracloud-orange hover:text-terracloud-blue transition-colors font-medium inline-flex items-center"
                >
                  {t('common.learnMore')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-6">
                {t('home.whyChoose.title')}
              </h2>
              <p className="text-xl text-terracloud-gray mb-8">
                {t('home.whyChoose.description')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-terracloud-orange mr-3" />
                    <span className="text-terracloud-gray">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/a-propos" className="btn-primary">
                  {t('home.whyChoose.learnMore')}
                </Link>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-terracloud-blue/10 to-terracloud-orange/10 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-terracloud-orange mb-2">15</div>
                <div className="text-terracloud-gray mb-6">{t('home.whyChoose.stats.experience')}</div>
                
                <div className="text-4xl font-bold text-terracloud-blue mb-2">15+</div>
                <div className="text-terracloud-gray mb-6">{t('home.whyChoose.stats.clients')}</div>
                
                <div className="text-4xl font-bold text-terracloud-orange mb-2">100+</div>
                <div className="text-terracloud-gray">{t('home.whyChoose.stats.trained')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-terracloud-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('home.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/prendre-rendez-vous" className="btn-primary">
              {t('home.cta.cta1')}
            </Link>
            <Link to="/nous-contacter" className="btn-secondary border-white text-white hover:bg-white hover:text-terracloud-dark">
              {t('home.cta.cta2')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
