/*
 * @Author: zhimin
 * @Date: 2020-12-02 13:57:33
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-06 15:48:47
 * @FilePath: \happy-fe\src\service\user.js
 */
import util from "util";

const _product = {
  // 获取商品列表
  getProductList(listParam, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/product/list.do"),
      method: "POST",
      data: listParam,
      success: resolve,
      error: reject,
    });
  },
};

export default _product;
