import "./index.css";
import "page/common/nav";
import "page/common/header";
import navSide from "page/common/nav-side";
import util from "util";
import userService from "service/user";
import templateIndex from "./index.string";


const center = {
  init() {
    this.onLoad();
  },
  onLoad() {
    navSide.init({
      name: "center",
    });
    this.loadUserInfo();
  },
  loadUserInfo() {
    let userHtml = "";
    userService.getUserInfo((res)=>{
      userHtml = util.renderHtml(templateIndex, res);
      $(".panel-body").html(userHtml );
    },(errMsg)=>{
      util.errorTips(errMsg);
    });
  }
};

$(function () {
  center.init();
});