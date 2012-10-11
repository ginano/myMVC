//reference core/jdk.js
(function(JDK,win,undefined){
    var moduleList={};
        moduleAnonymousList=[];
        
    var Module=JDK.Class('commonjs/module',{
            /**
             *ģ���ʼ������� 
             * @param {String} id
             * @param {Array} req
             * @param {Function} factory
             */
            public__init:function(id,req,factory){
                var idtype=typeof id;
                switch(idtype){
                    case 'string':
                        if('function'=== typeof req){
                            factory=req;
                            req=[];
                        }else if(!req instanceof Array){
                            JDK.Util.log('module '+id+' init faild,becaseof the invalid argument:"req".');
                            return;
                        }
                        break;
                    case 'object':
                        if(id instanceof Array){
                            factory=req;
                            req=id;
                            id='';
                        }else{
                            JDK.Util.log('module '+id+' init faild,becaseof the invalid argument:"req".');
                            return;
                        }
                        break;
                    case 'function':
                        factory=id;
                        req=[];
                        id='';
                        break;
                    default:
                        JDK.Util.log('module '+id+' init faild,becaseof the invalid arguments.');
                        return;
                        break;
                }
                this.requiredList=req;
                this.factory=factory;
                this.id=id;
            },
            public__id:'',
            /**
             * ע��ִ��ģ��
             * @param {String} type ִ������
             */
            public__excute:function(type){
                var type=type||'';
                switch(type){
                    case '~':
                        break;
                    default:
                        this.excuteit();
                        break;
                }
            },
            /**
             *ִ��ģ�� 
             */
            private__excuteit:function(){
               var args=this.getRequireList(this.requiredList);
               this.exprots=this.factory.apply(this,requireList,args);
            },
            /**
             *��ȡ����������ģ���б� 
             * @param {Array} list
             */
            private__getRequireList:function(list){
                var _out=[],
                    i,len,temp;
                if(list instanceof Array){
                    for( i=0,len=list.length;i<len;i++){
                        temp=moduleList[list[i]];
                        if(temp){
                            _out.push(temp.getExports());
                        }else{
                            JDK.Util.log('module '+list[i]+' not exist when it been required in module:'+this.id);
                            _out.push({});
                        }
                    }
                }
                return _out;
            },
            /**
             *��ȡģ�� 
             */
            public__getExports:function(){
                if(!this.exports){
                    this.excuteit();
                }
                return this.exports
            },
            
            public__requiredList:[],
            public__exports:null
        }),
        _define=function(id,req,factory){
                var module=Module.createInstance(id,req,factory);
                if(module.id){
                    moduleList[id]=module;
                }else{
                    module.id=moduleAnonymousList.length;
                    moduleAnonymousList.push(module);
                }
                return module;
        };
    
   window.define=_define;
        
})(JDK,window);
