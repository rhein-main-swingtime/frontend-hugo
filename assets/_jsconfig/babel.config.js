
module.exports = {
    plugins: [require('babel-plugin-lodash')],
    presets: [
        require('@babel/preset-typescript'),
        [
            require('@babel/preset-env'),
            {
                useBuiltIns: 'entry',
                corejs: '3.3.5',
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
