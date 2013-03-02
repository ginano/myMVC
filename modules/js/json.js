/**
 *@fileoverview  the JSON plugin for parsing the string to json and stringfing the object
 * implemented by jquery
 *@author ginano
 *@website http://www.ginano.net
 *@date 20130228 
 */
define('modules/json',[
    ],function(){
   var _JSON;
   if(window.JSON){
       _JSON=window.JSON;
   }
   _JSON.stringfy=_JSON.stringfy || function(object){
       var type = typeof obj;  
       if ('object' == type) {  
           if (Array == object.constructor) {
               type = 'array'; 
           } else if (RegExp == object.constructor){
               type = 'regexp';  
           }  else {
               type = 'object';
           }  
       }  
       switch (type) {  
          case 'undefined':  
          case 'unknown':  
              return;  
              break;  
          case 'function':  
          case 'boolean':  
          case 'regexp':  
              return object.toString();  
              break;  
          case 'number':  
              return isFinite(object) ? object.toString() : 'null';  
              break;  
          case 'string':  
              return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function() {  
                var a = arguments[0];  
                return (a == '\n') ? '\\n': (a == '\r') ? '\\r': (a == '\t') ? '\\t': ""  
              }) + '"';  
              break;  
          case 'object':  
              if (object === null) {
                  return 'null'; 
              }  
              var results = [];  
              for (var property in object) {  
                var value = _JSON.stringfy(object[property]);  
                if (value !== undefined) {
                    results.push(_JSON.stringfy(property) + ':' + value); 
                } 
              }  
              return '{' + results.join(',') + '}';  
              break;  
          case 'array':  
              var results = [];  
              for (var i = 0; i < object.length; i++) {  
                var value = _JSON.stringfy(object[i]);  
                if (value !== undefined) {
                    results.push(value);
                }   
              }  
              return '[' + results.join(',') + ']';  
              break;  
         default:
            return;
       }  
   };
   _JSON.parse=_JSON.parse || function(str){
       if(typeof str!=="string"||!str){
           return null;
       }
       str=str.replace(/(^\s*)|(\s*$)/g, '');
       if(str){
           return(new Function("return "+str))();
       }else{
           return null;
       }
   };
   
   return _JSON;
});
