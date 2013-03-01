var isDebug=/debug/i.test(window.location.hash),
    Page=Page||{};
	
Page.Menus=Page.Menus 
	|| [
		{
			'url':'http://github.ginano.net',
			'name':'返回测试用例首页',
			'title':'返回到我的测试用例主页',
			'class':'link-home'
		},
		{
			'url':'function_declare.html',
			'name':'函数声明与函数表达式',
			'title':'测试函数声明与表达式的一些基本特征'
		},
		{
			'url':'global_var_delete.html',
			'name':'全局变量的声明和未声明的区别',
			'title':'全局变量的声明和未声明的区别'
		},
		{
            'url':'scope_of_function.html',
            'name':'作用域及作用域链特例',
            'title':'作用域及作用域链的特例'
        }
	];
Page.CopyRight=Page.CopyRight
    || '<h3>免责声明：</h3>\
        本系列相关案例都来源于互联网大牛们，只是兴趣验证一下解惑而已。如果有任何不妥，请及时联系我微博<a href="http://weibo.com/ginano" target="_blank">http://weibo.com/ginano</a><br/>\
        但是如果需要转载本站任何内容，请注明来源是'+location.href+'<br/>\
        目前主要来源：汤姆大叔的博客http://www.cnblogs.com/TomXu/';
(function(window){
	var loginfos={},
		_get=function(id){
			return document.getElementById(id);
		},
		_log=function(str,randomid){
			var html, ol, _span; //是否开启debug模式仅仅在控制台显示
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
		 * 去除子元素影响
		 * @param {Object} fun
		 */
		_withinEl=function(fun){
			return function(e){
				var parent=e.relatedTarget;//上一次相应mouseover/out的元素
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
			this.declare(); //最后才免责声明
			this.showMenu();//菜单显示
			this.notice();   //展示提示信息
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
            html.innerHTML='温馨提示：此链接可以查看本文的源代码调试结果喔！点击试试看<a id="reloadtodebug" href="'+location.href+'?debug=true#debug" title="查看本页面代码调试结果">'+location.href+'#debug</a>';
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
			_html.push('<h3>Source Code：</h3>');
			//目前提供debug信息独立以及debug信息和源代码混合在一起的功能
			
			_html.push('<ol class="source-list">')
			arr=sourceCode.split('\n');
			for(i=0,len=arr.length;i<len;i++){
				tempi='<li>'+arr[i].replace(/\s/g,'&nbsp;');
				_random=j+'_'+Math.floor(Math.random()*50000);
				//这个方法不一定准确，还有待提高好好想想
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
			document.body.appendChild(html); //先展示源代码
			try{
                loadJs(_source.join('\n'));    //加载代码
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
