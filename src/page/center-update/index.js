/*
 * @Author: zhimin
 * @Date: 2020-12-06 09:24:09
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-06 14:43:45
 * @FilePath: \happy-fe\src\page\center-update\index.js
 */
import "./index.css";
import "page/common/nav";
import "page/common/header";
import navSide from "page/common/nav-side";
import util from "util";
import userService from "service/user";
import templateIndex from "./index.string";


const center = {
    init() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad() {
        navSide.init({
            name: "center",
        });
        this.loadUserInfo();
    },
    loadUserInfo() {
        let userHtml = "";
        userService.getUserInfo((res) => {
            userHtml = util.renderHtml(templateIndex, res);
            $(".panel-body").html(userHtml);
        }, (errMsg) => {
            util.errorTips(errMsg);
        });
    },
    bindEvent() {
        $(document).on("click", ".btn-submit", (e) => {
            const userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            };
            const validateRes = this.formValidate(userInfo);
            if (validateRes.status) {
                userService.updateUserInfo(userInfo, (res) => {
                    util.successTips("更新成功");
                    window.location.href = "./center.html";
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
        if (!util.validate(formData.phone, "phone")) {
            res.msg = "请输入正确手机号";
            return res;
        }
        if (!util.validate(formData.email, "email")) {
            res.msg = "请输入正确邮箱";
            return res;
        }
        if (!util.validate(formData.question, "require")) {
            res.msg = "问题不能为空";
            return res;
        }
        if (!util.validate(formData.answer, "require")) {
            res.msg = "答案不能为空";
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