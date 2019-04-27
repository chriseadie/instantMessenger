const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});


module.exports = {
    entry:'./src/index.js',
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'messenger.bundle.js',
        publicPath:'/'
    },
    devServer:{
        historyApiFallback: true,
    },
    module: {
        rules :[
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader"
                }
            },
            {
                test: /\.css$/,
                use:["style-loader","css-loader"]
            },
            {
                test: /\.scss$/,
                use:["sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                  'file-loader'
                ]
            }
        ]
    },
    plugins:[htmlPlugin]
}