   /**
    * it will return the View  of MVC.
    * @module modules/mymvc/view
    */
define('modules/mymvc/view',[
			'modules/class'
		],function(Class){
   
   /**
    the  class for to implement view  part in the MVC design pattern
    @namespace modules.mymvc
    @class View
    @constructor
    **/
    var view=Class('modules/mymvc/view',{
    	public__init:function(controller,notify){
    		this.notify=notify;
    		this.controller=controller;
    	}
    });
    return view;
});
