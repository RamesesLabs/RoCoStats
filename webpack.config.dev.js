const path = require('path');

const config = {  
  entry: [
      path.resolve(__dirname, 'app')
  ],
  target: 'web',  
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module:{
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [ 'babel-loader' ]
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
    //     {
    //         test: /\.(png|svg|jpg|gif)$/,
    //         use: [ 'file-loader' ]
    //     },
    //     {
    //         test: /\.(woff|woff2|eot|ttf|otf)$/,
    //         use: [ 'file-loader' ],
    //     },
    //     {
    //         test: /\.(csv|tsv)$/,
    //         use: [ 'csv-loader'],
    //     },
    //     {
    //     test: /\.xml$/,
    //     use: [ 'xml-loader' ],
    //    }
    ]
  }
}

module.exports = config;