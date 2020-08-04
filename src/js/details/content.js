const { cssHooks } = require("jquery");
/* 详情页 */
/* cookie页面 */
define([], function () {
  class Cookies {
    constructor() {
      this.num = $(".right-shopping input"); /* 数量 */
      this.add = $(".right-shopping span i:first"); /* + */
      this.reduce = $(".right-shopping span i:last"); /* - */
      this.shop = $(".right-shopping a:first"); /* 购物车 */
      this.single = $(".right-shopping a:last"); /* 下单 */
      this.init();
    }
    init() {
      this.clickHandler();
    }
    clickNumber(){
        /* 商品加减 */
      this.add.on("click", () => {
        let n = $(".right-shopping input").val();
        n++;
        $(".right-shopping input").val(n);
      });
      this.reduce.on("click", () => {
        let n = $(".right-shopping input").val();
        if (n <= 1) {
          n = 1;
        } else {
          n--;
          $(".right-shopping input").val(n);
        }
      });
    }
    clickHandler() {
      let id = location.href.split("=")[1]; /* 域名中的id */
      let idArr = [];
      let numArr = [];
      /* 查询cookie的值 */
      if ($.cookie("cookiesid") && $.cookie("cookienum")) {
        idArr = $.cookie("cookiesid").split(",");
        numArr = $.cookie("cookienum").split(",");
      } else {
        idArr = [];
        numArr = [];
      }
      this.clickNumber()
      this.shop.on("click", () => {
          /* 点击之后查询cook的值 */
        if ($.cookie("cookiesid") && $.cookie("cookienum")) {
          idArr = $.cookie("cookiesid").split(",");
          numArr = $.cookie("cookienum").split(",");
        } else {
          idArr = [];
          numArr = [];
        }
        /* 查询id数组中是否有当前产品的id */
        if ($.inArray(id, idArr) === -1) {
            /* 没有就把id和数量添加到数组中 */
            /* 然后把数组添加到cook中 */
          idArr.push(id);
          numArr.push($(".right-shopping input").val());
          $.cookie("cookiesid", idArr, { expires: 7, path: "/" });
          $.cookie("cookienum", numArr, { expires: 7, path: "/" });
        } else {
            /* 有 就根据id的索引去修改当前数量数组中对应的值 */
          numArr[$.inArray(id, idArr)] = $(".right-shopping input").val();
          $.cookie("cookienum", numArr, { expires: 7, path: "/" });
        }
      });
    }
  }
  return Cookies;
});
