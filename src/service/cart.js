/*
 * @Author: zhimin
 * @Date: 2020-12-02 14:09:31
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-02 14:13:47
 * @FilePath: \happy-fe\src\service\cart.js
 */
import util from "util";

const _cart = {
    // 获取购物车数量
    getCartCount(resolve, reject) {
        util.request({
            url: util.getServerUrl("/api/cart/get_cart_product_count.do"),
            success: resolve,
            error: reject
        })
    }
}

export default _cart;