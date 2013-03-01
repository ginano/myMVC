/**
 *@fileoverview  the pagenation widget for page the content
 *@author ginano
 *@website http://www.ginano.net
 *@date 20130228 
 <div class="widget-pagination">
    <ul class="page-list">
        <li><a class="prev" href="#">��һҳ</a></li>
        <li><a href="#">1</a></li>
        <li><span class="ellipsis">...</span></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a class="active" href="#">5</a></li>
        <li><a href="#">6</a></li>
        <li><a href="#">7</a></li>
        <li><span class="ellipsis">...</span></li>
        <li><a href="#">11</a></li>
        <li><a class="next" href="#">��һҳ</a></li>
    </ul>
    <div class="page-stat">
        <span class="pager-total">��<em class="value">25</em>ҳ</span>
        <span class="pager-jump"><span>��</span><input type="text" class="input"/><span>ҳ</span></span>
        <button class="button button-small" type="submit">ȷ��</button>
    </div>
</div>
 */
define('widget/pagenation',[
        'modules/class',
        'modules/jquery'
    ],function(Class,$){
   var page=new Class('widget/pagenation',{
       private__defaultOption:{
            rootDom:$('body'),  //���ɷ�ҳ�����Ԫ��
            elements:{},        //��Ӧ����Ԫ��
            pageSize:10, //ÿҳ��������
            itemCount:0,    //�ܼ�¼����
            currentPage:0,  //��ǰҳ
            pageCount:0,     //ҳ��ͳ��
            onInit:null, //��ʼ����ɻص�����
            onPage:null, //��ҳִ�лص�
            showInput:false//�Ƿ�չʾ��ת��xxҳ�Ŀؼ�
       },
       /**
        *��ʼ��
        * @param {Object} option 
        */
       public__init:function(option){
           var self=this,
               opt=self.options=$.extend({},self.defaultOption,option),
               el=opt.rootDom,
               els=opt.elements,
               temp;
            //��ʼ���ر���ǩ
            el.html('<div class="clr widget-pagenation"><ul class="page-list"></ul><div class="page-stat"></div></div>'); 
            els.$list=el.find('ul.page-list');
            els.$pager=el.find('div.page-stat');
            
            temp=Math.floor(opt.itemCount/opt.pageSize);    
            if(temp*opt.pageSize<opt.itemCount){
                opt.pageCount=temp-0+1;
            }else{
                opt.pageCount=temp;
            }   
            //��ǰҳ�ж�
            if(opt.currentPage>opt.pageCount){
                opt.currentPage=opt.pageCount;
            }else if(opt.currentPage<1){
                opt.currentPage=1;
            }
            //��ʼ���ṹ             
            self.renderHTML(opt.currentPage,opt.pageCount);
            
            //�����ҳ
            el.on('click.pagenation','ul.page-list a',function(e){
                e.preventDefault();
                var $this=$(this);
                //��ǰҳ������
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
            //����ҳ��
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
            //����ҳ��
            on('keyup.pagenation','input.input',function(e){
                if(e.which==13){
                   el.find('button.button').click();
                }
            }).
            //���ȷ��
            on('click.pagenation','button.button',function(e){
                e.preventDefault();
                var val=el.find('input.input').val()-0,
                    total=self.options.pageCount-0,
                    curre=self.options.currentPage;
                if(/^[1-9]\d*$/.test(val)&&val<=total&&val!=curre){                 
                    self.gotoPage(val);                 
                }               
            });
            //��ʼ����ص�����
                 
            if(opt.onInit){
                opt.onInit.call(this,opt);
            }   
       },
       /**
        *����html�ṹ 
         * @param {Int} currentPage ��ǰҳ��
         * @param {Int} Pagetotal ҳ������
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
            //���û�м�¼
            if(total==0){
                els.$list.html('');
                els.$pager.html('');
                return;
            }
            
            //end     
            if (cur == 1) {
                html.push('<li><a class="prev prev-disable" target="_self" href="javascript:;">��һҳ</a></li>');
                html.push('<li><a class="active" target="_self" href="javascript:;">1</a></li>');
            }
            else {
                html.push('<li><a class="prev" target="_self" href="javascript:;" data-page="' + (cur - 1) + '">��һҳ</a></li>');
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
                html.push('<li><a class="next next-disable" target="_self" href="javascript:;">��һҳ</a></li>');
            }else {
                html.push('<li><a class="next"  target="_self" href="javascript:;" data-page="' + (cur-0.0 + 1) + '">��һҳ</a></li>');
            }           
            els.$list.html(html.join(''));
            //���Ҫչʾ�����
            if(opt.showInput){
                els.$pager.html('<span class="page-total">��<em class="value">'+total+'</em>ҳ</span>\
                                    <span class="page-jump"><span>��</span><input type="text" class="input"/><span>ҳ</span></span>\
                                    <button class="button button-small" type="submit">ȷ��</button>');
            }    
       },
       /**
        *��������ѡ��
        *@param {Object} opt ������ѡ��
        *@param {Int} cur  ��ǰ��λҳ
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
        *���ص�ǰ������ 
        */
       public__getOption:function(){
           return this.options;
       },
       /**
        *��λ��ĳһҳ 
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
        *���ٶ��� 
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
