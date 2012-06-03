/*

translate.js - node-demo.js

Copyright (c) 2010 Marak Squires

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var sys = require('sys');
var colors = require('colors'); // colors are fun!
var translate = require('../lib/translate');

var testString = 'I want tacos please';

var input = '', output = "Spanish";
translate.text({input:input,output:output}, testString, function(err, text, lang){

	sys.puts('the input was, ' + '    '.inverse + lang.inverse + '    '.inverse);
	
	sys.puts(testString.red + ' => '.cyan + text.yellow);

	var input = '', output2 = "Japanese";
  	translate.text({input:input,output:output2}, text, function(err, text2, lang2){
	
		sys.puts(text.yellow + ' => '.cyan + text2.blue);
	
    	var input = '', output3 = "English";
    	translate.text({input:input,output:output3}, text, function(err, text3, lang3){

			sys.puts(text2.blue + ' => '.cyan + text3.red);

       		sys.puts(lang.red + '=>' + output.yellow + '=>' + output2.blue + '=>' + output3.red + '\ntaco request has been normalized. ^_^'.green);
		});
	}); 
});