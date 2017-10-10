const fs = require('fs');

// ./webpack.config.js
module.exports = {
  entry: ['regenerator-runtime', './src/index.js'],
  output: {
    filename: 'translate.min.js',
    library: 'translate',
    libraryTarget: 'umd'
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
    if (request.match(/babel/) || request.match(/regenerator-runtime/)) {
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
