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
    
    var mvc=Class('modules/mymvc/mvc',{
    	public__init:function(view,controller,model){
    		this.notify=Notify.create();
    		this.model=model.extend(Model).createInstance();
    		this.controller=controller.extend(Controller).createInstance(this.model,this.notify);
    		this.view=view.extend(View).createInstance(this.controller,this.notify);
    	}
    });
    
    return mvc;
});
