/*
 * @Author: zhimin
 * @Date: 2020-12-01 16:26:35
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-04 11:01:21
 * @FilePath: \happy-fe\src\page\register\index.js
 */
import "./index.css";
import util from "util";
import userService from "service/user";
import "page/common";


const register = {
    init() {
        this.bindEvent();
    },
    bindEvent() {
        // 验证username
        $("#username").blur(function(e){
            const username = $.trim($(this).val());
            if(!username) return;
            userService.checkUsername(username,(res)=>{
                register.formError.hide();
            },(errMsg)=>{
                register.formError.show(errMsg);
            });
        });
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
          password: $.trim($("#password").val()),
          passwordConfirm: $.trim($("#password-conform").val()),
          phone: $.trim($("#phone").val()),
          email: $.trim($("#email").val()),
          question: $.trim($("#question").val()),
          answer: $.trim($("#answer").val()),
        };
        // 表单验证结果
        const validateRes = this.formValidate(formData);
        // 验证成功
        if (validateRes.status) {
            userService.register(formData, (res) => {
                window.location.href = "./result.html?type=register";
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
        if (formData.password.length < 6) {
          res.msg = "密码长度不能少于六位";
          return res;
        }
        if (formData.password !== formData.passwordConfirm) {
        res.msg = "两次输入的密码不一致";
        return res;
        }
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
    register.init();
});