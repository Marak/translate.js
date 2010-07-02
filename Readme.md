# translate.js - translates text to different languages, simple as cake

<img src = "http://i.imgur.com/0XzuZ.png" border = "0"/>


# usage

          var sys = require('sys');
          var colors = require('./colors'); // colors are fun!
          var translate = require('./translate');

          // note: the translator is  English=>Spanish by default
          translate.text('I want tacos please.', function(text){

            sys.puts('I want tacos please.'.red + ' => '.cyan + text.yellow);
            var input = 'Spanish', output = "Japanese";
            translate.text({input:input,output:output}, text, function(text2){

              var input = 'Japanese', output = "English";
              sys.puts(text.yellow + ' => '.cyan + text2.blue);
              translate.text({input:input,output:output}, text, function(text3){

                 sys.puts(text2.blue + ' => '.cyan + text3.red);
                 sys.puts('English'.red+'=>'+'Spanish'.yellow+'=>'+'Japanese'.blue+'=>'+'English'.red  +'\ntaco request has been normalized. ^_^'.green);
              });
            }); 
          }); 


## languages

<table><tbody><tr><td style="white-space: nowrap;">Afrikaans<br>Albanian<br>Arabic<br>Armenian<br>Azerbaijani<br>Basque<br>Belarusian<br>Bulgarian<br>Catalan<br>Chinese</td><td style="white-space: nowrap;">Croatian<br>Czech<br>Danish<br>Dutch<br>English<br>Estonian<br>Filipino<br>Finnish<br>French<br>Galician</td><td style="white-space: nowrap;">Georgian<br>German<br>Greek<br>Haitian Creole<br>Hebrew<br>Hindi<br>Hungarian<br>Icelandic<br>Indonesian<br>Irish</td><td style="white-space: nowrap;">Italian<br>Japanese<br>Korean<br>Latvian<br>Lithuanian<br>Macedonian<br>Malay<br>Maltese<br>Norwegian<br>Persian</td><td style="white-space: nowrap;">Polish<br>Portuguese<br>Romanian<br>Russian<br>Serbian<br>Slovak<br>Slovenian<br>Spanish<br>Swahili<br>Swedish</td><td style="white-space: nowrap;">Thai<br>Turkish<br>Ukrainian<br>Urdu<br>Vietnamese<br>Welsh<br>Yiddish</td></tr></tbody></table>

### fun facts

translate.js uses the google api and requires an internet connection<br/>
if you want to actually hear the translated text as audio you could use <a href = "http://github.com/marak/say.js/">say.js</a><br/>

## Authors
#### Andrew Lunny (alunny), Marak Squires, Google 
               