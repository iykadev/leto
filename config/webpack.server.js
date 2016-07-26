var webpack = require('webpack');
var path = require('path')

var server = {
  context: path.join(__dirname, '../'),
  resolve: {
   // root: '/src',

    extensions: ['', '.ts', '.js', '.json']
  },
  module: {
    loaders: [
      // TypeScript
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.json$/, loader: 'raw-loader' },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['raw-loader', 'sass-loader'] 
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [path.join( __dirname, '../src/index.html')]
      },
     
    ],
    preLoaders: [
      // needed to lower the filesize of angular due to inline source-maps
      { test: /\.js$/, loader: 'source-map-loader' }
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true)
  ],
  externals: checkNodeImport,

  target: 'node',
  entry: './src/server', 
  output: {
    path: './dist/server',
    libraryTarget: 'commonjs2',
        filename: '[name].bundle.js',

  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }

};


module.exports = server

// Helpers
function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}