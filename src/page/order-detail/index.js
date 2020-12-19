/*
 * @Author: zhimin
 * @Date: 2020-12-18 13:58:13
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-18 15:30:14
 * @FilePath: \happy-fe\src\page\order-detail\index.js
 */
import "./index.css";
import "page/common/nav";
import "page/common/header";
import navSide from "page/common/nav-side";
import util from "util";
import orderService from "service/order";
import templateIndex from "./index.string";


const orderList = {
    data: {
        orderNumber: util.getUrlParam("orderNumber")
    },
    init() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad() {
        navSide.init({
            name: "order-list",
        });
        this.loadOrderDetail();
    },
    // 加载订单详情
    loadOrderDetail() {
        let orderDetailHtml = "";
        const $wrapper = $(".content");
        orderService.getOrderDetail(this.data.orderNumber, res => {
            this.dataFilter(res);
            orderDetailHtml = util.renderHtml(templateIndex, res);
            $wrapper.html(orderDetailHtml);
        }, errMsg => {
            $wrapper.html("<p class='err-tip'>订单加载失败啦</p>")
        })
    },
    bindEvent() {
        const _this = this;
        $(document).on("click", ".order-cancel", function () {
            if (window.confirm("您确定要取消订单吗？")) {
                orderService.cancelOrder(_this.data.orderNumber, res => {
                    util.successTips("取消订单成功");
                    _this.loadOrderDetail();
                }, errMsg => {
                    util.errorTips("取消订单失败啦，请重新尝试");
                });
            }
        })
    },
    dataFilter(data) {
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    }
};

$(function () {
    orderList.init();
});