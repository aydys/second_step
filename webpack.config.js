const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
      filename: 'index.html',
      template: './src/index.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'search.html',
      template: './src/search.pug'
    }),
    new ExtractTextPlugin("style.css"),
    new CopyWebpackPlugin([
      {from: './src/utils', to: './utils'}
    ])
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
      {
        test: /\.(gif|png|jpe?g|svg)$/i,        
        use: [
          {
            loader: 'file-loader',            
            options: {
              name: "[name].[ext]",
              outputPath: 'img/',                                                       
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 90
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              }             
            },
          },         
        ],
        exclude: /utils/,
      },    
    ]
  }   
};

module.exports = (env, options) => {
  let production = options.mode ==='production';

  config.devtool = production ? 'source-map' : 'eval-sourcemap';

  return config;
};