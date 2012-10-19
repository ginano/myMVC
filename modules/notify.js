define('modules/notify',[
        'modules/class'
    ],function(Class){
   var Notify=new Class('modules/notify',{
       public__attach:function(notifyName,processFunction,Scope){
           var scope=Scope||null,
               _temp;
           if('string'===typeof notifyName && 'function'===typeof processFunction){
               _temp=this.getProcessFunction(notifyName);
               if(!_temp){
                   this.addNotify(notifyName);
               }
               this.getProcessFunction(notifyName).push({
                   fun:processFunction,
                   scope:scope
               });
           }
       },
       public__dettach:function(notifyName,processFunction){
           this.getProcessFunction(notifyName,processFunction,true);
       },
       public__notify:function(notifyName){
           var funs=this.getProcessFunction(notifyName)||[],
               i,len,temp,args;
           len=funs.length;
           if(len<1){
               return;
           }
           args=Array.prototype.slice.call(arguments,1);
           for(i=0;i<len;i++){
               temp=funs[i];
               temp.fun.apply(temp.scope,args);
           }
       },
       private__getProcessFunction:function(notifyName,processFunction,isDel){
           var len;
           if('string'===typeof notifyName){
               if('function'==typeof processFunction){
                   len=(this.attachFunctionList[notifyName]||[]).length;
                   while(len--){
                       if(this.attachFunctionList[notifyName][len].fun===processFunction){
                           if(isDel===true){
                               delete this.attachFunctionList[notifyName][len];
                           }else{
                              return this.attachFunctionList[notifyName][len]; 
                           }
                       }
                   }
               }else{
                   //É¾³ýËùÓÐµÄ
                   if(isDel===true){
                       delete this.attachFunctionList[notifyName];
                   }else{
                      return this.attachFunctionList[notifyName];
                   }
                   
               }
           }
           return null;
       },
       private__addNotify:function(notifyName){
           this.attachFunctionList[notifyName]=[];
       },
       private__attachFunctionList:{}
   }); 
   
   return {
     create:function(){
       return  Notify.createInstance();
     }  
   };
});
