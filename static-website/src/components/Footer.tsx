import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  const { t, i18n } = useTranslation()

  // Helper function to create language-aware URLs
  const createUrl = (path: string) => {
    if (i18n.language === 'en') {
      return path === '/' ? '/en/' : `/en${path}`
    }
    return path
  }

  return (
    <footer className="bg-terracloud-dark text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">
                TerraCloud
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              {t('home.hero.tagline1')} {t('home.hero.tagline2')}
            </p>
            <p className="text-gray-300 text-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/devops" className="text-gray-300 hover:text-terracloud-orange transition-colors">
                  {t('services.devops.title')}
                </Link>
              </li>
              <li>
                <Link to="/services/architecte-solutions-aws" className="text-gray-300 hover:text-terracloud-orange transition-colors">
                  {t('services.awsArchitect.title')}
                </Link>
              </li>
              <li>
                <Link to="/services/migration-vers-aws" className="text-gray-300 hover:text-terracloud-orange transition-colors">
                  {t('services.awsMigration.title')}
                </Link>
              </li>
              <li>
                <Link to="/services/formation-aws" className="text-gray-300 hover:text-terracloud-orange transition-colors">
                  {t('services.awsTraining.title')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-terracloud-orange transition-colors">
                  {t('common.viewAllServices')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to={createUrl('/blog')} className="text-gray-300 hover:text-terracloud-orange transition-colors">
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-gray-300 hover:text-terracloud-orange transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/nous-contacter" className="text-gray-300 hover:text-terracloud-orange transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/prendre-rendez-vous" className="text-gray-300 hover:text-terracloud-orange transition-colors">
                  {t('nav.appointment')}
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-gray-300 hover:text-terracloud-orange transition-colors">
                  {t('footer.legal')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact.contactInfo.title', 'Contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-terracloud-orange mr-3" />
                <span className="text-gray-300">{t('contact.contactInfo.location.value')}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-terracloud-orange mr-3" />
                <a href="mailto:contact@terracloud.fr" className="text-gray-300 hover:text-terracloud-orange transition-colors">
                  {t('contact.contactInfo.email.value')}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-terracloud-orange mr-3" />
                <a href="tel:+33626087041" className="text-gray-300 hover:text-terracloud-orange transition-colors">
                  {t('contact.contactInfo.phone.value')}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://linkedin.com/company/terracloud" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-terracloud-orange transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/terracloud" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-terracloud-orange transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
