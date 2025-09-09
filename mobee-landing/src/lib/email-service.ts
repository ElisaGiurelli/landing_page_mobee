import nodemailer from 'nodemailer';

interface DemoRequestData {
  nome: string;
  cognome: string;
  email: string;
  azienda: string;
  ruolo: string;
  telefono?: string;
}

// Create transporter with automatic Ethereal fallback for development
const createTransporter = async () => {
  console.log('Creating email transporter with config:', {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || '587',
    user: process.env.SMTP_USER ? 'configured' : 'missing',
    pass: process.env.SMTP_PASS ? 'configured' : 'missing',
  });

  // If we don't have proper SMTP credentials, create test account
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS || process.env.SMTP_USER === 'demo_user') {
    console.log('Creating Ethereal test account for development...');
    try {
      const testAccount = await nodemailer.createTestAccount();
      console.log('Ethereal test account created:', {
        user: testAccount.user,
        pass: testAccount.pass,
        web: testAccount.web
      });
      
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (error) {
      console.error('Failed to create test account:', error);
      // Fallback to basic configuration
    }
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Add timeout and connection options
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 5000, // 5 seconds
    socketTimeout: 10000, // 10 seconds
  });
};

// Send notification email to admin
export async function sendAdminNotification(data: DemoRequestData) {
  const transporter = await createTransporter();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nuova Richiesta Demo - Mobee</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🎯 Nuova Richiesta Demo</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Mobee - AI Talent Management</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
        <h2 style="color: #7c3aed; margin-top: 0; margin-bottom: 20px; font-size: 24px;">Dettagli del Contatto</h2>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568; width: 120px;">Nome:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${data.nome} ${data.cognome}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">Email:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">
                <a href="mailto:${data.email}" style="color: #7c3aed; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">Azienda:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${data.azienda}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">Ruolo:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${data.ruolo}</td>
            </tr>
            ${data.telefono ? `
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #4a5568;">Telefono:</td>
              <td style="padding: 12px 0; color: #2d3748;">
                <a href="tel:${data.telefono}" style="color: #7c3aed; text-decoration: none;">${data.telefono}</a>
              </td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px;">
          <p style="margin: 0; color: #92400e; font-weight: 500;">
            ⏰ <strong>Ricorda:</strong> Contattare il cliente entro 24 ore dalla richiesta.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Richiesta ricevuta il ${new Date().toLocaleString('it-IT')}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Mobee Platform" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🎯 Nuova Richiesta Demo - ${data.nome} ${data.cognome}`,
    html: htmlContent,
    text: `Nuova richiesta demo da ${data.nome} ${data.cognome}
    
Email: ${data.email}
Azienda: ${data.azienda}
Ruolo: ${data.ruolo}
${data.telefono ? `Telefono: ${data.telefono}` : ''}

Ricevuta il: ${new Date().toLocaleString('it-IT')}`,
  };

  return await transporter.sendMail(mailOptions);
}

// Send confirmation email to user
export async function sendUserConfirmation(data: DemoRequestData) {
  const transporter = await createTransporter();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Conferma Richiesta Demo - Mobee</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <div style="font-size: 48px; margin-bottom: 10px;">🐝</div>
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Grazie ${data.nome}!</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">La tua richiesta è stata ricevuta</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
        <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 25px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h2 style="color: #7c3aed; margin-top: 0; margin-bottom: 20px; font-size: 24px;">✅ Richiesta Confermata</h2>
          
          <p style="font-size: 16px; margin-bottom: 20px; color: #2d3748;">
            <strong>Grazie per il tuo interesse in Mobee!</strong>
          </p>
          
          <p style="font-size: 16px; margin-bottom: 20px; color: #2d3748;">
            Abbiamo ricevuto la tua richiesta di demo per la nostra piattaforma AI di Talent Management.
          </p>
          
          <div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; color: #0c4a6e; font-weight: 500;">
              📞 <strong>Un nostro specialista ti contatterà entro 24 ore</strong> per fissare un appuntamento personalizzato.
            </p>
          </div>
          
          <p style="font-size: 16px; margin-bottom: 15px; color: #2d3748;">
            Nel frattempo, puoi:
          </p>
          
          <ul style="color: #2d3748; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Visitare il nostro sito per scoprire di più sulle nostre funzionalità</li>
            <li style="margin-bottom: 8px;">Seguirci sui social media per gli ultimi aggiornamenti</li>
            <li style="margin-bottom: 8px;">Preparare eventuali domande specifiche sulla tua azienda</li>
          </ul>
        </div>
        
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin-bottom: 25px;">
          <p style="margin: 0; color: #92400e; font-weight: 500;">
            💡 <strong>Suggerimento:</strong> Durante la demo potrai vedere come Mobee può migliorare l'engagement e la retention nella tua azienda.
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; background: white; border-radius: 8px;">
          <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 14px;">
            Hai domande? Contattaci
          </p>
          <p style="margin: 0; color: #7c3aed; font-weight: 500;">
            📧 mobee.mirai@gmail.com<br>
            📱 +39 338 1903839
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            © 2025 Mobee - AI Talent Management Platform<br>
            Questa email è stata inviata automaticamente.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Mobee Team" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: '🐝 Conferma Richiesta Demo - Mobee AI Talent Management',
    html: htmlContent,
    text: `Ciao ${data.nome},

Grazie per il tuo interesse in Mobee!

Abbiamo ricevuto la tua richiesta di demo per la nostra piattaforma AI di Talent Management.

Un nostro specialista ti contatterà entro 24 ore per fissare un appuntamento personalizzato.

Nel frattempo, puoi visitare il nostro sito per scoprire di più sulle nostre funzionalità.

Hai domande? Contattaci:
- Email: mobee.mirai@gmail.com  
- Telefono: +39 338 1903839

A presto!
Team Mobee

---
© 2025 Mobee - AI Talent Management Platform`,
  };

  return await transporter.sendMail(mailOptions);
}