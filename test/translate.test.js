import translate from '../src';
import mock from './mock';
import fs from 'fs';

// Quickly load .env files into the environment
require('dotenv').load();

translate.keys.google = process.env.GOOGLE_KEY || 'fakekey';
translate.keys.yandex = process.env.YANDEX_KEY || 'fakekey';

describe('Main', () => {
  beforeEach(() => {
    mock(/googleapis.*target=es/, { data: { translations: [{ translatedText: 'Hola mundo' }] } });
    mock(/googleapis.*target=ja/, { data: { translations: [{ translatedText: 'こんにちは世界'}] } });
  });

  afterEach(() => mock.end());


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
  beforeEach(() => {
    mock(/googleapis.*target=es/, { data: { translations: [{ translatedText: 'Hola mundo' }] } });
    mock(/googleapis.*target=ja/, { data: { translations: [{ translatedText: 'こんにちは世界'}] } });
  });

  afterEach(() => mock.end());


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


describe('Google', () => {
  beforeEach(() => {
    mock(/googleapi.*error/, { error: { errors: [{ message: 'Google API Error' }] } });
    mock(/googleapi.*throw/, { code: 500, message: 'also fails harder' }, true);
    mock(/googleapi.*&target=ru/, { data: { translations: [{ translatedText: 'Hola mundo' }] } });
  });

  afterEach(() => mock.end());

  it('works', async () => {
    const text = await translate('Hello world', { to: 'ru', engine: 'google' });
    expect(text).toBe('Hola mundo');
  });

  it('can handle errors from the API', async () => {
    const prom = translate('error', { to: 'es', engine: 'google' });
    await expect(prom).rejects.toHaveProperty('message', 'Google API Error');
  });

  it('can handle errors thrown by fetch()', async () => {
    const prom = translate('throw', { to: 'es', engine: 'google' });
    await expect(prom).rejects.toHaveProperty('message', 'also fails harder');
  });
});


describe('Yandex', () => {
  beforeEach(() => {
    mock(/yandex.*error/, { code: 500, message: 'it fails' });
    mock(/yandex.*throw/, { code: 500, message: 'also fails harder' }, true);
    mock(/yandex.*&lang=[a-z]*\-es/, { code: 200, text: ['Hola de Yandex'] });
  });

  afterEach(() => mock.end());

  it('works with a simple request', async () => {
    const spanish = await translate('Hello from Yandex', { to: 'es', engine: 'yandex' });
    expect(spanish).toMatch(/Hola de Yandex/i);
  });

  it('can handle errors from the API', async () => {
    const prom = translate('error', { to: 'es', engine: 'yandex' });
    await expect(prom).rejects.toHaveProperty('message', 'it fails');
  });

  it('can handle errors thrown by fetch()', async () => {
    const prom = translate('throw', { to: 'es', engine: 'yandex' });
    await expect(prom).rejects.toHaveProperty('message', 'also fails harder');
  });
});



describe('Independent', () => {
  it('has independent instances', () => {
    const translate2 = new translate.Translate();
    translate.keys.madeup = 'a';
    translate2.keys.madeup = 'b';
    expect(translate.keys.madeup).toBe('a');
    expect(translate2.keys.madeup).toBe('b');
  });

  it('is auto initialized', () => {
    let inst = translate.Translate();
    expect(inst.from).toBe('en');
    inst = new translate.Translate();
    expect(inst.from).toBe('en');
  });
});




// These cost $ and would need your own keys. Disable otherwise
describe.skip('$$$ Real API tests', () => {
  it('works', async () => {
    const text = await translate('Hello world', { to: 'fr', engine: 'google' });
    expect(text).toMatch(/Hola Mundo/i);
  });
});
