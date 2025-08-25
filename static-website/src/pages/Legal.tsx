import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const Legal = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('legal.title')}</title>
        <meta name="description" content={t('legal.description')} />
      </Helmet>

      <div className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-terracloud-dark mb-8">
              {t('legal.heading')}
            </h1>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-terracloud-dark mb-4">
                  {t('legal.companyInfo.title')}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="mb-2"><strong>{t('legal.companyInfo.name')}:</strong> TerraCloud</p>
                  <p className="mb-2"><strong>{t('legal.companyInfo.type')}:</strong> {t('legal.companyInfo.typeValue')}</p>
                  <p className="mb-2"><strong>{t('legal.companyInfo.address')}:</strong> {t('legal.companyInfo.addressValue')}</p>
                  <p className="mb-2"><strong>{t('legal.companyInfo.email')}:</strong> contact@terracloud.fr</p>
                  <p className="mb-2"><strong>{t('legal.companyInfo.phone')}:</strong> +33 6 26 08 70 41</p>
                  <p className="mb-2"><strong>{t('legal.companyInfo.director')}:</strong> Paul Santus</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-terracloud-dark mb-4">
                  Hébergement
                </h2>
                <p className="text-terracloud-gray mb-4">
                  Ce site est hébergé par Amazon Web Services (AWS) :
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="mb-2"><strong>Amazon Web Services, Inc.</strong></p>
                  <p className="mb-2">410 Terry Avenue North</p>
                  <p className="mb-2">Seattle, WA 98109</p>
                  <p className="mb-2">États-Unis</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-terracloud-dark mb-4">
                  Propriété intellectuelle
                </h2>
                <p className="text-terracloud-gray mb-4">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                  et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour 
                  les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p className="text-terracloud-gray mb-4">
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est 
                  formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-terracloud-dark mb-4">
                  Protection des données personnelles
                </h2>
                <p className="text-terracloud-gray mb-4">
                  Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement 
                  Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, 
                  de suppression et d'opposition aux données personnelles vous concernant.
                </p>
                <p className="text-terracloud-gray mb-4">
                  Les informations recueillies sur ce site sont nécessaires pour traiter votre demande. 
                  Elles sont destinées à TerraCloud et ne seront en aucun cas communiquées à des tiers.
                </p>
                <p className="text-terracloud-gray mb-4">
                  Pour exercer vos droits, vous pouvez nous contacter à l'adresse : contact@terracloud.fr
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-terracloud-dark mb-4">
                  Cookies
                </h2>
                <p className="text-terracloud-gray mb-4">
                  Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. 
                  Les cookies sont de petits fichiers texte stockés sur votre ordinateur par votre navigateur web.
                </p>
                <p className="text-terracloud-gray mb-4">
                  Nous utilisons :
                </p>
                <ul className="list-disc pl-6 text-terracloud-gray mb-4">
                  <li>Des cookies techniques nécessaires au fonctionnement du site</li>
                  <li>Des cookies d'analyse (Google Analytics) pour comprendre l'utilisation du site</li>
                </ul>
                <p className="text-terracloud-gray mb-4">
                  Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter 
                  le fonctionnement du site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-terracloud-dark mb-4">
                  Responsabilité
                </h2>
                <p className="text-terracloud-gray mb-4">
                  Les informations contenues sur ce site sont aussi précises que possible et le site est 
                  périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions 
                  ou des lacunes.
                </p>
                <p className="text-terracloud-gray mb-4">
                  Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, 
                  merci de bien vouloir le signaler par email à contact@terracloud.fr en décrivant 
                  le problème de la manière la plus précise possible.
                </p>
                <p className="text-terracloud-gray mb-4">
                  TerraCloud ne pourra en aucune manière être tenu responsable de dommages directs ou indirects 
                  qui pourraient résulter de l'accès ou de l'utilisation du site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-terracloud-dark mb-4">
                  Liens hypertextes
                </h2>
                <p className="text-terracloud-gray mb-4">
                  Le site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. 
                  Les liens vers ces autres ressources vous font quitter le site terracloud.fr.
                </p>
                <p className="text-terracloud-gray mb-4">
                  Il est possible qu'un lien ne fonctionne pas correctement ou dirige vers un site dont le contenu 
                  peut choquer. TerraCloud n'est pas responsable de ces sites externes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-terracloud-dark mb-4">
                  Droit applicable
                </h2>
                <p className="text-terracloud-gray mb-4">
                  Tant le présent site que les modalités et conditions de son utilisation sont régis par le droit 
                  français, quel que soit le lieu d'utilisation. En cas de contestation éventuelle, et après l'échec 
                  de toute tentative de recherche d'une solution amiable, les tribunaux français seront seuls compétents 
                  pour connaître de ce litige.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-terracloud-dark mb-4">
                  Contact
                </h2>
                <p className="text-terracloud-gray mb-4">
                  Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="mb-2"><strong>Email :</strong> contact@terracloud.fr</p>
                  <p className="mb-2"><strong>Téléphone :</strong> +33 6 26 08 70 41</p>
                  <p className="mb-2"><strong>Adresse :</strong> Poitiers, France</p>
                </div>
              </section>

              <div className="text-sm text-terracloud-gray border-t pt-6">
                <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Legal
