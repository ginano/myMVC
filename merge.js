/***
 *@author ginano
 *@date 2012-10-18
 *@website www.ginano.net
 *@fileoverview  merge file
 */
window.ImportJavaScript={
    url:function(url) {
            document.write("<script type=\"text/javascript\" src=\"" + url + "\"></scr" + "ipt>");
    }
}

ImportJavaScript.url('../core/js/jdk.js');
ImportJavaScript.url('../core/js/jQuery.js');
ImportJavaScript.url('../core/js/module.js');
ImportJavaScript.url('../modules/js/jquery.js');
ImportJavaScript.url('../modules/js/class.js');
ImportJavaScript.url('../modules/js/notify.js');

