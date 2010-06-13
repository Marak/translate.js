var sys = require('sys');
var colors = require('./colors'); // colors are fun!
var translate = require('./translate');

translate.input('English'); // you could omit this line, English=>Spanish is the default


// TODO: make this demo automated and based on all languages
    
// note: the translator is actually English=>Spanish by default
translate.text('I want tacos please.', function(text){

  sys.puts('I want tacos please.'.red + ' => '.cyan + text.yellow); // outputs : i want tacos please
  
  // set the input language to English
  translate.input('Spanish');

  // set the output language Spanish
  translate.output('Japanese');

  translate.text(text, function(text2){
    sys.puts(text.yellow + ' => '.cyan + text2.blue);
    translate.output('English');
    
    translate.text(text, function(text3){
       sys.puts(text2.blue + ' => '.cyan + text3.red);
       sys.puts('English'.red+'=>'+'Spanish'.yellow+'=>'+'Japanese'.blue+'=>'+'English'.red  +'\ntaco request has been normalized. ^_^'.green);
    });
  }); 

}); 


