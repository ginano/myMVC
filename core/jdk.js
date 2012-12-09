//refrence from jQuery
(function(win,undefined){
    var isDebug=/debug/i.test(win.location.hash),
        /**
         *遍历 所有的成员
         */
        hasOwn = Object.prototype.hasOwnProperty, 
        Util={
            /**
             * 扩展对象元素
             * @param {Object} originObj 原始对像
             * @param {Object} newObj   新对象
             * @param {Boolean} isOverride  [option][default=true]是否覆盖已有对象
             * @param {Array} selectedProperty [option]覆盖列表
             */
            extend:function(originObj, newObj, isOverride,selectedProperty){
                var p,item;
                originObj=originObj||{};
                if(!newObj){
                    return;
                }
                
                if(isOverride instanceof Array){
                    selectedProperty=isOverride;
                    isOverride=true;
                }
                if(isOverride===undefined){
                    isOverride=true;
                }
                if(selectedProperty && (p=selectedProperty.length)){
                    while(p--){
                        item=selectedProperty[p];
                        //类继承的时候就不用检查了
                        if(('function'===typeof item.getClassName)||hasOwn.call(newObj,item)){
                            (isOverride||!originObj[item]) && (originObj[item]= this.cloneObject(newObj[item]));
                        }
                    }
                }else{
                    for ( p in newObj) {
                        item=newObj[p];
                        if ((item && 'function'===typeof item.getClassName)||hasOwn.call(newObj, p)) {
                            (isOverride||!originObj[p]) && (originObj[p]= this.cloneObject(item));
                        }
                    }
                }
                return originObj;
                
            },
            /**
             *深度copy一个对象 
             * @param {Object} o
             * @param {Boolean} isCloneFunction 是否复制函数
             * @param {Boolean} isClonePrototype 是否复制函数的扩展属性
             */
            cloneObject:function(o,isCloneFunction,isClonePrototype){
			    function copyObject(obj,isCopyFunction,isCopyPrototype){
			    	var objClone,
				    	con,
				    	prop;
				    if(obj===undefined||obj===null){
				    	return objClone=obj;
				    }
				    con=obj.constructor;
				    if (con == Object){
				        objClone = new con(); 
				    }else if(con==Function){
				    	if(isCopyFunction){
				    		objClone=eval('['+obj.toString()+']')[0];
				    	}else{
				    		return objClone=obj;
				    	}
				    }else{
				        objClone = new con(obj.valueOf()); 
				    }
				    for(var key in obj){
				        if ( objClone[key] != obj[key] ){ 
				            if ( typeof(obj[key]) == 'object' ){ 
				                objClone[key] = copyObject(obj[key],isCopyFunction);
				            }else{
				                objClone[key] = obj[key];
				            }
				        }
				    }
				    /**
				     *当且仅当是深度复制函数，并且需要复制当且的扩展属性的时候才执行 
				     */
				    if(con==Function&&isCopyFunction&&isCopyPrototype){
				    	prop=obj.prototype;
				    	for(var key in prop){
				            if ( typeof(prop[key]) == 'object' ){ 
				                objClone.prototype[key] = copyObject(prop[key],isCopyFunction,isCopyPrototype);
				            }else{
				                objClone.prototype[key] = prop[key];
				            }
					    }
				    }
				    objClone.toString = obj.toString;
				    objClone.valueOf = obj.valueOf;
				    return objClone; 
			    }
			    return copyObject(o,isCloneFunction,isClonePrototype);
            },
            /**
             *遍历所有的成员 
             */
            eachProp:function(obj,callback){
                var i,len;
                if(obj instanceof Array){
                    for(i=0,len=obj.length;i<len;i++){
                        callback&&callback(i,obj);
                    }
                    return;
                }
                if(obj instanceof Object){
                    for(i in obj){
                        if(hasOwn.call(obj,i)){
                            callback&&callback(i,obj[i]);
                        }
                    }
                    return;
                }
            },
            /**
             *获取元素byid 
             */
            getDom:function(id){
                if(id==='body'){
                    return document.body;
                }
                return document.getElementById(id);
            },
            /**
             *创建一个元素 
             */
            createDom:function(tagname,prop){
              var _dom= document.createElement(tagname);
              if(prop){
                  this.eachProp(prop,function(p,value){
                      if(p=='html'){
                          _dom.innerHTML=value;
                      }else{
                          _dom.setAttribute(p,value);
                      }
                  });
              }
              return _dom;  
            },
            log:function(p){
                var html,body;
                if(!isDebug){
                    return;
                }
                if(typeof console !== 'undefined' && console.log){
                    console.log(p);
                }else{
                    html = this.getDom('class-logging');
                    body=this.getDom('body');
                    //alert(html);
                    if (!html) {
                        html = this.createDom('div',{
                            "id":"class-logging",
                            "html":'<h3>Debug Results:</h3><ol id="class-debug-list"></ol>'
                        });
                        body.insertBefore(html,body.firstChild);
                    }
                    ol = this.getDom('debug-list');
                    ol.innerHTML = ol.innerHTML + '<li>' + p + '</li>';
                }
            },
            /**
             *判断是不是成员调用 
             * @param {Object} args 传入的是某个函数内的arguments
             * @param {String} byWhat 通过什么成员名来校验？
             */
            checkCallerIsProperty:function(args,byWhat){
                var caller=args.callee.caller,
                    isTrue=false;
                //如果caller存在并且该该函数还不是属性，就需要一直向上说明还在被嵌套调用
                while(caller){
                    if(caller[byWhat]){
                        isTrue=true;
                        break;
                    }else{
                        caller=caller.arguments.callee.caller;
                    }
                }
                return isTrue;
            }
        },
        //进行类和接口管理的数据源
        dataSource={
            "classes":{
                //表名为命名空间
                "__type__":'namespace',
                "namespace":{
                    "__type__":'namespace',
                    "_______eg":{
                        /**
                         *该类型所在的命名空间 
                         */
                        'classPath':'namespace/myclass',
                        /**
                         *class的类型 
                         */
                        '__type__':'class',
                        /**
                         *实例化的时候系统生成的构造函数 
                         */
                        '__constructor__':function(){
                            
                        },
                        /**
                         *创建类的时候引用当前类 
                         */
                        '__class__':null,
                        /*
                         * 此系列方法只有对应的Class能够使用
                         */
                        'static':{
                            
                        },
                        //私有方法
                        'private':{
                            
                        },
                        /**
                         *受保护的方法 
                         */
                        'protected':{
                            
                        },
                        /**
                         *公开方法 
                         */
                        'public':{
                            
                        },
                        /**
                         *继承列表 
                         */
                        'superClassList':[
                            'namespace/class2',
                            'namespace/class3'
                        ],
                        /**
                         *实现的接口列表 
                         */
                        'interfaceList':[
                            'namespace/interface1',
                            'namespace/interface2'
                        ]
                    }   
                }
            },
            "interfaces":{
                "__type__":'namespace',
                "namespace":{
                    "__type__":'namespace',
                    "______eg":{
                        'interfacePath':'namespace/interface1',
                        /**
                         *改class的类型 
                         */
                        '__type__':'interface',
                        //私有方法
                        'private':{
                            
                        },
                        /**
                         *受保护的方法 
                         */
                        'protected':{
                            
                        },
                        /**
                         *公开方法 
                         */
                        'public':{
                            
                        }
                    }
                }
            }
        },
        /**
         *class相关的工具类支持 
         */
        DataUtil={
            /**
             *获取命名空间 
             * @param {string} path the path of class or interface
             * @param {string} type class/interface
             */
            getNameSpace:function(path,type){
                var patharray=path.split('\/'),
                    i,
                    len=patharray.length,
                    result={
                        name:'',
                        namespace:null
                    },
                    type=type=='interface'?'interfaces':'classes';
                  
                if(len<1){
                    Util.log('please input the right path of classname!');
                    return null;
                }else{
                    result['name']=patharray[len-1];
                    result['namespace']=dataSource[type];
                    for(i=0;i<len-1;i++){
                        result['namespace']=result['namespace'][patharray[i]]=result['namespace'][patharray[i]]||{
                            '__type__':'namespace'
                         };
                    }
                    if(result['namespace'].__type__!=='namespace'){
                        Util.log('sorry,you can not declare the class under another class!');
                        return null;
                    }
                    return result;
                    
                }
            },
            getClass:function(classpath){
                var nsp=this.getNameSpace(classpath,'class');
                return nsp['namespace'][nsp['name']];
            },
            /**
             *新增加一个Class 
             */
            addNewClass:function(obj){
                var namesp=this.getNameSpace(obj.classPath,'class');
                if(namesp){
                    obj.__type__='class';
                    namesp['namespace'][namesp['name']]=obj;
                    return true;
                }else{
                    return false;
                }
                
            },
            getInterface:function(classpath){
                var nsp=this.getNameSpace(classpath,'interface');
                return nsp['namespace'][nsp['name']];
            },
            addNewInterface:function(obj){
                var namesp=this.getNameSpace(obj.classPath,'interface');
                if(namesp){
                    obj.__type__='interface';
                    namesp['namespace'][namesp['name']]=obj;
                    return true;
                }else{
                    return false;
                }
            }
        };
    /**
     *类构造器  ，目前仅支持__static类型，后续再添加其他类型
     * @param {String} classname eg:'trade/view'表示打包再trade命名空间下的view类
     * @param {Object} obj {prop1:null,prop2__static:null} 如果是静态属性后面请添加__static作为标示符
     */
    function Class(classname,obj){
        if(typeof classname !=='string'){
            Util.log(classname+' is not an invalid classname like "modules/view"!');
            return;
        }
        //需要覆盖上层的Class
        if(!(this instanceof Class)){
            return new Class(classname,obj);
        }
        var _class={
            'classPath':classname,
            'static':{},
            'private':{},
            'protected':{},
            'public':{},
            'superClassList':[],
            'interfaceList':[]
        },
        _this=this;
        
        Util.eachProp(obj,function(p,value){
            var type=p.match(/^(?:(static)__)?(?:(public|private|protected)__)?([^__]+)$/);
            //如果设置类类型
            if(type){
                //给所有的函数成员加一个属性便于标示
                if(typeof value==='function'){
                    value.__isJDKProperty__=true;
                }
                //默认public
                type[2]=type[2]||'public';
                if(type[1]){//static直接赋值给这个Class了
                    _this[type[3]]=value;
                    _class[type[1]][type[3]]=value;
                }else if(type[2]){
                    _class[type[2]][type[3]]=value;
                }
            }else{
                Util.log('the property "'+p+'" is not an valid name like "public__getoffername"!');
                return;
            }
        });
        
        this.getClassPath=function(){
          return classname;  
        };
        _class.__class__=this;
        DataUtil.addNewClass(_class);
    }
    
    /**
     *构造接口 
     */
    function Interface(interfaceName,obj){
        if(! (this instanceof Interface)){
            return new Interface(obj);
        }
        var _interface={
            'interfacePath':interfaceName,
            'static':{},
            'private':{},
            'protected':{},
            'public':{}
        };
        
        Util.eachProp(obj,function(p,value){
            var type=p.match(/^(?:(static)__)?(?:(public|private|protected)__)?([^__]+)$/);
            //如果设置类类型
            if(type){
                type[2]=type[2]||'public';
                if(type[1]){//static直接赋值给这个Class了
                    _class[type[1]][type[3]]=value;
                }else if(type[2]){
                    _class[type[2]][type[3]]=value;
                }
            }else{
                Util.log('the property "'+p+'" is not an invalid name as "public__getoffername"!');
                return;
            }
        });
        DataUtil.addInterface(_interface);
        this.getInterfacePath=function(){
          return interfaceName;  
        };
    }
    //扩展Class
    Util.extend(Class.prototype,{
            /**
             * 从superClass继承属性和方法,只能继承superClass的公开static方法
             * @param {Class} superClass
             */
           extend:function(superClass){
               var clsp,_class;
               if(superClass instanceof Class){
                   clsp=this.getClassPath();
                   _class=DataUtil.getClass(clsp);
                   _class.superClassList.push(superClass.getClassPath());
               }else{
                   Util.log('the '+superClass+' isn\'t an invalid Class during extend');
               }
               return this;
           },
           /**
            *实现接口 
            * @param {Interface} superClass
            * @param {Object} methods {method:function(){}}
            */
           implements:function(pinterface){
               if(pinterface&&pinterface.isInterface()){
                   
               }else{
                   Util.log('the '+pinterface+' isn\'t an invalid Interface during implements');
               }
               return this;
           },
           /**
            *判断是否继承自 
            * @param {Class} superClass
            */
           isExtendsFrom:function(superClass){
               var clsp=this.getClassPath(),
                    _class=DataUtil.getClass(clsp);
                return _class.superClassList.indexOf(superClass)>-1;
           },
           /**
            *判断是否实现了某个接口 
            * @param {Interface} pInterface
            */
           isImplements:function(pInterface){
               var clsp=this.getClassPath(),
                    _class=DataUtil.getClass(clsp);
                return _class.interfaceList.indexOf(superClass)>-1;
           },
           getClassName:function(){
              var clspA=this.getClassPath().split('\/');
              return clspA[clspA.length-1];  
           },
           /**
            *实例化这个类 
            * 属性
            */
           createInstance:function(){
               var clsp=this.getClassPath(),
                   clsn=this.getClassName(),
                   _class=DataUtil.getClass(clsp),
                   con,properties={},functions={},
                   i,p,len,temp={},tempclass,tempcase,Incase;
               //如果还没有生成过构造函数，就生成构造函数
               //构造函数只生成公共的函数，属性值应当附加到实例上面
               if(!_class.__constructor__){
                   eval('function '+clsn+'(){};con='+clsn+';');
                   //继承实现,只能继承public和protected
                   len=_class.superClassList.length;
                   for(i=0;i<len;i++){
                       tempclass=DataUtil.getClass(_class.superClassList[i]);
                       if(tempclass){
                            //tempcase=tempclass['__class__'].createInstance();
                            for(_p in tempclass['public']){
                                if('function'===typeof tempclass['public'][_p]){
                                    functions[_p]=tempclass['public'][_p];
                                }else{
                                    properties[_p]=tempclass['public'][_p];
                                }
                            }
                            for(_p in tempclass['protected']){
                                if('function'===typeof tempclass['protected'][_p]){
                                     functions[_p]=tempclass['protected'][_p];
                                }else{
                                    properties[_p]=tempclass['protected'][_p];
                                }
                            }
                       }
                      
                   }
                  //只对function进行处理 
                  for(_p in _class['public']){
                      if(typeof _class['public'][_p]==='function'){
                         functions[_p]=_class['public'][_p];
                      }else{
                          properties[_p]=_class['public'][_p];
                      }
                  } 
                   //自身方法实现
                  //Util.extend(con.prototype,_class['public'],true);
                  //只对function进行处理 
                  for(_p in _class['protected']){
                      if(typeof _class['protected'][_p]==='function'){
                          functions[_p]=_class['protected'][_p];
                      }else{
                          properties[_p]=_class['protected'][_p];
                      }
                  } 
                   //自身方法实现
                   //Util.extend(con.prototype,_class['protected'],true);
                   //自身方法实现
                   for(_p in _class['private']){
                       if(typeof _class['private'][_p]==='function'){
                           functions[_p]=(function(p){
                               //如果不是自身方法调用，则无法完成
                               return function(){
                                  if(!Util.checkCallerIsProperty(arguments,'__isJDKProperty__')){
                                      Util.log(p+' is a private property!');
                                      return;
                                  }else{
                                      return _class['private'][p].apply(this,arguments);
                                  }
                               };
                           })(_p); 
                      }else{
                          properties[_p]=_class['private'][_p];
                      }
                   }
                   Util.extend(con.prototype,functions,true);
                   //other property
                   Util.extend(con.prototype,{
                          getClassName:function(){
                              return clsn;
                          },
                          getClassPath:function(){
                              return clsp;
                          }
                   },true);
                   _class.__properties__=properties;
                   _class.__constructor__=con;
               }else{
                   con=_class.__constructor__;
               }
               Incase=new con();
               //扩展属性，这个必须是实例独有，不能通过prototype来完成，这样会形成相互干扰
               //public
               
               //只对function进行处理 
               Util.extend(Incase,_class.__properties__,true);
               Incase.init&&Incase.init.apply(Incase,arguments);
               return Incase; 
           }
        },
        true
    );
    //返回到全局变量
    Util.extend(win,{
           //对外公布为JDK
           "JDK":{
                "Util":Util,
                "Class":Class,
                "Interface":Interface
               }
        },
        true,
        ['JDK']
    );
})(window,undefined);
