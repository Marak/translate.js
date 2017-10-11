const translate = require('../translate.min.js');
const fs = require('fs');
const env = fs.readFileSync('./.env', 'utf-8').split('\n').forEach(one => {
  const [key, ...value] = one.split('=');
  process.env[key] = value.join('=');
});

translate.engines.google.fetch = ({ from, to, text }) => [
  `${process.env.GOOGLE_URL}&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`
];
translate.engines.yandex.url = process.env.YANDEX_URL;

describe('Main', () => {
  it('loads', () => {
    expect(translate).toBeDefined();
  });

  it('returns a promise', () => {
    const ret = translate('Hello world');
    expect(ret instanceof Promise).toBe(true);
  });

  it('can translate a simple string', async () => {
    const es = await translate('Hello world', { from: 'en', to: 'es' });
    expect(es).toMatch(/Hola mundo/i);
    const jp = await translate('Hello world', { from: 'en', to: 'ja' });
    expect(jp).toBe('こんにちは世界');
  });

  it('accepts full language names', async () => {
    const es = await translate('Hello world', { from: 'English', to: 'Spanish' });
    expect(es).toMatch(/Hola mundo/i);
    const jp = await translate('Hello world', { from: 'English', to: 'Japanese' });
    expect(jp).toBe('こんにちは世界');
  });

  it('accepts weird casing for language names', async () => {
    const es = await translate('Hello world', { from: 'english', to: 'spaNish' });
    expect(es).toMatch(/Hola mundo/i);
    const jp = await translate('Hello world', { from: 'ENGLISH', to: 'JapAnesE' });
    expect(jp).toBe('こんにちは世界');
  });
});



let language;
describe('language parsing', () => {
  it('loads', () => {
    language = translate.language;
    expect(language).toBeDefined();
  });

  it('works with a good language name', () => {
    expect(language('Spanish')).toBe('es');
  });

  it('works with the plain ISO', () => {
    expect(language('es')).toBe('es');
    expect(language('ja')).toBe('ja');
    expect(language('en')).toBe('en');
  });

  it('works with the alternative ISO 639-2', () => {
    expect(language('spa')).toBe('es');
    expect(language('jpn')).toBe('ja');
    expect(language('eng')).toBe('en');
  });

  it('works with diferent casing', () => {
    expect(language('spanish')).toBe('es');
    expect(language('SpANisH')).toBe('es');
    expect(language('SPANISH')).toBe('es');
  });

  it('throws with an invalid language name type', () => {
    expect(() => language(20)).toThrow();
  });

  it('throws with a language name too long', () => {
    expect(() => language('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')).toThrow();
  });

  it('throws with a wrong language name', () => {
    expect(() => language('asdfghjddas')).toThrow();
  });

  it('works with fuzzy strings', () => {

  });
});


describe('cache', () => {
  const stop = time => new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });

  it('caches', async () => {
    const before = new Date();
    await translate('Is this cached?', 'es');
    const mid = new Date();
    await translate('Is this cached?', 'es');
    const after = new Date();
    expect(mid - before).toBeLessThan(10000);
    expect(mid - before).toBeGreaterThan(100);
    expect(after - mid).toBeLessThan(10);
    expect(after - mid).toBeGreaterThanOrEqual(0);
  });

  it('removes cache after the time is out', async () => {
    const before = new Date();
    await translate('Is this also cached?', { to: 'es', cache: 1000 });
    const mid = new Date();
    await stop(1100);
    await translate('Is this also cached?', { to: 'es' });
    const after = new Date();
    expect(mid - before).toBeLessThan(10000);
    expect(mid - before).toBeGreaterThan(100);
    expect(after - mid).toBeLessThan(10000);
    expect(after - mid).toBeGreaterThan(100);
  });
});



describe('File size', () => {
  it('is smaller than 20kb (uncompressed)', () => {
    const details = fs.statSync(process.cwd() + '/translate.min.js');
    expect(details.size).toBeLessThan(25000);
  });
});



describe('Engines', () => {
  it('Yandex', async () => {
    const spanish = await translate('Hello from Yandex', { to: 'es', engine: 'yandex' });
    expect(spanish).toMatch(/Hola de Yandex/i);
  });
});





describe('Local translations', () => {
  translate.add({
    key1: {
      en: 'AAA',
      es: 'BBB',
      ja: 'あああ'
    }
  });

  it('Works with an object and keys', async () => {
    expect(await translate('key1', 'en')).toBe('AAA');
    expect(await translate('key1', 'es')).toBe('BBB');
    expect(await translate('key1', 'ja')).toBe('あああ');
  });

  translate.add([{
    en: 'A Local cache',
    es: 'B Cache local'
  }]);

  it('works with an array and cross-lang', async () => {
    expect(await translate('A Local cache', 'es')).toBe('B Cache local');
    expect(await translate('A Local cache', 'en')).toBe('A Local cache');
    expect(await translate('B Cache local', { from: 'es', to: 'es' })).toBe('B Cache local');
    expect(await translate('B Cache local', { from: 'es', to: 'en' })).toBe('A Local cache');
  });
});
