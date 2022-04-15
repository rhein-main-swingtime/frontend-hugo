const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    mode: 'jit',
    content: [
        'layouts/**/*.html',
        'content/**/*.md'
    ],
    theme: {
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Roboto Slab', 'serif']
        },
        extend: {
            zIndex: {
                100: 100,
                110: 110,
                120: 120,
                130: 130,
                140: 140,
                150: 150
            },
            gridTemplateRows: {
                // Simple 8 row grid
                8: 'repeat(8, minmax(0, 1fr))'
            },
            screens: {
                xs: '425px',
                ...defaultTheme.screens
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp')
    ]
}
