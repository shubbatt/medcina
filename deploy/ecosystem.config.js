module.exports = {
  apps: [
    {
      name:         'medcina-frontend',
      cwd:          '/var/www/medcina-frontend',
      script:       'node_modules/.bin/next',
      args:         'start',
      instances:    1,           // Scale to 'max' if you add more CPUs later
      exec_mode:    'fork',
      env: {
        NODE_ENV:              'production',
        PORT:                  3000,
        NEXT_PUBLIC_API_URL:   'https://api.medcina.mv/api/v1',
        NEXT_PUBLIC_SITE_URL:  'https://medcina.mv',
        NEXT_PUBLIC_SITE_NAME: 'Medcina Pvt Ltd',
      },
      error_file:   '/var/log/pm2/medcina-frontend-error.log',
      out_file:     '/var/log/pm2/medcina-frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      restart_delay: 3000,
      max_restarts:  10,
    },
  ],
};
