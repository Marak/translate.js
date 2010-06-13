var sys = require('sys');
var translate = require('./colors'); // colors are fun!
var translate = require('./translate');
    
// note: the translator is actually English=>Spanish by default
translate.text('I want tacos please.', function(text){

  sys.puts('I want tacos please.'.red + ' => '.cyan + text.green); // outputs : i want tacos please
  
  // set the input language to English
  translate.input('Spanish');

  // set the output language Spanish
  translate.output('English');

  translate.text(text, function(text2){
    sys.puts(text.green + ' => '.cyan + text2.red);
    sys.puts('English To Spanish taco request has been normalized. ^_^');
  }); 

}); 


