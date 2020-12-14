/*
 * @Author: zhimin
 * @Date: 2020-12-02 14:09:31
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-14 10:05:16
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
    },
    // 添加商品到购物车
    addToCart(productInfo, resolve, reject) {
        util.request({
            url: util.getServerUrl("/api/cart/add.do"),
            data: productInfo,
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    // 获取购物车列表
    getCartList(resolve, reject) {
        util.request({
            url: util.getServerUrl("/api/cart/list.do"),
            success: resolve,
            error: reject
        })
    },
    // 选择购物车商品
    selectProduct(productId, resolve, reject) {
        util.request({
            url: util.getServerUrl("/api/cart/select.do"),
            data: {
                productId
            },
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    // 取消选择购物车商品
    unselectProduct(productId, resolve, reject) {
        util.request({
            url: util.getServerUrl("/api/cart/un_select.do"),
            data: {
                productId
            },
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    // 选择全部商品
    selectAllProduct(resolve, reject) {
        util.request({
            url: util.getServerUrl("/api/cart/select_all.do"),
            success: resolve,
            error: reject
        })
    },
    // 取消选择全部商品
    unselectAllProduct(resolve, reject) {
        util.request({
            url: util.getServerUrl("/api/cart/un_select_all.do"),
            success: resolve,
            error: reject
        })
    },
    // 更新商品信息
    updateProduct(productInfo, resolve, reject) {
        util.request({
            url: util.getServerUrl("/api/cart/update.do"),
            data: productInfo,
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    // 删除商品
    deleteProduct(productIds, resolve, reject) {
        util.request({
            url: util.getServerUrl("/api/cart/delete_product.do"),
            data: {
                productIds
            },
            method: "POST",
            success: resolve,
            error: reject
        })
    }
}

export default _cart;