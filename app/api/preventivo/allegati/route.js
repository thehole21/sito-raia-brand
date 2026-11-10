import { MAX_FILE_SIZE, validFile, storeFile } from '@/lib/quote-uploads';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'};
export async function POST(request) {
  if (process.env.VERCEL_ENV) return Response.json({error:'Carica gli allegati dal sito ufficiale www.raiaweb.it.'},{status:503,headers});
  const origin=request.headers.get('origin');
  if (origin !== 'https://www.raiaweb.it') return Response.json({error:'Richiesta non consentita.'},{status:403,headers});
  const maxBody=MAX_FILE_SIZE+64*1024;
  if (Number(request.headers.get('content-length'))>maxBody) return Response.json({error:'Il file supera 8 MB.'},{status:413,headers});
  try {
    const reader=request.body?.getReader();
    if (!reader) return Response.json({error:'File mancante.'},{status:400,headers});
    let size=0;const chunks=[];
    while (true) {
      const {done,value}=await reader.read();if(done) break;
      size+=value.length;
      if(size>maxBody){await reader.cancel();return Response.json({error:'Il file supera 8 MB.'},{status:413,headers});}
      chunks.push(value);
    }
    const form=await new Response(Buffer.concat(chunks),{headers:{'Content-Type':request.headers.get('content-type')||''}}).formData();
    const file=form.get('attachment');
    if (!file || typeof file==='string' || !file.size) return Response.json({error:'Seleziona un file valido.'},{status:400,headers});
    if(file.size>MAX_FILE_SIZE) return Response.json({error:'Il file supera 8 MB.'},{status:413,headers});
    const bytes=Buffer.from(await file.arrayBuffer());
    if (!validFile(file.name,bytes)) return Response.json({error:'Sono ammessi PDF, JPG, PNG, WebP e ZIP.'},{status:415,headers});
    return Response.json(await storeFile(file,bytes),{status:201,headers});
  } catch (error) {
    return Response.json({error:error.message==='STORAGE_FULL'?'Caricamento temporaneamente non disponibile. Inserisci un link ai file.':'Non è stato possibile caricare il file. Riprova o inserisci un link.'},{status:503,headers});
  }
}
