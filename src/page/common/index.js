/*
 * @Author: zhimin
 * @Date: 2020-12-01 16:26:35
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-02 14:37:30
 * @FilePath: \happy-fe\src\page\common\index.js
 */
import "./layout.css";
import "./footer/index.css";
import navSimple from "./nav-simple";
import nav from "./nav";
import header from "./header";
import navSide from "./nav-side";
import "node_modules/font-awesome/css/font-awesome.min.css"
navSide.init({
  name: "order-list",
});
export default {
  a: 1,
  navSimple,
  nav,
  header,
  navSide,
};