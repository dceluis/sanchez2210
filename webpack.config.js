const path = require('path');

module.exports = {
  entry: './src/application.js',
  output: {
    filename: 'application.js',
    path: path.resolve(__dirname),
  },
  // optimization: {
  //   minimize: false
  // },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
              ],
            },
          },
        ],
      }
    ],
  }
}
