// PROVISIONAL
// Only for testing purposes
// var regeneratorRuntime = require('regenerator-runtime');

// Polyfill fetch()

// Load fetch if it doesn't exist within the current environment
// Probably needs better loading (node.js + browser separate bundles?)
if (typeof fetch === 'undefined') {
  const global = global || window;
  global.fetch = require('node-fetch');
}


// This is a small hack only not to pay for translating keywords while testing
// NOTE: this probably does NOT conform with Google ToS, so don't activate it for the public
const url = ({ from, to, text }) => `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
// const url = () => { throw new Error('In development'); };

const extract = body => {
  // Just an assurance that it will break for sure
  let counter = 0;
  while (Array.isArray(body) && body.length && counter < 100) {
    body = body[0];
    counter++;
  }
  return body;
};

module.exports = (text, options) => {
  options.text = text;
  return fetch(url(options)).then(res => res.json()).then(extract);
};
