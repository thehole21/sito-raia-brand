#!/bin/bash
set -euo pipefail
umask 077
mkdir -p /srv/raia/backups/analytics
docker exec raia-stats-db-1 pg_dump -U umami umami | gzip > "/srv/raia/backups/analytics/umami-$(date +%F).sql.gz"
find /srv/raia/backups/analytics -maxdepth 1 -name 'umami-*.sql.gz' -type f -mtime +7 -delete
# Short, bounded retention of analytics details; no form data stored here.
docker exec -i raia-stats-db-1 psql -U umami -d umami -v ON_ERROR_STOP=1 <<'SQL'
DELETE FROM event_data WHERE created_at < NOW() - INTERVAL '13 months';
DELETE FROM website_event WHERE created_at < NOW() - INTERVAL '13 months';
DELETE FROM session_data WHERE created_at < NOW() - INTERVAL '13 months';
DELETE FROM session WHERE created_at < NOW() - INTERVAL '13 months';
SQL
