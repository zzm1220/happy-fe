/*
 * @Author: zhimin
 * @Date: 2020-12-06 09:24:09
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-06 15:50:19
 * @FilePath: \happy-fe\src\page\pass-update\index.js
 */
import "./index.css";
import "page/common/nav";
import "page/common/header";
import navSide from "page/common/nav-side";
import util from "util";
import userService from "service/user";


const center = {
    init() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad() {
        navSide.init({
            name: "pass-update",
        });
    },
    bindEvent() {
        $(document).on("click", ".btn-submit", (e) => {
            const userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#new-password').val()),
                passwordConfirm: $.trim($('#confirm-password').val()),
            };
            const validateRes = this.formValidate(userInfo);
            if (validateRes.status) {
                userService.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, (res) => {
                    util.successTips("更新成功");
                }, (errMsg) => {
                    util.errorTips(errMsg);
                });
            } else {
                util.errorTips(validateRes.msg);
            }
        })
    },
    formValidate(formData) {
        let res = {
            status: false,
            msg: ""
        };
        // 原密码是否为空
        if (!util.validate(formData.password, "require")) {
            res.msg = "原密码不能为空";
            return res;
        }
        // 验证新密码
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            res.msg = "密码长度不能少于六位";
            return res;
        }
        // 验证两次密码是否一致
        if (formData.passwordNew !== formData.passwordConfirm) {
            res.msg = "两次密码不一致";
            return res;
        }
        // 返回正确提示
        res = {
            status: true,
            msg: "验证成功"
        }
        return res;
    }
};

$(function () {
    center.init();
});