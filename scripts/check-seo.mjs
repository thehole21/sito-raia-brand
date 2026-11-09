import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const cases = [
  { name: 'produzione', NODE_ENV: 'production', expected: true },
  { name: 'sviluppo locale', NODE_ENV: 'development', expected: true },
  { name: 'Vercel produzione', NODE_ENV: 'production', VERCEL_ENV: 'production', expected: true },
  { name: 'Vercel anteprima', NODE_ENV: 'production', VERCEL_ENV: 'preview', SEO_INDEXABLE: 'true', expected: false },
  { name: 'staging esplicito', NODE_ENV: 'production', SEO_INDEXABLE: 'false', expected: false },
];

for (const scenario of cases) {
  const env = { ...process.env, ...scenario, VERCEL_ENV: scenario.VERCEL_ENV || '', SEO_INDEXABLE: scenario.SEO_INDEXABLE || '' };
  delete env.expected;
  const result = spawnSync(process.execPath, ['--input-type=module', '-e',
    "import { INDEXABLE } from './lib/seo.js'; process.stdout.write(String(INDEXABLE));",
  ], { cwd: new URL('..', import.meta.url), env, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, String(scenario.expected), scenario.name);
  console.log(scenario.name + ': OK');
}
