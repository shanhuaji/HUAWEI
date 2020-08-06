const { cssHooks } = require("jquery");


/* 详情页 */
/* cookie页面 */
define([], function () {
  class Cookies {
    constructor() {
      this.num = $(".right-shopping input"); /* 数量 */
      this.add = $(".right-shopping span i:first"); /* + */
      this.reduce = $(".right-shopping span i:last"); /* - */
      this.shop = $(".right-shopping li:first"); /* 购物车 */
      this.single = $(".right-shopping li:last"); /* 下单 */
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
    /* 点击加入购物车 */
    clickHandler() {
      let id = $(location.href.split("=")).get(1); /* 域名中的id */
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
          this.deter()
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
          /* 添加购物车如果之前添加该商品 记录之前的值 加上本次的值 更改数组 */
          let a = $(numArr).get($.inArray(id, idArr))
           /* 有 就根据id的索引去修改当前数量数组中对应的值 */
          numArr[$.inArray(id, idArr)] = parseInt($(".right-shopping input").val())+parseInt(a);
          $.cookie("cookienum", numArr, { expires: 7, path: "/" });
        }
      });
    }
    /* 确认是否进入购物车 */
    deter(){
      /* 获取当前商品的名字 */
      let str = $(".right-header li:first").html()+" 成功加入购物车!"
      $(".determine p").html(str)
     /* 再逛逛 */
        /* 位置 */
        $(".determine").css({
          left:($(window).width()- $(".determine").width())/2,
          top:($(window).height()- $(".determine").height())/2
        })
        $(".determine").show()
        $(window).on("scroll",()=>{
          $(".determine").css({
            left:($(window).width()- $(".determine").width())/2,
            top:($(window).height()- $(".determine").height())/2
          })
        })
        /* 点击再逛逛回到当前页面 */
        $(".continue").on("click",()=>{
          $(".continue").attr("href","location.href")
        })
    }
  }
  return Cookies;
});
