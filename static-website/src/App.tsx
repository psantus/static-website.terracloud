import { Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useEffect, Suspense, lazy } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import RedirectHandler from './components/RedirectHandler'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const BookAppointment = lazy(() => import('./pages/BookAppointment'))
const CustomerReferences = lazy(() => import('./pages/CustomerReferences'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Service pages - lazy loaded
const DevOps = lazy(() => import('./pages/services/DevOps'))
const PartTimeCTO = lazy(() => import('./pages/services/PartTimeCTO'))
const CloudStart = lazy(() => import('./pages/services/CloudStart'))
const AWSArchitect = lazy(() => import('./pages/services/AWSArchitect'))
const SoftwareArchitecture = lazy(() => import('./pages/services/SoftwareArchitecture'))
const AWSMigration = lazy(() => import('./pages/services/AWSMigration'))
const AWSTraining = lazy(() => import('./pages/services/AWSTraining'))

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracloud-orange"></div>
  </div>
)

function App() {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  // Detect language from URL and set it
  useEffect(() => {
    const isEnglishPath = location.pathname.startsWith('/en/')
    const targetLang = isEnglishPath ? 'en' : 'fr'
    
    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang)
    }
  }, [location.pathname, i18n])

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <html lang={i18n.language} />
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <RedirectHandler />
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
          {/* French routes (default, no prefix) */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/devops" element={<DevOps />} />
          <Route path="/services/cto-a-temps-partage-a-poitiers-freelance" element={<PartTimeCTO />} />
          <Route path="/services/demarrer-sur-le-cloud" element={<CloudStart />} />
          <Route path="/services/architecte-solutions-aws" element={<AWSArchitect />} />
          <Route path="/services/architecture-logicielle" element={<SoftwareArchitecture />} />
          <Route path="/services/migration-vers-aws" element={<AWSMigration />} />
          <Route path="/services/formation-aws" element={<AWSTraining />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/a-propos/ils-nous-font-confiance" element={<CustomerReferences />} />
          <Route path="/nous-contacter" element={<Contact />} />
          <Route path="/prendre-rendez-vous" element={<BookAppointment />} />
          <Route path="/mentions-legales" element={<Legal />} />
          
          {/* English routes with /en prefix - SAME URLs as French */}
          <Route path="/en/" element={<Home />} />
          <Route path="/en/services" element={<Services />} />
          <Route path="/en/services/devops" element={<DevOps />} />
          <Route path="/en/services/cto-a-temps-partage-a-poitiers-freelance" element={<PartTimeCTO />} />
          <Route path="/en/services/demarrer-sur-le-cloud" element={<CloudStart />} />
          <Route path="/en/services/architecte-solutions-aws" element={<AWSArchitect />} />
          <Route path="/en/services/architecture-logicielle" element={<SoftwareArchitecture />} />
          <Route path="/en/services/migration-vers-aws" element={<AWSMigration />} />
          <Route path="/en/services/formation-aws" element={<AWSTraining />} />
          <Route path="/en/blog" element={<Blog />} />
          <Route path="/en/blog/:slug" element={<BlogPost />} />
          <Route path="/en/a-propos" element={<About />} />
          <Route path="/en/a-propos/ils-nous-font-confiance" element={<CustomerReferences />} />
          <Route path="/en/nous-contacter" element={<Contact />} />
          <Route path="/en/prendre-rendez-vous" element={<BookAppointment />} />
          <Route path="/en/mentions-legales" element={<Legal />} />
          
          {/* 404 for any other routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      
      <Footer />
    </div>
  )
}

export default App
