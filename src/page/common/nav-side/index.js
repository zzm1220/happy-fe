import util from "util";
import "./index.css";
import navSideTmp from "./tmp.string";


// 侧边导航
const navSide = {
  option: {
    name: "",
    navList: [
      { name: "user-center", desc: "个人中心", href: "./user-center.html" },
      { name: "order-list", desc: "我的订单", href: "./order-list.html" },
      { name: "pass-update", desc: "修改密码", href: "./pass-update.html" },
      { name: "about", desc: "关于MMALL", href: "./about.html" },
    ],
  },
  init(option) {
    $.extend(this.option, option);
    this.renderTmp();
  },
  renderTmp() {
    //   计算数据；
    let i = 0,
        navLength = this.option.navList.length;
    for (; i < navLength; i++) {
      if (this.option.name === this.option.navList[i].name) {
        this.option.navList[i].isActive = true;
      }
    }
    // 渲染模版
    const navHtml = util.renderHtml(navSideTmp,{
        navList: this.option.navList
    });
    $(".nav-side").html(navHtml);
  },
};

export default navSide;