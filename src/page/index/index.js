import util from "util";

console.log(util.getUrlParam("test"));

const template = "<div>{{name}}</div";
const data = {
    name: 123
};
console.log(util.renderHtml(template,data));