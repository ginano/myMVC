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
            extends:function(originObj, newObj, isOverride,selectedProperty){
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
                        if(hasOwn.call(newObj,item)){
                            (isOverride||!originObj[item]) && (originObj[item]= newObj[item]);
                        }
                    }
                }else{
                    for ( p in newObj) {
                        if (hasOwn.call(newObj, p)) {
                            (isOverride||!originObj[p]) && (originObj[p]= newObj[p]);
                        }
                    }
                }
                return originObj;
                
            },
            /**
             *遍历所有的成员 
             */
            eachProp:function(obj,callback){
                var i,len;
                switch(typeof obj){
                    case 'array':
                        for(i=0,len=obj.length;i<len;i++){
                            callback&&callback(i,obj);
                        }
                        break;
                    case 'object':
                        for(i in obj){
                            if(hasOwn.call(obj,i)){
                                callback&&callback(i,obj[i]);
                            }
                        }
                        break;
                    default:
                        break;
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
                        interfacePath:'namespace/interface1',
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
                    result['classname']=patharray[len-1];
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
                    switch(returntype){
                        case 'class'://直接返回改类的数据
                            return result['namespace'][result['name']];
                            break;
                        default://默认返回结果列表
                            return result;
                            break;
                    }
                    
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
                //默认public
                type[2]=type[2]||'public';
                if(type[1]){//static直接赋值给这个Class了
                    _this[type[3]]=value;
                    _class[type[1]][type[3]]=value;
                }else if(type[2]){
                    _class[type[2]][type[3]]=value;
                }
            }else{
                Util.log('the property "'+p+'" is not an invalid name as "public__getoffername"!');
                return;
            }
        });
        DataUtil.addNewClass(_class);
        this.getClassPath=function(){
          return classname;  
        };
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
    Util.extends(Class.prototype,{
            /**
             * 从superClass继承属性和方法,只能继承superClass的公开static方法
             * @param {Class} superClass
             */
           extends:function(superClass){
               var clsp,_class;
               if(superClass instanceof Class){
                   clsp=this.getClassPath();
                   _class=DataUtil.getClass(clsp);
                   _class.superClassList.push(superClass.getClassPath());
               }else{
                   Util.log('the '+superClass+' isn\'t an invalid Class during extends');
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
           /**
            *实例化这个类 
            */
           createInstance:function(){
               
           }
        },
        true
    );
    //返回到全局变量
    Util.extends(window,{
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
