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
            'modules/util',
            'modules/notify'
        ],function(Config,Class,Util,Notify){
       //为了更容易实现，必须要同时支持JSON并且文件不跨域访问（由于目前的webworker文件是固定的，所）才能够用原生的d
       var  isSupport='function'===typeof window['Worker'] && Config.host==location.host && JSON,
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
                   //增加调试功能
                   this.MainNotify.attach('loginfo',function(info){
                       Util.log(info);
                   });
                   this._worker.onmessage=function(evt){
                       var _data=JSON.parse(evt.data);
                       self.MainNotify.notify(_data.eventType,_data.data);
                   };
                   this._worker.onerror=function(evt){
                       Util.log(JSON.stringify(evt));
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
           /**
            *向线程发送消息 
            */
           public__notify:function(eventName,data){
               var self=this,
                   args=arguments;
               if(isSupport){
                   this._worker.postMessage(JSON.stringify({
                      eventType:eventName,
                      data:data 
                   }));
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
           },
           log:function(info){
               Util.log(info);
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
                var from=JSON.parse(event.data);
                notify.innerNotify(from.eventType,from.data);
            }
            //初始化执行
            factory.apply(self);
        };
        /**
         *向主线程发送消息 
         */
        self.innerNotify=function(eventName,data){
          self.postMessage(JSON.stringify({
             eventType:eventName,
             data:data 
          }));  
        };
        /**
         *监听主线程过来的消息 
         */
        self.innerAttach=function(eventName,fun){
            notify.innerAttach(eventName,fun);
        };
        /**
         * 调试信息
         * @param {Object} info
         */
        self.log=function(info){
            self.innerNotify('loginfo',info);
        }
    })();
}