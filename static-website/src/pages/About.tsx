import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Award, MapPin, Users, Target, CheckCircle, Star, ExternalLink } from 'lucide-react'
import { getStringArray, getTranslationItems, ValueItem } from '../types/translations'

const About = () => {
  const { t, i18n } = useTranslation()

  // Helper function to create language-aware URLs
  const createUrl = (path: string) => {
    if (i18n.language === 'en') {
      return path === '/' ? '/en/' : `/en${path}`
    }
    return path
  }

  // Get translation arrays safely
  const storyParagraphs = getStringArray(t, 'about.story.paragraphs')
  const valueItems = getTranslationItems<ValueItem>(t, 'about.values.items')

  return (
    <>
      <Helmet>
        <title>{t('about.title')}</title>
        <meta name="description" content={t('about.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-terracloud-blue to-terracloud-orange text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {t('about.hero.title')}
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                {t('about.hero.description')}
              </p>
              <div className="flex items-center text-blue-100">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{t('about.hero.location')}</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">15+</div>
                  <div className="text-blue-100 mb-6">{t('about.stats.experience')}</div>
                  
                  <div className="text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-blue-100 mb-6">{t('about.stats.projects')}</div>
                  
                  <div className="text-4xl font-bold text-white mb-2">100%</div>
                  <div className="text-blue-100">{t('about.stats.satisfaction')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-6">
                {t('about.story.title')}
              </h2>
              <div className="space-y-4 text-terracloud-gray">
                {storyParagraphs.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-terracloud-dark mb-6">
                {t('about.certifications.title')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-terracloud-orange mr-3" />
                    <span className="text-terracloud-gray">{t('about.certifications.aws')}</span>
                  </div>
                  <a 
                    href="https://www.credly.com/users/paul-santus/badges#credly" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-terracloud-blue hover:text-terracloud-orange transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <div className="text-sm text-terracloud-gray ml-8">
                  {t('about.certifications.details')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
              {t('about.values.title')}
            </h2>
            <p className="text-xl text-terracloud-gray max-w-3xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueItems.map((value: ValueItem, index: number) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-terracloud-orange mb-4 flex justify-center">
                  {index === 0 && <Target className="h-8 w-8" />}
                  {index === 1 && <Users className="h-8 w-8" />}
                  {index === 2 && <CheckCircle className="h-8 w-8" />}
                  {index === 3 && <Star className="h-8 w-8" />}
                </div>
                <h3 className="text-xl font-semibold text-terracloud-dark mb-3">
                  {value.title}
                </h3>
                <p className="text-terracloud-gray">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
              {t('about.team.title')}
            </h2>
            <p className="text-xl text-terracloud-gray max-w-3xl mx-auto">
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <div className="w-32 h-32 bg-gradient-to-br from-terracloud-orange to-terracloud-blue rounded-full mx-auto lg:mx-0 mb-4 flex items-center justify-center text-white text-4xl font-bold">
                    PS
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold text-terracloud-dark mb-2">
                    {t('about.team.paul.name')}
                  </h3>
                  <p className="text-terracloud-orange font-medium mb-4">
                    {t('about.team.paul.role')}
                  </p>
                  <p className="text-terracloud-gray mb-4">
                    {t('about.team.paul.description')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-terracloud-orange/10 text-terracloud-orange rounded-full text-sm">
                      AWS Solutions Architect Professional
                    </span>
                    <span className="px-3 py-1 bg-terracloud-blue/10 text-terracloud-blue rounded-full text-sm">
                      DevOps Expert
                    </span>
                    <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm">
                      Architecture Cloud
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer References Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-6">
              {t('about.references.title')}
            </h2>
            <p className="text-xl text-terracloud-gray mb-8">
              {t('about.references.description')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center h-20">
                <img src="/images/clients/emiles-logo.svg" alt="Atout Pass" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center h-20">
                <img src="/images/clients/aneo-logo.png" alt="Anéo" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center h-20">
                <img src="/images/clients/taqt-logo.svg" alt="Taqt" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center h-20">
                <img src="/images/clients/crh-logo.svg" alt="CRH" className="max-h-full max-w-full object-contain" />
              </div>
            </div>
            <Link 
              to={createUrl('/a-propos/ils-nous-font-confiance')} 
              className="btn-primary"
            >
              {t('about.references.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-terracloud-dark text-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t('about.mission.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('about.mission.description')}
            </p>
            <blockquote className="text-2xl italic text-gray-300 border-l-4 border-terracloud-orange pl-6 mb-8">
              "{t('about.mission.quote')}"
            </blockquote>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services" className="btn-primary">
                {t('about.mission.cta1')}
              </Link>
              <Link to="/prendre-rendez-vous" className="btn-secondary border-white text-white hover:bg-white hover:text-terracloud-dark">
                {t('about.mission.cta2')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
