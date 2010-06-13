var sys = require('sys');
var translate = require('./translate');
    
// note: the translator is actually English=>Spanish by default

translate.text('yo quero tacos por favor', function(text){

  sys.puts(text); // outputs : i want tacos please

  // set the input language
  translate.input('English');

  // set the output language
  translate.output('Spanish');

  translate.text('I want tacos please.', function(text){

    sys.puts(text); // outputs : i want tacos please

  }); 


}); 


