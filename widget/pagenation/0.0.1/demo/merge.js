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

ImportJavaScript.url('https://raw.github.com/ginano/myMVC/master/core/js/jdk.js');
ImportJavaScript.url('https://raw.github.com/ginano/myMVC/master/core/js/jQuery.js');
ImportJavaScript.url('https://raw.github.com/ginano/myMVC/master/core/js/module.js');
ImportJavaScript.url('https://raw.github.com/ginano/myMVC/master/modules/js/jquery.js');
ImportJavaScript.url('https://raw.github.com/ginano/myMVC/master/modules/js/class.js');
ImportJavaScript.url('https://raw.github.com/ginano/myMVC/master/modules/js/notify.js');
ImportJavaScript.url('https://raw.github.com/ginano/myMVC/master/test/common2.js');
ImportJavaScript.url('../src/pagenation.js');