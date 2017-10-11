// translate.js
// Translate text into different languages;

// Load a language parser to allow for more flexibility in the language choice
import language from './language';

// Load the default engines for translation
import engines from './engines';

// Load the cache for
import add from './add';

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
  opts.engines = opts.engines || {};
  opts.engine = opts.engine || translate.engine;
  opts.id = opts.id || `${opts.from}:${opts.to}:${opts.engine}:${opts.text}`;
  opts.keys = opts.keys || {};
  for (let name in translate.keys) {
    opts.keys[name] = opts.keys[name];
  }
  opts.key = opts.key || translate.key || opts.keys[opts.engine];

  // TODO: validation for few of those

  // Use the desired engine
  const engine = opts.engines[opts.engine] || translate.engines[opts.engine];

  // If it is cached return ASAP
  const local = cache.get(`${opts.from}:${opts.to}:local:${opts.text}`);
  if (local) return Promise.resolve(local);
  const cached = cache.get(opts.id);
  if (cached) return Promise.resolve(cached);

  // This has to be here so it doesn't interfere with 'local' keys from objects
  if (opts.to === opts.from) return Promise.resolve(opts.text);

  // Will load only for Node.js and use the native function on the browser
  if (typeof fetch === 'undefined') {
    global.fetch = require('node-fetch');
  }

  // Local engine should not be able to reach this point
  if (opts.engine === 'local') {
    throw new Error(`Could not find the local translation for "${opts.text}"`);
  }

  // if (engine.needkey && !opts.key) {
  //   throw new Error(`The engine "${opts.engine}" needs a key, please provide it`);
  // }

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
translate.keys = {};

// Overload the cache with the translations
translate.add = add;

// Small hack needed for Webpack/Babel: https://github.com/webpack/webpack/issues/706
module.exports = translate;
