/***
 *@author ginano
 *@date 2012-10-18
 *@website www.ginano.net
 *@fileoverview  整个框架需要引入的文件集合
 */
window.ImportJavaScript={
    url:function(url) {
            document.write("<script type=\"text/javascript\" src=\"" + url + "\"></scr" + "ipt>");
    }
}

ImportJavaScript.url('../core/jdk.js');
ImportJavaScript.url('../core/jQuery.js');
ImportJavaScript.url('../commonJS/module.js');
ImportJavaScript.url('../modules/jquery.js');
ImportJavaScript.url('../modules/class.js');
ImportJavaScript.url('../modules/notify.js');
