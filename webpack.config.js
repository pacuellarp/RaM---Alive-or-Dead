const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname,
            'dist'),
            filename: 'main.js',
    },
    resolve:{
        extensions: ['.js','.jsx'],
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject: 'body',
            template: 'public/index.html',
            filename: './index.html'
        })
    ],
    module:{
        rules:[
            {
                test: /\.(.js|jsx)$/,
                loader: 'babel-loader',
                options:{
                    presets:['@babel/preset-react',
                    {
                        runtime: 'automatic',
                    }
                    ]
                }
            }
        ]
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
    },
};