# translate.js - translates text to different language, simple as cake

<img src = "http://i.imgur.com/GJhm2.png" border = "0"/>

<img src = "http://dustinkirkland.files.wordpress.com/2009/08/babelfish1981.jpg" border = "0"/>

# usage

        var translate = require('./translate');
        
        // set the input language
        translate.input('English'); //
        
        // set the output language
        translate.output('Spanish');
        
        // note: if you don't specify an input or output language, translate.js will attempt to autodetect your input and set your output to English
        
        translate.text('yo quero tacos por favor'); // outputs : i want tacos please
        
## languages

<table><tbody><tr><td style="white-space: nowrap;">Afrikaans<br>Albanian<br>Arabic<br>Armenian<br>Azerbaijani<br>Basque<br>Belarusian<br>Bulgarian<br>Catalan<br>Chinese</td><td style="white-space: nowrap;">Croatian<br>Czech<br>Danish<br>Dutch<br>English<br>Estonian<br>Filipino<br>Finnish<br>French<br>Galician</td><td style="white-space: nowrap;">Georgian<br>German<br>Greek<br>Haitian Creole<br>Hebrew<br>Hindi<br>Hungarian<br>Icelandic<br>Indonesian<br>Irish</td><td style="white-space: nowrap;">Italian<br>Japanese<br>Korean<br>Latvian<br>Lithuanian<br>Macedonian<br>Malay<br>Maltese<br>Norwegian<br>Persian</td><td style="white-space: nowrap;">Polish<br>Portuguese<br>Romanian<br>Russian<br>Serbian<br>Slovak<br>Slovenian<br>Spanish<br>Swahili<br>Swedish</td><td style="white-space: nowrap;">Thai<br>Turkish<br>Ukrainian<br>Urdu<br>Vietnamese<br>Welsh<br>Yiddish</td></tr></tbody></table>

### fun facts

translate.js uses the google api and requires an internet connection<br/>
if you want to actually hear the translated text as audio you could use <a href = "http://github.com/marak/say.js/">say.js</a><br/>

## Authors
#### Andrew Lunny (alunny), Marak Squires, Google 
