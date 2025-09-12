import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MoobeLogo from "@/components/ui/mobee-logo";

export const metadata: Metadata = {
  title: "Termini di Servizio - MOOBEE | Condizioni d'uso",
  description:
    "Termini e condizioni di utilizzo della piattaforma MOOBEE AI Talent Management. Scopri i tuoi diritti e doveri nell'uso della nostra piattaforma.",
  openGraph: {
    title: "Termini di Servizio - MOOBEE",
    description: "Termini e condizioni di utilizzo della piattaforma MOOBEE AI Talent Management",
    url: "https://moobee.it/termini-servizio",
  }
};

export default function TerminiServizioPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Termini di Servizio
          </h1>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                1. Informazioni Generali
              </h2>
              <p className="text-gray-600 leading-relaxed">
                I presenti Termini di Servizio regolano l'utilizzo della
                piattaforma <strong>Moobee</strong>, un software SaaS per il
                talent management basato su intelligenza artificiale, fornito da
                Moobee con sede in Roma e Napoli, Italia.
              </p>
              <p className="text-gray-600 leading-relaxed">
                L'utilizzo della piattaforma implica l'accettazione integrale
                dei presenti termini.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                2. Descrizione del Servizio
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Moobee è una piattaforma AI per il talent management che offre:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>
                  <strong>Assistant AI e Alert:</strong> Assistente virtuale per
                  team leader e HR con notifiche e report automatici
                </li>
                <li>
                  <strong>Allocazioni Intelligenti:</strong> Sistema di matching
                  tra risorse interne e necessità aziendali
                </li>
                <li>
                  <strong>Skill Gap Analysis:</strong> Valutazione AI delle
                  competenze con suggerimenti personalizzati
                </li>
                <li>
                  <strong>Dashboard e Analytics:</strong> Strumenti di
                  monitoraggio e analisi dei talenti
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                3. Registrazione e Account
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>
                  La registrazione richiede informazioni accurate e complete
                </li>
                <li>
                  L'utente è responsabile della sicurezza delle proprie
                  credenziali
                </li>
                <li>
                  Un account può essere utilizzato solo dall'azienda registrata
                </li>
                <li>
                  È vietata la condivisione dell'account con terze parti non
                  autorizzate
                </li>
                <li>
                  Moobee si riserva il diritto di sospendere account in caso di
                  violazioni
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                4. Utilizzo Accettabile
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-red-800 mb-2">
                  È espressamente vietato:
                </h4>
                <ul className="list-disc pl-6 space-y-1 text-red-700 text-sm">
                  <li>
                    Utilizzare il servizio per attività illegali o non etiche
                  </li>
                  <li>Tentare di accedere a dati non autorizzati</li>
                  <li>Compromettere la sicurezza della piattaforma</li>
                  <li>Caricare malware, virus o codice dannoso</li>
                  <li>
                    Utilizzare il servizio per spam o attività commerciali non
                    consentite
                  </li>
                  <li>Reverse engineering del software</li>
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed">
                L'utilizzo deve essere conforme alle leggi vigenti e alle
                politiche aziendali interne.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                5. Dati e Privacy
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>I dati caricati rimangono di proprietà del cliente</li>
                <li>
                  Moobee tratta i dati secondo la Privacy Policy e il GDPR
                </li>
                <li>
                  Il cliente è responsabile della lawfulness dei dati caricati
                </li>
                <li>
                  Backup automatici vengono eseguiti per garantire la continuità
                  del servizio
                </li>
                <li>I dati sono crittografati in transito e a riposo</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                6. Piani di Abbonamento e Pagamenti
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>
                  <strong>Piani disponibili:</strong> Starter, Professional,
                  Enterprise (dettagli su richiesta)
                </li>
                <li>
                  <strong>Fatturazione:</strong> Mensile o annuale in base al
                  piano scelto
                </li>
                <li>
                  <strong>Pagamenti:</strong> Tramite bonifico bancario o carta
                  di credito
                </li>
                <li>
                  <strong>Rinnovo automatico:</strong> L'abbonamento si rinnova
                  automaticamente salvo disdetta
                </li>
                <li>
                  <strong>Rimborsi:</strong> Secondo le politiche specifiche del
                  piano sottoscritto
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                7. Disponibilità del Servizio
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Moobee si impegna a fornire:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>
                  <strong>Uptime target:</strong> 99.5% su base mensile
                </li>
                <li>
                  <strong>Manutenzioni programmate:</strong> Comunicate con
                  almeno 48h di preavviso
                </li>
                <li>
                  <strong>Supporto tecnico:</strong> Durante orari di ufficio
                  (9:00-18:00, giorni lavorativi)
                </li>
                <li>
                  <strong>Backup:</strong> Eseguiti giornalmente con retention
                  di 30 giorni
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                8. Proprietà Intellettuale
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>
                  Il software Moobee e tutti i relativi diritti rimangono
                  proprietà di Moobee
                </li>
                <li>
                  Il cliente riceve una licenza non esclusiva per l'utilizzo del
                  servizio
                </li>
                <li>I dati del cliente rimangono di sua esclusiva proprietà</li>
                <li>
                  Gli insights generati dall'AI sono di proprietà del cliente
                </li>
                <li>
                  È vietata la riproduzione o distribuzione non autorizzata del
                  software
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                9. Limitazioni di Responsabilità
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Importante:</strong> Il servizio viene fornito "as is"
                  senza garanzie implicite o esplicite.
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
                <li>
                  Moobee non è responsabile per danni indiretti o consequenziali
                </li>
                <li>
                  La responsabilità massima è limitata all'importo pagato negli
                  ultimi 12 mesi
                </li>
                <li>
                  Il cliente è responsabile per l'uso appropriato dei
                  suggerimenti dell'AI
                </li>
                <li>Moobee non garantisce risultati specifici di business</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                10. Risoluzione e Cancellazione
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>
                  <strong>Disdetta:</strong> 30 giorni di preavviso scritto
                </li>
                <li>
                  <strong>Risoluzione per inadempimento:</strong> 15 giorni per
                  sanare eventuali violazioni
                </li>
                <li>
                  <strong>Conservazione dati:</strong> 90 giorni dopo la
                  cancellazione per recupero
                </li>
                <li>
                  <strong>Cancellazione definitiva:</strong> Su richiesta
                  esplicita del cliente
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                11. Modifiche ai Termini
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Moobee si riserva il diritto di modificare i presenti termini
                con preavviso di 30 giorni. Le modifiche sostanziali saranno
                comunicate via email. Il continuato utilizzo del servizio
                costituisce accettazione delle modifiche.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                12. Legge Applicabile e Foro
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>
                  <strong>Legge applicabile:</strong> Repubblica Italiana
                </li>
                <li>
                  <strong>Foro competente:</strong> Tribunale di Roma
                </li>
                <li>
                  <strong>Lingua contrattuale:</strong> Italiano
                </li>
                <li>
                  <strong>Risoluzione controversie:</strong> Mediazione prima di
                  azione legale
                </li>
              </ul>
            </section>

            <section className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-semibold text-purple-800 mb-2">Contatti</h3>
              <p className="text-purple-700">
                Per domande sui termini di servizio:
              </p>
              <div className="mt-2 text-purple-700">
                <p>
                  <strong>Email:</strong> mobee.mirai@gmail.com
                </p>
                <p>
                  <strong>Telefono:</strong> +39 338 1903839
                </p>
                <p>
                  <strong>Indirizzo:</strong> Roma, Italia
                </p>
              </div>
            </section>

            <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-gray-800 mb-2">
                Clausola di Salvaguardia
              </h3>
              <p className="text-gray-600 text-sm">
                Qualora una clausola dei presenti termini risultasse nulla o
                inefficace, la validità delle restanti clausole non sarà
                compromessa. Le parti si impegnano a sostituire la clausola
                invalida con una valida di contenuto il più possibile
                equivalente.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Ultima modifica:{" "}
              {new Date().toLocaleDateString("it-IT", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-gray-500 mt-1">Versione: 1.0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
