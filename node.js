// Small manual test to see that it all works
const translate = require('./translate');
require('dotenv').load();

translate.engine = 'yandex';
translate.key = process.env.YANDEX_KEY;

translate('Hello world', 'es').then(res => {
  console.log(res);
});
