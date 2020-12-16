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
import addressModal from "./address-modal.js";
import addressTmp from "./address-list.string";
import productTmp from "./product-list.string";
import orderService from "service/order";
import addressService from "service/address";

const orderConfirm = {
  data: {
    selectedAddressId: null,
  },
  init() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad() {
    this.loadAddressList();
    this.loadProductList();
  },
  bindEvent() {
    const _this = this;
    //地址的选择
    $(document).on("click", ".address-item", function () {
      $(this)
        .addClass("active")
        .siblings(".address-item")
        .removeClass("active");
      _this.data.selectedAddressId = $(this).data("id");
    });
    //订单的提交
    $(document).on("click", ".order-submit", function () {
      const shippingId = _this.data.selectedAddressId;
      if (shippingId) {
        orderService.createOrder(
          {
            shippingId,
          },
          (res) => {
            window.location.href = "./payment.html?orderNumber=" + res.orderNo;
          },
          (errMsg) => {
            util.errorTips(errMsg);
          }
        );
      } else {
        util.errorTips("请选择地址后提交");
      }
    });
    // 地址的添加
    $(document).on("click", ".address-new", function () {
      addressModal.show({
        isUpdate: false,
        onSuccess: function () {
          _this.loadAddressList();
        }
      });
    });
    // 地址的编辑
    $(document).on("click", ".address-update", function () {
      // 读取该条地址的信息
      const shippingId = $(this).parents(".address-item").data("id");
      addressService.getAddress(
        shippingId,
        (res) => {
          addressModal.show({
            isUpdate: true,
            data: res,
            onSuccess: function () {
              _this.loadAddressList();
            }
          });
        },
        (errMsg) => {
          util.errorTips(errMsg);
        }
      );
    });
  },
  loadAddressList() {
    addressService.getAddressList(
      (res) => {
        const addressHtml = util.renderHtml(addressTmp, res);
        $(".address-con").html(addressHtml);
      },
      (errMsg) => {
        $(".address-con").html("<p class='err-tip'>地址加载失败哦</p>");
      }
    );
  },
  loadProductList() {
    orderService.getProductList(
      (res) => {
        const productHtml = util.renderHtml(productTmp, res);
        $(".product-con").html(productHtml);
      },
      (errMsg) => {
        $(".product-con").html("<p class='err-tip'>订单加载失败哦</p>");
      }
    );
  },
};

$(function () {
  orderConfirm.init();
});
