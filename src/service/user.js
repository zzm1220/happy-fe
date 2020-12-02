/*
 * @Author: zhimin
 * @Date: 2020-12-02 13:57:33
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-02 14:08:41
 * @FilePath: \happy-fe\src\service\user.js
 */
import util from "util";

const _user = {
    // 退出登录
    logout(resolve, reject) {
        util.request({
            url: util.getServerUrl("/api/user/logout.do"),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 检查登录状态
    checkLogin(resolve, reject) {
        util.request({
            url: util.getServerUrl("/api/user/get_user_info.do"),
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
}

export default _user;