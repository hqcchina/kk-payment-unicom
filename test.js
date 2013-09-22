/**
 * 测试代码
 * 
 * 可供单元测试使用，以及可用于当作使用接口示例
 * @author <a href="hqc2010@gmail.com">Neil</a>
 * @since 2013.09.22
 */

var UnicomIAP = require('./index');

var kConfigExample = {
    "appid" : "abcdefg",
    "secret" : "AAABBBCCCDDDEEEFFFGGG",
    "debug" : false
};

function test() {
    var iap = new UnicomIAP(kConfigExample);
    iap.verifyNotify(
        '127.0.0.1',
        '<orderid>orderid0000</orderid><ordertime>1234567890</ordertime><cpid>XXX</cpid><appid>abcdefg</appid><fid>XXX</fid><consumeCode>00</consumeCode><payfee>100</payfee><payType>0</payType><hRet>0</hRet><status>00000</status><signMsg>97d98fb59709e00e99fa7df57feba975</signMsg>',
        function(text) {
            console.log('response string is %s.', text);
        },
        function(isok, result) {
            console.log('result is (%j)%j', isok, result);
        }
    );
}

test();

