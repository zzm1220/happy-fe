/*
 * @Author: zhimin
 * @Date: 2020-12-01 16:26:35
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-01 16:58:35
 * @FilePath: \happy-fe\src\page\index\index.js
 */
import common from "page/common";
import util from "util";

console.log(util.getUrlParam("test"));

const template = "<div>{{name}}</div";
const data = {
    name: 123
};
console.log(util.renderHtml(template, data));