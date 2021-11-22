// webpack.mix.js

let mix = require('laravel-mix');

mix
// .js('site/assets/src/js/main.js', 'js')
.postCss(
    "src/postcss/main.pcss",
    "css",
    [
        require('postcss-nested'),
        require("tailwindcss"),
    ]
)
// .browserSync({
//     proxy: 'https://rmswing.de.ddev.site/',
//     files: [
//         'site/assets/dist/js/main.js',      // Generated .js file
//         'site/assets/dist/css/main.css',    // Generated .css file
//         // =====================================================================
//         // You probably need only one of the below lines, depending
//         // on which platform this project is being built upon.
//         // =====================================================================
//         'site/templates/**/*.+(html|php)',  // Generic .html and/or .php files [no specific platform]
//     ]
// })
.setPublicPath('assets');