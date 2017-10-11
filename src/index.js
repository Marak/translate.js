// translate.js
// Translate text into different languages;

// Load a language parser to allow for more flexibility in the language choice
import language from './language';

// Load the default engines for translation
import engines from './engines';

// Cache the different translations to avoid resending requests
import cache from 'memory-cache';

// Main function
const translate = (text, opts = {}) => {

  // Load all of the appropriate options (verbose but fast)
  // Note: not all of those *should* be documented since some are internal only
  if (typeof opts === 'string') opts = { to: opts };
  opts.text = text;
  opts.from = language(opts.from || translate.from);
  opts.to = language(opts.to || translate.to);
  opts.cache = opts.cache || translate.cache;
  opts.id = opts.id || `${opts.from}:${opts.to}:${opts.text}`;
  opts.engines = opts.engines || {};
  opts.engine = opts.engine || translate.engine;

  // TODO: validation for few of those

  // Use the desired engine
  const engine = opts.engines[opts.engine] || translate.engines[opts.engine];

  // If it is cached return ASAP
  const cached = cache.get(opts.id);
  if (cached) return cached;

  // Will load only for Node.js and use the native function on the browser
  if (typeof fetch === 'undefined') {
    global.fetch = require('node-fetch');
  }

  return fetch(...engine.fetch(opts))
    .then(res => res.json())
    .then(engine.parse)
    .then(translated => cache.put(opts.id, translated, opts.cache));
};

// Defaults
translate.from = 'en';
translate.to = 'en';
translate.cache;
translate.language = language;
translate.engines = engines;
translate.engine = 'google';

// Small hack needed for Webpack/Babel: https://github.com/webpack/webpack/issues/706
module.exports = translate;
