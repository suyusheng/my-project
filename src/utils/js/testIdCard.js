import { Message } from 'element-ui';
export function CheckIdCard(idcard,errorCode){
        console.log(errorCode) // 打印结果为不正确
    　　var Errors = new Array( 
        　　　　"验证通过!", 
        　　　　"身份证号码位数不对!", 
        　　　　"身份证号码出生日期超出范围或含有非法字符!", 
        　　　　"身份证号码校验错误!", 
        　　　　"身份证地区非法!" 
        　　); 
        var area = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} 
    
    　　var idcard,Y,JYM; 
    　　var S,M; 
        var ereg;
    　　var idcard_array = new Array(); 
    　　idcard_array = idcard.split(""); 
    　　// 地区校验
    　　if(area[parseInt(idcard.substr(0,2))]==null){
            return Message.error({
                message:Errors[4],
                center:'center',
                duration: 1000
            }); 
        }
        // 长度校验 不能小于15位
        if(idcard.length < 18){
            return Message.error({
                message: Errors[1],
                duration: 1000
            });
        }

        // 正常18位号码校验
        if(idcard.length === 18){
            // 18位身份号码检测
        　　// 出生日期的合法性检测
        　　// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9])) 
        　　// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8])) 
    　　　　　　if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4)) % 4 == 0 )){ 
                // 闰年
    　　　　　　　ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式 
    　　　　　　} else { 
                // 平年
    　　　　　　　ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式 
    　　　　　　} 
                // 如果出生日期合法 则继续校验最后一位检验码是否合法
    　　　　　　if(ereg.test(idcard)){
        　　　　　　// 计算校验位 校验码的规则为前十七位的每一位数字依次乘以每一位的系数 1-17位（对应的系数分别为 7-9-10-5-8-4-2-1-6-3-7-9-10-5-8-4-2）的总和 / 11所得余数，余数只可能为0、1、2、3、4、5、6、7、8、9、10这10个数，分别对应最后一位检验码为1-0-X-9-8-7-6-5-4-3-2。例如：如果余数为2 则最后一位检验码就是X,如果满足则说明校验码正确 前7位跟后面7位的系数一样（7、9、10、5、8、4、2）所有会出现下面这个计算规则
        　　　　    S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 
        　　　　　　　　+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 
        　　　　　　　　+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 
        　　　　　　　　+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 
        　　　　　　　　+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 
        　　　　　　　　+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 
        　　　　　　　　+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 
        　　　　　　　　+ parseInt(idcard_array[7]) * 1 
        　　　　　　　　+ parseInt(idcard_array[8]) * 6 
        　　　　　　　　+ parseInt(idcard_array[9]) * 3; 
        　　　　　　　　Y = S % 11;  // 总和除以11所得余数
        // 　　　　　　　　M = "F"; 
        　　　　　　　　JYM = "10X98765432"; 
        　　　　　　　　M = JYM.substr(Y,1); 
                    // 判断校验码
    　　　　　　     if(M == idcard_array[17]){
                        return Message({
                            message: Errors[0],
                            type: 'success',
                            center: true,
                            duration: 1000
                        });  // 检测ID的校验位 检验通过
                    }else{
                        return Message.error(Errors[3]);  // 身份证号码校验错误
                    }
    　　　　     } else{
                    return Message.error(Errors[2]);
                }
        }
    } 