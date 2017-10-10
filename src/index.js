// translate.js
// Include all/any other dependencies
// import regeneratorRuntime from 'regenerator-runtime';

// PROVISIONAL => update to the real API with the API KEY
import mock from './mock';

// Load a language parser to allow for more flexibility in the language choice
import parse from './parse';

const translate = (text, options = {}) => {

  if (typeof options === 'string') options = { to: options };
  options.from = parse(options.from || translate.from || 'en');
  options.to = parse(options.to || translate.to || 'en');

  return mock(text, options);
};

// Defaults
translate.from = 'en';
translate.to = 'en';
translate.parse = parse;

// Small hack needed for Webpack/Babel: https://github.com/webpack/webpack/issues/706
module.exports = translate;
