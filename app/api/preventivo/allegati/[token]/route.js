import { getFile } from '@/lib/quote-uploads';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET(request,{params}) {
  const {token}=await params;
  const file=await getFile(token);
  const headers={'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow','X-Content-Type-Options':'nosniff'};
  if(!file) return new Response('File non disponibile o link scaduto.',{status:404,headers});
  return new Response(file.bytes,{headers:{...headers,'Content-Type':file.metadata.type,'Content-Length':String(file.bytes.length),'Content-Disposition':`attachment; filename*=UTF-8''${encodeURIComponent(file.metadata.name)}`}});
}
