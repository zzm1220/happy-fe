/*
 * @Author: zhimin
 * @Date: 2020-12-09 09:54:18
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-09 17:46:28
 * @FilePath: \happy-fe\src\page\list\index.js
 */
import "./index.css";
import "page/common";
import util from "util";
import "page/common/nav";
import "page/common/header";
import productService from "service/product";
import listTmp from "./index.string";
import Pagination from "util/pagination";

const list = {
  data: {
    listParam: {
      keyword: util.getUrlParam("keyword") || "",
      categoryId: util.getUrlParam("categoryId") || "",
      orderBy: util.getUrlParam("orderBy") || "default",
      pageNum: util.getUrlParam("pageNum") || 1,
      pageSize: util.getUrlParam("pageSize") || 2,
    },
  },
  init() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad() {
    this.loadList();
  },
  bindEvent() {
    const _this = this;
    $(".sort-item").click(function (e) {
      console.log(this)
      const $this = $(this);
      _this.data.listParam.pageNum = 1;
      if ($this.data('type') === "default") {
        if ($this.hasClass("active")) {
          return;
        } else {
          $this.addClass("active")
            .siblings(".sort-item")
            .removeClass("active asc desc");
          _this.data.listParam.orderBy = "default";
        }
      } else if ($this.data('type') === "price") {
        $this.addClass("active")
          .siblings(".sort-item")
          .removeClass("active asc desc");
        if (!$this.hasClass("asc")) {
          $this.addClass("asc").removeClass("desc");
          _this.data.listParam.orderBy = "price_asc";
        } else {
          $this.addClass("desc").removeClass("asc");
          _this.data.listParam.orderBy = "price_desc";
        }
      }
      _this.loadList();
    })
  },
  loadList() {
    const listParam = this.data.listParam;
    const $pListCon = $(".p-list-con");
    let listHtml = "";
    listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
    $pListCon.html("<div class='loading'></div>");
    productService.getProductList(
      listParam,
      (res) => {
        listHtml = util.renderHtml(listTmp, {
          list: res.list
        });
        $pListCon.html(listHtml);
        this.loadPagination({
          hasPreviousPage: res.hasPreviousPage,
          prePage: res.prePage,
          hasNextPage: res.hasNextPage,
          nextPage: res.nextPage,
          pageNum: res.pageNum,
          pageSize: res.pageSize,
          pages: res.pages
        });
      },
      (errMsg) => {
        util.errorTips(errMsg);
      }
    );
  },
  //  分页信息
  loadPagination(pageInfo) {
    this.pagination ? "":(this.pagination = new Pagination());
    this.pagination.render(
      $.extend({}, pageInfo, {
        container: $(".pagination"),
        onSelectPage:pageNum => {
          this.data.listParam.pageNum = pageNum;
          this.loadList();
        }
      })
    );
  }
};

$(function () {
  list.init();
})