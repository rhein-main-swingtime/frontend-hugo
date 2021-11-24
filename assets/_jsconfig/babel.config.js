module.exports = {
    presets: [
        '@babel/preset-typescript',
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                ignoreBrowserslistConfig: true,
                targets: {
                    browsers: [
                        'last 3 versions',
                        '> 1% in DE',
                        'Explorer >= 10'
                    ]
                }
            }
        ]
    ]
}
