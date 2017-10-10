# Translate

Translate text to different languages on node.js and the browser. Flexible module and powerful back-end using Google Translate:

```js
translate('Hello world', { to: 'es' }).then(text => {
  console.log(text);  // Hola mundo
});
```

Example with an async workflow:

```js
const whatever = async () => {
  const text = await translate('Hello world', { to: 'es' });
  console.log(text);  // Hola mundo
};
```



## Getting started

This package can be used either in Node.js and on the browser. For the browser we are using `fetch`, so you might want to [polyfill it](https://polyfill.io/v2/docs/) depending on [the browsers you support](https://caniuse.com/#feat=fetch).

To use it in `node.js` first install it:

```bash
npm install translate
```

Then import it to use it:

```js
const translate = require('translate');
```

To use it in the browser you download the main `translate.min.js` file and include it:

```html
<script src="translate.min.js"></script>
```

Or use the awesome [unpkg](https://unpkg.com/) **CDN**:

```html
<script src="https://unpkg.com/translate@1"></script>
```

After including it with either of those methods, the usage is the same for both of them afterwards.



## Parameters

The first parameter is the **string** that you want to translate. Right now only a single string of text is accepted.

The second parameter is the options. It accepts either a `String` of the language to translate **to** or a simple `Object`.

The full options are:

- **`to`**: the string of the language to translate to. It can be in any of the two ISO 639 (1 or 2) or the full name in English like `Spanish`. Defaults to **en**.
- **`from`**: the string of the language to translate to. It can be in any of the two ISO 639 (1 or 2) or the full name in English like `Spanish`. Also defaults to **en**.
- More options to come like API key, translation files, cache, etc.

Examples:

```js
// Translate from English (default) to Spanish (specified)
const foo = await translate('Hello world', 'es');

// Same as this:
const bar = await translate('Hello world', { to: 'es' });
```

> On both `to` and `from` defaulting to `en`: while I _am_ Spanish and was quite tempted to set this as one of those, English is the main language of the Internet and the main secondary language for those who have a different native language. This is why most of the translations will happen either to or from English.

You can also change the default `from` language for all of your codebase, like if your main language is different from English:

```js
translate.from = 'es';
```



## Promises

Working with Promises and specially with [async/await](https://ponyfoo.com/articles/understanding-javascript-async-await) is really great since it reduces [Callback Hell](http://callbackhell.com/) quite a bit.

To see it in action, first you'll need an `async` function. Then put your `await` calls inside:

```js
// Browser; jQuery for demonstration purposes
$('#translate').submit(async e => {
  e.preventDefault();
  const text = $('.text').text();
  const spanish = await translate(text, { to: 'es' });
  alert(spanish);
});

// Node.js; serverjs.io style middleware for demonstration purposes
const route = async ctx => {
  const spanish = await translate(ctx.body, { to: 'es' });
  return send(spanish);
};
```



## Authors

Current package and development: [Francisco Presencia](https://francisco.io/)

Original package and idea: Andrew Lunny (alunny), Marak Squires, Google
