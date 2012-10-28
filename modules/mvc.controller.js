//reference core/jdk.js
//reference module.js
//reference class.js
define('modules/mymvc/controller',[
			'modules/class'
		],function(Class){
    
    var controller=Class('modules/mymvc/controller',{
    	public__init:function(model,notify){
    		this.model=model;
    		this.notify=notify;
    	}
    });
    return controller;
});
