/**
 *@fileoverview  the cookie plugin for operating the website cookie
 * reference from jquery cookie plugin 
 *@author ginano
 *@website http://www.ginano.net
 *@date 20130228
 */
define('modules/cookie', ['modules/class'], function(Class) {
    /**
     *this method will discard the renamed key in the different path, because the way is  unadvisable
     */
    function mapStr(str){
        if(!str){
            return {};
        }
        var arr=str.split(';'),
            i,len,temparr,tempkey,tempvalue,
            result={},
            one;
        for(i=0,len=arr.length;i<len;i++){
            temparr=arr[i].split('=');
            tempkey=temparr[0].replace(/^[\s\u00A0\u3000]+|[\s\u00A0\u3000]+$/g,'');
            tempvalue=temparr[1]?unescape(temparr[1]):'';
            result[tempkey]=tempvalue;
        }
        return result;
    }
    var Cookie = new Class('modules/cookie', {
        /**
         *get the getCookie value by key 
         * @method getCookie
         * @static
         * @param {String} key [option] don't case sensitive 
         * if without key param, the method will return all the cookies as an object 
         */
        static__getCookie:function(key){
            var cookies=mapStr(document.cookie),
                result;
            //if key==undefined return all cookies;
            if(!key){
                return cookies;
            }else{
                return cookies[key] || null;
            }
        },
        /**
         *set the cookie value of key
         * @method setCookie
         * @static
         * @param {String} key 
         * @param {String|Number|Boolean} value 
         * @param {Object} options [option] {
         *     domain:{string} [option], //must have more than 1 length
         *     path:{String} [option], //must begin with '/'
         *     expired:{Int}[option],   //how many seconds to store it
         *     secure:{Boolean}[option],
         *      httpOnly:{Boolean}[option]
         * }
         */
        static__setCookie:function(key,value,options){
            var str,
                temp;
            if('string'!==typeof key || ('string'!== typeof value && 'number'!==typeof value && 'boolean'!==typeof value)){
                return;
            }
            
            str=[];
            options=options||{};
            if('object'!== typeof options){
                options={};
            }
            //key=value must be the first string, Name=Value属性值对必须首先出现,在此之后的属性-值对可以以任何顺序出现.
            str.push(escape(key)+'='+escape(value)+';');
            
            if(options.expired && 'number'===typeof options.expired && options.expired>0){
                temp=new Date();
                temp.setSeconds(temp.getSeconds()+options.expired);
                str.push('expires='+temp.toGMTString()+';');
            }
            if(options.domain && 'string'===typeof options.domain && options.path.length){
                str.push('domain='+options.domain+';');
            }
            if(options.path && 'string'===typeof options.path && /\//.test(options.path)){
                str.push('path='+options.path+';');
            }
            if(options.security){
                str.push('secure;')
            }
            if(options.httpOnly){
                str.push('httpOnly;')
            }
            document.cookie=str.join('');
            return this;
        },
        /**
         *delete the cookie index of key 
         * @method deleteValue
         * @static
         * @param {String} key
         */
        static__deleteCookie:function(key,option){
            if('string'!==typeof key){
                return;
            }
            option=option||{};
            option['expires']=-1000;
            //set the expires to 1970-1-1 , the browser will delete this item right away when the domain and 
            this.setCookie(key,'deleted',option);
        }
    });
    return Cookie;
});
