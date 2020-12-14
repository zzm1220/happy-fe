/*
 * @Author: zhimin
 * @Date: 2020-12-10 10:06:21
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-14 11:02:44
 * @FilePath: \happy-fe\src\page\cart\index.js
 */
import "./index.css";
import "page/common";
import util from "util";
import nav from "page/common/nav";
import "page/common/header";
import cartTmp from "./index.string";
import cartService from "service/cart";


const cart = {
    data: {
        cartInfo: null
    },
    init() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad() {
        this.loadCart();
    },
    bindEvent() {
        const _this = this;
        // 商品选中/取消
        $(document).on("click", ".item-input", function () {
            const $this = $(this);
            const pId = $this.parents(".cart-item").data("product-id");
            // 切换选中状态
            console.log($this.is(":checked"))
            if ($this.is(":checked")) {
                console.log("unchecked")
                cartService.selectProduct(pId, res => {
                    _this.renderCart(res);
                }, errMsg => {
                    _this.showCartError(errMsg);
                })
            } else {
                console.log("checked")
                cartService.unselectProduct(pId, res => {
                    _this.renderCart(res);
                }, errMsg => {
                    _this.showCartError(errMsg);
                })
            }
        });
        // 商品的全选和取消全选
        $(document).on("click", ".all-check", function () {
            const $this = $(this);
            // 切换选中状态
            if ($this.is(":checked")) {
                cartService.selectAllProduct(res => {
                    _this.renderCart(res);
                }, errMsg => {
                    _this.showCartError(errMsg);
                })
            } else {
                cartService.unselectAllProduct(res => {
                    _this.renderCart(res);
                }, errMsg => {
                    _this.showCartError(errMsg);
                })
            }
        });
        // 商品数量的变化
        // 商品的全选和取消全选
        $(document).on("click", ".all-check", function () {
            const $this = $(this);
            // 切换选中状态
            if ($this.is(":checked")) {
                cartService.selectAllProduct(res => {
                    _this.renderCart(res);
                }, errMsg => {
                    _this.showCartError(errMsg);
                })
            } else {
                cartService.unselectAllProduct(res => {
                    _this.renderCart(res);
                }, errMsg => {
                    _this.showCartError(errMsg);
                })
            }
        });
        $(document).on("click", ".count-btn", function () {
            const $this = $(this);
            console.log($this)
            const $pCount = $this.siblings(".count-input");
            let currentVal = parseInt($pCount.val(), 10);
            const type = $this.hasClass("minus") ? "minus" : "plus";
            const productId = $this.parents(".cart-item").data("product-id");
            const minCnt = 1;
            const maxCnt = parseInt($pCount.data("max"), 10);
            let newCount = currentVal;
            console.log(type)
            if (type === "plus") {
                if (currentVal >= maxCnt) {
                    util.errorTips("库存不够拉");
                    return;
                }
                newCount += 1;
            } else if (type === "minus") {
                if (currentVal < minCnt) {
                    return;
                }
                newCount -= 1;
            }
            cartService.updateProduct({
                    productId,
                    count: newCount
                },
                res => {
                    _this.renderCart(res);
                }, errMsg => {
                    _this.showCartError(errMsg);
                });
        });
        // 删除单个商品
        $(document).on("click", ".del-operate", function () {
            if (window.confirm("确认要删除该商品吗?")) {
                const $this = $(this);
                const productId = $this.parents(".cart-item").data("product-id");
                _this.deleteCartProduct(productId);
            }
        });
        // 删除选中商品
        $(document).on("click", ".delete-icon", function () {
            if (window.confirm("确认要删除选中商品吗?")) {
                const arrProductIds = [];
                const $selectedItems = $(".item-input:checked");
                for (let i = 0; i < $selectedItems.length; i++) {
                    arrProductIds.push($($selectedItems[i]).parents(".cart-item").data("product-id"));
                }
                if (arrProductIds.length) {
                    _this.deleteCartProduct(arrProductIds.join(","));
                } else {
                    util.errorTips("您还没有选中删除的商品！");
                }
            }
        });
        // 去结算
        $(document).on("click", ".submit-btn", function () {
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = "./order-confirm.html";
            } else {
                util.errorTips("请选择商品再提交");
            }
        });
    },
    loadCart() {
        this.$cartWrap = $(".cart-wrap");
        cartService.getCartList((res) => {
            this.renderCart(res);
        }, (errMsg) => {
            this.showCartError(errMsg);
        });
    },
    // 渲染购物车
    renderCart(data) {
        this.filter(data);
        this.data.cartInfo = data;
        // 生成html
        let cartHtml = util.renderHtml(cartTmp, this.data.cartInfo);
        this.$cartWrap.html(cartHtml);
        // 通知导航的购物车更新数量
        nav.loadCartCount();
    },
    filter(data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showCartError(errMsg) {
        this.$cartWrap.html("<p class='err-tip'>哪里不对啦，刷新下试试吧</p>");
    },
    deleteCartProduct(productIds) {
        cartService.deleteProduct(productIds, res => {
            this.renderCart(res);
        }, err => {
            this.showCartError(err);
        })
    }
};

$(function () {
    cart.init();
})