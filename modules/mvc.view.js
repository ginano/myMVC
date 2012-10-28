//reference core/jdk.js
//reference module.js
//reference class.js
define('modules/mymvc/view',[
			'modules/class'
		],function(Class){
    
    var view=Class('modules/mymvc/view',{
    	public__init:function(controller,notify){
    		this.notify=notify;
    		this.controller=controller;
    	}
    });
    return view;
});
