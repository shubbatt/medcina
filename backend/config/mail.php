<?php

return [

    'default' => env('MAIL_MAILER', 'log'),

    'mailers' => [
        'smtp' => [
            'transport'   => 'smtp',
            'url'         => env('MAIL_URL'),
            'host'        => env('MAIL_HOST', '127.0.0.1'),
            'port'        => env('MAIL_PORT', 587),
            'encryption'  => env('MAIL_ENCRYPTION', 'tls'),
            'username'    => env('MAIL_USERNAME'),
            'password'    => env('MAIL_PASSWORD'),
            'timeout'     => (int) env('MAIL_TIMEOUT', 10),
            'local_domain' => env('MAIL_EHLO_DOMAIN'),
        ],

        'log' => [
            'transport' => 'log',
            'channel'   => env('MAIL_LOG_CHANNEL'),
        ],
    ],

    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'noreply@medcina.mv'),
        'name'    => env('MAIL_FROM_NAME', 'Medcina Pvt Ltd'),
    ],

];
