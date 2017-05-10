var path = require('path');
var webpack = require('webpack');

var config = {
    //    debug: true,
    devtool: 'inline-source-map',

    // context: path.join(__dirname, "src"),
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    // resolve: { modules: ['src', 'node_modules'] },
    entry: [
        "babel-polyfill",
        "webpack-hot-middleware/client?reload=true",
        path.resolve(__dirname, "src/SampleCompositeControl"),
        path.resolve(__dirname, "src/control/PageManager")
    ],
    target: 'web',
    output: {
        // filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/assets/',
        library: ['CodeName']
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    plugins: [
        //new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [{
            test: /\.tsx?$/,
            include: path.join(__dirname, 'src'),
            use: [{
                    loader: 'babel-loader'
                },
                {
                    loader: 'string-replace-loader',
                    options: {
                        search: '_import(',
                        replace: 'import('
                    }
                },
                {
                    loader: 'ts-loader'
                }
            ]
        }]
    }
};

module.exports = config;