/* 列表页 */
/* 渲染页面 */
/* require(['listpage'],function(List){
  let list = new List()
}) */
/* 不用插件 分页  有瑕疵 */
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
      // console.log(this.data.size());
      /* $.each(this.data, (index, value) => {
        str += `
          <a href="http://127.0.0.1/HUAWEI/src/details.html?sid=${value.Id}" target="_blank">
            <img data-original="${value.banuser}" class="lazyload" width="130" height="150" />
            <strong>${value.phoneName}</strong>
            <i>￥${value.price}</i>
            <em>限时特价 分期免息 赠送积分</em>
            <span>402人评价 95%好评</span>
          </a>
        `;
        this.ulList.html(strhtml);
      });
      this.content.html(str); */

      let strip = 16; /* 每页显示的条数 */
      let strOne =''
      /* 第一次请求数据 */
      for (let j = 0 * strip; j < 0 * strip + strip; j++) {
       /* 如果j的值 小于数据的长度  就渲染数据 */
        if (j < this.data.length) {
          strOne += `
              <a href="http://127.0.0.1/HUAWEI/src/details.html?sid=${this.data[j].Id}" target="_blank">
                <img data-original="${this.data[j].banuser}" class="lazyload" width="130" height="150" />
                <strong>${this.data[j].phoneName}</strong>
                <i>￥${this.data[j].price}</i>
                <em>限时特价 分期免息 赠送积分</em>
                <span>402人评价 95%好评</span>
              </a>
            `;
        }
      }
      
      this.content.html(strOne);
      
      $(function () {
        $("img.lazyload").lazyload({ effect: "fadeIn" });
      });

      let strip = 16; /* 每页显示的条数 */
      let num = Math.ceil(this.data.length / strip);/* 页码 */
      
      let strhtml = "";
      //  渲染页码 根据页码定义渲染次数
      for (let i = 0; i < num; i++) {
        strhtml += `<li>${i + 1}</li>`;
      }
      this.ulList.html(strhtml);
      let that = this;
      /* 每页显示16个 */
      /* 页码  渲染的开始下标  渲染结束的下标 */
      /* 0        0*16            0*16+16 */
     /*  1        1*16            1*16+16 */
      $(".num-content ul li").on("click", function () {
        /* 寻找被点击元素的下标 */
        let i = $(".num-content ul li").index($(this));
        let strTwo = "";
        for (let j = i * strip; j < i * strip + strip; j++) {
          /* 如果j的值 小于数据的长度  就渲染数据 */
          if (j < that.data.length) {
            strTwo += `
                <a href="http://127.0.0.1/HUAWEI/src/details.html?sid=${that.data[j].Id}" target="_blank">
                  <img data-original="${that.data[j].banuser}" class="lazyload" width="130" height="150" />
                  <strong>${that.data[j].phoneName}</strong>
                  <i>￥${that.data[j].price}</i>
                  <em>限时特价 分期免息 赠送积分</em>
                  <span>402人评价 95%好评</span>
                </a>
              `;
          }
        }
        that.content.html(strTwo);
        
        $(function () {
          $("img.lazyload").lazyload({ effect: "fadeIn" });
        });
       
      });
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
  }
  return Randers;
});
