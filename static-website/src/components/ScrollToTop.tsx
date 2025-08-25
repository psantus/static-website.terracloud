import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface ScrollToTopProps {
  smooth?: boolean // Whether to use smooth scrolling
  delay?: number   // Optional delay before scrolling (in ms)
}

const ScrollToTop = ({ smooth = true, delay = 0 }: ScrollToTopProps) => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const behavior = (smooth && !prefersReducedMotion) ? 'smooth' : 'auto'

      if (hash) {
        // If there's a hash, try to scroll to that element
        const element = document.getElementById(hash.substring(1))
        if (element) {
          element.scrollIntoView({ behavior })
          return
        }
      }

      // Otherwise, scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior
      })
    }

    if (delay > 0) {
      // Add delay if specified (useful for page transitions)
      const timeoutId = setTimeout(handleScroll, delay)
      return () => clearTimeout(timeoutId)
    } else {
      handleScroll()
    }
  }, [pathname, hash, smooth, delay])

  return null // This component doesn't render anything
}

export default ScrollToTop
