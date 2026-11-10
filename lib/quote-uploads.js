import { randomBytes } from 'node:crypto';
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const MAX_FILE_SIZE = 8 * 1024 * 1024;
export const UPLOAD_TTL = 7 * 24 * 60 * 60 * 1000;
const root = process.env.QUOTE_UPLOAD_DIR || '/app/data/quote-uploads';
const types = { pdf:'application/pdf', jpg:'image/jpeg', jpeg:'image/jpeg', png:'image/png', webp:'image/webp', zip:'application/zip' };
export function validFile(name, bytes) {
  const ext=name.split('.').pop()?.toLowerCase();
  if (!types[ext]) return null;
  const signature = ext==='pdf' ? bytes.subarray(0,5).toString()==='%PDF-' :
    ['jpg','jpeg'].includes(ext) ? bytes[0]===255 && bytes[1]===216 && bytes[2]===255 :
    ext==='png' ? bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) :
    ext==='webp' ? bytes.subarray(0,4).toString()==='RIFF' && bytes.subarray(8,12).toString()==='WEBP' :
    bytes[0]===80 && bytes[1]===75 && [3,5,7].includes(bytes[2]);
  return signature ? types[ext] : null;
}
export async function storeFile(file, bytes, now=Date.now()) {
  await mkdir(root,{recursive:true,mode:0o700});
  const entries=await readdir(root);
  if(entries.length>1000) throw new Error('STORAGE_FULL');
  let total=0;
  for (const entry of entries) if (entry.endsWith('.bin')) total+=(await stat(path.join(root,entry))).size;
  if (total+bytes.length > 512*1024*1024) throw new Error('STORAGE_FULL');
  const token=randomBytes(32).toString('hex');
  const name=path.basename(file.name).replace(/[\x00-\x1f\x7f]/g,'').slice(0,150) || 'allegato';
  const metadata={name,type:validFile(name,bytes),size:bytes.length,expires:now+UPLOAD_TTL};
  if (!metadata.type) throw new Error('UNSUPPORTED_FILE');
  await writeFile(path.join(root,token+'.bin'),bytes,{mode:0o600,flag:'wx'});
  await writeFile(path.join(root,token+'.json'),JSON.stringify(metadata),{mode:0o600,flag:'wx'});
  return {name,url:'https://www.raiaweb.it/api/preventivo/allegati/'+token,expires:metadata.expires};
}
export async function getFile(token, now=Date.now()) {
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  try {
    const metadata=JSON.parse(await readFile(path.join(root,token+'.json'),'utf8'));
    if (metadata.expires <= now) return null;
    return {metadata,bytes:await readFile(path.join(root,token+'.bin'))};
  } catch { return null; }
}
