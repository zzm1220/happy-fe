import "./index.css";
import "page/common/nav";
import "page/common/header";
import util from "util";
import paymentService from "service/payment";
import templateIndex from "./index.string";


const payment = {
  data: {
    orderNumber: util.getUrlParam("orderNumber"),
  },
  init() {
    this.onLoad();
  },
  onLoad() {
    this.loadPaymentInfo();
  },
  loadPaymentInfo() {
    const $pageWrap = $(".page-wrap");
    let paymentHtml = "";
    paymentService.getPaymentInfo(
      this.data.orderNumber,
      (res) => {
        paymentHtml = util.renderHtml(templateIndex, res);
        $pageWrap.html(paymentHtml);
        this.listenOrderStatus();
      },
      (errMsg) => {
        $pageWrap.html(`<p class="err-tip">${errMsg}</p>`);
      }
    );
  },
  listenOrderStatus() {
      const _this = this;
      this.paymentTimer = window.setInterval(function(){
        paymentService.getPaymentStatus(_this.data.orderNumber, (res) => {
            if (res) {
                window.location.href = `./result.html?type=payment&orderNo=${this.data.orderNumber}`;
            }
        });
      }, 5e3);
     
  }
};

$(function () {
    payment.init();
});