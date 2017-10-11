// Translation engines
// Handle different translations differently to allow for extra flexibility


const google = {
  url: '',
  fetch: ({ from, to, text }) => {
    return  [
    `${google.url}&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`
  ]},
  parse: body => {
    while (Array.isArray(body) && body.length) {
      body = body[0];
    }
    return body;
  }
};


const yandex = {
  url: '',
  fetch: ({ from, to, text }) => [
    `${yandex.url}&srv=tr-text&lang=${from}-${to}&reason=auto&exp=1`,
    {
      method: 'POST', body: `text=${encodeURIComponent(text)}&options=4`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  ],
  parse: body => {
    if (body.code !== 200) throw new Error(body.message);
    return body.text[0];
  }
};

export default { google, yandex };
