/**
 *@fileoverview  the ua plugin for detecting the browser version
 *@author ginano
 *@website http://www.ginano.net
 *@date 20130228 
 */
define('modules/ua',[
        'modules/class'
    ],function(Class){
    var win=window,
        nav=win.navigator,
        ua=nav.userAgent.toLowerCase(),
        pt=nav.platform.toLowerCase(),
        temp,t1,t2,
        Browser={};
    
    if(/msie/.test(ua)){
        Browser.browser='ie';
        Browser.version= ua.match(/msie\s*(\d+(?:\.\d+)?)/)[1]; 
    } else if(/firefox/.test(ua)){
        Browser.browser='firefox';
        Browser.version= ua.match(/firefox\/(\d+(?:\.\d+)?)/)[1]; 
    } else if(/opera/.test(ua)){
        Browser.browser='opera';
        Browser.version= ua.match(/version\/(\d+(?:\.\d+)?)/)[1]; 
    } else if(/chrome/.test(ua)){
        Browser.browser='chrome';
        Browser.version= ua.match(/chrome\/(\d+(?:\.\d+)?)/)[1]; 
    } else if(/safari/.test(ua)){
        Browser.browser='safari';
        Browser.version= ua.match(/version\/(\d+(?:\.\d+)?)/)[1]; 
    } else {
        Browser.browser='unkown';
        Browser.version= '0.0'; 
    }
    
    if(/win/.test(pt)){
        t1={
            '6.2':'windows 8',
            '6.1':'windows 7',
            '6.0':'windows vista',
            '5.2':'windows 2003',
            '5.1':'windows xp',
            '5.0':'windows 2000'
        };
        temp=ua.match(/windows\s+nt\s+(\d\.\d)/);
        temp=temp && temp[1];
        //����ϵͳ
        Browser.os=t1[temp]||'windows';
        //����ϵͳλ��
        Browser.bit=/wow64|win64/.test(ua)?'64':'32';
    }else if(/mac/.test(pt)){
        //����ϵͳ
        Browser.os='macos';
        //����ϵͳλ����׼ȷ�������ο�
        Browser.bit=/wow64|win64/.test(ua)?'64':'32';
    }else if(/linux/.test(pt)){
        //����ϵͳ
        Browser.os='linux';
        //����ϵͳλ����׼ȷ�������ο�
        Browser.bit=/x86_64|i686/.test(ua)?'64':'32';
    }else if(/x11/.test(pt)){
        //����ϵͳ
        Browser.os='unix';
        //����ϵͳλ����׼ȷ�������ο�
        Browser.bit=/x86_64|i686/.test(ua)?'64':'32';
    }else{
        //����ϵͳ
        Browser.os='unkown';
        //����ϵͳλ����׼ȷ�������ο�
        Browser.bit='';
    }
    return Browser;
        
});