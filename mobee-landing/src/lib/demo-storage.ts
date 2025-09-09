import fs from 'fs';
import path from 'path';

interface DemoRequest {
  timestamp: string;
  nome: string;
  cognome: string;
  email: string;
  azienda: string;
  ruolo: string;
  telefono?: string;
}

// Save demo request to local file (fallback when email fails)
export async function saveDemoRequest(data: DemoRequest) {
  try {
    const filename = 'demo-requests.json';
    const filePath = path.join(process.cwd(), filename);
    
    let requests: DemoRequest[] = [];
    
    // Read existing requests
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        requests = JSON.parse(fileContent);
      } catch (error) {
        console.error('Error reading existing requests:', error);
        requests = [];
      }
    }
    
    // Add new request
    requests.push({
      ...data,
      timestamp: new Date().toISOString()
    });
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));
    
    console.log(`Demo request saved to ${filename}`);
    return true;
    
  } catch (error) {
    console.error('Error saving demo request:', error);
    return false;
  }
}