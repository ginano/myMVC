/**
 *@fileoverview  the pagenation widget for page the content
 *@author ginano
 *@website http://www.ginano.net
 *@date 20130228 
 <div class="widget-pagination">
    <ul class="page-list">
        <li><a class="prev" href="#">上一页</a></li>
        <li><a href="#">1</a></li>
        <li><span class="ellipsis">...</span></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a class="active" href="#">5</a></li>
        <li><a href="#">6</a></li>
        <li><a href="#">7</a></li>
        <li><span class="ellipsis">...</span></li>
        <li><a href="#">11</a></li>
        <li><a class="next" href="#">下一页</a></li>
    </ul>
    <div class="page-stat">
        <span class="pager-total">共<em class="value">25</em>页</span>
        <span class="pager-jump"><span>到</span><input type="text" class="input"/><span>页</span></span>
        <button class="button button-small" type="submit">确定</button>
    </div>
</div>
 */
define('widget/pagenation',[
        'modules/class',
        'modules/jquery'
    ],function(Class,$){
   var page=new Class('widget/pagenation',{
       private__defaultOption:{
            rootDom:$('body'),  //生成翻页组件的元素
            elements:{},        //对应的子元素
            pageSize:10, //每页内容条数
            itemCount:0,    //总记录条数
            currentPage:0,  //当前页
            pageCount:0,     //页数统计
            onInit:null, //初始化完成回调函数
            onPage:null, //翻页执行回调
            showInput:false//是否展示跳转到xx页的控件
       },
       /**
        *初始化
        * @param {Object} option 
        */
       public__init:function(option){
           var self=this,
               opt=self.options=$.extend({},self.defaultOption,option),
               el=opt.rootDom,
               els=opt.elements,
               temp;
            //初始化必备标签
            el.html('<div class="clr widget-pagenation"><ul class="page-list"></ul><div class="page-stat"></div></div>'); 
            els.$list=el.find('ul.page-list');
            els.$pager=el.find('div.page-stat');
            
            temp=Math.floor(opt.itemCount/opt.pageSize);    
            if(temp*opt.pageSize<opt.itemCount){
                opt.pageCount=temp-0+1;
            }else{
                opt.pageCount=temp;
            }   
            //当前页判断
            if(opt.currentPage>opt.pageCount){
                opt.currentPage=opt.pageCount;
            }else if(opt.currentPage<1){
                opt.currentPage=1;
            }
            //初始化结构             
            self.renderHTML(opt.currentPage,opt.pageCount);
            
            //点击翻页
            el.on('click.pagenation','ul.page-list a',function(e){
                e.preventDefault();
                var $this=$(this);
                //当前页不操作
                if($this.hasClass('active')){
                    return false;
                }
                if($this.hasClass('next-disable')){
                    return false;
                }
                if($this.hasClass('prev-disable')){
                    return false;
                }
                var pagenum=$this.data('page');
                self.gotoPage(pagenum);
            }).
            //输入页码
            on('blur.pagenation','input.input',function(){
                var $this=$(this),
                    val=$this.val()-0,
                    total=self.options.pageCount-0;
                if(/^[1-9]\d*$/.test(val)){
                    if(val>total){
                        $this.val(total);
                    }
                }else{
                    $this.val(1);                 
                }
            }).
            //输入页码
            on('keyup.pagenation','input.input',function(e){
                if(e.which==13){
                   el.find('button.button').click();
                }
            }).
            //点击确定
            on('click.pagenation','button.button',function(e){
                e.preventDefault();
                var val=el.find('input.input').val()-0,
                    total=self.options.pageCount-0,
                    curre=self.options.currentPage;
                if(/^[1-9]\d*$/.test(val)&&val<=total&&val!=curre){                 
                    self.gotoPage(val);                 
                }               
            });
            //初始化后回调函数
                 
            if(opt.onInit){
                opt.onInit.call(this,opt);
            }   
       },
       /**
        *重设html结构 
         * @param {Int} currentPage 当前页面
         * @param {Int} Pagetotal 页面总数
        */
       public__renderHTML:function(currentPage,Pagetotal){
           var cur=currentPage-0,
               total=Pagetotal-0,
               self=this,
               opt=self.options,
               els=opt.elements,
               html=[],
               pre,
               next,
               temp;
           if (cur < 1){
              cur=1;
           }
           if (cur > total) {
              cur = total;
           }
            
            opt.currentPage=cur;
            //如果没有记录
            if(total==0){
                els.$list.html('');
                els.$pager.html('');
                return;
            }
            
            //end     
            if (cur == 1) {
                html.push('<li><a class="prev prev-disable" target="_self" href="javascript:;">上一页</a></li>');
                html.push('<li><a class="active" target="_self" href="javascript:;">1</a></li>');
            }
            else {
                html.push('<li><a class="prev" target="_self" href="javascript:;" data-page="' + (cur - 1) + '">上一页</a></li>');
                html.push('<li><a target="_self" href="javascript:;" data-page="1">1</a></li>');
            }
            if (total > 1) {
                if (cur > 4 && total > 7) {
                    html.push('<li><span class="ellipsis">...</span></li>');
                }                
                //cur==1?
                if (cur < 3) {
                    pre = 0;
                    next = cur == 1 ? 5 : 4;
                    if (cur + next > total) {
                        next = total - cur;
                    }                    
                }else if (cur == 3) {
                    pre = 1;
                    next = 3;
                    if (cur + next > total){
                         next = total - cur;
                    }                    
                }else {
                    pre = 2;
                    next = 2;
                    if (cur + next > total) {
                        next = total - cur;
                    }                    
                    pre = 4 - next;
                    if (cur + 3 > total) {
                        pre++;
                    }                    
                    if (cur - pre < 2) {
                         pre = cur - 2;
                    }                   
                }            
                for (var i = pre; 0 < i; i--) {
                    temp=cur - i;
                    html.push('<li><a target="_self" href="javascript:;" data-page="' + temp + '">' + temp + '</a></li>');
                }                
                if (cur > 1) {
                     html.push('<li><a class="active" target="_self" href="javascript:;">' + cur + '</a></li>');
                }               
                for (var i = 1; i < next + 1; i++) {
                    temp=cur-0.0+i;
                    html.push('<li><a  target="_self" href="javascript:;" data-page="' + temp + '">' + temp + '</a></li>');
                }            
                if (cur + next < total - 1) {
                    html.push('<li><span class="ellipsis" >...</span></li>');
                    html.push('<li><a  target="_self" href="javascript:;" data-page="' + total + '">' + total + '</a></li>');
                }
                if (cur + next == total - 1) {
                    html.push('<li><a  target="_self" href="javascript:;" data-page="' + total + '">' + total + '</a></li>');
                }                
            }
            if (cur == total) {
                html.push('<li><a class="next next-disable" target="_self" href="javascript:;">下一页</a></li>');
            }else {
                html.push('<li><a class="next"  target="_self" href="javascript:;" data-page="' + (cur-0.0 + 1) + '">下一页</a></li>');
            }           
            els.$list.html(html.join(''));
            //如果要展示输入框
            if(opt.showInput){
                els.$pager.html('<span class="page-total">共<em class="value">'+total+'</em>页</span>\
                                    <span class="page-jump"><span>到</span><input type="text" class="input"/><span>页</span></span>\
                                    <button class="button button-small" type="submit">确定</button>');
            }    
       },
       /**
        *重置所有选项
        *@param {Object} opt 重新设选项
        *@param {Int} cur  当前定位页
        */
       public__reset:function(opt,cur){
           var _opt=this.options;
            _opt=$.extend(_opt,opt),
            temp=Math.floor(_opt.itemCount/_opt.pageSize);
            
            if(temp*_opt.pageSize<_opt.itemCount){
                _opt.pageCount=temp-0+1;
            }else{
                _opt.pageCount=temp;
            }
                
            this.renderHTML(cur||0,_opt.pageCount);
            if(_opt.onInit){
                _opt.onInit.call(this,_opt);
            }  
       },
       /**
        *返回当前的配置 
        */
       public__getOption:function(){
           return this.options;
       },
       /**
        *定位到某一页 
        * @param {Int} page
        */
       public__gotoPage:function(page){
            var _opt=this.options;
            this.renderHTML(page,_opt.pageCount);
            if(_opt.onPage){
                _opt.onPage.call(this,_opt);
            }   
       },
       /**
        *销毁对象 
        */
       public__destory:function(){
            var self=this,
               opt=self.options,
               el=opt.rootDom,
               els=opt.elements,
               temp;   
            els.$list=null;
            els.$pager=null;
            el.off('.pagenation');
            opt.rootDom=null;
            opt.elements=null;
            self.onPage=null;
            self.onInit=null;
            self.options=null; 
       }
   });
   return page;
});
