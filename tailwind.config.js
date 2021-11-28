module.exports = {
    mode: 'jit',
    purge: [
        'layouts/**/*.html'
    ],
    darkMode: false, // or 'media' or 'class'
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
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        require('@tailwindcss/typography')
    ]
}
