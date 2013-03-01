var isDebug=/debug/i.test(window.location.hash),
    Page=Page||{};
	
Page.Menus=Page.Menus 
	|| [
		{
			'url':'http://github.ginano.net',
			'name':'���ز���������ҳ',
			'title':'���ص��ҵĲ���������ҳ',
			'class':'link-home'
		},
		{
			'url':'function_declare.html',
			'name':'���������뺯�����ʽ',
			'title':'���Ժ�����������ʽ��һЩ��������'
		},
		{
			'url':'global_var_delete.html',
			'name':'ȫ�ֱ�����������δ����������',
			'title':'ȫ�ֱ�����������δ����������'
		},
		{
            'url':'scope_of_function.html',
            'name':'������������������',
            'title':'��������������������'
        }
	];
Page.CopyRight=Page.CopyRight
    || '<h3>����������</h3>\
        ��ϵ����ذ�������Դ�ڻ�������ţ�ǣ�ֻ����Ȥ��֤һ�½����ѡ�������κβ��ף��뼰ʱ��ϵ��΢��<a href="http://weibo.com/ginano" target="_blank">http://weibo.com/ginano</a><br/>\
        ���������Ҫת�ر�վ�κ����ݣ���ע����Դ��'+location.href+'<br/>\
        Ŀǰ��Ҫ��Դ����ķ����Ĳ���http://www.cnblogs.com/TomXu/';
(function(window){
	var loginfos={},
		_get=function(id){
			return document.getElementById(id);
		},
		_log=function(str,randomid){
			var html, ol, _span; //�Ƿ���debugģʽ�����ڿ���̨��ʾ
			try{
    			if (isDebug && typeof console !== 'undefined' && console.log) {
    				console.log(str);
    			}
    			else {
    				html = _get('logging');
    				
    				//alert(html);
    				if (!html) {
    					html = document.createElement('div');
    					html.setAttribute('id', 'logging');
    					html.innerHTML = '<h3>Debug Results:</h3><ol id="debug-list"></ol>';
    					document.body.insertBefore(html,document.body.firstChild);
    				}
    				
    				ol = _get('debug-list');
    				ol.innerHTML = ol.innerHTML + '<li>' + str + '</li>';
    				
    			}
    			
			}catch(e){
			    str='not declared!';
			}
			_span=_get(randomid);
            if(_span){
                _span.innerHTML='//'+str;
            }
            loginfos[randomid]=str;
		},
		_getLog=function(index){
			if(typeof loginfos[index]!==undefined){
				return loginfos[index];
			}else{
				return '';
			}
		},
		/**
		 * ȥ����Ԫ��Ӱ��
		 * @param {Object} fun
		 */
		_withinEl=function(fun){
			return function(e){
				var parent=e.relatedTarget;//��һ����Ӧmouseover/out��Ԫ��
				while(parent!=this&&parent){
					try{
						parent=parent.parentNode;
					}catch(e){
						break;
					}
				}
				if(parent!=this){
					fun(e);
				}
			};
		},
		_addEvent=function(el,event,fun){
			if(el.attachEvent){
				el.attachEvent('on'+event,fun);
			}else if(el.addEventListener){
				switch(event){
					case 'mouseenter':
						el.addEventListener('mouseover',_withinEl(fun),false);
						break;
					case 'mouseleave':
						el.addEventListener('mouseout',_withinEl(fun),false);
						break;
					default:
						el.addEventListener(event,fun,false);
						break;
				}
				
			}else{
				el['on'+event]=fun;
			}
			
		},
		_removeEvent=function(el,event,fun){
			if(el.removeEventListener){
				switch(event){
					case 'mouseenter':
						event='mouseover';
						break;
					case 'mouseleave':
						event='mouseout';
						break;
					default:
						break; 
				}
				el.removeEventListener(event,fun,false);
			}else if(el.detachEvent){
				el.detachEvent('on'+event,fun);
			}else{
				el['on'+event]=null;
			}
		},
		_loadJs=function(content){
			 var head = document.getElementsByTagName("head")[0] || document.head||document.documentElement,
                script = document.createElement("script");
    
            script.setAttribute('type', "text/javascript");
           
            if(/http:\/\//.test(content)){
                script.setAttribute('src', content);
            }else{
                script.text=content;
            }
            
            head.insertBefore( script, head.firstChild );
            
            //head.removeChild( script );
		};
	window.log=_log;
	window.getLog=_getLog;
	window.addEvent=_addEvent;
	window.removeEvent=_removeEvent;
	window.$=_get;
	window.loadJs=_loadJs;
})(window);
window.onload=function(){
	var init={
		done:function(){
			this.showSource();
			this.declare(); //������������
			this.showMenu();//�˵���ʾ
			this.notice();   //չʾ��ʾ��Ϣ
		},
		declare:function(){
			var html=document.createElement('div');
			html.setAttribute('id','declare');
			html.innerHTML=Page.CopyRight;
			document.body.appendChild(html);
		},
		notice:function(){
            if(isDebug){
                return;
            }
            var html=document.createElement('div');
            html.setAttribute('id','notice');
            html.innerHTML='��ܰ��ʾ�������ӿ��Բ鿴���ĵ�Դ������Խ��ร�������Կ�<a id="reloadtodebug" href="'+location.href+'?debug=true#debug" title="�鿴��ҳ�������Խ��">'+location.href+'#debug</a>';
            document.body.insertBefore(html,document.body.firstChild);
   //         addEvent(document.getElementById('reloadtodebug'),'click',function(e){
   //            location.replace(this.href);
    //        });
        },
		showSource:function(){
			var sourceDiv=$('script-source-code'),
			    sourceCode=sourceDiv.innerHTML,
				html=document.createElement('div'),
				_html=[],
				_source=[],
				arr,i,len,j=0,_rand,tempi;
			html.setAttribute('id','script-source-show');
			_html.push('<h3>Source Code��</h3>');
			//Ŀǰ�ṩdebug��Ϣ�����Լ�debug��Ϣ��Դ��������һ��Ĺ���
			
			_html.push('<ol class="source-list">')
			arr=sourceCode.split('\n');
			for(i=0,len=arr.length;i<len;i++){
				tempi='<li>'+arr[i].replace(/\s/g,'&nbsp;');
				_random=j+'_'+Math.floor(Math.random()*50000);
				//���������һ��׼ȷ�����д���ߺú�����
				if(isDebug&&/\s+log\(/.test(arr[i])){
					tempi+='<span class="debug-result-item" id="'+_random+'"></span>';
					_source.push(arr[i].replace(/\s+log\(([^;]+)(?:\)\s*;\s*)/i,'log($1,"'+_random+'");'));
					j++;
				}else{
				    _source.push(arr[i]);
				}
				tempi+='</li>';
				_html.push(tempi);
			}
			_html.push('</ol>');
			html.innerHTML=_html.join('');
			
			document.body.removeChild(sourceDiv);      
			document.body.appendChild(html); //��չʾԴ����
			try{
                loadJs(_source.join('\n'));    //���ش���
            }catch(e){
                //do nothing
                log('sorry, the source code is error!')
            }		
			
			
		},
		showMenu:function(){
			var html=document.createElement('div'),
				i,len,temp,_html=[],cls='',
				menuList,
				arrow,
				Menus=Page.Menus,
				url=location.href;
			html.setAttribute('id','testcase-menus');
			_html.push('<ul id="menu-list" class="menu-list">');
			for(i=0,len=Menus.length;i<len;i++){
				temp=Menus[i];
				if(url.indexOf(temp['url'])>-1){
					cls='current';
				}else{
					cls='';
				}
				_html.push('<li><a class=" '+cls+' '+(temp['class']||'')+'" href="'+temp['url']+(isDebug?'#debug':'')+'" title="'+temp['title']+'">'+temp['name']+'</a></li>');
			}
			_html.push('</ul>');
			_html.push('<div id="menu-key" class="menu-key">>></div>');
			html.innerHTML=_html.join('');
			document.body.appendChild(html);
			menuList=$('menu-list');
			arrow=$('menu-key');
			//bindevent
			addEvent(html,'mouseenter',function(e){
				menuList.style.width='220px';
				arrow.innerHTML='<<';
			});
			addEvent(html,'mouseleave',function(){
				menuList.style.width='0px';
				arrow.innerHTML='>>';
			});
		}
	};
	
	init.done();
}
