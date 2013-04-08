/**
 *@fileoverview  the loader plugin for asynchronous loading resources
 * there isn't method to resolve the problem of 404
 *@author ginano
 *@website http://www.ginano.net
 *@date 20130228 
 */
define('modules/loader',[
        'modules/class',
        'modules/ua',
        'modules/util'
    ],function(Class,UA,Util){
   var LoadedList={},
       headEl=document.getElementsByTagName("head")[0],
       isFunction=function(f){
            return f instanceof Function;
       };
        
   var Loader=new Class('modules/loader',{
       /**
       *����js�ļ� 
       * @param {Object} url
       */
      static__importJS:function(url,callback){
            var head ,
                script,
                //�ɹ�֮����������
                wellDone=function(){
                    LoadedList[url]=true;
                    clear();
                    Util.log('load js file success:'+url);
                    callback();
                },
                clear=function(){
                   script.onload=script.onreadystatechange=script.onerror=null;
                   head.removeChild(script);
                   head=script=null;
                };
            
            if(LoadedList[url]){
                isFunction(callback)&&callback();
                return;
            }
            head = headEl;
            script = document.createElement("script");
            script.type = "text/javascript";
            
           
           script.onerror=function(){
               clear();
               Util.log('load js file error:'+url);
           }; 
            
            
            if(isFunction(callback)){
                //�����IE6-IE8
                if(UA.browser=='ie' && UA.version<9){
                    script.onreadystatechange=function(){
                        //����һ�η��ʵ�ʱ����loaded���ڶ��λ��������complete
                        if(/loaded|complete/.test(script.readyState)){
                            wellDone();
                        }
                    }
                }else{
                    script.onload=function(){
                       wellDone();
                    }
                }
                //ʼ�ձ�֤callback����ִ�У�������Ҫ��ʱ��ȥ��ɣ����Խ���������ڵĴ��������������֧��
                //timer=setTimeout(function(){
                //    wellDone();
                //},10000);
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
                firefox,
                opera,
                chrome,
                poll,
                //�ɹ�֮����������
                wellDone=function(){
                    LoadedList[url]=true;
                    clear();
                    Util.log('load css file success:'+url);
                    callback();
                },
                clear=function(){
                    timer=null;
                    link.onload=link.onerror=null;
                    head=null;
                };
            if(LoadedList[url]){
                isFunction(callback)&&callback();
                return;
            }
            head = headEl;
            link = document.createElement("link");
            link.rel="stylesheet";
            link.type = "text/css";
            link.href=url;
            
            link.onerror=function(){
               clear();
               Util.log('load css file error:'+url);
            }; 
            if(isFunction(callback)){
                //�����IEϵ��,ֱ��load�¼�
                if(UA.browser=='ie' 
                    || (UA.browser=='firefox' && UA.version>8.9) 
                    || UA.browser=='opera'
                    || (UA.browser=='chrome' && UA.version>19) 
                    || (UA.browser=='safari' && UA.version>5.9)
                    
                ){
                
                   //IE��opera�������imgʵ��
                    link.onload=function(){
                        wellDone();
                    };
                    head.appendChild(link);
                    
                }else if(
                   (UA.browser=='chrome' && UA.version>9)
                   || (UA.browser=='safari' && UA.version>4.9) 
                   || UA.browser=='firefox' 
                ){
                
                    head.appendChild(link);
                    //����Ƿ�IEϵ��
                    img=document.createElement('img');
                    img.onerror=function(){
                        img.onerror=null;
                        img=null;
                        wellDone();
                    };
                    img.src=url;
                    
                }else{//��ѯʵ��
                    head.appendChild(link);
                    poll=function(){
                        if(link.sheet && link.sheet.cssRules){
                            wellDone();
                        }else{
                            setTimeout(poll,300);
                        }
                    };
                    poll();
                }
            }else{
                head.appendChild(link);
            }
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
              load=function(url, done){
                  if(/\.js(?:\?\S+|#\S+)?$/.test(url)){
                      _self.importJS(url,done);
                  }else{
                      _self.importCSS(url,done);
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
