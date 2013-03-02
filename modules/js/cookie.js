/**
 *@fileoverview  the cookie plugin for operating the website cookie
 * reference from jquery cookie plugin 
 *@author ginano
 *@website http://www.ginano.net
 *@date 20130228
 */
define('modules/cookie', ['modules/class'], function(Class) {
    var Cookie = new Class('modules/cookie', {
        /**
         *根据值获取cookie 
         * @param {String} key 索引值
         */
        getValue:function(key){
            
        },
        /**
         *设置某项的值 
         * @param {String} key 索引值
         * @param {Object} value 具体的值配置 {
         *     value:{string},
         *     domain:{string},
         *     experiod:{INt}
         * }
         */
        setValue:function(key,value){
            
        }
    });
    return Cookie;
});
