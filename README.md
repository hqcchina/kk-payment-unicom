kk-payment-unicom
================

Node版的支付验证接口模块，用于快速搭建自己的在线支付验证功能服务器。

## Installation
通过npm包的形式安装直接使用

`npm install kk-payment-unicom`

## Overview
封装与实现联通支付验证接口，用于验证自己应用的支付结果。

## Usage
联通支付验证接口共有两种，一种是被动接收联通支付服务器的订单完成通知，另一种是主动查询联通支付服务器。

（1）被动验证订单完成通知：
接收来自联通服务器post过来的数据，直接传递给验证模块，其会将结果返回。

（2）主动校验订单：
主动发起请求向联通服务器验证订单是否真实。

## LICENSE - "MIT License"

Copyright (c) 2013 云景, http://yunjing.me/

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

![spacer](http://yunjing.me/1px.gif)
