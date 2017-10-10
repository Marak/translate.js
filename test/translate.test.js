let translate;

describe('Main', () => {
  it('loads', () => {
    translate = require('../translate.min.js');
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



let parse;
describe('language parsing', () => {
  it('loads', () => {
    parse = translate.parse;
    expect(parse).toBeDefined();
  });

  it('works with a good language name', () => {
    expect(parse('Spanish')).toBe('es');
  });

  it('works with the plain ISO', () => {
    expect(parse('es')).toBe('es');
    expect(parse('ja')).toBe('ja');
    expect(parse('en')).toBe('en');
  });

  it('works with the alternative ISO 639-2', () => {
    expect(parse('spa')).toBe('es');
    expect(parse('jpn')).toBe('ja');
    expect(parse('eng')).toBe('en');
  });

  it('works with diferent casing', () => {
    expect(parse('spanish')).toBe('es');
    expect(parse('SpANisH')).toBe('es');
    expect(parse('SPANISH')).toBe('es');
  });

  it('throws with an invalid language name type', () => {
    expect(() => parse(20)).toThrow();
  });

  it('throws with a language name too long', () => {
    expect(() => parse('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')).toThrow();
  });

  it('throws with a wrong language name', () => {
    expect(() => parse('asdfghjddas')).toThrow();
  });

  it('works with fuzzy strings', () => {

  });
});



const fs = require('fs');
describe('File size', () => {
  it('is smaller than 20kb (uncompressed)', () => {
    const details = fs.statSync(process.cwd() + '/translate.min.js');
    expect(details.size).toBeLessThan(25000);
  });
});
