const neostandard = require('neostandard')

module.exports = [
    ...neostandard({
        ts: true,
        env: ['browser'],
        ignores: ['public/**', 'resources/**']
    }),
    {
        rules: {
            '@stylistic/indent': ['error', 4]
        }
    }
]
