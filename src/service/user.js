/*
 * @Author: zhimin
 * @Date: 2020-12-02 13:57:33
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-04 10:35:58
 * @FilePath: \happy-fe\src\service\user.js
 */
import util from "util";

const _user = {
  // 登录
  login(userInfo, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/user/login.do"),
      method: "POST",
      data: userInfo,
      success: resolve,
      error: reject,
    });
  },
  // 退出登录
  logout(resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/user/logout.do"),
      method: "POST",
      success: resolve,
      error: reject,
    });
  },
  // 检查登录状态
  checkLogin(resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/user/get_user_info.do"),
      method: "POST",
      success: resolve,
      error: reject,
    });
  },
  // 检查用户名是否存在
  checkUsername(username, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/user/check_valid.do"),
      method: "POST",
      data: {
        type: "username",
        str: username,
      },
      success: resolve,
      error: reject,
    });
  },
  // 注册
  register(userInfo, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/user/register.do"),
      method: "POST",
      data: userInfo,
      success: resolve,
      error: reject,
    });
  },
  // 通过用户名得到问题
  getQuestion(username, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/user/forget_get_question.do"),
      method: "POST",
      data: {
        username,
      },
      success: resolve,
      error: reject,
    });
  },
  checkAnswer(userInfo, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/user/forget_check_answer.do"),
      method: "POST",
      data: userInfo,
      success: resolve,
      error: reject,
    });
  },
  resetPassword(userInfo, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/user/forget_reset_password.do"),
      method: "POST",
      data: userInfo,
      success: resolve,
      error: reject,
    });
  },
  getUserInfo(resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/user/get_information.do"),
      method: "POST",
      success: resolve,
      error: reject,
    });
  }
};

export default _user;