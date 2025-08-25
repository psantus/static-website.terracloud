import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Calendar, Video, Phone, MapPin, CheckCircle } from 'lucide-react'
import { getTranslationItems, BenefitItem } from '../types/translations'

const BookAppointment = () => {
  const { t } = useTranslation()
  const [showBookingWidget, setShowBookingWidget] = useState(false)

  // Get benefits safely
  const benefitsList = getTranslationItems<BenefitItem>(t, 'appointment.benefitsList')

  const meetingTypes = [
    { value: 'video', label: t('appointment.meetingTypes.video'), icon: <Video className="h-5 w-5" /> },
    { value: 'phone', label: t('appointment.meetingTypes.phone'), icon: <Phone className="h-5 w-5" /> },
    { value: 'onsite', label: t('appointment.meetingTypes.onsite'), icon: <MapPin className="h-5 w-5" /> }
  ]

  return (
    <>
      <Helmet>
        <title>{t('appointment.title')}</title>
        <meta name="description" content={t('appointment.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-terracloud-blue to-terracloud-orange text-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {t('appointment.hero.title')}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {t('appointment.hero.description')}
            </p>
            <div className="flex items-center justify-center text-blue-100">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>{t('appointment.hero.benefits')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <h2 className="text-3xl font-bold text-terracloud-dark mb-8">
                {t('appointment.whySchedule')}
              </h2>
              
              <div className="space-y-6 mb-8">
                {benefitsList.map((benefit: BenefitItem, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-12 h-12 ${
                      index === 0 ? 'bg-terracloud-orange/10' :
                      index === 1 ? 'bg-terracloud-blue/10' :
                      index === 2 ? 'bg-green-500/10' :
                      'bg-purple-500/10'
                    } rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                      <CheckCircle className={`h-6 w-6 ${
                        index === 0 ? 'text-terracloud-orange' :
                        index === 1 ? 'text-terracloud-blue' :
                        index === 2 ? 'text-green-500' :
                        'text-purple-500'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-terracloud-dark mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-terracloud-gray">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Meeting Types */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-terracloud-dark mb-4">
                  {t('appointment.meetingTypes.title')}
                </h3>
                <div className="space-y-3">
                  {meetingTypes.map((type) => (
                    <div key={type.value} className="flex items-center">
                      <div className="text-terracloud-orange mr-3">
                        {type.icon}
                      </div>
                      <span className="text-terracloud-gray">{type.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Widget */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-terracloud-dark mb-6">
                  {t('appointment.booking.title')}
                </h2>
                
                {!showBookingWidget ? (
                  <div className="text-center">
                    <p className="text-terracloud-gray mb-6">
                      {t('appointment.booking.description')}
                    </p>
                    <button
                      onClick={() => setShowBookingWidget(true)}
                      className="btn-primary flex items-center justify-center w-full"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      {t('appointment.booking.openCalendar')}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4 flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-terracloud-dark">
                        {t('appointment.booking.chooseSlot')}
                      </h3>
                      <button
                        onClick={() => setShowBookingWidget(false)}
                        className="text-terracloud-gray hover:text-terracloud-orange transition-colors"
                      >
                        ✕ {t('appointment.booking.close')}
                      </button>
                    </div>
                    
                    {/* Microsoft Bookings Embed */}
                    <div className="w-full border rounded-lg overflow-hidden" style={{ height: '600px' }}>
                      <iframe
                        src="https://outlook.office365.com/owa/calendar/TerraCloudFaisonsconnaissance@terracloud.fr/bookings/"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        title={t('appointment.booking.iframeTitle')}
                        className="w-full h-full"
                      />
                    </div>
                    
                    <p className="text-sm text-terracloud-gray mt-4 text-center">
                      {t('appointment.booking.alternativeContact')}{' '}
                      <a href="mailto:contact@terracloud.fr" className="text-terracloud-orange hover:text-terracloud-blue">
                        contact@terracloud.fr
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BookAppointment
