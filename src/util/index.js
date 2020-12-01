/*
 * @Author: zhimin
 * @Date: 2020-12-01 16:26:35
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-01 16:53:26
 * @FilePath: \happy-fe\src\util\index.js
 */
import Hogan from "hogan.js";

const config = {
    serverHost: ""
};

export default {
    // 网络请求
    request(params) {
        const _this = this;
        $.ajax({
            type: params.method || "GET",
            url: params.url || "",
            dataType: params.type || "json",
            data: params.data || "",
            success: function (res) {
                // 请求成功
                if (res.status === 0) {
                    typeof params.success === "function" && params.success(res.data, res.msg);
                }
                // 没有登录
                else if (res.status === 10) {
                    _this.doLogin();
                } else if (res.status === 1) {
                    typeof params.error === "function" && params.error(res.msg);
                }
            },
            error: function (err) {
                typeof params.error === "function" && params.error(err.statusText);
            }
        })
    },
    // 统一登录
    doLogin() {
        window.location.href = `./login.html?redirect=${encodeURIComponent(window.location.href)}`;
    },
    // 返回主页
    goHome() {
        window.location.href = "./index.html";
    },
    // 获取url参数
    getUrlParam(name) {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        const res = window.location.search.substr(1).match(reg);
        return res ? decodeURIComponent(res[2]) : null;
    },
    // 获取服务器地址
    getServerUrl(path) {
        return config.serverHost + path;
    },
    // 渲染模版
    renderHtml(htmlTemplate, data) {
        const template = Hogan.compile(htmlTemplate);
        const result = template.render(data);
        return result;
    },
    // 成功提示
    successTips(msg) {
        alert(msg || "操作成功");
    },
    // 错误提示
    errorTips(err) {
        alert(err || "操作失败");
    },
    // 字段的验证，支持非空，手机，邮箱的验证
    validate(value, type) {
        let needValue = $.trim(value);
        // 非空验证
        if (type === "require") {
            return !!needValue;
        }
        // 手机号验证
        if (type === "phone") {
            return /^1\d{10}$/.test(needValue);
        }
        // 邮箱验证
        if (type === "email") {
            return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(needValue)
        }
    }
}