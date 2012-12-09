define('modules/router',function(){
   /**
    * this is a moudule for the rest protocol
    * it can get the right state from location.hash of window
    * and it's always be used for the controller of mvc
    * @module modules/router
    */
   var router,
       url=window.location.href;
   /**
    *@class Router 
    * @constructor
    */
   var Router={
     /**
      *current router
      * @property  currentRouter
      */
     currentRouter:null,
     /**
      *the configs for the router
      *  @property options
      */
     options:{},
     /**
      *add routers 
      * @method  addRouter
      * @param {Array/String} states
      */
     addRouter:function(states){
         
     },
       /**
        * get the router infomation
        * @method  getCurrentRouter
        * @return {String}
        */
     getCurrentRouter:function(){
         
     },
     /**
      * set the current Router 
      * @method  setCurrentRouter
      * @param {String} state
      */
     setCurrentRouter:function(state){
         
     }  
   };
});
