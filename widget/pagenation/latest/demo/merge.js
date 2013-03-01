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
root=type="../../../..";
ImportJavaScript.url(root+'/core/js/jdk.js');
ImportJavaScript.url(root+'/core/js/jQuery.js');
ImportJavaScript.url(root+'/core/js/module.js');
ImportJavaScript.url(root+'/modules/js/jquery.js');
ImportJavaScript.url(root+'/modules/js/class.js');
ImportJavaScript.url(root+'/modules/js/notify.js');
ImportJavaScript.url(root+'/test/common2.js');
ImportJavaScript.url('../src/pagenation.js');