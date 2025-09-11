# 🚀 Moobe Landing Page - Guida al Deployment

## 📍 Link Attivi per Testing

### ✅ OPZIONI IMMEDIATE (Consigliato)

**1. VERCEL (Metodo più veloce)**
- Vai su: https://vercel.com
- Clicca "Import Project" 
- Connetti GitHub e seleziona: `ElisaGiurelli/landing_page_moobe`
- Vercel farà il deploy automatico
- **Link sarà pronto in 2-3 minuti**

**2. NETLIFY (Alternativa rapida)**
- Vai su: https://netlify.com
- Clicca "New site from Git"
- Connetti GitHub e seleziona: `ElisaGiurelli/landing_page_moobe` 
- Build settings:
  - Root directory: `moobe-landing`
  - Build command: `npm run build`
  - Publish directory: `.next`
- **Link sarà pronto in 3-5 minuti**

## 📋 Stato Attuale del Progetto

✅ **Build Status:** Funzionante (testato con successo)  
✅ **Git Repository:** https://github.com/ElisaGiurelli/landing_page_moobe.git  
✅ **Testing Features:** Banner test e versioning attivi  
✅ **Dependencies:** Tutte le dipendenze installate  
✅ **Next.js Config:** Configurato per deploy  

## 🛠️ Informazioni Tecniche

**Framework:** Next.js 15.5.2  
**Versione:** v0.1.0-test  
**Node Version:** Compatible with Node 18+  
**Build Output:** Static + Server-side rendering  

## 🔄 Come Aggiornare il Sito

### Per Modifiche Future:

1. **Modifica i file localmente**
2. **Commit e push:**
   ```bash
   cd "C:\Users\elisa\landing_page_mobee\moobe-landing"
   git add .
   git commit -m "Descrivi le tue modifiche"
   git push origin main
   ```
3. **Deploy automatico** (se configurato su Vercel/Netlify)

### Comandi Utili:
```bash
# Test build locale
npm run build

# Avvia in sviluppo  
npm run dev

# Deploy manuale su Vercel (se configurato)
npm run deploy-vercel
```

## 👥 Accesso per il Team

### Condivisione Link:
1. Dopo il deploy, condividi il link pubblico
2. Il sito funziona su mobile e desktop
3. Banner di test visibile per identificare versione

### Permessi Team (per gestione):
- **Vercel:** Invita membri del team dal dashboard Vercel
- **Netlify:** Aggiungi collaboratori dalle impostazioni del sito
- **GitHub:** I membri con accesso al repo possono vedere il codice

## 🚨 Troubleshooting

### Errori Comuni:

**Build Failed?**
```bash
cd moobe-landing
npm install
npm run build
# Controlla errori e correggi
```

**Immagini non caricano?**
- Verifica che le immagini siano in `/public/`
- Usa percorsi relativi: `/nome-immagine.png`

**API Routes non funzionano?**
- Vercel: Supporta API routes automaticamente  
- Netlify: Potrebbe richiedere config aggiuntiva per serverless functions

**Deploy bloccato?**
1. Controlla log di deploy sulla piattaforma
2. Verifica che `package.json` sia corretto
3. Assicurati che `next.config.ts` non abbia errori

**"No Next.js version detected" Error?**
- **Vercel:** Assicurati che sia configurato `Root Directory: moobe-landing`
- **Netlify:** Imposta `Root Directory: moobe-landing` nelle build settings
- Il progetto Next.js è nella sottocartella `moobe-landing/`, non nella root

## 🎯 Features Test Attive

- **Banner Test:** Visibile in alto per identificare versione di sviluppo
- **Version Info:** Footer mostra `v0.1.0-test`  
- **Console Logs:** API endpoints loggano richieste per debug

## 📞 Next Steps

1. **Scegli una piattaforma** (Vercel consigliato)
2. **Esegui il deploy** seguendo i passaggi sopra  
3. **Condividi il link** con il team
4. **Testa su mobile e desktop**

---

**📧 Per supporto:** Contatta il team di sviluppo  
**🔗 Repository:** https://github.com/ElisaGiurelli/landing_page_moobe  
**⚡ Status:** Ready for deployment