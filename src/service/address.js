/*
 * @Author: zhimin
 * @Date: 2020-12-02 14:09:31
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-14 13:13:20
 * @FilePath: \happy-fe\src\service\order.js
 */
import util from "util";

const _order = {
  // 获取地址列表
  getAddressList(resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/shipping/list.do"),
      data: {
        pageSize: 50,
      },
      success: resolve,
      error: reject,
    });
  },
  // 新建收件人
  saveAddress(receiverInfo, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/shipping/add.do"),
      data: receiverInfo,
      method: "POST",
      success: resolve,
      error: reject,
    });
  },
  // 获取指定地址
  getAddress(shippingId, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/shipping/select.do"),
      data: {
        shippingId,
      },
      success: resolve,
      error: reject,
    });
  },
  // 选择购物车商品
  selectProduct(productId, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/cart/select.do"),
      data: {
        productId,
      },
      method: "POST",
      success: resolve,
      error: reject,
    });
  },
  // 取消选择购物车商品
  unselectProduct(productId, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/cart/un_select.do"),
      data: {
        productId,
      },
      method: "POST",
      success: resolve,
      error: reject,
    });
  },
  // 选择全部商品
  selectAllProduct(resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/cart/select_all.do"),
      success: resolve,
      error: reject,
    });
  },
  // 取消选择全部商品
  unselectAllProduct(resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/cart/un_select_all.do"),
      success: resolve,
      error: reject,
    });
  },
  // 更新商品信息
  updateProduct(productInfo, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/cart/update.do"),
      data: productInfo,
      method: "POST",
      success: resolve,
      error: reject,
    });
  },
  // 删除商品
  deleteProduct(productIds, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/cart/delete_product.do"),
      data: {
        productIds,
      },
      method: "POST",
      success: resolve,
      error: reject,
    });
  },
};

export default _order;
