// webpack.mix.js

const mix = require('laravel-mix')

mix
    .postCss(
        'src/postcss/main.pcss',
        'css',
        [
            require('postcss-nested'),
            require('tailwindcss')
        ]
    )
    .setPublicPath('assets')
