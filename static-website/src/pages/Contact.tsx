import {useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'
import {Clock, Mail, MapPin, Phone, Send} from 'lucide-react'

const Contact = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create mailto link with form data
    const subjectLabels: { [key: string]: string } = {
      'architecture-cloud': t('contact.form.subjects.architectureCloud'),
      'migration-aws': t('contact.form.subjects.migrationAws'),
      'devops': t('contact.form.subjects.devops'),
      'formation': t('contact.form.subjects.formation'),
      'cto-partage': t('contact.form.subjects.ctoPartage'),
      'autre': t('contact.form.subjects.autre')
    }

    const subject = `${formData.subject ? `[${subjectLabels[formData.subject]}] ` : ''}${t('contact.form.subjects.architectureCloud')}`
    const body = `${t('common.contact')},

${t('contact.form.name')}: ${formData.name}
${t('contact.form.email')}: ${formData.email}
${formData.company ? `${t('contact.form.company')}: ${formData.company}` : ''}

${t('contact.form.message')}:
${formData.message}

---
${t('contact.form.required')}`

    // Open email client
    window.location.href = `mailto:${t('contact.contactInfo.email.value')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Reset form after a short delay
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      })
    }, 1000)
  }

  const faqQuestions = t('contact.faq.questions', { returnObjects: true }) as Array<{question: string, answer: string}>

  return (
    <>
      <Helmet>
        <title>{t('contact.title')}</title>
        <meta name="description" content={t('contact.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-terracloud-dark to-gray-800 text-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {t('contact.hero.title')}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {t('contact.hero.description')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-terracloud-dark mb-8">
                {t('contact.stayInTouch')}
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-terracloud-orange/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="h-6 w-6 text-terracloud-orange" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-terracloud-dark mb-1">{t('contact.contactInfo.email.title')}</h3>
                    <a 
                      href={`mailto:${t('contact.contactInfo.email.value')}`}
                      className="text-terracloud-gray hover:text-terracloud-orange transition-colors"
                    >
                      {t('contact.contactInfo.email.value')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-terracloud-blue/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="h-6 w-6 text-terracloud-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-terracloud-dark mb-1">{t('contact.contactInfo.phone.title')}</h3>
                    <a 
                      href={`tel:${t('contact.contactInfo.phone.value')}`}
                      className="text-terracloud-gray hover:text-terracloud-orange transition-colors"
                    >
                      {t('contact.contactInfo.phone.value')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-terracloud-dark mb-1">{t('contact.contactInfo.location.title')}</h3>
                    <p className="text-terracloud-gray">
                      {t('contact.contactInfo.location.value')}<br />
                      <span className="text-sm">{t('contact.contactInfo.location.subtitle')}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-terracloud-dark mb-1">{t('contact.contactInfo.hours.title')}</h3>
                    <p className="text-terracloud-gray">
                      {t('contact.contactInfo.hours.value')}<br />
                      <span className="text-sm">{t('contact.contactInfo.hours.subtitle')}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-terracloud-dark mb-4">
                  {t('contact.quickActions.title')}
                </h3>
                <div className="space-y-3">
                  <a 
                    href="/prendre-rendez-vous"
                    className="block w-full btn-primary text-center"
                  >
                    {t('contact.quickActions.appointment')}
                  </a>
                  <a 
                    href={`mailto:${t('contact.contactInfo.email.value')}?subject=${encodeURIComponent(t('contact.form.subjects.architectureCloud'))}`}
                    className="block w-full btn-secondary text-center"
                  >
                    {t('contact.quickActions.email')}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-terracloud-dark mb-6">
                  {t('contact.form.title')}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-terracloud-dark mb-2">
                        {t('contact.form.name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracloud-orange focus:border-transparent"
                        placeholder={t('contact.form.placeholders.name')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-terracloud-dark mb-2">
                        {t('contact.form.email')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracloud-orange focus:border-transparent"
                        placeholder={t('contact.form.placeholders.email')}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-terracloud-dark mb-2">
                      {t('contact.form.company')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracloud-orange focus:border-transparent"
                      placeholder={t('contact.form.placeholders.company')}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-terracloud-dark mb-2">
                      {t('contact.form.subject')} *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracloud-orange focus:border-transparent"
                    >
                      <option value="">{t('contact.form.placeholders.subject')}</option>
                      <option value="architecture-cloud">{t('contact.form.subjects.architectureCloud')}</option>
                      <option value="migration-aws">{t('contact.form.subjects.migrationAws')}</option>
                      <option value="devops">{t('contact.form.subjects.devops')}</option>
                      <option value="formation">{t('contact.form.subjects.formation')}</option>
                      <option value="cto-partage">{t('contact.form.subjects.ctoPartage')}</option>
                      <option value="autre">{t('contact.form.subjects.autre')}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-terracloud-dark mb-2">
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracloud-orange focus:border-transparent resize-none"
                      placeholder={t('contact.form.placeholders.message')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    {t('contact.form.send')}
                  </button>
                </form>

                <p className="text-sm text-terracloud-gray mt-4 text-center">
                  {t('contact.form.required')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-terracloud-dark mb-4">
              {t('contact.faq.title')}
            </h2>
            <p className="text-xl text-terracloud-gray">
              {t('contact.faq.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqQuestions.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-terracloud-dark mb-2">
                  {faq.question}
                </h3>
                <p className="text-terracloud-gray">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
