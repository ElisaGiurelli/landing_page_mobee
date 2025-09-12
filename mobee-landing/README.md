comandi per avviare cluade  npx @anthropic-ai/claude-code
per installarlo npm  install -g @anthropic-ai/claude-code

 🔄 WORKFLOW per AGGIORNARE il sito dopo modifiche

  ✅ PROCESSO AUTOMATICO (Raccomandato):

  1. Fai le tue modifiche localmente
  - Modifica i file che vuoi in mobee-landing/src/
  - Testa localmente con: npm run dev

  2. Commit e Push su GitHub:
  cd "C:\Users\elisa\landing_page_mobee\mobee-landing"
  git add .
  git commit -m "Descrivi cosa hai modificato"
  git push origin main

  3. Deploy AUTOMATICO! 🚀
  - Vercel/Netlify rileva automaticamente i cambiamenti su GitHub
  - Avvia il build e deploy automaticamente
  - Sito aggiornato in 2-3 minuti

  📱 Come monitorare il deploy:

  Vercel:
  - Dashboard: https://vercel.com/dashboard
  - Vedi lo stato del deploy in tempo reale
  - Ricevi notifiche quando è completato

  Netlify:
  - Dashboard: https://app.netlify.com
  - Log del build visibili live
  - Notifiche di deploy completato

  ⚡ Script RAPIDO per aggiornamenti:

  Puoi usare il file deploy.bat che ho già creato:

  cd "C:\Users\elisa\landing_page_mobee\mobee-landing"
  ./deploy.bat

  Questo script:
  1. ✅ Testa il build localmente
  2. ✅ Commit automatico con timestamp
  3. ✅ Push su GitHub
  4. ✅ Deploy automatico parte da solo

  🎯 ESEMPIO PRATICO:

  # 1. Vai nella directory
  cd "C:\Users\elisa\landing_page_mobee\mobee-landing"

  # 2. Modifica quello che vuoi, poi:
  git add .
  git commit -m "Aggiornato testo hero section"
  git push origin main

  # 3. Aspetta 2-3 minuti → Sito aggiornato!

  🔍 Per verificare che funzioni:

  1. Controllo locale: Il banner dice "VERSIONE TEST"
  2. Controllo remoto: Il footer mostra "v0.1.0-test"
  3. Timestamp: Ogni modifica ha un timestamp nel deploy log

  Il sistema è completamente automatizzato! Ogni push su GitHub = deploy automatico del sito. Zero configurazione aggiuntiva
  richiesta.

# Mobee - Landing Page

Sito web per la startup **Mobee**, la piattaforma AI in Italia per valorizzare i talenti aziendali.

## 🚀 Stack Tecnologico

- **Next.js 15** con App Router
- **TypeScript** per la tipizzazione
- **Tailwind CSS v4** per lo styling
- **shadcn/ui** per i componenti UI
- **Framer Motion** per le animazioni
- **Lucide React** per le icone

## 📦 Installazione

1. **Clona il repository:**
```bash
git clone <url-repository>
cd mobee-landing
```

2. **Installa le dipendenze:**
```bash
npm install
```

3. **Configura le variabili d'ambiente:**
Il file `.env.local` è già configurato con:
```
NEXT_PUBLIC_SITE_URL=https://mobee.it
```

## 🛠️ Sviluppo Locale

**Avvia il server di sviluppo:**
```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) per vedere il sito.

**Altri comandi utili:**
```bash
npm run build    # Build per produzione
npm run start    # Avvia il server di produzione
npm run lint     # Controllo del codice
```

## 🎨 Componente Landing Page

Il componente principale è già implementato in:
```
src/components/landing-page.tsx
```

**Caratteristiche del componente:**
- ✅ Design completo e responsive
- ✅ Animazioni con Framer Motion
- ✅ Componenti shadcn/ui integrati
- ✅ SEO ottimizzato
- ✅ Performance ottimizzate

**Sezioni implementate:**
- Header con navigazione
- Hero section con CTA
- Sezione problemi (statistiche)
- Sezione soluzione AI
- Funzionalità principali
- Vantaggi e metriche
- Call to Action finale
- Footer completo

## 📱 Componenti UI Disponibili

Componenti shadcn/ui già configurati e utilizzati:
- **Button** (`@/components/ui/button`)
- **Badge** (`@/components/ui/badge`) 
- **Card** (`@/components/ui/card`)
- **Input** (`@/components/ui/input`)

**Per aggiungere altri componenti:**
```bash
npx shadcn@latest add [nome-componente]
```

## 🚀 Deployment su Vercel

### Deploy Automatico

1. **Connetti il repository a Vercel:**
   - Vai su [vercel.com](https://vercel.com)
   - Importa il repository Git
   - Vercel rileverà automaticamente Next.js

2. **Configura il dominio personalizzato:**
   - Nelle impostazioni del progetto su Vercel
   - Aggiungi `mobee.it` come dominio personalizzato
   - Configura i DNS secondo le istruzioni Vercel

### Deploy Manuale

```bash
# Installa Vercel CLI (se non già installato)
npm i -g vercel

# Deploy
npm run deploy-vercel
```

## 🔍 SEO e Performance

Il progetto è ottimizzato per:

- **SEO**: Metadata completi in italiano, OpenGraph, Twitter Cards
- **Performance**: Immagini ottimizzate, font precaricati, build ottimizzata
- **Lighthouse**: Configurazione per punteggi elevati
- **Sicurezza**: Header di sicurezza configurati

## 📄 File Configurati

- `src/app/layout.tsx` - Layout principale con SEO completo
- `src/app/page.tsx` - Homepage che importa LandingPage
- `src/components/landing-page.tsx` - Componente landing page completo
- `vercel.json` - Configurazione deployment
- `public/robots.txt` - Configurazione crawler
- `public/sitemap.xml` - Mappa del sito
- `.env.local` - Variabili d'ambiente

## 🎯 Struttura Componente

La landing page include:

### Hero Section
- Titolo principale coinvolgente
- Badge certificazione AI
- Due CTA button principali
- Visual dashboard mockup animato

### Problem Section
- Statistiche reali del settore
- Cards con dati impattanti
- Fonti credibili

### Solution Section
- Presentazione della piattaforma AI
- Funzionalità chiave visuali
- Background animato

### Features Section
- 3 funzionalità principali
- Icons e descrizioni dettagliate
- Benefici specifici per ognuna

### Benefits Section
- 4 vantaggi misurabili
- Metriche concrete
- Dashboard performance mockup

### CTA & Footer
- Call to action finale
- Footer completo con contatti
- Newsletter signup

## 🐛 Risoluzione Problemi

**Errori di build:**
- Controlla che tutti i componenti abbiano le importazioni corrette
- Verifica la sintassi TypeScript
- Assicurati che `"use client"` sia presente nei componenti interattivi

**Problemi di styling:**
- Verifica che le classi Tailwind siano scritte correttamente
- Controlla che i componenti shadcn/ui siano importati correttamente

**Problemi di performance:**
- Le immagini sono già ottimizzate con placeholder
- Lazy loading implementato dove necessario
- Animazioni ottimizzate per performance

## 📞 Informazioni di Contatto

Il footer include:
- **Email**: mobee.mirai@gmail.com
- **Telefono**: +39 338 1903839
- **Sede**: Milano, Italia

---

**Sviluppato per Mobee - AI Talent Management Platform**
