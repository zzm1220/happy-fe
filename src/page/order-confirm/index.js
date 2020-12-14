/*
 * @Author: zhimin
 * @Date: 2020-12-10 10:06:21
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-14 17:16:51
 * @FilePath: \happy-fe\src\page\order-confirm\index.js
 */
import "./index.css";
import "page/common";
import util from "util";
import "page/common/nav";
import "page/common/header";
import confirmTmp from "./confirm.string";
import orderService from "service/order";


const orderConfirm = {
    data: {},
    init() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad() {
        this.loadCart();
    },
    bindEvent() {},
    loadCart() {},
};

$(function () {
    orderConfirm.init();
})