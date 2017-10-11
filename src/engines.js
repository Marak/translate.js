// Translation engines
// Handle different translations differently to allow for extra flexibility


const google = {
  url: '',
  needkey: true,
  fetch: ({ from, to, key, text }) => [
    `https://translation.googleapis.com/language/translate/v2?key=${key}&source=${from}&target=${to}&q=${encodeURIComponent(text)}`,
    { method: 'POST' }
  ],
  parse: res => res.json().then(body => {
    while (Array.isArray(body) && body.length) {
      body = body[0];
    }
    return body;
  })
};


const yandex = {
  needkey: true,
  fetch: ({ from, to, key, text }) => [
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&lang=${from ? `${from}-${to}` : to}&text=${encodeURIComponent(text)}`,
    { method: 'POST', body: '' }
  ],
  parse: res => res.json().then(body => {
    if (body.code !== 200) throw new Error(body.message);
    return body.text[0];
  })
};


export default { google, yandex };
