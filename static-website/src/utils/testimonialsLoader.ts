export interface Testimonial {
  id: string
  quote: string
  author: string
  company: string
  avatar: string
  sector: string
  project: string
}

// Multilingual testimonials loader with fallback
export async function loadTestimonials(language: string = 'fr'): Promise<Testimonial[]> {
  try {
    // Try to load from the requested language folder first
    let response = await fetch(`/testimonials/${language}/testimonials.json`)
    
    if (response.ok) {
      const testimonials: Testimonial[] = await response.json()
      return testimonials
    }
    
    // Fallback to the other language if the requested one doesn't exist
    const fallbackLanguage = language === 'fr' ? 'en' : 'fr'
    console.warn(`Testimonials not found in ${language}, trying ${fallbackLanguage}`)
    
    response = await fetch(`/testimonials/${fallbackLanguage}/testimonials.json`)
    if (response.ok) {
      const testimonials: Testimonial[] = await response.json()
      return testimonials
    }
    
    console.warn(`Could not load testimonials in any language`)
    return []
    
  } catch (error) {
    console.error('Error loading testimonials:', error)
    return []
  }
}

// Legacy function for backward compatibility
export async function loadTestimonialsLegacy(): Promise<Testimonial[]> {
  return loadTestimonials('fr')
}

export function getTestimonialById(testimonials: Testimonial[], id: string): Testimonial | undefined {
  return testimonials.find(testimonial => testimonial.id === id)
}

export function getTestimonialsBySector(testimonials: Testimonial[], sector: string): Testimonial[] {
  return testimonials.filter(testimonial => testimonial.sector.toLowerCase() === sector.toLowerCase())
}

export function getRandomTestimonials(testimonials: Testimonial[], count: number): Testimonial[] {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
