/*
 * @Author: zhimin
 * @Date: 2020-12-01 16:26:35
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-04 10:41:33
 * @FilePath: \happy-fe\src\page\login\index.js
 */
import "./index.css";
import util from "util";
import userService from "service/user";
import "page/common";
import "page/common/nav-simple";


const login = {
    init() {
        this.bindEvent();
    },
    bindEvent() {
        // 登录按钮的点击
        $("#submit").click((e) => {
            this.submit();
        });
        // 回车的提交
        $(".user-con").keyup(e => {
            if (e.keyCode === 13) {
                this.submit();
            }
        })
    },
    submit() {
        const formData = {
            username: $.trim($("#username").val()),
            password: $.trim($("#password").val())
        };
        // 表单验证结果
        const validateRes = this.formValidate(formData);
        // 验证成功
        if (validateRes.status) {
            userService.login(formData, (res) => {
                window.location.href = util.getUrlParam("redirect") || "./index.html";
            }, (errMsg) => {
                this.formError.show(errMsg);
            });
        } else {
            this.formError.show(validateRes.msg);
        }
    },
    formValidate(formData) {
        let res = {
            status: false,
            msg: ""
        };
        if (!util.validate(formData.username, "require")) {
            res.msg = "用户名不能为空";
            return res;
        }
        if (!util.validate(formData.password, "require")) {
            res.msg = "密码不能为空";
            return res;
        }
        // 返回正确提示
        res = {
            status: true,
            msg: "验证成功"
        }
        return res;
    },
    formError: {
        show(errMsg) {
            $(".error-item").show().find(".error-msg").text(errMsg);
        },
        hide() {
            $(".error-item").hide().find(".error-msg").text();
        }
    }
};

$(function () {
    login.init();
});