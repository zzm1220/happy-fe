/*
 * @Author: zhimin
 * @Date: 2020-12-02 11:01:24
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-02 14:17:35
 * @FilePath: \happy-fe\src\page\common\nav\index.js
 */
import util from "util";
import userService from "service/user";
import cartService from "service/cart";
import "./index.css";
// 导航
const nav = {
    // 初始化init
    init() {
        this.bindEvents();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    // 绑定事件
    bindEvents() {
        // 登录
        $("#js-login").click(() => {
            util.doLogin();
        })
        // 注册
        $("#js-register").click(() => {
            window.location.href = "./register.html";
        })
        // 退出登录
        $("#logout").click(() => {
            console.log("退出登录");
            userService.logout((res) => {
                window.location.reload();
            }, (errMsg) => {
                util.errorTips(errMsg);
            });
        })
    },
    // 加载用户信息
    loadUserInfo() {
        userService.checkLogin((res) => {
            $(".user.not-login").hide()
                .siblings(".user.login").show()
                .find(".username").text(res.username);
        }, (errMsg) => {
            // do nothing
        });
    },
    // 获取购物车数量
    loadCartCount() {
        cartService.getCartCount((res) => {
            $(".cart-count").text(res || 0);
        }, (errMsg) => {
            $(".cart-count").text(0);
        });
    }
};

export default nav.init();