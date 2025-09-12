import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MoobeLogo from '@/components/ui/mobee-logo';

export const metadata: Metadata = {
  title: 'Privacy Policy - MOOBEE | Informativa Privacy',
  description: 'Informativa sulla privacy di MOOBEE - Come trattiamo i tuoi dati personali nella piattaforma AI per talent management.',
  openGraph: {
    title: 'Privacy Policy - MOOBEE',
    description: 'Informativa sulla privacy di MOOBEE - Come trattiamo i tuoi dati personali',
    url: 'https://moobee.it/privacy-policy',
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <MoobeLogo className="text-purple-600" width={120} height={100} />
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna al sito
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Titolare del Trattamento</h2>
              <p className="text-gray-600 leading-relaxed">
                Il Titolare del trattamento dei dati è <strong>Moobee</strong>, con sede in Roma, Italia.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Email:</strong> mobee.mirai@gmail.com<br />
                <strong>Telefono:</strong> +39 338 1903839
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Dati Personali Raccolti</h2>
              <p className="text-gray-600 leading-relaxed">
                Attraverso il nostro sito web raccogliamo i seguenti dati personali:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Dati di contatto:</strong> Nome, cognome, indirizzo email, numero di telefono, azienda</li>
                <li><strong>Dati di navigazione:</strong> Indirizzo IP, tipo di browser, pagine visitate, tempo di permanenza (tramite Google Analytics)</li>
                <li><strong>Cookie tecnici e di tracciamento:</strong> Come descritto nella nostra Cookie Policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Finalità del Trattamento</h2>
              <p className="text-gray-600 leading-relaxed">I tuoi dati personali sono trattati per le seguenti finalità:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Gestione richieste demo:</strong> Contattarti per organizzare dimostrazioni del nostro software</li>
                <li><strong>Comunicazioni commerciali:</strong> Inviarti informazioni sui nostri servizi (solo previo consenso)</li>
                <li><strong>Miglioramento del servizio:</strong> Analizzare l'utilizzo del sito per migliorare l'esperienza utente</li>
                <li><strong>Adempimenti legali:</strong> Rispettare obblighi di legge e normativi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Base Giuridica del Trattamento</h2>
              <p className="text-gray-600 leading-relaxed">Il trattamento dei tuoi dati si basa su:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Consenso:</strong> Per comunicazioni commerciali e cookie di marketing/analytics</li>
                <li><strong>Legittimo interesse:</strong> Per migliorare il servizio e la sicurezza del sito</li>
                <li><strong>Esecuzione di misure precontrattuali:</strong> Per gestire le richieste di demo e preventivi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Condivisione dei Dati</h2>
              <p className="text-gray-600 leading-relaxed">
                I tuoi dati personali non sono venduti a terze parti. Possono essere condivisi solo con:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Fornitori di servizi:</strong> Google Analytics, servizi email, hosting (solo per finalità tecniche)</li>
                <li><strong>Partner commerciali:</strong> Solo previo tuo consenso esplicito</li>
                <li><strong>Autorità competenti:</strong> Se richiesto dalla legge</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Periodo di Conservazione</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Dati di contatto:</strong> Fino a 2 anni dalla cessazione del rapporto commerciale</li>
                <li><strong>Dati di navigazione:</strong> Fino a 26 mesi (Google Analytics)</li>
                <li><strong>Cookie:</strong> Come specificato nella Cookie Policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">7. I Tuoi Diritti</h2>
              <p className="text-gray-600 leading-relaxed">
                In qualità di interessato, hai diritto a:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Accesso:</strong> Ottenere conferma dei dati trattati e una copia degli stessi</li>
                <li><strong>Rettifica:</strong> Correggere dati inesatti o incompleti</li>
                <li><strong>Cancellazione:</strong> Ottenere la cancellazione dei dati (diritto all'oblio)</li>
                <li><strong>Limitazione:</strong> Limitare il trattamento in determinate circostanze</li>
                <li><strong>Portabilità:</strong> Ricevere i dati in formato strutturato</li>
                <li><strong>Opposizione:</strong> Opporti al trattamento per motivi legittimi</li>
                <li><strong>Revoca consenso:</strong> Revocare il consenso in qualsiasi momento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Google Analytics</h2>
              <p className="text-gray-600 leading-relaxed">
                Il nostro sito utilizza Google Analytics con IP anonimizzato per analizzare il traffico. 
                I dati sono trattati in conformità alla privacy policy di Google. 
                Puoi opt-out installando il componente aggiuntivo di Google per la disattivazione di Analytics.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Sicurezza dei Dati</h2>
              <p className="text-gray-600 leading-relaxed">
                Adottiamo misure tecniche e organizzative appropriate per proteggere i tuoi dati personali 
                da accesso non autorizzato, perdita, distruzione o alterazione, inclusi:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Crittografia HTTPS per tutte le comunicazioni</li>
                <li>Accesso limitato ai dati su base need-to-know</li>
                <li>Backup regolari e sicuri</li>
                <li>Monitoraggio continuo della sicurezza</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Modifiche alla Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                Ci riserviamo il diritto di modificare questa privacy policy. 
                Le modifiche saranno pubblicate su questa pagina con indicazione della data di aggiornamento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">11. Contatti</h2>
              <p className="text-gray-600 leading-relaxed">
                Per esercitare i tuoi diritti o per qualsiasi domanda relativa al trattamento dei dati personali, 
                contattaci a:
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
                <p className="text-gray-700">
                  <strong>Email:</strong> mobee.mirai@gmail.com<br />
                  <strong>Telefono:</strong> +39 338 1903839<br />
                  <strong>Oggetto:</strong> "Richiesta Privacy/GDPR"
                </p>
              </div>
            </section>

            <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-gray-800 mb-2">Reclamo all'Autorità di Controllo</h3>
              <p className="text-gray-600">
                Hai il diritto di presentare reclamo al Garante per la Protezione dei Dati Personali se 
                ritieni che il trattamento dei tuoi dati violi il GDPR.
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Garante Privacy:</strong> <a href="https://www.gpdp.it" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">www.gpdp.it</a>
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Ultima modifica: {new Date().toLocaleDateString('it-IT', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}