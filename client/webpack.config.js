const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');




    module.exports = {
        mode: 'development', 
        entry: './src/js/index.js',
        output: {
            filename: 'bundle.js', 
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                title: 'Webpack Plugin',
            }),
            new WorkboxPlugin.GenerateSW()
        ],
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                }, 
                {
                    test: /\m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader', 
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    }
                }
            ]
        }
    }
