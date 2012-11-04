/**
 * this is an visual Class reference to global scope of window.
 * all the properties and functions belong to window or other code exposed to global scope will be classed to this module.
 * and all the properties could be for the static class named window, such as window.define
 * @module window
 * @main
 */
(function(JDK,win,undefined){
    var moduleList={};
        moduleAnonymousList=[];
    /**
	the module class for the commonjs to manage the modules for the application
	@namespace commonjs
	@class Module
	@constructor
	**/
    var Module=JDK.Class('commonjs/module',{
            /**
                the initial entry for this Module,and it will be excuted immediately when the instance is created! 
                The params are from the function of Module.createInstace(id,req,factory);
                @method init
                @public
                @param {String} id the module name for the instance, it should be unique and the namspace is expected like 'mywork/module1'
                @param {Array} [req] the required modules for this module
                @param {Function} factory the factory function for the module
                @return {Object} an instance of Module
             **/
            public__init:function(id,req,factory){
                var idtype=typeof id;
                switch(idtype){
                    case 'string':
                        if('function'=== typeof req){
                            factory=req;
                            req=[];
                        }else if(!req instanceof Array){
                            JDK.Util.log('module '+id+' init faild,becaseof the invalid argument:"req".');
                            return;
                        }
                        break;
                    case 'object':
                        if(id instanceof Array){
                            factory=req;
                            req=id;
                            id='';
                        }else{
                            JDK.Util.log('module '+id+' init faild, becaseof the invalid arguments:"req".');
                            return;
                        }
                        break;
                    case 'function':
                        factory=id;
                        req=[];
                        id='';
                        break;
                    default:
                        JDK.Util.log('module '+id+' init faild, becaseof the invalid arguments.');
                        return;
                        break;
                }
                this.requiredList=req;
                this.factory=factory;
                this.id=id;
                return this;
            },
             /**
                the unique id for the module
                @property id 
                @public
                @type String
                @default ''
             **/
            public__id:'',
             /**
                excute the module.
                because the module just was registered in module management center before excuting it.
                @method excute
                @public
                @param {String} type='' the slogan to indicate when to excute this module, the value has 2 types: '~'/default.
                     '~' will excute it in document.ready; and the others will be excuted right now!
                @return {Object} the module
             **/
            public__excute:function(type){
                var type=type||'';
                switch(type){
                    case '~':
                        break;
                    default:
                        this.excuteit();
                        break;
                }
                return this;
            },
             /**
                the internal implement for the method of excute.
                it will get all the required modules, and excute the facotry of this module.
                and store the result to the property exprots
                @method excuteit
                @private
                @return {Object} the module
             **/
            private__excuteit:function(){
               var args=this.getRequireList(this.requiredList);
               this.exports=this.factory.apply(this,args);
               return this;
            },
             /**
                it will get all the required modules .
                @method getRequireList
                @private
                @param {Array} list the required modules' name of this instance
                @return {Array} the array of all the required modules
             **/
            private__getRequireList:function(list){
                var _out=[],
                    i,len,temp;
                if(list instanceof Array){
                    for( i=0,len=list.length;i<len;i++){
                        temp=moduleList[list[i]];
                        if(temp){
                            _out.push(temp.getExports());
                        }else{
                            JDK.Util.log('module '+list[i]+' not exist when it been required in module:'+this.id);
                            _out.push({});
                        }
                    }
                }
                return _out;
            },
             /**
                it will get the export of the modules . 
                if the factory hasn't been excuted, it will execute the factory of this module by call this.excuteit().
                @method getExports
                @public
                @return {Object} the exports of this module
             **/
            public__getExports:function(){
                if(!this.exports){
                    this.excuteit();
                }
                return this.exports;
            },
            /**
                store the names of all the required modules
                @property requiredList 
                @public
                @type Array
                @default []
             **/
            public__requiredList:[],
            /**
                store the exports of this module
                @property exports
                @public
                @type object
                @default null
             **/
            public__exports:null
        });
   
       
        /**
         define a new module so that you don't care how to create an instance of module.
         and the method was exposed to global scope
        @class define
        @constructor
        @namespace window
        @static
        @param {String} id the module name for the instance, it should be unique and the namspace is expected like 'mywork/module1'
        @param {Array} [req] the required modules for this module
        @param {Function} factory the factory function for the module
        @return {Module} an instance of Module
         **/
  var      _define=function(id,req,factory){
                var module=Module.createInstance(id,req,factory);
                if(module.id){
                    moduleList[id]=module;
                }else{
                    module.id=moduleAnonymousList.length;
                    moduleAnonymousList.push(module);
                }
                return module;
        };
    
   window.define=_define;
        
})(JDK,window);
