/*
 * @Author: zhimin
 * @Date: 2020-12-09 16:08:58
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-09 17:47:14
 * @FilePath: \happy-fe\src\util\pagination\index.js
 */
import "./index.css";
import paginationTmp from "./index.string";
import util from "util";

const Pagination = function () {
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    };
};
// 渲染分页组件
Pagination.prototype.render = function (userOption) {
    // 合并选项
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断是否是jQuery对象
    if ((!this.option.container) instanceof jQuery) {
        return;
    }
    if (this.option.pages < 1) {
        return;
    }
    this.option.container.html(this.getPaginationHtml());
}
// 获取分页的html内容
Pagination.prototype.getPaginationHtml = function () {
    // 上一页 1 2 3 4 5 下一页 
    let html = "",
        start = (this.option.pageNum - this.option.pageRange) > 0 ?
        (this.option.pageNum - this.option.pageRange) : 1,
        end = (this.option.pageNum + this.option.pageRange) < this.option.pages ?
        (this.option.pageNum + this.option.pageRange) : this.option.pages;
    const pageArray = [];
    pageArray.push({
        name: "上一页",
        value: this.option.prePage,
        disabled: !this.option.hasPreviousPage
    });
    for (let i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: (i === this.option.pageNum)
        });
    }
    pageArray.push({
        name: "下一页",
        value: this.option.nextPage,
        disabled: !this.option.hasNextPage
    });
    html = util.renderHtml(paginationTmp, {
        pageArray,
        pageNum: this.option.pageNum,
        pages: this.option.pages
    });
    return html;
}
export default Pagination;