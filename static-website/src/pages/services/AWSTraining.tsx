import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  GraduationCap, 
  Award, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  BookOpen,
  Target,
  Zap
} from 'lucide-react'
import { getTranslationItems, BenefitItem } from '../../types/translations'

const AWSTraining = () => {
  const { t } = useTranslation()

  // Get benefits safely
  const benefitItems = getTranslationItems<BenefitItem>(t, 'services.awsTraining.benefits.items')

  const trainingPrograms = [
    {
      title: "AWS Cloud Practitioner",
      level: t('services.levels.beginner', 'Débutant'),
      duration: "2 jours",
      description: "Formation de base pour comprendre les concepts fondamentaux d'AWS",
      topics: [
        "Vue d'ensemble des services AWS",
        "Modèles de tarification et facturation",
        "Sécurité et conformité",
        "Architecture cloud de base"
      ]
    },
    {
      title: "AWS Solutions Architect Associate",
      level: t('services.levels.intermediate', 'Intermédiaire'),
      duration: "3 jours",
      description: "Conception d'architectures distribuées sur AWS",
      topics: [
        "Conception d'architectures résilientes",
        "Architectures haute performance",
        "Applications sécurisées et conformes",
        "Optimisation des coûts"
      ]
    },
    {
      title: "AWS Developer Associate",
      level: t('services.levels.intermediate', 'Intermédiaire'),
      duration: "3 jours",
      description: "Développement et déploiement d'applications sur AWS",
      topics: [
        "Développement avec les SDK AWS",
        "Services de déploiement et debugging",
        "Sécurité dans le développement",
        "Intégration avec les services AWS"
      ]
    },
    {
      title: "AWS SysOps Administrator",
      level: t('services.levels.intermediate', 'Intermédiaire'),
      duration: "3 jours",
      description: "Administration et opérations sur AWS",
      topics: [
        "Déploiement et gestion des systèmes",
        "Monitoring et logging",
        "Sécurité et conformité opérationnelle",
        "Automatisation et optimisation"
      ]
    }
  ]

  const formats = [
    {
      title: "Formation en Présentiel",
      description: "Sessions dans vos locaux ou dans nos centres partenaires",
      features: ["Interaction directe", "Ateliers pratiques", "Networking"]
    },
    {
      title: "Formation à Distance",
      description: "Sessions virtuelles interactives avec labs pratiques",
      features: ["Flexibilité géographique", "Outils collaboratifs", "Enregistrements"]
    },
    {
      title: "Formation Hybride",
      description: "Combinaison de sessions présentielles et distancielles",
      features: ["Flexibilité maximale", "Suivi personnalisé", "Adaptation aux contraintes"]
    }
  ]

  return (
    <>
      <Helmet>
        <title>{t('services.awsTraining.title')} - TerraCloud</title>
        <meta name="description" content={t('services.awsTraining.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {t('services.awsTraining.hero.title')}
              </h1>
              <p className="text-xl mb-8 text-yellow-100">
                {t('services.awsTraining.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/prendre-rendez-vous" className="btn-primary bg-white text-orange-500 hover:bg-gray-100">
                  {t('services.awsTraining.hero.cta1')}
                </Link>
                <Link to="/nous-contacter" className="btn-secondary border-white text-white hover:bg-white hover:text-orange-500">
                  {t('services.awsTraining.hero.cta2')}
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <GraduationCap className="h-24 w-24 text-white mb-4" />
                <h3 className="text-2xl font-bold mb-4">Formation Certifiante</h3>
                <p className="text-yellow-100">
                  Préparez vos équipes aux certifications AWS avec un formateur agréé
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
              {t('services.awsTraining.benefits.title')}
            </h2>
            <p className="text-xl text-terracloud-gray max-w-3xl mx-auto">
              {t('services.awsTraining.benefits.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefitItems.map((benefit: BenefitItem, index: number) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500">
                  {index === 0 && <Award className="h-8 w-8" />}
                  {index === 1 && <BookOpen className="h-8 w-8" />}
                  {index === 2 && <Users className="h-8 w-8" />}
                  {index === 3 && <Target className="h-8 w-8" />}
                </div>
                <h3 className="text-xl font-semibold text-terracloud-dark mb-3">
                  {benefit.title}
                </h3>
                <p className="text-terracloud-gray">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
              {t('services.awsTraining.programs.title')}
            </h2>
            <p className="text-xl text-terracloud-gray max-w-3xl mx-auto">
              {t('services.awsTraining.programs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {trainingPrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    program.level === 'Débutant' || program.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {program.level}
                  </span>
                  <div className="flex items-center text-terracloud-gray">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{program.duration}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-terracloud-dark mb-3">
                  {program.title}
                </h3>
                <p className="text-terracloud-gray mb-4">
                  {program.description}
                </p>
                
                <div className="space-y-2">
                  {program.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-terracloud-gray">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-terracloud-dark mb-4">
              {t('services.awsTraining.formats.title')}
            </h2>
            <p className="text-xl text-terracloud-gray max-w-3xl mx-auto">
              {t('services.awsTraining.formats.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {formats.map((format, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-terracloud-dark mb-3">
                  {format.title}
                </h3>
                <p className="text-terracloud-gray mb-6">
                  {format.description}
                </p>
                <ul className="space-y-2">
                  {format.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Zap className="h-4 w-4 text-orange-500 mr-2" />
                      <span className="text-sm text-terracloud-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-terracloud-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {t('services.awsTraining.cta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('services.awsTraining.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/prendre-rendez-vous" className="btn-primary">
              {t('services.awsTraining.cta.cta1')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/nous-contacter" className="btn-secondary border-white text-white hover:bg-white hover:text-terracloud-dark">
              {t('services.awsTraining.cta.cta2')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default AWSTraining
