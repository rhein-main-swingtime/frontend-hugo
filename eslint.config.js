const neostandard = require('neostandard')

const config = neostandard({
    ts: true,
    env: ['browser'],
    ignores: ['public/**', 'resources/**']
})

// Keep neostandard's indent options (switch cases, ternaries, template
// literals, ...) and only change the width from 2 to 4 spaces.
const [severity, , indentOptions] = config
    .find((c) => c.rules && c.rules['@stylistic/indent'])
    .rules['@stylistic/indent']

module.exports = [
    ...config,
    {
        rules: {
            '@stylistic/indent': [severity, 4, indentOptions]
        }
    }
]
