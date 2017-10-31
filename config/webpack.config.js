const nodeExternals = require('webpack-node-externals'); // for exclude node core modules in bundle file
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // Optimization plugin
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const path = require('path');


// project folder
const rootFolder = path.resolve(__dirname, '..');

// for ext.
const regExps = {
    ts: /\.ts$/
};

const config = {

    context: `${rootFolder}`,

    entry: {
        // main file
        index: path.join(rootFolder, '/src/index.ts')
    },

    output: {
        // output path
        path: path.join(rootFolder, '/build/'),

        // file name pattern for entry scripts
        filename: '[name].js'
    },

    target: 'node',

    externals: [
        nodeExternals()
    ],

    module: {
        rules: [
            // rule for TypeScript
            {
                test: regExps.ts,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true 
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    devtool: 'source-map',

    plugins: [
        new ForkTsCheckerWebpackPlugin(),
    
        new UglifyJSPlugin({
            parallel: 4,
            cache: true,
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                warnings: false,
                compress: {
                    drop_console: true
                },
                output: {
                    comments: false,
                    beautify: false,
                }
            }
        })
    ]
};

module.exports = config;