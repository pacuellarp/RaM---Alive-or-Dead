const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports={
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]',
        clean:true,
    },
    resolve:{
        extensions: ['.js','.jsx'],
        alias:{
            '@styles': path.resolve(__dirname,'src/styles'),
            '@components': path.resolve(__dirname,'src/components'),
            '@routes': path.resolve(__dirname,'src/routes'),
        },
    },
    devtool:'source-map',
    plugins:[
        new HtmlWebpackPlugin({
            inject: 'body',
            template: 'public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin(),
    ],
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinizerPlugin(),
        ],
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-react',{runtime: 'automatic'}],
                      '@babel/preset-env',
                    ],
                    plugins: [
                      '@babel/plugin-transform-runtime'
                    ]
                  }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'/dist/',
                        },    
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(mp4|mov|avi|wmv|webm)$/,
                type:'asset/resource',
                use: {
                    loader: 'file-loader',
                    options:{
                        name: '[name].[hash].[ext]',
                    },
                },
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/i,
                type:'asset/resource',
                generator:{
                    filename:'assets/fonts/[hash][ext]',
                },
            },
        ],
    },
    devServer:{
        open:true,
        port:3000,
        client:{
            overlay:true,
        },
        compress:true,
        static:{
            directory: path.join(__dirname, 'public'),
        },
        historyApiFallback: true,
    },
};