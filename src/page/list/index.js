import "./index.css";
import "page/common";
import util from "util";
import "page/common/nav";
import "page/common/header";
import productService from "service/product";
import listTmp from "./index.string";

const list = {
  data: {
    listParam: {
      keyword: util.getUrlParam("keyword") || "",
      categoryId: util.getUrlParam("categoryId") || "",
      orderBy: util.getUrlParam("orderBy") || "default",
      pageNum: util.getUrlParam("pageNum") || 1,
      pageSize: util.getUrlParam("pageSize") || 20,
    },
  },
  init() {
      this.onLoad();
      this.bindEvent();
  },
  onLoad() {
      this.loadList();
  },
  bindEvent() {},
  loadList() {
    const listParam = this.data.listParam;
    let listHtml = "";
    productService.getProductList(
      listParam,
      (res) => {
        listHtml = util.renderHtml(listTmp, { list: res.list });
        $(".p-list-con").html(listHtml);
        this.loadPagination(res.pageNum, res.pages);
      },
      (errMsg) => {
        util.errorTips(errMsg);
      }
    );
  },
 //  分页信息
  loadPagination(curPage,pages){

  }
};

$(function(){
    list.init();
})
