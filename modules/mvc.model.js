//reference core/jdk.js
//reference module.js
//reference class.js
/**
* it will return the Module  of MVC.
* @module modules/mymvc/model
*/
define('modules/mymvc/model',[
			'modules/class'
		],function(Class){
    /**
    the  class for to implement model  part in the MVC design pattern
    @namespace modules.mymvc
    @class Model
    @constructor
    **/
    var model=Class('modules/mymvc/model',{
    	public__init:function(){
    	}
    });
    return model;
});
