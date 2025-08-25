import { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, ChevronDown } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const servicesTimeoutRef = useRef<number | null>(null)
  const aboutTimeoutRef = useRef<number | null>(null)
  const location = useLocation()
  const { t, i18n } = useTranslation()

  // Helper function to create language-aware URLs
  const createUrl = (path: string) => {
    if (i18n.language === 'en') {
      return path === '/' ? '/en/' : `/en${path}`
    }
    return path
  }

  const isActive = (path: string) => {
    const currentPath = location.pathname
    const normalizedPath = currentPath.startsWith('/en/') ? currentPath.replace('/en', '') : currentPath
    const normalizedCurrentPath = normalizedPath === '' ? '/' : normalizedPath
    
    return normalizedCurrentPath === path || normalizedCurrentPath.startsWith(path + '/')
  }

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
    }
    setIsServicesOpen(true)
  }

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 150) // 150ms delay
  }

  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) {
      clearTimeout(aboutTimeoutRef.current)
    }
    setIsAboutOpen(true)
  }

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setIsAboutOpen(false)
    }, 150) // 150ms delay
  }

  const services = [
    { name: t('nav.servicesList.devops'), path: createUrl('/services/devops') },
    { name: t('nav.servicesList.partTimeCTO'), path: createUrl('/services/cto-a-temps-partage-a-poitiers-freelance') },
    { name: t('nav.servicesList.cloudStart'), path: createUrl('/services/demarrer-sur-le-cloud') },
    { name: t('nav.servicesList.awsArchitect'), path: createUrl('/services/architecte-solutions-aws') },
    { name: t('nav.servicesList.softwareArchitecture'), path: createUrl('/services/architecture-logicielle') },
    { name: t('nav.servicesList.awsMigration'), path: createUrl('/services/migration-vers-aws') },
    { name: t('nav.servicesList.awsTraining'), path: createUrl('/services/formation-aws') },
  ]

  const aboutPages = [
    { name: t('nav.aboutPages.about'), path: createUrl('/a-propos') },
    { name: t('nav.aboutPages.references'), path: createUrl('/a-propos/ils-nous-font-confiance') },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={createUrl('/')} className="flex items-center">
            <img 
              src="/logo-orange.png" 
              alt="TerraCloud" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to={createUrl('/')} 
              className={`font-medium transition-colors ${
                isActive('/') && location.pathname === createUrl('/') 
                  ? 'text-terracloud-orange' 
                  : 'text-terracloud-dark hover:text-terracloud-orange'
              }`}
            >
              {t('nav.home')}
            </Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <Link 
                to={createUrl('/services')} 
                className={`font-medium transition-colors flex items-center ${
                  isActive('/services') 
                    ? 'text-terracloud-orange' 
                    : 'text-terracloud-dark hover:text-terracloud-orange'
                }`}
              >
                {t('nav.services')}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg border py-2 z-50">
                  <Link 
                    to={createUrl('/services')} 
                    className="block px-4 py-2 text-terracloud-dark hover:bg-gray-50 hover:text-terracloud-orange transition-colors"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    {t('nav.allServices')}
                  </Link>
                  <hr className="my-2" />
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block px-4 py-2 text-terracloud-dark hover:bg-gray-50 hover:text-terracloud-orange transition-colors"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to={createUrl('/blog')} 
              className={`font-medium transition-colors ${
                isActive('/blog') 
                  ? 'text-terracloud-orange' 
                  : 'text-terracloud-dark hover:text-terracloud-orange'
              }`}
            >
              {t('nav.blog')}
            </Link>
            
            {/* About Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
            >
              <Link 
                to={createUrl('/a-propos')} 
                className={`font-medium transition-colors flex items-center ${
                  isActive('/a-propos') 
                    ? 'text-terracloud-orange' 
                    : 'text-terracloud-dark hover:text-terracloud-orange'
                }`}
              >
                {t('nav.about')}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              
              {isAboutOpen && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border py-2 z-50">
                  {aboutPages.map((page) => (
                    <Link
                      key={page.path}
                      to={page.path}
                      className="block px-4 py-2 text-terracloud-dark hover:bg-gray-50 hover:text-terracloud-orange transition-colors"
                      onClick={() => setIsAboutOpen(false)}
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              to={createUrl('/nous-contacter')} 
              className={`font-medium transition-colors ${
                isActive('/nous-contacter') 
                  ? 'text-terracloud-orange' 
                  : 'text-terracloud-dark hover:text-terracloud-orange'
              }`}
            >
              {t('nav.contact')}
            </Link>
            
            <Link 
              to={createUrl('/prendre-rendez-vous')} 
              className="btn-primary"
            >
              {t('nav.appointment')}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-terracloud-dark" />
            ) : (
              <Menu className="h-6 w-6 text-terracloud-dark" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                to={createUrl('/')} 
                className="font-medium text-terracloud-dark hover:text-terracloud-orange transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              
              <Link 
                to={createUrl('/services')} 
                className="font-medium text-terracloud-dark hover:text-terracloud-orange transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.services')}
              </Link>
              
              {services.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="font-medium text-terracloud-gray hover:text-terracloud-orange transition-colors pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
              
              <Link 
                to={createUrl('/blog')} 
                className="font-medium text-terracloud-dark hover:text-terracloud-orange transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.blog')}
              </Link>
              
              <Link 
                to={createUrl('/a-propos')} 
                className="font-medium text-terracloud-dark hover:text-terracloud-orange transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>

              <Link 
                to={createUrl('/a-propos/ils-nous-font-confiance')} 
                className="font-medium text-terracloud-gray hover:text-terracloud-orange transition-colors pl-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.aboutPages.references')}
              </Link>
              
              <Link 
                to={createUrl('/nous-contacter')} 
                className="font-medium text-terracloud-dark hover:text-terracloud-orange transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>
              
              <Link 
                to={createUrl('/prendre-rendez-vous')} 
                className="btn-primary inline-block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.appointment')}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="pt-4 border-t">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
