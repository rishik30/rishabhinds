var path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
    filename: "style.css"
})

const hotModulePlugin = new webpack.HotModuleReplacementPlugin()

module.exports = {
    entry: ['./src/index.js', 'webpack-hot-middleware/client', 'webpack/hot/dev-server'],
    // devtool: 'source-map',
    target: 'web',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["es2015", "stage-1", "react"]
                            // plugins: [["import", { libraryName: "antd", "libraryDirectory": "lib", style: "css" }]]
                        }
                    }
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.scss/,
                use: extractPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            },
            {   test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        publicPath: 'images/'
                    }
                  }
                ]
            }
        ]
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        extractPlugin,
        hotModulePlugin
    ],
    // options for webpack-dev-server
    devServer: {
        hot: true,
        inline: true,
        historyApiFallback: true,        /* History API will fall back to index.html
                                        resolves Cannot GET /[page_name]*/
    }
}
