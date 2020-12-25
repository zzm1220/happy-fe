import util from "util";
import cities from "util/cities";
import addressModalTmp from "./address-modal.string";
import addressService from "service/address";

const addressModal = {
  show(option) {
    // 绑定option
    this.option = option;
    this.option.data = option.data || {};
    this.$modalWrap = this.option.wrap || $(".modal-wrap");
    // 渲染html
    this.loadModal();
    // 绑定事件
    this.bindEvent();
  },
  hide() {
      this.$modalWrap.empty();
  },
  loadModal() {
    const modalHtml = util.renderHtml(addressModalTmp, {
        isUpdate: this.option.isUpdate,
        data: this.option.data
    });
    this.$modalWrap.html(modalHtml);
    // 加载省份
    this.loadProvince();
  },
  bindEvent() {
    const _this = this;
    // 二级联动
    this.$modalWrap.find("#province").change(function () {
      const selectProvince = $(this).val();
      _this.loadCities(selectProvince);
    });
    // 提交收获地址
    this.$modalWrap.find(".address-btn").click(function () {
      const receiverInfo = _this.getReceiverInfo();
      const isUpdate = _this.option.isUpdate;
      // 新增收件地址且验证通过
      if (!isUpdate && receiverInfo.status) {
          addressService.saveAddress(receiverInfo.data, res => {
            util.successTips("地址添加成功");
            _this.hide();
            typeof _this.option.onSuccess === "function" &&
              _this.option.onSuccess(res);
          }, errMsg => {
              util.errorTips(errMsg);
          });
      }
      // 更新收件地址且验证通过
      else if (isUpdate && receiverInfo.status) {
         addressService.updateAddress(
           receiverInfo.data,
           (res) => {
             util.successTips("地址更新成功");
             _this.hide();
             typeof _this.option.onSuccess === "function" &&
               _this.option.onSuccess(res);
           },
           (errMsg) => {
             util.errorTips(errMsg);
           }
         );
      }
      // 验证不通过
      else {
        util.errorTips(receiverInfo.errMsg||"出错啦～～");
      }
    });
    // 阻止事件冒泡
    this.$modalWrap.find(".modal-container").click(function(e){
        e.stopPropagation();
    });
    // 关闭弹窗
    this.$modalWrap.find(".close").click(function () {
        _this.hide();
    });
  },
  // 加载省份
  loadProvince() {
    const provinces = cities.getProvinces() || [];
    const $provinceSelect = this.$modalWrap.find("#province");
    $provinceSelect.html(this.getSelectOption(provinces));
    // 如果是更新地址，并且有省份的数据，做回填
    if (this.option.isUpdate && this.option.data.receiverProvince) {
      $provinceSelect.val(this.option.data.receiverProvince);
      // 加载城市
      this.loadCities(this.option.data.receiverProvince);
    }
  },
  // 加载城市
  loadCities(provinceName) {
    const _cities = cities.getCities(provinceName) || [];
    const $citySelect = this.$modalWrap.find("#city");
    $citySelect.html(this.getSelectOption(_cities));
    // 如果是更新地址，并且有城市的数据，做回填
    if (this.option.isUpdate && this.option.data.receiverCity) {
      $citySelect.val(this.option.data.receiverCity);
    }
  },
  getSelectOption(optionArr) {
    let defaultHtml = '<option value="">请选择</option>';
    for (let i = 0, len = optionArr.length; i < len; i++) {
      defaultHtml += `<option value="${optionArr[i]}">${optionArr[i]}</option>`;
    }
    return defaultHtml;
  },
  // 获取表单收件人信息 并验证
  getReceiverInfo(){
    const receiverInfo = {};
    const result = {
        status: false
    };
    receiverInfo.receiverName = $.trim($("#receiver-name").val());
    receiverInfo.receiverProvince = $("#province").val();
    receiverInfo.receiverCity = $("#city").val();
    receiverInfo.receiverAddress = $("#receiver-address").val();
    receiverInfo.receiverMobile = $("#receiver-phone").val();
    receiverInfo.receiverZip = $("#receiver-zip").val();
    if (this.option.isUpdate) {
      receiverInfo.id = $("#receiver-id").val();
    }
    if (!receiverInfo.receiverName) {
      result.errMsg = "请输入收件人姓名";
    } else if (!receiverInfo.receiverProvince) {
      result.errMsg = "请选择省份";
    } else if (!receiverInfo.receiverCity) {
      result.errMsg = "请选择城市";
    } else if (!receiverInfo.receiverAddress) {
      result.errMsg = "请填写详细地址";
    } else if (!receiverInfo.receiverMobile) {
      result.errMsg = "请填写电话号码";
    } else {
      //所有验证都通过
      result.status = true;
      result.data = receiverInfo;
    }
    return result;
  }
};

export default addressModal;
