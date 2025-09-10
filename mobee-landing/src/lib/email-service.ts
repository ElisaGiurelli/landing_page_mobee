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
        <div style="margin-bottom: 10px;">
          <svg width="48" height="48" viewBox="0 0 1161 811" style="display: inline-block;">
            <g transform="matrix(1,0,0,1,-1159.43,-815.332)">
              <g>
                <g transform="matrix(4.16667,0,0,4.16667,-1411.14,525.406)">
                  <path d="M669.801,152.581C669.801,152.581 613.81,115.127 645.677,82.98C686.538,53.44 716.663,125.004 716.663,125.004C716.663,125.004 724.859,114.616 734.323,114.5C741.364,82.527 762.135,85.289 764.218,85.413C768.061,85.743 769.317,89.756 767.912,91.761C764.719,96.321 743.442,102.381 745.058,112.769C746.75,117.521 778.552,114.229 780.369,146.491C781.045,181.455 734.554,179.389 734.554,179.389C734.554,179.389 739.748,216.325 715.74,233.639C691.732,250.953 645.331,250.491 645.331,250.491L616.937,263.996L630.788,236.409C630.788,236.409 624.497,196.876 640.887,174.253C657.277,151.63 669.801,152.581 669.801,152.581ZM756.8,131.265C753.782,131.265 751.333,133.714 751.333,136.731C751.333,139.749 753.782,142.198 756.8,142.198C759.817,142.198 762.267,139.749 762.267,136.731C762.267,133.714 759.817,131.265 756.8,131.265ZM678.776,162.735L666.028,168.814L714.428,217.666L720.899,204.742L678.776,162.735ZM654.494,178.504L646.284,188.425L692.686,235L704.486,227.714L654.494,178.504ZM640.908,204.829L640.555,223.207L659.939,242.043L676.606,240.586L640.908,204.829ZM685.644,151.065L708.451,155.405L709.098,135.368C709.098,135.368 683.943,67.698 654.063,88.551C625.454,119.216 685.644,151.065 685.644,151.065Z" fill="#ffffff"/>
                </g>
                <g transform="matrix(4.16667,0,0,4.16667,-1522.95,597.879)">
                  <g transform="matrix(1,0,0,1,0.974519,-0.242063)">
                    <path d="M790.497,213.653C793.846,214.041 796.71,221.708 793.709,223.243C789.013,225.643 768.062,228.719 762.321,228.054C759.236,227.696 756.499,220.664 759.265,219.251C763.961,216.851 784.757,212.988 790.497,213.653Z" fill="#ffffff"/>
                  </g>
                  <g transform="matrix(1,0,0,1,49.1506,-12.4279)">
                    <path d="M782.57,206.543C786.004,206.032 790.923,212.271 788.716,214.952C785.644,218.683 769.055,228.199 764.137,228.931C760.581,229.46 756.92,222.117 759.205,219.342C762.277,215.61 777.651,207.274 782.57,206.543Z" fill="#ffffff"/>
                  </g>
                  <g transform="matrix(1,0,0,1,87.3038,-37.8161)">
                    <path d="M779.024,200.018C782.232,198.365 789.479,202.768 788.007,206.064C785.841,210.914 770.828,226.647 766.028,229.12C762.863,230.751 757.753,224.153 759.205,220.902C761.371,216.052 774.223,202.491 779.024,200.018Z" fill="#ffffff"/>
                  </g>
                  <g transform="matrix(1,0,0,1,117.499,-76.6911)">
                    <path d="M768.312,201.403C771.348,198.778 780.01,200.388 779.973,204.402C779.931,209.067 771.736,226.216 768.059,229.397C765.099,231.958 757.876,227.402 757.912,223.487C757.954,218.822 764.635,204.584 768.312,201.403Z" fill="#ffffff"/>
                  </g>
                </g>
                <g transform="matrix(5.81474,0,0,5.81474,-3014.32,565.848)">
                  <path d="M898.355,42.905C900.444,55.836 906.852,64.316 917.411,68.777C906.725,69.702 898.146,76.277 891.87,89.024C890.586,77.427 884.421,69.258 872.55,63.484C885.285,61.293 893.913,54.272 898.355,42.905Z" fill="#ffd700"/>
                </g>
              </g>
            </g>
          </svg>
        </div>
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
    subject: 'Conferma Richiesta Demo - Mobee AI Talent Management',
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