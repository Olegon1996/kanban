const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'
const hash = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: !isDev,
      },
    },
    'css-loader'
  ];
  if (extra) loaders.push(extra)
  return loaders;
};

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all"
    }
  };
  if (!isDev) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin()
    ]
  }
  return config
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    login: './login',
    main: './index',
  },
  output: {
    filename: hash('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.png'],
    alias: {
      '@assets': path.resolve(__dirname, '.src/assets'),
    }
  },
  devServer: {
    port: 5000,
  },
  devtool: isDev ? 'source-map' : '',
  optimization: optimization(),
  plugins: [
    new HtmlPlugin({
      filename: "trello.html",
      template: './trello.html',
      chunks: ['main'],
      minify: {
        collapseWhitespace: !isDev
      }
    }),
    new HtmlPlugin({
      filename: "index.html",
      template: './index.html',
      chunks: ['login'],
      minify: {
        collapseWhitespace: !isDev
      }
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: hash('css')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },

    ]
  }
}

