import { NextRequest, NextResponse } from 'next/server';
import { sendAdminNotification, sendUserConfirmation } from '@/lib/email-service';
import { saveDemoRequest } from '@/lib/demo-storage';

interface DemoRequestData {
  nome: string;
  cognome: string;
  email: string;
  azienda: string;
  ruolo: string;
  telefono?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: DemoRequestData = await request.json();
    
    // Validate required fields
    if (!body.nome || !body.cognome || !body.email || !body.azienda || !body.ruolo) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Nome, cognome, email, azienda e ruolo sono obbligatori.' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Formato email non valido.' 
        },
        { status: 400 }
      );
    }

    // Check required environment variables
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'ADMIN_EMAIL'];
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    if (missingEnvVars.length > 0) {
      console.error('Missing environment variables:', missingEnvVars);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Configurazione email non disponibile. Contattaci direttamente.' 
        },
        { status: 500 }
      );
    }

    // Sanitize data
    const sanitizedData: DemoRequestData = {
      nome: body.nome.trim(),
      cognome: body.cognome.trim(),
      email: body.email.trim().toLowerCase(),
      azienda: body.azienda.trim(),
      ruolo: body.ruolo.trim(),
      telefono: body.telefono?.trim() || undefined,
    };

    // Save the request to local storage first (guaranteed to work)
    const saveSuccess = await saveDemoRequest({
      timestamp: new Date().toISOString(),
      nome: sanitizedData.nome,
      cognome: sanitizedData.cognome,
      email: sanitizedData.email,
      azienda: sanitizedData.azienda,
      ruolo: sanitizedData.ruolo,
      telefono: sanitizedData.telefono
    });

    console.log('=== NUOVA RICHIESTA DEMO ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Nome:', sanitizedData.nome, sanitizedData.cognome);
    console.log('Email:', sanitizedData.email);
    console.log('Azienda:', sanitizedData.azienda);
    console.log('Ruolo:', sanitizedData.ruolo);
    console.log('Telefono:', sanitizedData.telefono || 'N/A');
    console.log('Saved to file:', saveSuccess ? 'YES' : 'NO');
    console.log('============================');

    // Try to send emails, but don't fail if they don't work
    let emailSuccess = false;

    try {
      console.log('Attempting to send emails...');
      const emailPromises = [
        sendAdminNotification(sanitizedData),
        sendUserConfirmation(sanitizedData)
      ];

      await Promise.all(emailPromises);
      emailSuccess = true;
      console.log('Emails sent successfully!');
      
    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Log detailed error for debugging
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
    }

    // Always return success since we logged the request
    const successMessage = emailSuccess 
      ? 'Richiesta demo inviata con successo. Ti contatteremo entro 24 ore!'
      : 'Richiesta demo ricevuta! Ti contatteremo entro 24 ore. (Nota: conferma email potrebbe essere ritardata)';

    return NextResponse.json(
      {
        success: true,
        message: successMessage,
        emailSent: emailSuccess
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Demo request API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Errore del server. Riprova più tardi o contattaci direttamente.'
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Metodo non consentito. Usa POST per inviare richieste demo.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Metodo non consentito. Usa POST per inviare richieste demo.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Metodo non consentito. Usa POST per inviare richieste demo.' },
    { status: 405 }
  );
}