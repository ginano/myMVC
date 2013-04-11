/**
 *@fileoverview  the webworker plugin for 模拟webworker实现
 *@author ginano
 *@website http://www.ginano.net
 *@date 20130228 
 */
//当不存在webworker或者目前在webworker环境中执行时
if('function' === typeof define){
    define('modules/webworker',[
            'modules/config',
            'modules/class',
            'modules/notify'
        ],function(Config,Class,Notify){
       var  isSupport='function'===typeof window['Worker'] && Config.host==location.host,
            workerLength=0;
       var WebWorker=new Class('modules/webworker',{
           /**
            *初始化 
            *@method init 
            */
           public__init:function(modulename,factory){
                //主体部分
                this.MainNotify=Notify.create();
                //webworker线程
                this.ViceNotify=Notify.create();
                this.workerName=modulename;
                this.factory=factory;
                this.buildWorker();
                
           },
           /**
            *新建一个webworker的构造器 
            */
           public__buildWorker:function(){
               var self=this;
               //如果原生支持
               if(isSupport){
                   this._worker=new Worker(location.protocol+'//'+Config.host+Config.rootPath+'modules/js/webworker.js');
                   this._worker.onmessage=function(evt){
                       self.MainNotify.notify(evt.data.eventType,evt.data.data);
                   };
                   this._worker.postMessage(self.factory.toString());
               }else{
                   this._worker=setTimeout(function(){
                       self.factory.apply(self);
                   },0);
               }
           },
           public__terminate:function(){
             if(isSupport){
                 this._worker.terminate();
             }else{
                 clearTimeout(this._worker);
             }  
           },
           //区分用于线程的接口
           public__innerNotify:function(eventName,data){
               var self=this;
               self.MainNotify.notify(eventName,data);
           },
           //用于线程的接口
           public__innerAttach:function(eventName,fun){
               this.ViceNotify.attach(eventName,fun);
           },
           /**
            *接受消息 
            */
           public__attach:function(eventName,fun){
               this.MainNotify.attach(eventName,fun);
           },
           
           public__notify:function(eventName,data){
               var self=this,
                   args=arguments;
               if(isSupport){
                   this._worker.postMessage({
                      eventType:eventName,
                      data:data 
                   });
               }else{
                   if(self.notifyed){
                       self.ViceNotify.notify(eventName,data);
                   }else{
                       setTimeout(function(){
                           self.notifyed=true;
                           self.ViceNotify.notify(eventName,data);
                       },0);
                   }
               }
           }
       });
       return WebWorker;
    });
}else{
    (function(){
        var self=this,
            factory,
            notify;
        notify={
          events:{},
          innerAttach:function(eventName,fun){
              this.events[eventName]=fun;
          },
          innerNotify:function(eventName,data){
             if(this.events[eventName]){
                 this.events[eventName].call(null,data);
             }
          }  
        };
        //this=window
        //肯定是由系统最先触发来执行初始化工厂
        self.onmessage=function(event){
            
            factory=Function('return '+event.data+';')();
            self.onmessage=function(event){
                var from=event.data;
                notify.innerNotify(from.eventType,from.data);
            }
            //初始化执行
            factory.apply(self);
        };
        self.innerNotify=function(eventName,data){
          self.postMessage({
             eventType:eventName,
             data:data 
          });  
        };
        self.innerAttach=function(eventName,fun){
            notify.innerAttach(eventName,fun);
        };
    })();
}