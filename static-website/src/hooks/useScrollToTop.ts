import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface UseScrollToTopOptions {
  smooth?: boolean
  delay?: number
  condition?: boolean // Only scroll if condition is true
}

/**
 * Hook to automatically scroll to top when route changes
 * @param options Configuration options for scrolling behavior
 */
export const useScrollToTop = (options: UseScrollToTopOptions = {}) => {
  const { smooth = true, delay = 0, condition = true } = options
  const { pathname } = useLocation()

  useEffect(() => {
    if (!condition) return

    const scrollToTop = () => {
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: (smooth && !prefersReducedMotion) ? 'smooth' : 'auto'
      })
    }

    if (delay > 0) {
      const timeoutId = setTimeout(scrollToTop, delay)
      return () => clearTimeout(timeoutId)
    } else {
      scrollToTop()
    }
  }, [pathname, smooth, delay, condition])
}

/**
 * Function to manually scroll to top
 * @param smooth Whether to use smooth scrolling
 */
export const scrollToTop = (smooth: boolean = true) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: (smooth && !prefersReducedMotion) ? 'smooth' : 'auto'
  })
}

/**
 * Function to scroll to a specific element
 * @param elementId ID of the element to scroll to
 * @param smooth Whether to use smooth scrolling
 * @param offset Optional offset from the top (useful for fixed headers)
 */
export const scrollToElement = (elementId: string, smooth: boolean = true, offset: number = 0) => {
  const element = document.getElementById(elementId)
  if (!element) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const elementPosition = element.offsetTop - offset

  window.scrollTo({
    top: elementPosition,
    left: 0,
    behavior: (smooth && !prefersReducedMotion) ? 'smooth' : 'auto'
  })
}
