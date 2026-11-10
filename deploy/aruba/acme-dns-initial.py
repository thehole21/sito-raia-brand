#!/usr/bin/env python3
"""Record all DNS-01 challenges, then wait for the operator to publish them."""
import json
import os
from pathlib import Path
import sys
import time
from urllib.parse import urlencode
from urllib.request import Request, urlopen

queue = Path('/srv/raia/acme-challenges.json')
domain = os.environ['CERTBOT_DOMAIN']
validation = os.environ['CERTBOT_VALIDATION']
records = json.loads(queue.read_text()) if queue.exists() else []
record = {'name': '_acme-challenge.' + domain, 'type': 'TXT', 'value': validation}
records = [item for item in records if item['name'] != record['name']]
records.append(record)
queue.write_text(json.dumps(records, indent=2) + '\n')
queue.chmod(0o600)
print('DNS challenge ready for ' + domain, flush=True)
if int(os.environ.get('CERTBOT_REMAINING_CHALLENGES', '0')):
    sys.exit(0)

deadline = time.monotonic() + 1800
while time.monotonic() < deadline:
    ready = True
    for item in records:
        try:
            url = 'https://dns.google/resolve?' + urlencode({'name': item['name'], 'type': 'TXT'})
            with urlopen(Request(url, headers={'User-Agent': 'RAIA-ACME-check/1.0'}), timeout=15) as response:
                answer = json.load(response)
            values = [value.get('data', '').strip('"') for value in answer.get('Answer', [])]
            if item['value'] not in values:
                ready = False
        except Exception:
            ready = False
    if ready:
        print('All DNS challenges are publicly visible.', flush=True)
        sys.exit(0)
    time.sleep(10)
print('DNS records were not published before the timeout.', file=sys.stderr)
sys.exit(1)
