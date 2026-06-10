#!/bin/bash
set -e

cd /var/www/html

echo "=== Medcina Backend Starting ==="
echo "Working dir: $(pwd)"
echo "Artisan: $(ls artisan 2>/dev/null && echo 'found' || echo 'MISSING')"

# Generate app key if missing
echo "[1/6] Generating APP_KEY..."
php artisan key:generate --force

# Wait for MySQL
echo "[2/6] Waiting for MySQL..."
for i in $(seq 1 30); do
    php artisan db:show --no-ansi > /dev/null 2>&1 && echo "  MySQL ready." && break
    echo "  Attempt $i/30..."
    sleep 3
done

# Migrate + seed
echo "[3/6] Running migrations..."
php artisan migrate --force --seed

# Storage link
echo "[4/6] Linking storage..."
php artisan storage:link 2>/dev/null || true

# Filament assets
echo "[5/6] Publishing Filament assets..."
php artisan filament:assets

# Cache
echo "[6/6] Caching..."
php artisan config:cache
php artisan route:cache

echo ""
echo "=================================="
echo " Backend:  http://localhost:8000"
echo " Admin:    http://localhost:8000/admin"
echo " Login:    admin@medcina.mv"
echo " Password: change-me-immediately"
echo "=================================="

exec php artisan serve --host=0.0.0.0 --port=8000
