/******* gemini - run node.js code in the browser, build dual-sided libraries with ease *******/
/*******                       Marak Squires 2010                   ********/
/* this shit is free add the MIT lic okay thanks */

(function (window) {
  window['exports'] = {};
  var gemini = {

      // runs immediately when gemini is included 
      init : function () {
        // take over the window for our top level node namespaces
        for(var topLevelModule in gemini.modules){
          window[topLevelModule] = gemini.modules[topLevelModule];
        }
        window['require'] = gemini.require;
      },

      /* this is not how the browser require works. this is an hack. require requires expert level javascripting */
      require : function ( module ) {
        
        // TODO, add ability to chain methods after require...maybe it already works? test it!
        exports = module;
        return window[module];
        if(module.search('./')){       
          var m = module.replace('./lib/','');
          console.log('loading module from memory ' + m);
          return eval(m);
        }
        else{
          var m = module.replace('./lib/','');
          console.log('trying to inject ' + m);
          document.write('<script src = "'+m+'.js" type = "script/javascript"/>');
          console.log('module injected ' + m);
          return eval(m); // lol wut <== ^_^
        }
        
        //return window[module];
      },

      modules : {

        assert : function () { return 'TODO => implement assert module';},
        buffer : function () { return 'TODO => implement buffer module';},
        child_process : function () { return 'TODO => implement child_process module';},
        /* we gave a name space conflict here....cant use this name on window... 
           crypto : function () { return 'TODO => implement crypto module';}, */
        dgram : function () { return 'TODO => implement dgram module';}, 
        dns : function () { return 'TODO => implement dns module';},
        events : function () { return 'TODO => implement events module';},
        file : function () { return 'TODO => implement file module';},
        freelist : function () { return 'TODO => implement freelist module';},
        fs : { 
          /* when the browser encounter the fs module, it could mean a few diffirent things.
          
             if you are trying to fs.read a file on the server, you probaly want to do an ajax request on the browser
             
             really though, the fs module on the browser should be all offline storage components
                cookie sharding
                local storage
                browser plugin extensions
                
            remote resources ideally would be loaded with the http.client module  
          */
          
          readFile: function(name, fn) {
            $.get(name,function(err, contents){
              if (err) {
                sys.puts(err);
              }
              else {
                fn(contents);
              }
            });
        	}
        },
        http : { 
          
          createClient: function (){
            
            /** XHConn - Simple XMLHTTP Interface - bfults@gmail.com - 2005-04-08        **
             ** Code licensed under Creative Commons Attribution-ShareAlike License      **
             ** http://creativecommons.org/licenses/by-sa/2.0/                           **/
            
              var xmlhttp, bComplete = false;
              try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); }
              catch (e) { try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
              catch (e) { try { xmlhttp = new XMLHttpRequest(); }
              catch (e) { xmlhttp = false; }}}
              if (!xmlhttp) return null;
              this.request = function(sURL, sMethod, sVars, fnDone)
              {
                if (!xmlhttp) return false;
                bComplete = false;
                sMethod = sMethod.toUpperCase();

                try {
                  if (sMethod == "GET")
                  {
                    xmlhttp.open(sMethod, sURL+"?"+sVars, true);
                    sVars = "";
                  }
                  else
                  {
                    xmlhttp.open(sMethod, sURL, true);
                    xmlhttp.setRequestHeader("Method", "POST "+sURL+" HTTP/1.1");
                    xmlhttp.setRequestHeader("Content-Type",
                      "application/x-www-form-urlencoded");
                  }
                  xmlhttp.onreadystatechange = function(){
                    if (xmlhttp.readyState == 4 && !bComplete)
                    {
                      bComplete = true;
                      fnDone(xmlhttp);
                    }};
                  xmlhttp.send(sVars);
                }
                catch(z) { return false; }
                return true;
              };
              return this;
            
            
            
            
          }
          
        },
        module : function () { return 'TODO => implement module module';},
        net : function () { return 'TODO => implement net module';},
        path : function () { return 'TODO => implement path module';},
        posix : function () { return 'TODO => implement posix module';},
        querystring : function () { return 'TODO => implement querystring module';},
        readline : function () { return 'TODO => implement readline module';},
        string_decoder : function () { return 'TODO => implement string_decoder module';},
        repl : function () { return 'TODO => repl module';},
        string_decoder : function () { return 'TODO => implement string_decoder module';},
        sys :  { 
          
          puts : function () {
            console.log(arguments);
          },
          inspect : function () {
            console.log(arguments);
          }

        },
        tcp : function () { return 'TODO => implement tcp module';},
        url : function () { return 'TODO => implement url module';},
        utils : function () { return 'TODO => implement utils module'}
    }

  };
  
  gemini.init();
  
})(window);

