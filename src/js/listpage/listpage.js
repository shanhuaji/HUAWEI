/* 列表页 */
/* 分页 */
define([], function () {
  class List {
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
      this.pageNumber(); /* 定义页码 */
      this.currentNumber(1); /* 通过页码获取数据 默认渲染第一页 */
      this.clickHandler(); /* 点击页码 */
    }
    /* 定义页码 */
    pageNumber() {
      /* 域名中传输的数据 */
      let names = location.href.split("?")[1].split("=")[1];
      names = decodeURI(names);
      /* 总数据条数的ajax */
      $.ajax({
        type: "post",
        url: "http://127.0.0.1/HUAWEI/php/home_page.php",
        data: {
          name: names,
        },
        dataType: "json",
      }).done((date) => {
        console.log(date);
        /* 获得类目下的所有数据 使用长度/显示的个数 确定页码 */
        let strip = 12; /* 每页显示的条数 */
        let num = Math.ceil(date.length / strip); /* 页码 */
        let strhtml = "";
        for (let i = 0; i < num; i++) {
          strhtml += `<li>${i + 1}</li>`;
        }
        this.ulList.html(strhtml);
      });
    }
    currentNumber(page) {
      /* 点击类目的名称，连接数据库 */
      let names = location.href.split("?")[1].split("=")[1];
      /* 域名中的中文转换 发送给数据库寻找数据 */
      names = decodeURI(names);
      /* 获取当前页面数据的ajax */
      $.ajax({
        type: "get",
        url: "http://127.0.0.1/HUAWEI/php/listdata.php",
        data: {
          name: names,
          page: page /* 默认发送第一页 */,
        },
        dataType: "json",
      }).done((date) => {
        console.log(date);
        this.display(date); /* 渲染 */
        this.numberSort(date); /* 排序 */
      });
    }
    display(date) {
      let str = "";
      $.each(date, (index, value) => {
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
    }
    /* 点击页码 得到相应页码的数据 */
    clickHandler() {
      let that = this;
      $(".num-content ul").on("click", "li", function () {
        /* 找到被点击元素的下标 */
        let i = $(".num-content ul li").index($(this));
        console.log(i);
        that.currentNumber(i + 1);
      });
    }
    /* 排序 */
    numberSort(date) {
      /* 点击排序 */
      let bool = true;
      this.price.on("click", () => {
        bool = !bool;/* 状态切换 */
        if (bool) {
          /* 升序 */
          date.sort((a, b) => {
            return a.price - b.price;
          });
          console.log(bool);
          /* 排完渲染数据 */
          this.display(date);
        } else {
          console.log(bool);
          /* 降序 */
          date.sort((a, b) => {
            return b.price - a.price;
          });
          /* 排完渲染数据 */
          this.display(date);
        }
      });
    }
  }
  return List;
});
