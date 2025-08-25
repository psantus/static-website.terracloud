import { useState } from 'react'

interface ContactFormData {
  name: string
  email: string
  company?: string
  subject: string
  message: string
}

interface UseContactFormReturn {
  isSubmitting: boolean
  submitStatus: 'idle' | 'success' | 'error'
  errorMessage: string
  submitForm: (data: ContactFormData) => Promise<void>
  resetStatus: () => void
}

export const useContactForm = (): UseContactFormReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // This will be replaced by the actual Lambda URL from Terraform output
  const LAMBDA_URL = import.meta.env.VITE_CONTACT_FORM_URL || 'LAMBDA_URL_PLACEHOLDER'

  const submitForm = async (data: ContactFormData): Promise<void> => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Prepare the payload for the Lambda function
      const payload = {
        name: data.name.trim(),
        email: data.email.trim(),
        message: `Subject: ${data.subject}${data.company ? `\nCompany: ${data.company}` : ''}\n\nMessage:\n${data.message.trim()}`
      }

      const response = await fetch(LAMBDA_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
      console.error('Contact form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetStatus = () => {
    setSubmitStatus('idle')
    setErrorMessage('')
  }

  return {
    isSubmitting,
    submitStatus,
    errorMessage,
    submitForm,
    resetStatus
  }
}
