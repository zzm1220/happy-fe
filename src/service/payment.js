import util from "util";

const _payment = {
  // 获取支付信息
  getPaymentInfo(orderNo, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/order/pay.do"),
      data: {
        orderNo,
      },
      success: resolve,
      error: reject,
    });
  },
  //查询订单支付状态
  getPaymentStatus(orderNo, resolve, reject) {
    util.request({
      url: util.getServerUrl("/api/order/query_order_pay_status.do"),
      data: {
        orderNo,
      },
      success: resolve,
      error: reject,
    });
  }
};

export default _payment;
