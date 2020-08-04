/* 列表页 */
/* 渲染页面 */
/* require(['listpage'],function(List){
  let list = new List()
}) */

const { cssHooks } = require("jquery");

define([], function () {
  class Randers {
    constructor() {
      this.content = $(".content"); /* 最外边的元素 */
      this.aImg = $(".content img"); /* 所有图片 */
      this.price = $(".category .price"); /* 价格 */
      this.pTop = $(".category .p-top"); /* 箭头 */
      this.pBottom = $(".category .p-bottom"); /* 箭头 */
      this.ulList = $(".num-content ul");
      this.init();
    }
    init() {
      /* 点击类目的名称，连接数据库 */
      let names = location.href.split("?")[1].split("=")[1];
      /* 域名中的中文转换 发送给数据库寻找数据 */
      names = decodeURI(names);
      $.ajax({
        type: "post",
        url: "http://127.0.0.1/HUAWEI/php/home_page.php",
        data: {
          name: names,
        },
        dataType: "json",
      }).done((date) => {
        this.data = date;
        this.display();
        this.clickHandler();
      });
    }
    /* 数据渲染 */
    display() {
      let str = "";
      console.log(this.data)
      $.each(this.data, (index, value) => {
        str += `
          <a href="http://127.0.0.1/HUAWEI/src/details.html?sid=${value.Id}" target="_blank">
            <img data-original="${value.banuser}" class="lazyload" width="130" height="150" />
            <strong>${value.phoneName}</strong>
            <i>￥${value.price}</i>
            <em>限时特价 分期免息 赠送积分</em>
            <span>402人评价 95%好评</span>
          </a>
        `;
      });
      this.content.html(str);

      $(function () {
        $("img.lazyload").lazyload({ effect: "fadeIn" });
      });
      /* 页码 */
      this.list();
    }
    /* 排序 */
    clickHandler() {
      /* 定义状态 */
      let bool = true;
      this.price.on("click", () => {
        bool = !bool;
        if (bool) {
          /* 升序 */
          this.data.sort((a, b) => {
            return a.price - b.price;
          });
          /* 颜色 */
          $(".category em i").removeClass("");
          this.pTop.addClass("p-colors");
          this.display();
        } else {
          /* 倒叙 */
          this.data.sort((a, b) => {
            return b.price - a.price;
          });
          /* 颜色 */
          $(".category em i").removeClass("");
          this.pBottom.addClass("p-colors");
          this.display();
        }
      });
    }
    /* 页码 */
    list() {
      /* 总页数 */
      let num = Math.ceil($(".content img").size() / 15);
      let str = "";
      for (let i = 1; i <= 2; i++) {
      
        str += `<li><a href="">${i}</a></li>`
      }
      console.log(str)
      this.ulList.html(str)
    }
  }
  return Randers;
});
