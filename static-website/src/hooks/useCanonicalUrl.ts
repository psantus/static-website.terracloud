import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const useCanonicalUrl = (customCanonical?: string) => {
  const location = useLocation()
  const { i18n } = useTranslation()
  
  // Get base URL from environment variable, fallback to current origin in development
  const baseUrl = import.meta.env.VITE_BASE_URL || 
                  (typeof window !== 'undefined' ? window.location.origin : 'https://web.terracloud.fr')
  
  // If custom canonical is provided, use it directly
  if (customCanonical) {
    const canonicalUrl = customCanonical.startsWith('http') ? customCanonical : `${baseUrl}${customCanonical}`
    
    return {
      canonical: canonicalUrl,
      alternates: {
        fr: canonicalUrl,
        en: canonicalUrl // For custom canonicals, we don't generate alternates
      },
      currentLang: i18n.language
    }
  }
  
  // Remove /en prefix for canonical URL (always use French URLs as canonical)
  const getCanonicalPath = (pathname: string) => {
    if (pathname.startsWith('/en/')) {
      return pathname.replace('/en', '')
    }
    if (pathname === '/en') {
      return '/'
    }
    return pathname
  }
  
  const canonicalPath = getCanonicalPath(location.pathname)
  const canonicalUrl = `${baseUrl}${canonicalPath === '/' ? '' : canonicalPath}`
  
  // Generate alternate language URLs
  const alternateUrls = {
    fr: canonicalUrl,
    en: canonicalPath === '/' ? `${baseUrl}/en/` : `${baseUrl}/en${canonicalPath}`
  }
  
  return {
    canonical: canonicalUrl,
    alternates: alternateUrls,
    currentLang: i18n.language
  }
}
