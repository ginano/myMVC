/**
 *@fileoverview  the tab plugin for switching the content belong to different tab
 *@author ginano
 *@website http://www.ginano.net
 *@date 20130228 
 */
define('widget/tab',[
        'modules/class'
    ],function(Class){
   var Tab=new Class('widget/tab',{
       /**
        the default configs for the object
        @property defaultConfig
        @private
        @type Object
        @default {}
        */
       private__defaultConfig:{
           rootDom:$(document),
           titleSelector:'.tab-title',
           titleActiveClass:'active',
           contentSelector:'.tab-content',
           contentActiveClass:'active',
           switchEvent:'click',
           beforeSwitch:null,
           afterSwitch:null
       },
       public__init:function(config){
           var self=this,
               o=self.config=$.extend({},self.defaultConfig,config),
               $root=$(o.rootDom);
           $root.on(o.swicthEvent,o.titleSelector,function(e){
               e.preventDefault();
               var index=$root.find(o.titleSelector).index($(this));
               self.switchTo(index);
           });
       },
       public__destory:function(){
           var self=this,
               o=self.config,
               $root=$(o.rootDom);
           $root.off(o.switchEvent,o.titleSelector);
           o.rootDom=null;
           o.beforeSwitch=null;
           o.afterSwitch=null;
           self.config=null;
           
       },
       /**
        *switch to the index of the content 
        */
       public__next:function(){
           var self=this;
           self.switchTo(self.index+1);
       },
       public__prev:function(){
           var self=this,
               index=self.index;
           self.switchTo(self.index-1);
       },
       /**
        *switch to the index content 
        * @param {index} [default=0] index
        */
       public__switchTo:function(index){
           var self=this,
               index=index||0,
               $root=$(o.rootDom),
               $content=$root.find(o.contentSelector),
               $title=$root.find(o.titleSelector);
           index=index % $title.length;    
           self.index=index;
           if('function'===typeof o.beforeSwitch){
               o.beforeSwicth.call(self,index);
           }
           $title.removeClass(o.titleActiveClass);
           $title.eq(index).addClass(o.titleActiveClass);
           $content.removeClass(o.contentActiveClass);
           $content.eq(index).addClass(o.contentActiveClass);
           if('function'===typeof o.afterSwitch){
               o.afterSwitch.call(self,index);
           }
       },
       public__getCurrentIndex:function(){
           return this.index;
       }
   });
   return Tab;
});
