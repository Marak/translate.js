const fs = require('fs');

// Bundle these packages in the translate.min.js file
const allow = [/regenerator-runtime/, /memory-cache/];

// ./webpack.config.js
module.exports = {
  entry: ['regenerator-runtime', './src/index.js'],
  output: {
    filename: 'translate.min.js',
    library: 'translate',
    libraryTarget: 'umd',
    publicPath:''
  },
  // devtool: 'sourcemap',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  externals: function(context, request, callback) {

    if (allow.filter(one => one.test(request)).length) {
      return callback();
    }

    // Absolute & Relative paths are not externals
    if (request.match(/^(\.{0,2})\//)) {
      return callback();
    }

    try {
      // Attempt to resolve the module via Node
      require.resolve(request);
      callback(null, request);
    } catch(e) {
      // Node couldn't find it, so it must be user-aliased
      callback();
    }
  },
};
