# translate.js - translates text to different language, simple as cake

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



<strong>af</strong>  Afrikaans

<strong>sq</strong>   Albanian

### fun facts

translate.js uses the google api and requires an internet connection<br/>
if you want to actually hear the translated text as audio you could use <a href = "http://github.com/marak/say.js/">say.js</a><br/>

## Authors
#### Andrew Lunny (alunny) & Marak Squires
