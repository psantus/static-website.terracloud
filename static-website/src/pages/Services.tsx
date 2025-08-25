import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  Cloud, 
  Shield, 
  Zap,
  ArrowRight, 
  Code, 
  Database, 
  GraduationCap,
  Briefcase
} from 'lucide-react'
import SEO from '../components/SEO'

const Services = () => {
  const { t, i18n } = useTranslation()

  // Helper function to create language-aware URLs
  const createUrl = (path: string) => {
    if (i18n.language === 'en') {
      return path === '/' ? '/en/' : `/en${path}`
    }
    return path
  }

  const services = [
    {
      icon: <Zap className="h-12 w-12" />,
      title: t('services.devops.title'),
      description: t('services.devops.description'),
      features: t('services.devops.features', { returnObjects: true }) as string[],
      link: createUrl("/services/devops"),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Briefcase className="h-12 w-12" />,
      title: t('services.partTimeCTO.title'),
      description: t('services.partTimeCTO.description'),
      features: t('services.partTimeCTO.features', { returnObjects: true }) as string[],
      link: createUrl("/services/cto-a-temps-partage-a-poitiers-freelance"),
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Cloud className="h-12 w-12" />,
      title: t('services.cloudStart.title'),
      description: t('services.cloudStart.description'),
      features: t('services.cloudStart.features', { returnObjects: true }) as string[],
      link: createUrl("/services/demarrer-sur-le-cloud"),
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: t('services.awsArchitect.title'),
      description: t('services.awsArchitect.description'),
      features: t('services.awsArchitect.features', { returnObjects: true }) as string[],
      link: createUrl("/services/architecte-solutions-aws"),
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Code className="h-12 w-12" />,
      title: t('services.softwareArchitecture.title'),
      description: t('services.softwareArchitecture.description'),
      features: t('services.softwareArchitecture.features', { returnObjects: true }) as string[],
      link: createUrl("/services/architecture-logicielle"),
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Database className="h-12 w-12" />,
      title: t('services.awsMigration.title'),
      description: t('services.awsMigration.description'),
      features: t('services.awsMigration.features', { returnObjects: true }) as string[],
      link: createUrl("/services/migration-vers-aws"),
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <GraduationCap className="h-12 w-12" />,
      title: t('services.awsTraining.title'),
      description: t('services.awsTraining.description'),
      features: t('services.awsTraining.features', { returnObjects: true }) as string[],
      link: createUrl("/services/formation-aws"),
      color: "from-yellow-500 to-orange-500"
    }
  ]

  return (
    <>
      <SEO 
        title={t('services.title')}
        description={t('services.description')}
        keywords="AWS, Cloud, DevOps, Architecture, Formation, Migration, Terraform, Kubernetes, Services"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-terracloud-dark to-gray-800 text-white section-padding">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {t('services.hero.title')}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {t('services.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/prendre-rendez-vous" className="btn-primary">
                {t('services.hero.cta1')}
              </Link>
              <Link to="/nous-contacter" className="btn-secondary border-white text-white hover:bg-white hover:text-terracloud-dark">
                {t('services.hero.cta2')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                  <div className="flex items-center mb-4">
                    <div className="bg-white/20 p-3 rounded-lg mr-4">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl font-bold">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-white/90">
                    {service.description}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-terracloud-dark mb-4">
                    {t('services.whatWeOffer')}
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-terracloud-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-terracloud-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to={service.link}
                    className="inline-flex items-center text-terracloud-orange hover:text-terracloud-blue transition-colors font-medium"
                  >
                    {t('common.learnMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
            <Link to="/prendre-rendez-vous" className="btn-primary">
              {t('services.cta.cta1')}
            </Link>
            <Link to="/nous-contacter" className="btn-secondary border-white text-white hover:bg-white hover:text-terracloud-dark">
              {t('services.cta.cta2')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
