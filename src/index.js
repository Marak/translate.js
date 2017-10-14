// translate.js
// Translate text into different languages;

// Load a language parser to allow for more flexibility in the language choice
import language from './language';

// Load the default engines for translation
import engines from './engines';

// Cache the different translations to avoid resending requests
import cache from '../lib/cache';


// Main function
const Translate = function (options = {}) {
  if (!(this instanceof Translate)) {
    return new Translate(options);
  }

  const defaults = {
    from: 'en',
    to: 'en',
    cache: undefined,
    language: language,
    engines: engines,
    engine: 'google',
    keys: {}
  };

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
    opts.keys = opts.keys || translate.keys || {};
    for (let name in translate.keys) {
      opts.keys[name] = opts.keys[name];
    }
    opts.key = opts.key || translate.key || opts.keys[opts.engine];

    // TODO: validation for few of those

    // Use the desired engine
    const engine = opts.engines[opts.engine] || translate.engines[opts.engine];

    // If it is cached return ASAP
    const cached = cache.get(opts.id);
    if (cached) return Promise.resolve(cached);

    // Target is the same as origin, just return the string
    if (opts.to === opts.from) {
      return Promise.resolve(opts.text);
    }

    // Will load only for Node.js and use the native function on the browser
    if (typeof fetch === 'undefined') {
      global.fetch = require('node-fetch');
    }

    if (engine.needkey && !opts.key) {
      throw new Error(`The engine "${opts.engine}" needs a key, please provide it`);
    }

    const fetchOpts = engine.fetch(opts);
    return fetch(...fetchOpts)
      .then(engine.parse)
      .then(translated => cache.put(opts.id, translated, opts.cache));
  };

  for (let key in defaults) {
    translate[key] = typeof options[key] === 'undefined' ? defaults[key] : options[key];
  }
  return translate;
};


// Small hack needed for Webpack/Babel: https://github.com/webpack/webpack/issues/706
const exp = new Translate();
exp.Translate = Translate;
export default exp;
