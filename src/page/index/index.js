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
import "util/slider";
import bannerTmp from "./banner.string";

$(function () {
  const tmp = util.renderHtml(bannerTmp);
  $(".banner-con").html(tmp);
  $(".banner").unslider();
});