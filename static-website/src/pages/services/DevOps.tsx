import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { 
  Zap, 
  GitBranch,
  CheckCircle,
  Code,
  Monitor,
  Layers,
  Settings
} from 'lucide-react'

const DevOps = () => {
  const { t, i18n } = useTranslation()

  // Helper function to create language-aware URLs
  const createUrl = (path: string) => {
    if (i18n.language === 'en') {
      return path === '/' ? '/en/' : `/en${path}`
    }
    return path
  }

  const services = t('services.devops.services', { returnObjects: true }) as Array<{
    title: string
    description: string
  }>

  const benefits = t('services.devops.benefits', { returnObjects: true }) as string[]
  const processSteps = t('services.devops.process.steps', { returnObjects: true }) as Array<{
    title: string
    description: string
  }>
  const approachSteps = t('services.devops.approach.steps', { returnObjects: true }) as Array<{
    title: string
    description: string
  }>

  const technologies = [
    { name: "AWS", category: "Cloud" },
    { name: "Docker", category: i18n.language === 'fr' ? "Containerisation" : "Containerization" },
    { name: "Amazon ECS", category: i18n.language === 'fr' ? "Orchestration" : "Orchestration" },
    { name: "Terraform", category: "IaC" },
    { name: "GitHub Actions", category: "CI/CD" },
    { name: "GitLab CI", category: "CI/CD" },
    { name: "Jenkins", category: "CI/CD" },
    { name: "Prometheus", category: "Monitoring" },
    { name: "Grafana", category: "Monitoring" },
    { name: "CloudWatch", category: "Logs" }
  ]

  return (
    <>
      <Helmet>
        <title>{t('services.devops.pageTitle')}</title>
        <meta name="description" content={t('services.devops.pageDescription')} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold">
                  {t('services.devops.hero.title')}
                </h1>
              </div>
              <p className="text-xl text-blue-100 mb-8">
                {t('services.devops.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={createUrl('/prendre-rendez-vous')} className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                  {t('services.devops.hero.cta1')}
                </Link>
                <Link to={createUrl('/nous-contacter')} className="btn-secondary border-white text-white hover:bg-white hover:text-blue-600">
                  {t('services.devops.hero.cta2')}
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">90%</div>
                    <div className="text-blue-100 text-sm">{t('services.devops.stats.errorReduction')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">5x</div>
                    <div className="text-blue-100 text-sm">{t('services.devops.stats.faster')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">24/7</div>
                    <div className="text-blue-100 text-sm">{t('services.devops.stats.monitoring')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">100%</div>
                    <div className="text-blue-100 text-sm">{t('services.devops.stats.automated')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
              {t('services.devops.servicesSection.title')}
            </h2>
            <p className="text-xl text-terracloud-gray max-w-3xl mx-auto">
              {t('services.devops.servicesSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const icons = [
                <GitBranch className="h-8 w-8" />,
                <Code className="h-8 w-8" />,
                <Layers className="h-8 w-8" />,
                <Monitor className="h-8 w-8" />
              ]
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border">
                  <div className="text-blue-600 mb-4">
                    {icons[index]}
                  </div>
                  <h3 className="text-xl font-semibold text-terracloud-dark mb-3">
                    {service.title}
                  </h3>
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
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-6">
                {t('services.devops.benefitsSection.title')}
              </h2>
              <p className="text-xl text-terracloud-gray mb-8">
                {t('services.devops.benefitsSection.subtitle')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-terracloud-gray">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-terracloud-dark mb-6">
                {t('services.devops.process.title')}
              </h3>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-terracloud-dark">{step.title}</div>
                      <div className="text-sm text-terracloud-gray">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
              {t('services.devops.technologies.title')}
            </h2>
            <p className="text-xl text-terracloud-gray max-w-3xl mx-auto">
              {t('services.devops.technologies.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="font-semibold text-terracloud-dark mb-1">{tech.name}</div>
                <div className="text-xs text-terracloud-gray">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-terracloud-dark text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('services.devops.approach.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('services.devops.approach.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approachSteps.map((step, index) => {
              const icons = [
                <Settings className="h-8 w-8" />,
                <Code className="h-8 w-8" />,
                <Monitor className="h-8 w-8" />
              ]
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    {icons[index]}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{index + 1}. {step.title}</h3>
                  <p className="text-gray-300">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-6">
            {t('services.devops.cta.title')}
          </h2>
          <p className="text-xl text-terracloud-gray mb-8 max-w-3xl mx-auto">
            {t('services.devops.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createUrl('/prendre-rendez-vous')} className="btn-primary">
              {t('services.devops.cta.cta1')}
            </Link>
            <Link to={createUrl('/nous-contacter')} className="btn-secondary">
              {t('services.devops.cta.cta2')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default DevOps
