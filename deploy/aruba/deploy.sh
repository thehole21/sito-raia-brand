#!/usr/bin/env bash
# Installed root-owned on the VPS. SSH key may invoke only: deploy <commit SHA>.
set -Eeuo pipefail
[[ ${1:-} =~ ^deploy\ ([0-9a-f]{40})$ ]] || { echo 'Invalid deployment command' >&2; exit 64; }
sha=${BASH_REMATCH[1]}
image="raia-web:$sha"
exec 9>/run/lock/raia-deploy.lock
flock -w 900 9
[[ $(df --output=avail -k / | tail -1) -gt 2097152 ]] || { echo 'Insufficient free disk space' >&2; exit 1; }
gzip -dc | docker load
[[ $(docker image inspect "$image" --format '{{.Config.User}}') == node ]] || { echo 'Image must run as node' >&2; exit 1; }
old_port=$(cat /srv/raia/active-port)
old_container=$(cat /srv/raia/active-container)
old_image=$(docker inspect "$old_container" --format '{{.Config.Image}}')
port=3001
[[ $old_port == 3001 ]] && port=3000
container="raia-web-${sha:0:12}"
if [[ $container == "$old_container" ]]; then echo 'Commit already deployed'; exit 0; fi
docker rm -f "$container" >/dev/null 2>&1 || true
switched=0
rollback() {
  code=$?
  trap - ERR
  if [[ $switched == 1 ]]; then
    printf 'proxy_pass http://127.0.0.1:%s;\n' "$old_port" > /etc/nginx/raia-backend.conf
    nginx -t && systemctl reload nginx
  fi
  docker rm -f "$container" >/dev/null 2>&1 || true
  echo "Deployment failed; previous release retained: $old_image" >&2
  exit "$code"
}
trap rollback ERR
docker run -d --name "$container" --restart unless-stopped --init \
  --memory 1536m --log-driver json-file --log-opt max-size=10m --log-opt max-file=3 \
  -p "127.0.0.1:$port:3000" --mount type=volume,src=raia_image-cache,dst=/app/.next/cache \
  -e NODE_ENV=production -e SEO_INDEXABLE=true -e NEXT_TELEMETRY_DISABLED=1 "$image"
ready=0
for attempt in $(seq 1 60); do
  if curl --fail --silent --max-time 3 "http://127.0.0.1:$port/robots.txt" >/dev/null; then ready=1; break; fi
  sleep 1
done
[[ $ready == 1 ]]
for route in / /servizi /progetti /chi-siamo /contatti /privacy /cookie-policy /sitemap.xml; do
  curl --fail --silent --max-time 15 "http://127.0.0.1:$port$route" >/dev/null
done
curl --fail --silent "http://127.0.0.1:$port/robots.txt" | grep -q 'Sitemap: https://www.raiaweb.it/sitemap.xml'
install -d -m 755 /srv/raia/static
# Preserve hashed JS/CSS from older releases for tabs already open during deployment.
docker cp "$container":/app/.next/static/. /srv/raia/static/
chmod -R a+rX /srv/raia/static
printf 'proxy_pass http://127.0.0.1:%s;\n' "$port" > /etc/nginx/raia-backend.conf.next
mv /etc/nginx/raia-backend.conf.next /etc/nginx/raia-backend.conf
switched=1
nginx -t
systemctl reload nginx
curl --fail --silent --retry 3 --resolve www.raiaweb.it:443:127.0.0.1 https://www.raiaweb.it/ >/dev/null
printf '%s\n' "$old_image" > /srv/raia/previous-image
printf '%s\n' "$port" > /srv/raia/active-port
printf '%s\n' "$container" > /srv/raia/active-container
printf '%s\n' "$sha" > /srv/raia/active-commit
trap - ERR
# Existing Nginx connections drain while the previous container remains available.
sleep 15
docker stop --time 30 "$old_container" >/dev/null || true
docker rm "$old_container" >/dev/null || true
while read -r stale; do
  [[ $stale == "$image" || $stale == "$old_image" || $stale == '<none>:<none>' ]] && continue
  docker image rm "$stale" >/dev/null 2>&1 || true
done < <(docker image ls raia-web --format '{{.Repository}}:{{.Tag}}')
echo "Deployed $sha successfully"
