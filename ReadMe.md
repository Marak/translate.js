# translate.js - translates text to different language, simple as cake


<img src = "http://dustinkirkland.files.wordpress.com/2009/08/babelfish1981.jpg" border = "0"/>

# usage

        var translate = require('./translate');
        
        // set the input language
        translate.in('English'); //
        
        // set the output language
        translate.out('Spanish');
        
        // note: the translator is actually English=>Spanish by default and calling in() and out() is optional
        
        translate.text('yo quero tacos por favor'); // outputs : i want tacos please
        
## languages

### fun facts

translate.js uses the google api and requires an internet connection<br/>
if you want to actually hear the translated text as audio you could use <a href = "http://github.com/marak/say.js/">say.js</a><br/>

## Authors
#### Andrew Lunny (alunny) & Marak Squires
