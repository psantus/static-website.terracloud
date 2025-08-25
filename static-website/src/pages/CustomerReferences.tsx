import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Building2, Users, Award, Star, Quote } from 'lucide-react'
import { loadTestimonials, type Testimonial } from '../utils/testimonialsLoader'
import { getStringArray } from '../types/translations'
import BackToTop from '../components/BackToTop'

const CustomerReferences = () => {
  const { t, i18n } = useTranslation()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  // Helper function to create language-aware URLs
  const createUrl = (path: string) => {
    if (i18n.language === 'en') {
      return path === '/' ? '/en/' : `/en${path}`
    }
    return path
  }

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await loadTestimonials(i18n.language)
        setTestimonials(data)
      } catch (error) {
        console.error('Failed to load testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [i18n.language]) // Re-run when language changes

  // Multilingual client data
  const getClientLogos = () => {
    if (i18n.language === 'en') {
      return [
        {
          name: "Atout Pass (Emiles)",
          logo: "/images/clients/emiles-logo.svg",
          description: "TerraCloud supports Atout Pass in migrating their applications to AWS Cloud",
          sector: "Digital Services"
        },
        {
          name: "CFM",
          logo: "/images/clients/cfm-logo.svg", 
          description: "TerraCloud contributed to conducting an MLOps chain audit for this investment fund",
          sector: "Finance"
        },
        {
          name: "Anéo",
          logo: "/images/clients/aneo-logo.png",
          description: "TerraCloud collaborates with Anéo, HPC specialist, for certain mission implementations",
          sector: "Consulting & Technologies"
        },
        {
          name: "Taqt",
          logo: "/images/clients/taqt-logo.svg",
          description: "TerraCloud supported Taqt, publisher of digital and IoT solutions for cleaning and facility management, in overhauling their AWS infrastructure",
          sector: "IoT & Facility Management"
        },
        {
          name: "WebTales",
          logo: "/images/clients/webtales-logo.jpg",
          description: "TerraCloud supported WebTales, a company specialized in web and mobile application development, in designing ServerLess solutions",
          sector: "Web & Mobile Development"
        },
        {
          name: "Alivio",
          logo: "/images/clients/alivio-logo.png",
          description: "TerraCloud helped Alivio comply with HIPAA standards by improving their data security on AWS",
          sector: "Healthcare & Compliance"
        },
        {
          name: "Stafiz",
          logo: "/images/clients/stafiz-dilynx-logo.png",
          description: "TerraCloud helped Stafiz configure their Web Application Firewall",
          sector: "Web Security"
        },
        {
          name: "Lyvoc",
          logo: "/images/clients/lyvoc-logo.png",
          description: "TerraCloud helped Lyvoc start their AWS cloud service business",
          sector: "Cloud Services"
        },
        {
          name: "Largo",
          logo: "/images/clients/largo-logo.webp",
          description: "TerraCloud helped Largo get started on AWS Cloud by setting up a landing zone",
          sector: "Digital Transformation"
        },
        {
          name: "Cegos / IB Formation",
          logo: "/images/clients/ib-logo.png",
          description: "TerraCloud works with Cegos / IB Formation as an AWS trainer",
          sector: "Training"
        },
        {
          name: "CRH",
          logo: "/images/clients/crh-logo.svg",
          description: "TerraCloud made recommendations for implementing Cloud governance within CRH, an international cement group",
          sector: "Industry & Materials"
        }
      ]
    } else {
      return [
        {
          name: "Atout Pass (Emiles)",
          logo: "/images/clients/emiles-logo.svg",
          description: "TerraCloud soutient Atout Pass dans la migration de ses applications sur le Cloud AWS",
          sector: "Services numériques"
        },
        {
          name: "CFM",
          logo: "/images/clients/cfm-logo.svg", 
          description: "TerraCloud a contribué à la réalisation d'un audit de la chaîne MLOps pour ce fonds d'investissement",
          sector: "Finance"
        },
        {
          name: "Anéo",
          logo: "/images/clients/aneo-logo.png",
          description: "TerraCloud collabore avec Anéo, spécialiste du HPC, pour la réalisation de certaines missions",
          sector: "Conseil & Technologies"
        },
        {
          name: "Taqt",
          logo: "/images/clients/taqt-logo.svg",
          description: "TerraCloud a accompagné Taqt, éditeur de solutions digitales et IoT pour le nettoyage et le facility management, dans la remise à plat de l'infrastructure AWS",
          sector: "IoT & Facility Management"
        },
        {
          name: "WebTales",
          logo: "/images/clients/webtales-logo.jpg",
          description: "TerraCloud a accompagné WebTales, entreprise spécialisée dans le développement d'application web et mobile, dans la conception de solutions ServerLess",
          sector: "Développement Web & Mobile"
        },
        {
          name: "Alivio",
          logo: "/images/clients/alivio-logo.png",
          description: "TerraCloud a aidé Alivio à respecter le standard HIPAA en améliorant la sécurité de ses données sur AWS",
          sector: "Santé & Conformité"
        },
        {
          name: "Stafiz",
          logo: "/images/clients/stafiz-dilynx-logo.png",
          description: "TerraCloud a aidé Stafiz a configurer son Web Application Firewall",
          sector: "Sécurité Web"
        },
        {
          name: "Lyvoc",
          logo: "/images/clients/lyvoc-logo.png",
          description: "TerraCloud a aidé Lyvoc à démarrer son activité de service autour du cloud AWS",
          sector: "Services Cloud"
        },
        {
          name: "Largo",
          logo: "/images/clients/largo-logo.webp",
          description: "TerraCloud a aidé Largo à démarrer sur le Cloud AWS par la mise en place d'une landing zone",
          sector: "Transformation Digitale"
        },
        {
          name: "Cegos / IB Formation",
          logo: "/images/clients/ib-logo.png",
          description: "TerraCloud intervient auprès de Cegos / IB Formation comme formateur AWS",
          sector: "Formation"
        },
        {
          name: "CRH",
          logo: "/images/clients/crh-logo.svg",
          description: "TerraCloud a fait des préconisations pour la mise en place d'une gouvernance Cloud au sein de CRH, groupe cimentier international",
          sector: "Industrie & Matériaux"
        }
      ]
    }
  }

  const clientLogos = getClientLogos()

  const stats = [
    {
      icon: <Building2 className="h-8 w-8" />,
      number: t('customerReferences.stats.0.number'),
      label: t('customerReferences.stats.0.label'),
      description: t('customerReferences.stats.0.description')
    },
    {
      icon: <Users className="h-8 w-8" />,
      number: t('customerReferences.stats.1.number'),
      label: t('customerReferences.stats.1.label'),
      description: t('customerReferences.stats.1.description')
    },
    {
      icon: <Award className="h-8 w-8" />,
      number: t('customerReferences.stats.2.number'),
      label: t('customerReferences.stats.2.label'),
      description: t('customerReferences.stats.2.description')
    },
    {
      icon: <Star className="h-8 w-8" />,
      number: t('customerReferences.stats.3.number'),
      label: t('customerReferences.stats.3.label'),
      description: t('customerReferences.stats.3.description')
    }
  ]

  const sectors = getStringArray(t, 'customerReferences.sectors.list')

  return (
    <>
      <Helmet>
        <title>{t('customerReferences.title')}</title>
        <meta name="description" content={t('customerReferences.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-terracloud-blue to-terracloud-orange text-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {t('customerReferences.hero.title')}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {t('customerReferences.hero.description')}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-white mb-3 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-blue-100 font-medium mb-1">{stat.label}</div>
                  <div className="text-sm text-blue-200">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
              {t('customerReferences.testimonials.title')}
            </h2>
            <p className="text-xl text-terracloud-gray max-w-3xl mx-auto">
              {t('customerReferences.testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading state
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm animate-pulse">
                  <div className="w-8 h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-terracloud-orange mb-4">
                    <Quote className="h-8 w-8" />
                  </div>
                  <blockquote className="text-terracloud-gray mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-terracloud-orange to-terracloud-blue rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-terracloud-dark">{testimonial.author}</div>
                      <div className="text-terracloud-gray text-sm">{testimonial.company}</div>
                      <div className="text-terracloud-orange text-xs mt-1">{testimonial.project}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // No testimonials state
              <div className="col-span-3 text-center py-12">
                <p className="text-terracloud-gray">{t('customerReferences.testimonials.noTestimonials')}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
              {t('customerReferences.clients.title')}
            </h2>
            <p className="text-xl text-terracloud-gray max-w-3xl mx-auto">
              {t('customerReferences.clients.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clientLogos.map((client, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="h-20 flex items-center justify-center mb-4">
                  <img 
                    src={client.logo} 
                    alt={`Logo ${client.name}`}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2Yzc1N2QiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxvZ288L3RleHQ+PC9zdmc+';
                    }}
                  />
                </div>
                <h3 className="font-semibold text-terracloud-dark mb-2">{client.name}</h3>
                <p className="text-sm text-terracloud-gray mb-3">{client.description}</p>
                <span className="inline-block px-3 py-1 bg-terracloud-orange/10 text-terracloud-orange rounded-full text-xs">
                  {client.sector}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
              {t('customerReferences.sectors.title')}
            </h2>
            <p className="text-xl text-terracloud-gray max-w-3xl mx-auto">
              {t('customerReferences.sectors.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sectors.map((sector, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <span className="text-terracloud-dark font-medium">{sector}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-terracloud-dark text-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t('customerReferences.cta.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('customerReferences.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createUrl('/prendre-rendez-vous')} className="btn-primary">
                {t('customerReferences.cta.cta1')}
              </Link>
              <Link to={createUrl('/services')} className="btn-secondary border-white text-white hover:bg-white hover:text-terracloud-dark">
                {t('customerReferences.cta.cta2')}
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <BackToTop />
    </>
  )
}

export default CustomerReferences
