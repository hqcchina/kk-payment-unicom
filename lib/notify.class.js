/**
 * 支付订单通知处理类
 * 
 * @author <a href="hqc2010@gmail.com">Neil</a>
 * @since 2013.09.22
 */

var fparams = require('./params.func');
var fmd5 = require('./md5.func');

var OrderNotify = function(conf) {
    this.appid = conf.appid; //应用唯一编号
    this.secret = conf.secret; //应用密钥
    this.debug = conf.debug; //是否开启调试
};

module.exports = OrderNotify;

/**
 * 调试日志
 */
OrderNotify.prototype.log = function(formator) {
    if (this.debug) {
        console.log.apply(null, arguments);
    }
};

/**
 * 查询错误码结果含义值
 */
OrderNotify.prototype.queryStatusString = function(status) {
    var msg = null;
    switch (status) {
        case '00000':
            msg = '支付成功';
            break;
        case '01001':
            msg = '订购用户不存在';
            break;
        case '01002':
            msg = '订购用户状态被停止';
            break;
        case '01003':
            msg = '订购用户欠费，预付费用户计费失败';
            break;
        case '01004':
            msg = '订购用户在黑名单';
            break;
        case '01006':
            msg = '此业务能力已被屏蔽';
            break;
        case '01007':
            msg = '用户无法屏蔽/恢复业务能力';
            break;
        case '01099':
            msg = '其它错误';
            break;
        case '01005':
            msg = '无效用户，用户不在当前平台中';
            break;
        case '01104':
            msg = '用户不存在';
            break;
        case '01105':
            msg = '用户状态不正常';
            break;
        case '03100':
            msg = '用户不是一个预付费用户';
            break;
        case '03101':
            msg = '用户余额不足';
            break;
        case '03102':
            msg = '压缩余额不足';
            break;
        case '03103':
            msg = '没有需要的计费信息';
            break;
        case '03104':
            msg = '写CDR失败';
            break;
        case '03108':
            msg = '等候SCP响应失败';
            break;
        case '10001':
            msg = '用户不存在';
            break;
        case '10002':
            msg = '开发者不支持vac';
            break;
        case '10003':
            msg = '业务不存在';
            break;
        case '10004':
            msg = '业务状态不正常';
            break;
        case '10005':
            msg = '渠道代码错误';
            break;
        case '10007':
            msg = '超过当月限额';
            break;
        case '10008':
            msg = '超过当日限额';
            break;
        case '10009':
            msg = '任务不存在（内部异常）';
            break;
        case '10010':
            msg = '数据库操作失败（内部异常）';
            break;
        case '10011':
            msg = '业务不属于该CP';
            break;
        case '10012':
            msg = '重复激活，对关卡类计费点';
            break;
        case '':
            msg = '错误返回码';
            break;
        default:
            msg = '其它错误返回码，错误返回码';
            break;
    }
    return msg;
};

/**
 * 生成待签名字符串
 */
OrderNotify.prototype.createSortParams = function(params) {
    //排序签名参数数组
    var param_sort = {
        'orderid' : params.orderid,
        'ordertime' : params.ordertime,
        'cpid' : params.cpid,
        'appid' : params.appid,
        'fid' : params.fid,
        'consumeCode' : params.consumeCode,
        'payfee' : params.payfee,
        'payType' : params.payType,
        'hRet' : params.hRet,
        'status' : params.status,
        'key' : this.secret
    };
    
    //把数组所有元素的
    var prestr = fparams.createLinkStringWithUrlencode(param_sort);
    
    return prestr;
};

OrderNotify.prototype.checkParamsSignVerify = function(params, sign) {
    var prestr = this.createSortParams(params);
    return fmd5.md5Verify(prestr, sign);
};

/**
 * 验证支付订单通知消息是否正确
 * @param {JSON} params 请求参数对象
 * @return {Boolean} 请求消息包是否完整
 */
OrderNotify.prototype.verify = function(params) {
    if (this.appid !== params.appid) {
        this.log('校验订单通知时出现appid不一致：期望为%s，实际为%s', this.appid, params.appid);
        return false;
    }
    
    if (params.hRet !== '0') {
        if (this.debug) {
            var statusstr = this.queryStatusString(params.status);
            this.log('收到错误的订单返回通知：(%s)%s', params.status, statusstr);
        }
        return false;
    }
    
    var isSignVerify = this.checkParamsSignVerify(params, params.signMsg);
    if (!isSignVerify) {
        return false;
    }
    
    return true;
};

/**
 * 获取返回数据
 */
OrderNotify.prototype.getResponseText = function() {
    return '<?xml version="1.0" encoding="UTF-8"?><callbackRsp>1</callbackRsp>';
};
