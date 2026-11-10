#!/bin/bash
set -euo pipefail
container=$(cat /srv/raia/active-container)
docker exec -i "$container" node --input-type=module <<'JS'
import {readdir,stat,unlink} from 'node:fs/promises';
const root='/app/data/quote-uploads';
for(const name of await readdir(root)){
 if(!/^[a-f0-9]{64}\.(bin|json)$/.test(name)) continue;
 const target=root+'/'+name;
 if(Date.now()-(await stat(target)).mtimeMs>7*86400000) await unlink(target);
}
JS
