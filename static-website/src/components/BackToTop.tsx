import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronUp } from 'lucide-react'
import { scrollToTop } from '../hooks/useScrollToTop'

interface BackToTopProps {
  showAfter?: number // Show button after scrolling this many pixels
  className?: string // Additional CSS classes
  smooth?: boolean   // Whether to use smooth scrolling
}

const BackToTop = ({ showAfter = 300, className = '', smooth = true }: BackToTopProps) => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [showAfter])

  const handleClick = () => {
    scrollToTop(smooth)
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-8 right-8 z-50 bg-terracloud-orange hover:bg-terracloud-blue text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-110 ${className}`}
      aria-label={t('common.backToTop', 'Retour en haut de la page')}
      title={t('common.backToTop', 'Retour en haut')}
    >
      <ChevronUp className="h-6 w-6" />
    </button>
  )
}

export default BackToTop
