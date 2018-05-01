const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDir = `${__dirname}/frontend/app/`;
const buildDir = `${__dirname}/frontend/app/dist/`;

module.exports = {
  entry: `${appDir}index.jsx`,
  output: {
    filename: 'bundle.js',
    path: buildDir,
  },
  plugins: [new HtmlWebpackPlugin({
    template: `${appDir}index.html`,
  })],
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: buildDir,
    hot: true,
  },
  resolve: {

    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
    ],
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
};
