//reference core/jdk.js
//reference module.js
//reference class.js
define('modules/mvc',[
			'modules/class',
			'modules/mymvc/view',
			'modules/mymvc/controller',
			'modules/mymvc/model',
			'modules/notify'
		],function(Class,View,Controller,Model,Notify){
     /**
    * it will return the Class of MVC.
    * @module modules/mvc
    */
   
   /**
    the  class for to implement the MVC design pattern
    @namespace modules.mymvc
    @class MVC
    @constructor
    **/
    var mvc=Class('modules/mymvc/mvc',{
        /**
            the initial entry for a new MVC instance,and it will inital the model/view/controller/notify when the instance is created! 
            @method init
            @public
            @param {View} view 
            @param {Controller} controller 
            @param {Model} model
            @return {MVC} an instance of MVC
         **/
    	public__init:function(view,controller,model){
    		this.notify=Notify.create();
    		this.model=model.extend(Model).createInstance();
    		this.controller=controller.extend(Controller).createInstance(this.model,this.notify);
    		this.view=view.extend(View).createInstance(this.controller,this.notify);
    		return this;
    	}
    });
    
    return mvc;
});
