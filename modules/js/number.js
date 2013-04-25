/**
 *@fileoverview  the number module for converting the 
 *@author ginano
 *@website http://www.ginano.net
 *@date 20130228 
 */
define('modules/number',[
        'modules/class'
    ],function(Class){
   var Num=new Class('modules/number',{
       static__isInt:function(a){
           return /^\d+$/.test(_a+"");
       },
       static__isFloat:function(a){
           return /^\d+(\.\d+)?$/.test(_a+"");
       },
       /**
        * 数字转化为带逗号格式的金额
        * @param {float} ptm 输入的数字，默认0
         * @param {int} pflen 小数点保留位数，小于0--不处理，0不需要小数
         * @param {string} pzero 为零的时候返回值，默认0.00
        */
       static__numToMoney:function(ptm,pflen,pzero){
            var tm=ptm||0,
                flen,
                zero=pzero||'0.00';
            if(!tm){
                return zero;
            }
            tm=tm.toFixed(9);
            var sa=(tm+'').split('.'),
                s=sa[0],
                len=s.length,
                i=len-3,
                t1='',
                result='';
                                
            if(flen>0){
                result=sa[1]?''+sa[1]:'000000000000';
                result='.'+result.substring(0,flen);
            }else if(flen==0){
                result='';
            }else{
                result=sa[1]?'.'+sa[1]:'';
            }
                
            while(i>0){
                t1=s.slice(i);
                result=','+t1+result;
                s=s.slice(0,i);
                i-=3;
            }
            return s+result;
        },
        /**
         * 
         * @param {string} pmoney 带逗号的金额字符串
         * 
         */
        static__moneyToNum:function(pmoney){
            return pmoney.replace(/[,，]/g,'')-0.0;
        },
       /**
        *转化为分 
        * @param {Float} yuan
        * @return Int
        */
       static__buck2Cent:function(yuan){
           return (yuan*100).toFixed(0);
       },
       /**
        *转化为元 
        * @param {Int} cent
        * @return Float
        */
       static__cent2Buck:function(cent){
           return (cent/100).toFixed(2);
       },
       /**
        * 求和
        * @param {Array} bucks
        */
       static__sumBucks:function(bucks){
           var len,
               total=0;
           if(!bucks instanceof Array){
               bucks=[bucks];
           }
           len=bucks.length;
           while(len--){
               total+=bucks[len]-0;
           }
           return total.toFixed(2)-0;
       },
       static__mutiply:function(a,b){
           var result,
               _a=(a+'').replace(/\./,''),
               _b=(b+'').replace(/\./,'');
           return result=_a*_b/Math.pow(10,getPointLen(a)+getPointLen(b));
           function getPointLen(val){
                var _val=val+'',
                    _len=_val.length,
                    _index=_val.indexOf('.');
                return _index>-1?_len-1-_index:0;    
           }
       }
   });
   return Num;
});
