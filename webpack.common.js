const path = require('path');

module.exports = {
    entry: './application/containers/Index.js',
    module: {
        rules: [{
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        }]
    },

    watch: true,

    output: {
        path: path.resolve(__dirname + '/public/bin'),
        filename: 'bundle.js'
    },

    watchOptions: {
        aggregateTimeout: 100
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};