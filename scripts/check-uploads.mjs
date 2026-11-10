import assert from 'node:assert/strict';
const base=process.argv[2] || 'http://127.0.0.1:3121';
const bytes=Buffer.from('%PDF-1.4\n% RAIA automated upload check\n%%EOF\n');
function body(name='test.pdf',content=bytes){const form=new FormData();form.append('attachment',new Blob([content]),name);return form;}
let response=await fetch(base+'/api/preventivo/allegati',{method:'POST',headers:{Origin:'https://foreign.example'},body:body()});
assert.equal(response.status,403);
response=await fetch(base+'/api/preventivo/allegati',{method:'POST',headers:{Origin:'https://www.raiaweb.it'},body:body('test.html',Buffer.from('<script>bad</script>'))});
assert.equal(response.status,415);
response=await fetch(base+'/api/preventivo/allegati',{method:'POST',headers:{Origin:'https://www.raiaweb.it'},body:body()});
assert.equal(response.status,201);
const result=await response.json();
assert.match(result.url,/^https:\/\/www\.raiaweb\.it\/api\/preventivo\/allegati\/[a-f0-9]{64}$/);
response=await fetch(base+new URL(result.url).pathname);
assert.equal(response.status,200);
assert.match(response.headers.get('content-disposition'),/^attachment;/);
assert.match(response.headers.get('cache-control'),/no-store/);
assert.ok(Buffer.from(await response.arrayBuffer()).equals(bytes));
assert.equal((await fetch(base+'/api/preventivo/allegati/'+'a'.repeat(64))).status,404);
console.log('Uploads: foreign origin blocked, unsafe type rejected, file roundtrip exact, private download, unknown token 404: OK');
