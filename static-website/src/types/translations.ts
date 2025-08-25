// Utility types for translation objects with returnObjects: true

/**
 * Base interface for translation items with title and description
 */
export interface TranslationItem {
  title: string
  description: string
}

/**
 * Interface for value items (used in About page)
 */
export interface ValueItem extends TranslationItem {}

/**
 * Interface for benefit items (used in BookAppointment and service pages)
 */
export interface BenefitItem extends TranslationItem {}

/**
 * Interface for feature items (used in service pages)
 */
export interface FeatureItem extends TranslationItem {}

/**
 * Utility function to safely cast translation arrays with error handling
 * @param translationFunction - The translation function (usually `t`)
 * @param key - The translation key to retrieve
 * @param fallback - Fallback array to return if translation fails
 * @returns Typed array or fallback
 */
export function getTranslationArray<T = string>(
  translationFunction: any,
  key: string,
  fallback: T[] = []
): T[] {
  try {
    const result = translationFunction(key, { returnObjects: true })
    return Array.isArray(result) ? result : fallback
  } catch (error) {
    console.warn(`Failed to get translation array for key: ${key}`, error)
    return fallback
  }
}

/**
 * Helper function to get string arrays from translations
 * @param t - Translation function
 * @param key - Translation key
 * @returns Array of strings
 */
export function getStringArray(t: any, key: string): string[] {
  return getTranslationArray<string>(t, key, [])
}

/**
 * Helper function to get translation items with title/description structure
 * @param t - Translation function
 * @param key - Translation key
 * @returns Array of translation items
 */
export function getTranslationItems<T extends TranslationItem>(
  t: any, 
  key: string
): T[] {
  return getTranslationArray<T>(t, key, [])
}
