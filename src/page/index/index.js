/*
 * @Author: zhimin
 * @Date: 2020-12-01 16:26:35
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-07 15:38:33
 * @FilePath: \happy-fe\src\page\index\index.js
 */
import "./index.css";
import "page/common";
import util from "util";
import "page/common/nav";
import "page/common/header";

const template = "<div>{{name}}</div";
const data = {
  name: 123
};
console.log(util.renderHtml(template, data));