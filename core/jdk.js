//refrence from jQuery
(function(win,undefined){
    var isDebug=/debug/i.test(win.location.hash),
        /**
         *���� ���еĳ�Ա
         */
        hasOwn = Object.prototype.hasOwnProperty, 
        Util={
            /**
             * ��չ����Ԫ��
             * @param {Object} originObj ԭʼ����
             * @param {Object} newObj   �¶���
             * @param {Boolean} isOverride  [option][default=true]�Ƿ񸲸����ж���
             * @param {Array} selectedProperty [option]�����б�
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
                        //��̳е�ʱ��Ͳ��ü����
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
             *���copyһ������ 
             * @param {Object} o
             * @param {Boolean} isCloneFunction �Ƿ��ƺ���
             * @param {Boolean} isClonePrototype �Ƿ��ƺ�������չ����
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
				     *���ҽ�������ȸ��ƺ�����������Ҫ���Ƶ��ҵ���չ���Ե�ʱ���ִ�� 
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
             *�������еĳ�Ա 
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
             *��ȡԪ��byid 
             */
            getDom:function(id){
                if(id==='body'){
                    return document.body;
                }
                return document.getElementById(id);
            },
            /**
             *����һ��Ԫ�� 
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
             *�ж��ǲ��ǳ�Ա���� 
             * @param {Object} args �������ĳ�������ڵ�arguments
             * @param {String} byWhat ͨ��ʲô��Ա����У�飿
             */
            checkCallerIsProperty:function(args,byWhat){
                var caller=args.callee.caller,
                    isTrue=false;
                //���caller���ڲ��Ҹøú������������ԣ�����Ҫһֱ����˵�����ڱ�Ƕ�׵���
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
        //������ͽӿڹ��������Դ
        dataSource={
            "classes":{
                //����Ϊ�����ռ�
                "__type__":'namespace',
                "namespace":{
                    "__type__":'namespace',
                    "_______eg":{
                        /**
                         *���������ڵ������ռ� 
                         */
                        'classPath':'namespace/myclass',
                        /**
                         *class������ 
                         */
                        '__type__':'class',
                        /**
                         *ʵ������ʱ��ϵͳ���ɵĹ��캯�� 
                         */
                        '__constructor__':function(){
                            
                        },
                        /**
                         *�������ʱ�����õ�ǰ�� 
                         */
                        '__class__':null,
                        /*
                         * ��ϵ�з���ֻ�ж�Ӧ��Class�ܹ�ʹ��
                         */
                        'static':{
                            
                        },
                        //˽�з���
                        'private':{
                            
                        },
                        /**
                         *�ܱ����ķ��� 
                         */
                        'protected':{
                            
                        },
                        /**
                         *�������� 
                         */
                        'public':{
                            
                        },
                        /**
                         *�̳��б� 
                         */
                        'superClassList':[
                            'namespace/class2',
                            'namespace/class3'
                        ],
                        /**
                         *ʵ�ֵĽӿ��б� 
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
                         *��class������ 
                         */
                        '__type__':'interface',
                        //˽�з���
                        'private':{
                            
                        },
                        /**
                         *�ܱ����ķ��� 
                         */
                        'protected':{
                            
                        },
                        /**
                         *�������� 
                         */
                        'public':{
                            
                        }
                    }
                }
            }
        },
        /**
         *class��صĹ�����֧�� 
         */
        DataUtil={
            /**
             *��ȡ�����ռ� 
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
             *������һ��Class 
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
     *�๹����  ��Ŀǰ��֧��__static���ͣ������������������
     * @param {String} classname eg:'trade/view'��ʾ�����trade�����ռ��µ�view��
     * @param {Object} obj {prop1:null,prop2__static:null} ����Ǿ�̬���Ժ��������__static��Ϊ��ʾ��
     */
    function Class(classname,obj){
        if(typeof classname !=='string'){
            Util.log(classname+' is not an invalid classname like "modules/view"!');
            return;
        }
        //��Ҫ�����ϲ��Class
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
            //�������������
            if(type){
                //�����еĺ�����Ա��һ�����Ա��ڱ�ʾ
                if(typeof value==='function'){
                    value.__isJDKProperty__=true;
                }
                //Ĭ��public
                type[2]=type[2]||'public';
                if(type[1]){//staticֱ�Ӹ�ֵ�����Class��
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
     *����ӿ� 
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
            //�������������
            if(type){
                type[2]=type[2]||'public';
                if(type[1]){//staticֱ�Ӹ�ֵ�����Class��
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
    //��չClass
    Util.extend(Class.prototype,{
            /**
             * ��superClass�̳����Ժͷ���,ֻ�ܼ̳�superClass�Ĺ���static����
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
            *ʵ�ֽӿ� 
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
            *�ж��Ƿ�̳��� 
            * @param {Class} superClass
            */
           isExtendsFrom:function(superClass){
               var clsp=this.getClassPath(),
                    _class=DataUtil.getClass(clsp);
                return _class.superClassList.indexOf(superClass)>-1;
           },
           /**
            *�ж��Ƿ�ʵ����ĳ���ӿ� 
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
            *ʵ��������� 
            * ����
            */
           createInstance:function(){
               var clsp=this.getClassPath(),
                   clsn=this.getClassName(),
                   _class=DataUtil.getClass(clsp),
                   con,properties={},functions={},
                   i,p,len,temp={},tempclass,tempcase,Incase;
               //�����û�����ɹ����캯���������ɹ��캯��
               //���캯��ֻ���ɹ����ĺ���������ֵӦ�����ӵ�ʵ������
               if(!_class.__constructor__){
                   eval('function '+clsn+'(){};con='+clsn+';');
                   //�̳�ʵ��,ֻ�ܼ̳�public��protected
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
                  //ֻ��function���д��� 
                  for(_p in _class['public']){
                      if(typeof _class['public'][_p]==='function'){
                         functions[_p]=_class['public'][_p];
                      }else{
                          properties[_p]=_class['public'][_p];
                      }
                  } 
                   //������ʵ��
                  //Util.extend(con.prototype,_class['public'],true);
                  //ֻ��function���д��� 
                  for(_p in _class['protected']){
                      if(typeof _class['protected'][_p]==='function'){
                          functions[_p]=_class['protected'][_p];
                      }else{
                          properties[_p]=_class['protected'][_p];
                      }
                  } 
                   //������ʵ��
                   //Util.extend(con.prototype,_class['protected'],true);
                   //������ʵ��
                   for(_p in _class['private']){
                       if(typeof _class['private'][_p]==='function'){
                           functions[_p]=(function(p){
                               //����������������ã����޷����
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
               //��չ���ԣ����������ʵ�����У�����ͨ��prototype����ɣ��������γ��໥����
               //public
               
               //ֻ��function���д��� 
               Util.extend(Incase,_class.__properties__,true);
               Incase.init&&Incase.init.apply(Incase,arguments);
               return Incase; 
           }
        },
        true
    );
    //���ص�ȫ�ֱ���
    Util.extend(win,{
           //���⹫��ΪJDK
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
