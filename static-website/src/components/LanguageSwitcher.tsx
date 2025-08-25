import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Globe } from 'lucide-react'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const currentLanguage = i18n.language
  
  const switchLanguage = (newLang: string) => {
    const currentPath = location.pathname
    
    if (newLang === 'fr') {
      // Switch to French - remove /en prefix if present
      if (currentPath.startsWith('/en/')) {
        const frenchPath = currentPath.replace('/en', '')
        navigate(frenchPath)
      } else if (currentPath === '/en') {
        navigate('/')
      }
      // If already on French path, just change language
    } else if (newLang === 'en') {
      // Switch to English - add /en prefix if not present
      if (!currentPath.startsWith('/en')) {
        const englishPath = currentPath === '/' ? '/en/' : `/en${currentPath}`
        navigate(englishPath)
      }
      // If already on English path, just change language
    }
    
    // Change language immediately
    i18n.changeLanguage(newLang)
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-terracloud-dark hover:text-terracloud-orange transition-colors">
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium uppercase">{currentLanguage}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          <button
            onClick={() => switchLanguage('fr')}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
              currentLanguage === 'fr' ? 'bg-gray-50 font-medium' : ''
            }`}
          >
            🇫🇷 Français
          </button>
          <button
            onClick={() => switchLanguage('en')}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
              currentLanguage === 'en' ? 'bg-gray-50 font-medium' : ''
            }`}
          >
            🇬🇧 English
          </button>
        </div>
      </div>
    </div>
  )
}

export default LanguageSwitcher
