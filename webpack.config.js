
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');

module.exports = {
  entry: './src/index.js',
  cache: false,
  mode: 'development',
  output: {    
    publicPath: '/',
    clean: true,
    uniqueName: 'storekeeperApp'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'storekeeperApp',
      remotes: {
        invoiceModule: 'invoiceModule@https://storekeeper-invoice.onrender.com/remoteEntry.js',
        storekeeperShared: 'storekeeperShared@https://storekeeper-shared.onrender.com/remoteEntry.js',
        customerModule: 'customerModule@https://storekeeper-customer.onrender.com/remoteEntry.js',
        productModule: 'productModule@https://storekeeper-product.onrender.com/remoteEntry.js'
      },
      shared: {
        react: { singleton: true},
        'react-dom': { singleton: true }
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 6000,
    historyApiFallback: true,
    client: {
      overlay: false
    },
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
};
