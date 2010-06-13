var sys = require('sys')
  , fs = require('fs')
  , http = require('http')
  , exec = require('child_process').exec
  , spawn = require('child_process').spawn
  , child;

var say = exports;

// http client for accessing google api
var googleTranslate = http.createClient(80, 'ajax.googleapis.com');

// simple fn to get the path given text to translate
var getEnglishTranslatePath = function (text) {
  return ['/ajax/services/language/translate?v=1.0&q='
            ,encodeURIComponent(text)
            ,'&langpair=%7Cen'].join("");
}

exports.input = function(){};
exports.output = function(){};

// translate the text
exports.text = function (text, callback) {
  var req = googleTranslate.request('GET', getEnglishTranslatePath(text),
    {'host': 'ajax.googleapis.com', 'encoding':'utf-8'});
    
  req.addListener('response', function (response) {
    var responseBody = "";
    
    response.addListener('data', function (chunk) {
      responseBody += chunk;
    });
    
    response.addListener('end', function () {
      var bodyObj = JSON.parse(responseBody);
      if (bodyObj.responseStatus === 200) {
        callback(bodyObj.responseData.translatedText);
      } else {
        sys.debug("Translate API call failed");
      }
    });
  });
  
  req.end();
}
