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
            success: function(res) {
                // 请求成功
                if (res.status === 0) {
                    typeof params.success === "function" && params.success(res.data,res.msg);
                } 
                // 没有登录
                else if (res.status === 10) {
                    _this.doLogin();
                }
                else if (res.status === 1) {
                    typeof params.error === "function" && params.error(res.msg);
                }
            },
            error: function(err) {
                    typeof params.error === "function" && params.error(err.statusText);
            }
        })
    },
    // 统一登录
    doLogin() {
        window.location.href = `./login.html?redirect=${encodeURIComponent(window.location.href)}`;
    },
    // 获取url参数
    getUrlParam(name) {
        const reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        const res = window.location.search.substr(1).match(reg);
        return res ? decodeURIComponent(res[2]): null;
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
    }
}