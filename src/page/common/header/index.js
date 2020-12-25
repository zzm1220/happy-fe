/*
 * @Author: zhimin
 * @Date: 2020-12-02 14:36:39
 * @LastEditors: zhimin
 * @LastEditTime: 2020-12-02 16:03:47
 * @FilePath: \happy-fe\src\page\common\header\index.js
 */
import util from "util";
import "./index.css";

const header = {
    init() {
        this.onLoad();
        this.bindEvents();
        return this;
    },
    // 加载keyword信息
    onLoad() {
        const keyword = util.getUrlParam("keyword");
        if (keyword) {
            $("#search-input").val(keyword);
        }
    },
    // 绑定事件
    bindEvents() {
        const _this = this;
        // 点击搜索按钮进行搜索
        $("#search-btn").click(() => {
            _this.searchSubmit();
        });
        // 输入回车进行搜索
        $("#search-input").keyup((e) => {
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        })
    },
    // 搜索提交
    searchSubmit() {
        const keyword = $.trim($("#search-input").val());
        if (keyword) {
            window.location.href = `./list.html?keyword=${keyword}`;
        } else {
            util.goHome();
        }
    }
};

export default header.init();