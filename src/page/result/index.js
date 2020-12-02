import util from "util";
import "./index.css";

$(function() {
    const type = util.getUrlParam("type")||"default";
    const $elem = $(`.${type}-success`);
    $elem.show();
});