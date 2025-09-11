# Configurazione Variabili d'Ambiente su Vercel

## Problema Risolto
L'errore "Configurazione email non disponibile" si verifica quando le variabili d'ambiente SMTP non sono configurate su Vercel.

## Variabili d'Ambiente Necessarie

### Obbligatoria
- `ADMIN_EMAIL` - Email dove ricevere le notifiche delle richieste demo

### Opzionali (per SMTP personalizzato)
- `SMTP_HOST` - Server SMTP (default: smtp.gmail.com)
- `SMTP_PORT` - Porta SMTP (default: 587) 
- `SMTP_USER` - Username per l'autenticazione SMTP
- `SMTP_PASS` - Password per l'autenticazione SMTP

## Come Configurare su Vercel

### Metodo 1: Dashboard Vercel (Consigliato)
1. Vai su [vercel.com](https://vercel.com)
2. Seleziona il tuo progetto
3. Vai in **Settings** > **Environment Variables**
4. Aggiungi le variabili:

```
ADMIN_EMAIL = tua-email@esempio.com
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = tua-email@gmail.com  
SMTP_PASS = tua-app-password
```

### Metodo 2: Vercel CLI
```bash
# Installa Vercel CLI se non ce l'hai
npm i -g vercel

# Aggiungi le variabili
vercel env add ADMIN_EMAIL
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASS

# Rideploy per applicare le modifiche
vercel --prod
```

## Configurazione Gmail (Consigliata)

### 1. Abilita Autenticazione a Due Fattori
- Vai su [Google Account Security](https://myaccount.google.com/security)
- Abilita "2-Step Verification"

### 2. Genera App Password
- Vai su [App Passwords](https://myaccount.google.com/apppasswords)
- Seleziona "Mail" e "Other"
- Copia la password generata (16 caratteri)

### 3. Usa Queste Configurazioni
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tua-email@gmail.com
SMTP_PASS=la-app-password-generata
```

## Fallback Automatico
Se le variabili SMTP non sono configurate, il sistema:
- Userà account di test Ethereal automaticamente
- Le email saranno visibili solo nei log
- La funzionalità non si bloccherà

## Test della Configurazione
Dopo aver configurato le variabili:
1. Rideploy il progetto su Vercel
2. Prova a inviare una richiesta demo
3. Controlla i log di Vercel per vedere i dettagli

## Log Debug
I log ora mostrano:
```
=== EMAIL CONFIGURATION CHECK ===
SMTP_HOST: configured/missing
SMTP_USER: configured/missing  
SMTP_PASS: configured/missing
ADMIN_EMAIL: configured/missing
NODE_ENV: production
VERCEL: 1
==================================
```

## Verifica Funzionamento
✅ Email inviata correttamente
✅ Log dettagliato in console
✅ Fallback automatico funzionante
✅ Nessun errore 500 bloccante