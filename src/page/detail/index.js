/*
 * @Author: zhimin
 * @Date: 2020-12-10 10:06:21
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-10 16:43:40
 * @FilePath: \happy-fe\src\page\detail\index.js
 */
import "./index.css";
import "page/common";
import util from "util";
import "page/common/nav";
import "page/common/header";
import detailTmp from "./index.string";
import productService from "service/product";
import cartService from "service/cart";


const detail = {
    data: {
        productId: util.getUrlParam("productId") || ""
    },
    init() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad() {
        // 如果没有传productId，跳转到首页
        if (!this.data.productId) {
            util.goHome();
        }
        this.loadDetail();
    },
    bindEvent() {
        const _this = this;
        // 事件代理 图片预览
        $(document).on("mouseenter", ".p-img-item", function () {
            const imgUrl = $(this).find(".p-img").attr("src");
            $(".main-img").attr("src", imgUrl);
        });
        // 事件代理 数量加减的操作
        $(document).on("click", ".p-count-btn", function () {
            const type = $(this).hasClass("plus") ? "plus" : "minus";
            const $pCount = $(".p-count");
            let currCount = parseInt($pCount.val());
            const minCount = 1;
            const maxCount = _this.data.detailInfo.stock || 1;
            if (type === "plus") {
                $pCount.val(currCount < maxCount ? (currCount + 1) : maxCount);
            } else if (type === "minus") {
                $pCount.val(currCount > minCount ? (currCount - 1) : minCount);
            }
        });
        $(document).on("click", ".cart-add", function () {
            cartService.addToCart({
                productId: _this.data.productId,
                count: $(".p-count").val()
            }, (res) => {
                window.location.href = "./result.html?type=cart-add";
            }, (errMsg) => {
                util.errorTips(errMsg);
            })
        });
    },
    loadDetail() {
        let detailHtml = "";
        const $pageWrap = $(".page-wrap");
        $pageWrap.html("<div class='loading'></div>")
        productService.getProductDetail(this.data.productId, (res) => {
            this.filterSubImages(res);
            // 缓存数据
            this.data.detailInfo = res;
            detailHtml = util.renderHtml(detailTmp, res);
            $pageWrap.html(detailHtml);
        }, (errMsg) => {
            $(".page-wrap").html("<p class='err-tip'>此商品太淘气啦，找不到了</p>");
        })
    },
    filterSubImages(res) {
        res.subImages = res.subImages.split(",");
    }
};

$(function () {
    detail.init();
})