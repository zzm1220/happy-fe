/*
 * @Author: zhimin
 * @Date: 2020-12-18 10:28:59
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-18 13:43:16
 * @FilePath: \happy-fe\src\page\order-list\index.js
 */
import "./index.css";
import "page/common/nav";
import "page/common/header";
import navSide from "page/common/nav-side";
import util from "util";
import orderService from "service/order";
import templateIndex from "./index.string";
import Pagination from "util/pagination";


const orderList = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
    init() {
        this.onLoad();
    },
    onLoad() {
        this.loadOrderList();
        navSide.init({
            name: "order-list",
        });
    },
    // 加载订单列表
    loadOrderList() {
        let orderListHtml = "";
        const $listCon = $(".order-list-con");
        orderService.getOrderList(this.data.listParam, res => {
            orderListHtml = util.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
            this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pageSize: res.pageSize,
                pages: res.pages
            });
        }, errMsg => {
            $listCon.html("<p class='err-tip'>订单加载失败啦</p>")
        })
    },
    //  分页信息
    loadPagination(pageInfo) {
        this.pagination ? "" : (this.pagination = new Pagination());
        this.pagination.render(
            $.extend({}, pageInfo, {
                container: $(".pagination"),
                onSelectPage: pageNum => {
                    this.data.listParam.pageNum = pageNum;
                    this.loadOrderList();
                }
            })
        );
    }
};

$(function () {
    orderList.init();
});