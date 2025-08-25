import { Helmet } from 'react-helmet-async'
import { useCanonicalUrl } from '../hooks/useCanonicalUrl'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogType?: string
  noIndex?: boolean
  canonical?: string // Custom canonical URL for blog posts or other special cases
}

const SEO = ({ 
  title, 
  description, 
  keywords = "AWS, Cloud, DevOps, Architecture, Formation, Migration, Terraform, Kubernetes",
  ogImage,
  ogType = "website",
  noIndex = false,
  canonical: customCanonical
}: SEOProps) => {
  const { canonical, alternates, currentLang } = useCanonicalUrl(customCanonical)
  
  // Default og:image based on environment
  const defaultOgImage = `${import.meta.env.VITE_BASE_URL || 
    (typeof window !== 'undefined' ? window.location.origin : 'https://web.terracloud.fr')}/logo-orange.png`
  
  const finalOgImage = ogImage || defaultOgImage
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="TerraCloud" />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Alternate language URLs - only if not using custom canonical */}
      {!customCanonical && (
        <>
          <link rel="alternate" hrefLang="fr" href={alternates.fr} />
          <link rel="alternate" hrefLang="en" href={alternates.en} />
          <link rel="alternate" hrefLang="x-default" href={alternates.fr} />
        </>
      )}
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:locale" content={currentLang === 'en' ? 'en_US' : 'fr_FR'} />
      <meta property="og:site_name" content="TerraCloud" />
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />
      
      {/* Language meta tag */}
      <html lang={currentLang} />
    </Helmet>
  )
}

export default SEO
