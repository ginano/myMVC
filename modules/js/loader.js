/**
 *@fileoverview  the loader plugin for asynchronous loading resources
 *@author ginano
 *@website http://www.ginano.net
 *@date 20130228 
 */
define('modules/loader',[
        'modules/class'
    ],function(Class){
   var LoadedList={},
       headEl=document.getElementsByTagName("head")[0],
       isFunction=function(f){
            return f instanceof Function;
       };
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
       *����js�ļ� 
       * @param {Object} url
       */
      static__importJS:function(url,callback,onerror){
            var head ,
                script;
            
            if(LoadedList[url]){
                isFunction(callback)&&callback();
                return;
            }
            head = headEl;
            script = document.createElement("script");
            script.type = "text/javascript";
            if(onerror instanceof Function){
               bindEvent(script,"error", function(){
                   onerror(url);
                }); 
            }
            
            if(isFunction(callback)){
                //IE
                if('string'=== typeof script.readyState){
                    bindEvent(script,"readystatechange",function(){
                        if(this.readyState=='loaded'||this.readyState=='complete'){
                            LoadedList[url]=true;
                            callback();
                            script.onreadystatechange=script.onerror=null;
                            head.removeChild(script);
                        }
                    });
                }else{
                    bindEvent(script,"load",function(){
                        LoadedList[url]=true;
                        callback();
                        script.onload=script.onerror=null;
                        head.removeChild(script);
                    });
                }
            }
            script.src = url;
            head.appendChild(script);
      },
      /**
       *����css�ļ� 
       * @param {Object} url
       */
      static__importCSS:function(url,callback){
            var head,
                link,
                img,
                ua;
            if(LoadedList[url]){
                isFunction(callback)&&callback();
                return;
            }
            head = headEl;
            link = document.createElement("link");
            link.rel="stylesheet";
            link.type = "text/css";
            link.href=url;
            
            if(isFunction(callback)){
                //�����IEϵ��
                ua=window.navigator.userAgent;      
                if(/msie|opera|chrome|firefox/i.test(ua) ){   //IE��opera�����
                    bindEvent(link,"load",function(){
                        LoadedList[url]=true;
                        callback();
                        alert('css');
                        link.onload=null;
                    });
                }else{
                    //����Ƿ�IEϵ��
                    img=document.createElement('img');
                    bindEvent(img,"error",function(){
                        LoadedList[url]=true;
                        callback();
                        alert('css2');
                        img.onerror=null;
                        img=null;
                    });
                    img.src=url;
                }
            }
            head.appendChild(link);
      },
      /**
       *�첽����������ļ� 
       * @param {Array} urls
       * @param {Function} callback
       * @param {Boolean} [option=true] isOrdered �Ƿ���Ҫ������أ�Ĭ������Ҫ�������
       */
      static__asyncLoad:function(urls,callback,isOrdered){
          var _self=this,
              isOrder=!(isOrdered===false),
              isAllDone=false,
              now,
              i,
              urls= ('string'===typeof urls)?[urls]:urls;
              len=(urls instanceof Array) && urls.length,
              /**
               *���ݺ�׺�ж���js����css�ļ� 
               * @param {Object} url
               * @param {Object} done
               */
              load=function(url, done, error){
                  if(/\.js(?:\?\S+)?$/.test(url)){
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
          //�����˳��
          if(isOrder){
              orderLoad();
          }else{
             //���û��˳�����   
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
