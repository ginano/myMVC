/**
 *@fileoverview  the loader plugin for asynchronous loading resources
 *@author ginano
 *@website http://www.ginano.net
 *@date 20130228 
 */
define('modules/loader',[
        'modules/class'
    ],function(Class){
   var bindEvent=function(el,type,callback){
       var fun;
       if(el.addEventListener){
           fun=function(_el,_type,_callback){
               if(!_callback instanceof Function){
                   return;
               }
               _el.addEventListener(_type,function(){
                   _callback.apply(_el);
               });
           }
       }else if(el.attachEvent){
           fun=function(_el,_type,_callback){
               if(!_callback instanceof Function){
                   return;
               }
               _el.attachEvent('on'+_type,function(){
                   _callback.apply(_el);
               });
           }
       }else{
           fun=function(_el,_type,_callback){
               if(!_callback instanceof Function){
                   return;
               }
               _el['on'+_type]=_callback;
           }
       }
       fun(el,type,callback);
       bindEvent=fun;
   };     
   var Loader=new Class('modules/loader',{
       /**
       *加载js文件 
       * @param {Object} url
       */
      public__importJS:function(url,callback,onerror){
            var head = document.getElementsByTagName("head")[0],
                script = document.createElement("script");
            script.type = "text/javascript";
            
            bindEvent(script,"error", function(){
                if(onerror){
                    onerror(url);
                }else{
                    Util.Common.log('faild to load javascript file: "'+url+'"');
                }
            }, false);
            
            callback && script.onload=script.onreadystatechange=function(){
                if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){
                    callback();
                }
                script.onload=script.onreadystatechange=null;
            }
            script.src = url;
            head.appendChild(script);
      },
      /**
       *加载css文件 
       * @param {Object} url
       */
      public__importCSS:function(url,callback,onerror){
            var head = document.getElementsByTagName("head")[0],
                link = document.createElement("link");
            link.rel="stylesheet";
            link.type = "text/css";
            callback && link.addEventListener("load", callback, false);
            link.addEventListener("error", function(){
                if(onerror){
                    onerror(url);
                }else{
                    Util.Common.log('faild to load css file: "'+url+'"');
                }
            }, false);
            link.href=url;
            head.appendChild(link);
      },
      /**
       *异步加载所需的文件 
       * @param {Array} urls
       * @param {Function} callback
       * @param {Boolean} [option=true] isOrdered 是否需要按序加载，默认是需要按序加载
       */
      public__asyncLoad:function(urls,callback,isOrdered){
          var _self=this,
              isOrder=!(isOrdered===false),
              isAllDone=false,
              now,
              i,
              len=(urls instanceof Array) && urls.length,
              /**
               *根据后缀判断是js还是css文件 
               * @param {Object} url
               * @param {Object} done
               */
              load=function(url, done, error){
                  if(/\.js(?:\s*)$/.test(url)){
                      _self.importJS(url,done,error);
                  }else{
                      _self.importCSS(url,done,error);
                  }
              },
              orderLoad=function(){
                  now=urls.shift();
                  if(now){
                     load(now,orderLoad);
                  }else{
                     callback && callback(); 
                  }
              };
          if(!len || len<1){
              return;
          }
          //如果有顺序
          if(isOrder){
              orderLoad();
          }else{
             //如果没有顺序加载   
             for(i=0,now=0;i<len;i++){
                 load(urls[i],function(){
                     now+=1;
                     if(now==len){
                        callback && callback();  
                     }
                 });
             }
          }
      } 
   });
   return Loader;
});
