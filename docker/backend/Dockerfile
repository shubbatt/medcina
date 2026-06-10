FROM php:8.2-alpine

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN apk add --no-cache \
    git curl zip unzip bash \
    libpng-dev oniguruma-dev libxml2-dev \
    libzip-dev freetype-dev libjpeg-turbo-dev \
    icu-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo_mysql mbstring exif pcntl bcmath gd zip intl \
    && echo "upload_max_filesize=20M" > /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size=25M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "memory_limit=256M" >> /usr/local/etc/php/conf.d/uploads.ini

COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Scaffold Laravel directly into /var/www/html
WORKDIR /var/www
RUN composer create-project laravel/laravel:^11.0 html --no-interaction --prefer-dist

WORKDIR /var/www/html

# Install extra packages
RUN composer require \
    filament/filament:^3.2 \
    filament/spatie-laravel-media-library-plugin:^3.2 \
    spatie/laravel-medialibrary:^11.0 \
    spatie/laravel-sluggable:^3.6 \
    spatie/laravel-permission:^6.7 \
    --no-interaction --prefer-dist

# Verify artisan exists before copying our files
RUN test -f artisan && echo "artisan OK"

# Copy our custom files on top
COPY app/Models/                app/Models/
COPY app/Http/Controllers/      app/Http/Controllers/
COPY app/Http/Requests/         app/Http/Requests/
COPY app/Http/Resources/        app/Http/Resources/
COPY app/Filament/              app/Filament/
COPY app/Providers/Filament/    app/Providers/Filament/
COPY resources/views/           resources/views/
COPY bootstrap/providers.php    bootstrap/providers.php
COPY bootstrap/app.php          bootstrap/app.php
COPY database/migrations/       database/migrations/
COPY database/seeders/          database/seeders/
COPY routes/api.php             routes/api.php
COPY config/cors.php            config/cors.php
COPY .env                       .env

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8000
ENTRYPOINT ["/entrypoint.sh"]

# Ensure WORKDIR is set for entrypoint
WORKDIR /var/www/html
