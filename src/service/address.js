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
  // 地址更新
  updateAddress(receiverInfo, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/shipping/update.do"),
      data: receiverInfo,
      success: resolve,
      error: reject,
    });
  },
  // 地址删除
  deleteAddress(shippingId, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/shipping/del.do"),
      data: {
        shippingId
      },
      success: resolve,
      error: reject,
    });
  },
};

export default _order;
