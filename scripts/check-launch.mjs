import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import http from 'node:http';

const base = new URL(process.argv[2] || 'http://127.0.0.1:3121');
const canonical = 'https://www.raiaweb.it';
const routes = ['/', '/servizi', '/progetti', '/chi-siamo', '/contatti', '/preventivo', '/privacy', '/cookie-policy'];
const failures = [];
const checkedAssets = new Set();

async function request(path, options = {}) {
  if (options.headers?.host) {
    return new Promise((resolve, reject) => {
      const req = http.request(new URL(path, base), { ...options, method: options.method || 'GET' }, response => {
        response.resume();
        resolve(new Response(null, { status: response.statusCode, headers: response.headers }));
      });
      req.setTimeout(15000, () => req.destroy(new Error('Timeout HTTP')));
      req.on('error', reject);
      req.end();
    });
  }
  return fetch(new URL(path, base), { redirect: 'manual', signal: AbortSignal.timeout(15000), ...options });
}

async function check(name, operation) {
  try {
    await operation();
  } catch (error) {
    failures.push({ check: name, error: error.message });
  }
}

for (const route of routes) {
  await check(route, async () => {
    const response = await request(route);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, 'Serve un solo titolo H1');
    assert.match(html, /<html[^>]+lang="it"/);
    const canonicalHref = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonicalHref, 'Canonical assente');
    assert.equal(new URL(canonicalHref).href, new URL(route, canonical).href, 'Canonical errato');
    assert.match(html, /<meta name="description" content="[^"]+"/);
    const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] || '';
    assert.equal(robots.includes('noindex'), route === '/preventivo', 'Indicizzazione inattesa');
    for (const json of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      JSON.parse(json[1]);
    }
    for (const link of html.matchAll(/href="(\/[^"#?]*)/g)) {
      if (!routes.includes(link[1]) && !link[1].startsWith('/_next/')) checkedAssets.add(link[1]);
    }
    for (const image of html.matchAll(/src="(\/[^"]+)"/g)) {
      checkedAssets.add(image[1].replaceAll('&amp;', '&'));
    }
  });
}

const redirects = [
  ['/galleria', '/progetti'],
  ['/privacy-policy', '/privacy'],
  ['/sitemap_index.xml', '/sitemap.xml'],
  ['/page-sitemap.xml', '/sitemap.xml'],
  ['/wp-sitemap.xml', '/sitemap.xml'],
  ['/index.php', '/'],
];
const wordpress = { 415: '/', 427: '/chi-siamo', 430: '/servizi', 438: '/contatti', 989: '/progetti', 1286: '/privacy' };
for (const [id, destination] of Object.entries(wordpress)) {
  for (const prefix of ['/', '/index.php']) {
    for (const parameter of ['p', 'page_id']) redirects.push([prefix + '?' + parameter + '=' + id, destination]);
  }
}
for (const [source, destination] of redirects) {
  await check(source, async () => {
    const response = await request(source);
    assert.ok([301, 308].includes(response.status), 'Redirect non permanente');
    assert.equal(new URL(response.headers.get('location'), base).pathname, destination);
  });
}
for (const route of routes.filter(route => route !== '/')) {
  await check(route + '/', async () => {
    const response = await request(route + '/');
    assert.equal(response.status, 308);
    assert.equal(new URL(response.headers.get('location'), base).pathname, route);
  });
}

await check('404 reale', async () => {
  assert.equal((await request('/pagina-che-non-esiste-raia-audit')).status, 404);
});
await check('robots e sitemap', async () => {
  const robots = await (await request('/robots.txt')).text();
  assert.ok(robots.includes(canonical + '/sitemap.xml'));
  const sitemap = await (await request('/sitemap.xml')).text();
  for (const route of routes.filter(route => route !== '/preventivo')) assert.ok(sitemap.includes(canonical + route));
  assert.ok(!sitemap.includes(canonical + '/preventivo'));
});
if (base.hostname === '127.0.0.1' || base.hostname === 'localhost') {
  await check('dominio senza www', async () => {
    const response = await request('/servizi?utm_source=test', { headers: { host: 'raiaweb.it' } });
    assert.equal(response.status, 308);
    assert.equal(response.headers.get('location'), canonical + '/servizi?utm_source=test');
  });
  await check('dominio stabile Vercel', async () => {
    const response = await request('/', { headers: { host: 'sito-raia-brand.vercel.app' } });
    assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex/);
  });
  await check('anteprima Vercel', async () => {
    const response = await request('/', { headers: { host: 'raia-audit.vercel.app' } });
    assert.match(response.headers.get('x-robots-tag') || '', /noindex/);
  });
}

const legacy = JSON.parse(await readFile(new URL('../migration/launch-urls.json', import.meta.url), 'utf8'));
for (const asset of legacy.images) checkedAssets.add(new URL(asset).pathname);
const assets = [...checkedAssets];
for (let offset = 0; offset < assets.length; offset += 6) {
  await Promise.all(assets.slice(offset, offset + 6).map(asset => check(asset, async () => {
    const response = await request(asset, {
      method: asset.startsWith('/_next/image?') ? 'GET' : 'HEAD',
      headers: { accept: 'image/webp' },
    });
    assert.equal(response.status, 200, 'Risorsa interna non disponibile');
    if (response.body) await response.body.cancel();
  })));
}

console.log(JSON.stringify({
  base: base.href, pages: routes.length, redirects: redirects.length + routes.length - 1,
  assets: assets.length, failures,
}, null, 2));
process.exitCode = failures.length ? 1 : 0;
