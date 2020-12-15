import util from "util";
import addressModalTmp from "./address-modal.string";
import addressService from "service/address";

const addressModal = {
  show(option) {
    // 绑定option
    this.option = option;
    // 渲染html
    this.loadModal();
    // 绑定事件
    this.bindEvents();
  },
  hide() {},
  loadModal() {
      
  }
};

export default addressModal;
