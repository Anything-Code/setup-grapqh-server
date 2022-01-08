const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CP = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    node: {
        __filename: false,
        __dirname: false
    },
    module: {
        rules: [
            {
                loader: 'ts-loader',
                test: /\.ts?$/
            },
            {
                test: /\.node$/,
                loader: 'node-loader',
            }
        ]
    },
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'build.js',
        libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: ['.ts', '.js', '.node']
    },
    plugins: [
        new CP({
            patterns: ['node_modules/.prisma']
            // patterns: [
            //     {
            //         // from: 'node_modules/.prisma/client/query-engine-rhel-openssl-1.0.x',
            //         // to: 'node_modules/.prisma/client/query-engine-rhel-openssl-1.0.x'
            //         from: 'node_modules/.prisma',
            //         to: 'node_modules/.prisma'
            //     },
            // ],
        }),
    ],
    // externals: [nodeExternals()]
    externals: ['@prisma/client', 'connect-sqlite3', 'apollo-server-express']
}