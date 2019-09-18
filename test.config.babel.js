// noinspection NodeJsCodingAssistanceForCoreModules
import path from 'path';



// noinspection JSUnresolvedVariable
const ROOT = __dirname;


// noinspection JSUnusedGlobalSymbols
export default {
    devtool: "source-map",

    mode: "development",

    entry: {
        'testPaginator': './tests/src/test_paginator.js',
        'test_pages': ["@babel/polyfill", 'polyfills', './tests/src/test_pages.js'],
        'test_draggable': ['./tests/src/test_draggable.js'],
        'test_resizeable': ['./tests/src/test_resizeable.js']
    },

    resolve: {
        modules: ['src', 'node_modules']
    },

    module: {
        rules: [
            {test: /\.js$/, loader: 'babel-loader'}
        ]
    },

    output: {
        path: path.resolve(ROOT, "tests/dist"),
        filename: "[name].bundle.js",
        publicPath: "/tests/dist/",
        chunkFilename: "chunk-[name].bundle.js",
        library: "pendora",
        libraryTarget: "umd"
    },

    externals: {
        'jquery': 'jQuery'
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};
