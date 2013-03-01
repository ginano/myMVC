//reference core/jdk.js
//reference module.js
//reference class.js
/**
* it will return the Controller  of MVC.
* @module modules/mymvc/controllers
*/
define('modules/mymvc/controller',[
			'modules/class'
		],function(Class){
    /**
    the  class for to implement Controller  part in the MVC design pattern
    @namespace modules.mymvc
    @class Controller
    @constructor
    @param {Model} model 
    @param {Notify} notify the communication tool bettween every mmodule 
    @return {Controller} return the controller linked with itself's model and notify
    **/
    var controller=Class('modules/mymvc/controller',{
    	public__init:function(model,notify){
    		this.model=model;
    		this.notify=notify;
    	}
    });
    return controller;
});
