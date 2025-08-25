import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import type { InitOptions } from 'i18next'

// Import translation files
import frTranslations from './locales/fr.json'
import enTranslations from './locales/en.json'

const resources = {
  fr: {
    translation: frTranslations
  },
  en: {
    translation: enTranslations
  }
}

const i18nConfig: InitOptions = {
  resources,
  fallbackLng: 'fr',
  debug: false,
  
  interpolation: {
    escapeValue: false
  },
  
  detection: {
    order: ['path', 'navigator', 'localStorage'],
    lookupFromPathIndex: 0,
    caches: ['localStorage']
  },
  
  supportedLngs: ['fr', 'en']
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nConfig)

export default i18n
