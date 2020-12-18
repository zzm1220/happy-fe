/*
 * @Author: zhimin
 * @Date: 2020-12-02 14:09:31
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-18 15:16:35
 * @FilePath: \happy-fe\src\service\order.js
 */
import util from "util";

const _order = {
  // 获取订单商品列表
  getProductList(resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/order/get_order_cart_product.do"),
      success: resolve,
      error: reject,
    });
  },
  // 创建订单
  createOrder(orderInfo, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/order/create.do"),
      data: orderInfo,
      success: resolve,
      error: reject,
    });
  },
  // 获取订单列表
  getOrderList(listParam, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/order/list.do"),
      data: listParam,
      success: resolve,
      error: reject,
    });
  },
  // 获取订单详情
  getOrderDetail(orderNumber, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/order/detail.do"),
      data: {
        orderNo: orderNumber
      },
      success: resolve,
      error: reject,
    });
  },
  // 取消订单
  cancelOrder(orderNumber, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/order/cancel.do"),
      data: {
        orderNo: orderNumber
      },
      success: resolve,
      error: reject,
    });
  },
};

export default _order;