define('modules/store',['modules/class','modules/util'],function(Class,Util){
   /**
    * this is a moudule for the storage 
    * and it's always be used for the controller of mvc
    * @module modules/store
    * @required 'modules/class','modules/util'
    */
   var Store=Class('modules/Store',{
       /**
        *the stores datas 
        * @property {Object}  data
        * @private
        */
       _data:{
           itemList:{},
           itemIndex:[]
       },
       /**
        *the caches for every instance
        * @property {object} cache
        * @private 
        */
       _cache:{},
       /**
        *set the value of cache[key]
        * @method  setCache
        * @param {String} key
        * @param {Object} value
        */
       setCache:function(key,value){
           this._cache[key]=value;
           return this;
       },
       /**
        *get the value of cache[key]
        * @method  getCache
        * @param {String} key
        * @return undefined if without setting
        */
       getCache:function(key){
           return this._cache[key];
       },
       /**
        *add one item  
        * @method addData
        * @param {String} id the unique identity for the data 
        * @param {Object} item it the customed model, and would be every abstract info
        */
       addData:function(id,item){
           var ind=this._data['itemIndex'].indexOf(id);
           //no exist data
           if(ind<0){
               this._data['itemIndex'].push(id);
               ind=this._data['itemIndex'].length;
           }
           this._data['itemIndex']
          
       }
       
   });
   return Store;
});
