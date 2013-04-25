/**
 *@fileoverview  the number module for converting the 
 *@author ginano
 *@website http://www.ginano.net
 *@date 20130228 
 */
define('modules/string',[
        'modules/class'
    ],function(Class){
   var Str=new Class('modules/string',{
        /**
          * �������볤��
          * @param {Object} str ԭʼ�ַ���
          * @param {Int} length ����
          * @param {String} [option] appendix �����ȳ���ʱ��ʡ�Է�  ,Ĭ����
          * @param {Boolean} [option] isChinese �Ƿ���������⴦���2���ַ�,Ĭ��false�������Ľ������⴦��
          */
         static__limitLength:function(str,length,appendix,isChinese){
             var apptype=typeof appendix,
                 len,i,j,temp;
             if('string'==apptype){
                 isChinese=!!isChinese;
             }else if('boolean'==apptype){
                 isChinese=appendix;
                 appendix='';
             }else{
                 appendix=''
                 isChinese=!!isChinese;
             }
             str=str+'';
             len=str.length;
             ///[\u4E00-\u9FA5]/
             if(isChinese){
                 for(i=0,j=0;i<len;i++){
                     if(length<j){
                         break;
                     }
                     temp=str.charCodeAt(i);
                     if(temp>=0x4E00&&temp<=0x9FA5){
                         j+=2;
                     }else{
                         j+=1;
                     }
                 }
                 if(len>i){
                     return str.substr(0,i-1)+appendix;
                 }else{
                     return str;
                 }
             }else{
                 if(len>length){
                     return str.substr(0,length)+appendix;
                 }else{
                     return str;
                 }
             }
         },
        /**
         *ȫ��ת��Ϊ���
         * ȫ�ǿո�Ϊ12288����ǿո�Ϊ32
         * �����ַ����(33-126)��ȫ��(65281-65374)�Ķ�Ӧ��ϵ�ǣ������65248 
         * @method toDBC
         */
        static__toDBC:function(str) {
            var i,
                len=str.length,
                code,
                result = '';
            for (i = 0; i < len; i++) {
                code = str.charCodeAt(i);
                if (code > 65280 && code < 65375) {
                    result += String.fromCharCode(str.charCodeAt(i) - 65248);
                } else if(code==12288){
                     result += String.fromCharCode(32);   
                }   else {
                    result += str.charAt(i);
                }
            }
            return result;
        },
        /**
         *���תȫ��
         * ȫ�ǿո�Ϊ12288����ǿո�Ϊ32
         * �����ַ����(33-126)��ȫ��(65281-65374)�Ķ�Ӧ��ϵ�ǣ������65248 
         * @method toSBC
         */
        static__toSBC:function(str) {
            var i,
                len=str.length,
                code,
                result = '';
            for (i = 0; i < len; i++) {
                code = str.charCodeAt(i);
                if (code > 32 && code < 127) {
                    result += String.fromCharCode(str.charCodeAt(i) + 65248);
                } else if(code==32){
                     result += String.fromCharCode(12288);   
                }   else {
                    result += str.charAt(i);
                }
            }
            return result;
        },
        /**
          *����Ƿ��нű� 
          */
         static__checkScript:function(val){
             if(/<\/?script\s*>/i.test(val)){
                 return false;
             }else{
                 return true;
             }
         },
         /**
          *����Ƿ���html�ṹ��ǩ 
          */
         static__checkHTML:function(val){
             if(/<\/?[^>]+>/i.test(val)){
                 return false;
             }else{
                 return true;
             }
         },
         /**
          *��ת�����ַ���ת����html��ǩ 
          */
         static__string2HTML:function(val){
            return val.replace(/&lt;/g,'<').replace(/&quot;/g,'"').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&nbsp;/g,' '); 
         },
         /**&quot;
          *��html��������滻���ַ���չʾ 
          */
         static__HTML2String:function(val){
             return val.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
         },
         /**
          *������ڽ���У��� 
          * @param {Object} el
          * @return {Boolean} 
          */
         static__checkFilter:function(val){
             return this.checkScript(val)&&this.checkHTML(val);
         },
         static__getJSONValue:function(val){
             return val.replace(/\t|\r\n|\n/g,' ');
         }  
   });
   return Str;
});
