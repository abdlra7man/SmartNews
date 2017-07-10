import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {HotModuleReplacementPlugin} from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const defaultEnv = {
  dev: true,
  production: false,
};

export default (env = defaultEnv) => ({
  entry: [
    ...env.dev ? [
      'react-hot-loader/patch'
    ] : [],
    path.join(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.join(__dirname, '../../../target/classes/static/js'),
    publicPath: '',
    filename: 'bundle.js',
  },
  plugins: [
    ...env.dev ? [
      new HotModuleReplacementPlugin(),
    ] : [
      new ExtractTextPlugin('[name].css'),
    ],
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['es2015', { modules: false }],
                'react',
              ],
              plugins: ['react-hot-loader/babel', 'transform-object-rest-spread']
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: env.dev ? 'style-loader!css-loader!sass-loader' : ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css!sass'
        })
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  devServer: {
    port: 9090,
    proxy: {
      '/': {
        target: 'http://localhost:8080',
        secure: false,
        prependPath: false
      }
    },
    publicPath: 'http://localhost:9090/',
    hot: env.dev,
    historyApiFallback: true
  },
  devtool: env.dev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
});
