const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: "[name].bundle.js",
  },
  devServer: {
    overlay: true    
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug'
    }),
    new ExtractTextPlugin("style.css"),
  ],
  module: {
    rules: [      
      { 
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
            pretty: true
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }            
          ]
        })
      },      
    ]
  }   
};

module.exports = (env, options) => {
  let production = options.mode ==='production';

  config.devtool = production ? 'source-map' : 'eval-sourcemap';

  return config;
};