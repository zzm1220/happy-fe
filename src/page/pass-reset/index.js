/*
 * @Author: zhimin
 * @Date: 2020-12-01 16:26:35
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-04 10:41:33
 * @FilePath: \happy-fe\src\page\login\index.js
 */
import "./index.css";
import userService from "service/user";
import "page/common";
import "page/common/nav-simple"


const passReset = {
  data: {
    username: "",
    question: "",
    answer: "",
    token: "",
  },
  init() {
    this.loadStepUsername();
    this.bindEvent();
  },
  bindEvent() {
    // username的点击
    $("#submit-username").click((e) => {
      const username = $.trim($("#username").val());
      if (!username) {
        passReset.formError.show("请输入用户名");
        return;
      }
      userService.getQuestion(
        username,
        (res) => {
          passReset.data.username = username;
          passReset.data.question = res;
          passReset.loadStepQuestion();
        },
        (errMsg) => {
          passReset.formError.show(errMsg);
        }
      );
    });
    // answer的点击
    $("#submit-answer").click((e) => {
      const answer = $.trim($("#answer").val());
      if (!answer) {
        passReset.formError.show("请输入答案");
        return;
      }
      userService.checkAnswer(
        {
          username: this.data.username,
          question: this.data.question,
          answer,
        },
        (res) => {
          passReset.data.answer = answer;
          passReset.data.token = res;
          passReset.loadStepPassword();
        },
        (errMsg) => {
          passReset.formError.show(errMsg);
        }
      );
    });
     $("#submit-password").click((e) => {
       const password = $.trim($("#password").val());
       if (!password||password.length<6) {
         passReset.formError.show("请输入不少于6位的新密码");
         return;
       }
       userService.resetPassword(
         {
           username: this.data.username,
           passwordNew: password,
           forgetToken: this.data.token,
         },
         (res) => {
           window.location.href = "./result.html?type=pass-reset";
         },
         (errMsg) => {
           passReset.formError.show(errMsg);
         }
       );
     });
  },
  formError: {
    show(errMsg) {
      $(".error-item").show().find(".error-msg").text(errMsg);
    },
    hide() {
      $(".error-item").hide().find(".error-msg").text();
    },
  },
  loadStepUsername() {
    $(".step-username").show();
  },
  loadStepQuestion() {
    this.formError.hide();
    $(".step-username")
      .hide()
      .siblings(".step-question")
      .show()
      .find(".question")
      .text(this.data.question);
  },
  loadStepPassword() {
    this.formError.hide();
    $(".step-question")
      .hide()
      .siblings(".step-password")
      .show();
  },
};

$(function () {
  passReset.init();
});
