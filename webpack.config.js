const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    proxy: {
      '/api/**': 'http://localhost:3000',
      '/user/**': 'http://localhost:3000'
    },
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/dist'
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.scss?/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader',  'sass-loader']
      },
      { 
        test: /\.(png|jpg)$/, 
        exclude: /node_modules/,
        use: ['url-loader?limit=8192'] }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html'
  })],
  resolve: {
<<<<<<< HEAD
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
=======
    extensions: ['.jsx', '.js'],
>>>>>>> dev
  },
};

