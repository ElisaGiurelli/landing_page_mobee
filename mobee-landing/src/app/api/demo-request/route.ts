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

    // Log environment configuration for debugging
    console.log('=== EMAIL CONFIGURATION CHECK ===');
    console.log('SMTP_HOST:', process.env.SMTP_HOST ? 'configured' : 'missing');
    console.log('SMTP_USER:', process.env.SMTP_USER ? 'configured' : 'missing');
    console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'configured' : 'missing');
    console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL ? 'configured' : 'missing');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('VERCEL:', process.env.VERCEL);
    console.log('==================================');

    // Check required environment variables (but only fail if ADMIN_EMAIL is missing)
    if (!process.env.ADMIN_EMAIL) {
      console.error('Critical: ADMIN_EMAIL environment variable is missing');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Configurazione email non disponibile. Contattaci direttamente.' 
        },
        { status: 500 }
      );
    }

    // If SMTP credentials are missing, the email service will fall back to Ethereal
    const hasSMTPCredentials = process.env.SMTP_USER && process.env.SMTP_PASS;
    if (!hasSMTPCredentials) {
      console.warn('SMTP credentials not configured, email service will use Ethereal test accounts');
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
    let emailResults: Record<string, unknown> = {};

    try {
      console.log('Attempting to send emails...');
      
      // Send admin notification
      const adminResult = await sendAdminNotification(sanitizedData);
      console.log('Admin notification result:', adminResult);
      
      // Send user confirmation
      const userResult = await sendUserConfirmation(sanitizedData);
      console.log('User confirmation result:', userResult);
      
      emailResults = { admin: adminResult, user: userResult };
      
      // Check if both emails were sent successfully
      if (adminResult.success && userResult.success) {
        emailSuccess = true;
        console.log('Both emails sent successfully!');
      } else {
        console.error('One or both emails failed:', {
          adminSuccess: adminResult.success,
          userSuccess: userResult.success,
          adminError: adminResult.error,
          userError: userResult.error
        });
      }
      
    } catch (error) {
      console.error('Email sending failed with exception:', error);
      
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