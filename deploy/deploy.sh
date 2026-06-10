#!/bin/bash
##
## deploy.sh — Medcina VPS Deployment Script
## Run as root on a fresh Ubuntu 22.04 DigitalOcean Droplet
## Usage: bash deploy.sh
##

set -e

DOMAIN_FRONTEND="medcina.mv"
DOMAIN_API="api.medcina.mv"
DB_NAME="medcina"
DB_USER="medcina_user"
DB_PASS="$(openssl rand -base64 24)"  # Auto-generated — save this!
WEB_ROOT="/var/www"

echo "============================================"
echo " Medcina VPS Setup"
echo "============================================"

# ── 1. System update ─────────────────────────────
echo "[1/8] Updating system..."
apt-get update -qq && apt-get upgrade -y -qq

# ── 2. Install dependencies ───────────────────────
echo "[2/8] Installing packages..."
apt-get install -y -qq \
  nginx mysql-server \
  php8.2 php8.2-fpm php8.2-mysql php8.2-xml php8.2-curl \
  php8.2-mbstring php8.2-zip php8.2-gd php8.2-intl php8.2-bcmath \
  nodejs npm git curl unzip certbot python3-certbot-nginx

# Install Composer
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PM2
npm install -g pm2

# ── 3. MySQL setup ────────────────────────────────
echo "[3/8] Setting up MySQL..."
mysql -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"
mysql -e "GRANT ALL PRIVILEGES ON \`$DB_NAME\`.* TO '$DB_USER'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"
echo "  DB Password: $DB_PASS  ← SAVE THIS"

# ── 4. Deploy Laravel backend ─────────────────────
echo "[4/8] Deploying Laravel backend..."
mkdir -p $WEB_ROOT/medcina-backend
cd $WEB_ROOT/medcina-backend

# Clone or copy your backend code here
# git clone git@github.com:yourorg/medcina-backend.git .

cp .env.example .env
sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASS/" .env
sed -i "s/DB_DATABASE=.*/DB_DATABASE=$DB_NAME/" .env
sed -i "s/DB_USERNAME=.*/DB_USERNAME=$DB_USER/" .env
sed -i "s|APP_URL=.*|APP_URL=https://$DOMAIN_API|" .env

composer install --no-dev --optimize-autoloader --no-interaction
php artisan key:generate
php artisan storage:link
php artisan migrate --force --seed
php artisan optimize

chown -R www-data:www-data $WEB_ROOT/medcina-backend
chmod -R 755 $WEB_ROOT/medcina-backend/storage
chmod -R 755 $WEB_ROOT/medcina-backend/bootstrap/cache

# ── 5. Deploy Next.js frontend ────────────────────
echo "[5/8] Building Next.js frontend..."
mkdir -p $WEB_ROOT/medcina-frontend
cd $WEB_ROOT/medcina-frontend

# git clone git@github.com:yourorg/medcina-frontend.git .

cat > .env.local << EOF
NEXT_PUBLIC_API_URL=https://$DOMAIN_API/api/v1
NEXT_PUBLIC_SITE_URL=https://$DOMAIN_FRONTEND
NEXT_PUBLIC_SITE_NAME=Medcina Pvt Ltd
EOF

npm ci --production=false
npm run build

# ── 6. Nginx setup ────────────────────────────────
echo "[6/8] Configuring Nginx..."
cp /path/to/deploy/nginx-api.conf      /etc/nginx/sites-available/$DOMAIN_API
cp /path/to/deploy/nginx-frontend.conf /etc/nginx/sites-available/$DOMAIN_FRONTEND

ln -sf /etc/nginx/sites-available/$DOMAIN_API      /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/$DOMAIN_FRONTEND /etc/nginx/sites-enabled/
rm -f  /etc/nginx/sites-enabled/default

nginx -t && systemctl reload nginx

# ── 7. SSL certificates ───────────────────────────
echo "[7/8] Obtaining SSL certificates..."
certbot --nginx -d $DOMAIN_FRONTEND -d www.$DOMAIN_FRONTEND --non-interactive --agree-tos -m admin@medcina.mv
certbot --nginx -d $DOMAIN_API --non-interactive --agree-tos -m admin@medcina.mv

# Auto-renew cron
echo "0 3 * * * certbot renew --quiet" | crontab -

# ── 8. Start services ─────────────────────────────
echo "[8/8] Starting services..."
cp /path/to/deploy/ecosystem.config.js $WEB_ROOT/medcina-frontend/

cd $WEB_ROOT/medcina-frontend
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd

systemctl enable nginx mysql php8.2-fpm
systemctl restart nginx php8.2-fpm

echo ""
echo "============================================"
echo " Deployment Complete!"
echo "============================================"
echo " Frontend: https://$DOMAIN_FRONTEND"
echo " API:      https://$DOMAIN_API"
echo " Admin:    https://$DOMAIN_API/admin"
echo " DB Pass:  $DB_PASS  ← STORE SECURELY"
echo "============================================"
