/**
 * 触控用户系统支付模块
 */
var DOMParser = require('xmldom').DOMParser;
var OrderNotify = require('./notify.class');

function UnicomIAP(conf) {
    //default config
    this.conf = conf;
    
    this.notify = new OrderNotify(this.conf);
}

module.exports = UnicomIAP;

/**
 * 生成通用订单对象
 */
UnicomIAP.prototype.createOrder = function(packet) {
    var paytime = Math.floor(Date.parse(packet.ordertime) / 1000);
    return {
        'appid' : packet.appid,
        'ditch' : 'unicom',
        'ditchid' : null,
        'roleid' : null,
        'cost' : packet.payfee,
        'payid' : packet.consumeCode,
        'paytime' : paytime,
        'orderid' : packet.orderid
    };
};

/**
 * 解析通知消息文本为JSON对象
 */
UnicomIAP.prototype.parseNotifyParams = function(str) {
    var doc = new DOMParser().parseFromString(str, 'text/xml');
    var json = {};
    var nodes = doc.childNodes;
    for (var i = 0, size = nodes.length; i < size; i++) {
        var node = nodes[i];
        json[node.tagName] = node.firstChild.data;
    }
    return json;
};

/**
 * 校验支付服务商订单完成通知请求
 * @param {String} remoteip 服务商请求远程地址
 * @param {String} reqdata 服务商请求内容
 * @param {Function} callback 返回给服务商数据的回调函数，接收一个字符串参数
 * @param {Function} endcb 返回给逻辑层的回调函数，接收一个布尔值及其它附加参数
 */
UnicomIAP.prototype.verifyNotify = function(remoteip, reqdata, callback, endcb) {
    var packet = reqdata;
    if (typeof reqdata == 'string') {
        packet = this.parseNotifyParams(reqdata);
    }
    var verify = this.notify.verify(packet);
    var order = this.createOrder(packet);
    if (verify) {
        endcb(true, order);
        callback(this.notify.getResponseText());
    } else {
        endcb(false, order);
        callback('');
    }
};
