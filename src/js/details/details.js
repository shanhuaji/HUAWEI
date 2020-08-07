
/* 详情页 */
/* 数据渲染 */
define([], function() {
  class Magnifier {
    constructor() {
      this.minImg = $(".main-img"); /* 小图 */
      this.maxImg = $(".max-img img"); /* 大图 */
      this.maxEnlarge = $(".max-img div"); /* 大放 */
      this.minEnlarge = $(".main-img span"); /* 小放 */
      this.text = $(".right-header li:first")/* 右边标题文字 */
      this.getNumber();
    }
    /* 获取数据 */
    getNumber() {
     $.ajax({
        type: "get",
        url: "http://10.31.163.66/HUAWEI/php/home_page.php",
        data: {
          /* 域名中的sid传给后端 */
          sid: location.href.split("?")[1].split("=")[1],
        },
        dataType: "json",
      }).done((date) => {
        /* 给标题赋值 */
        let name = date[0].phoneName;
       /* 找到左右的小图 */
        date = date[0].Img.split(",");
        this.display(date,name); /* 渲染 */
        this.init();
      });
    }
    /* 渲染数据 */
    display(date,name) {
      /* 给主图的src赋值 */
      $(".main-img img").attr("src", date[0]);
      /* 大图 */
     
      this.text.html(name)
      this.maxImg.attr("src", date[0])
      this.aListimg = $(".min-img"); /* 所有的小图片 */
      let strhtml = "";
      $.each(date, function (index, value) {
        strhtml += `<li><img src="${value}" alt=""></li>`;
      });
      this.aListimg.html(strhtml);
      this.listImg = $(".min-img img"); /* 下边所有的小图 */
      /* 设置小图的总长度 */
      /* 小图的个数 * 小图的宽度 */
      this.aListimg.width(this.listImg.length * this.listImg.eq(1).width());
    }
    init() {
      /* 可视窗口的距离 - 版心距离 /2 就是两边的空白宽度 */
      let w = (document.documentElement.clientWidth - $(".main").width()) / 2;
      /* 大放的宽度和高度 */
      this.maxEnlarge.css({
        width:
          (this.maxImg.width() * this.minEnlarge.width()) / this.minImg.width(),
        height:
          (this.maxImg.height() * this.minEnlarge.height()) /
          this.minImg.height(),
      });

      this.left = $(".la-left"); /* 左箭头 */
      this.right = $(".la-right"); /* 右箭头 */

      this.move(); /* 放大镜滑动效果 */
      this.listBanner(); /* 点击小图事件 */
      this.clickArrow(); /* 箭头事件 */
    }
    /* 移入事件 */
    move() {
     this.minImg.on("mouseenter", () => {
        this.minEnlarge.show(); /* 小放显示 */
        this.maxEnlarge.show(); /* 大放显示 */
        this.minImg.on("mousemove", (ev) => {
          let l = ev.pageX - this.minImg.offset().left;
          let t = ev.pageY - this.minImg.offset().top;
          this.minEnlarge.css({
            /* 鼠标到文档的距离（网页的最上和最左边） - 元素到文档的距离 - 小放大镜自身宽高的一半 */
            left: l - this.minEnlarge.width() / 2,
            top: t - this.minEnlarge.height() / 2,
          });

          this.boundary();
          /* 比例 */
          let proportion = this.maxImg.height() / this.minImg.width();
          /* 大图位置 */
          this.maxImg.css({
            left: -parseInt(this.minEnlarge.css("left")) * proportion,
            top: -parseInt(this.minEnlarge.css("top")) * proportion,
          });
        });
        /* 移除事件 */
        this.minImg.on("mouseleave", () => {
          this.minEnlarge.hide(); /* 小放隐藏 */
          this.maxEnlarge.hide(); /* 大放隐藏 */
        });
      });
    }
    /* 边界限定 */
    boundary() {
      /* 小图的宽度减去小放的宽度 */
      let w = this.maxImg.width() - this.minImg.width();
      let h = this.maxImg.height() - this.minImg.height();
      /* 宽度限定 */
      /* 小放的left值 < 0  */
      if (parseInt(this.minEnlarge.css("left")) <= 0) {
        this.minEnlarge.css("left", "0px");
      } else if (parseInt(this.minEnlarge.css("left")) > w) {
        /* 小放的left值 > 小图高-小放高 */
        this.minEnlarge.css("left", w + "px");
      }
      /* 高度限定 */
      /* 小放的top值 < 0  */
      if (parseInt(this.minEnlarge.css("top")) <= 0) {
        this.minEnlarge.css("top", "0px");
      } else if (parseInt(this.minEnlarge.css("top")) > h) {
        /* 小放的top值 > 小图高-小放高 */
        this.minEnlarge.css("top", h + "px");
      }
    }
    /* 列表图事件 */
    listBanner() {
      /* 找到所有的列表图 */
      let that = this;
      this.listImg.on("mouseenter", function () {
        /* 获取小图和大图的src  将被点击的图片的src赋值给大图和小图 */
        that.minImg.find("img").attr("src", $(this).attr("src")); /* 小图 */
        that.maxImg.attr("src", $(this).attr("src")); /* 大图 */
      });
    }
    /* 列表图横向移动 */
    clickArrow() {
      /* 显示图片容器的宽度/单个图片的宽度 = 显示图片的数量 */
      /* 所有图片的个数 - 当前显示图片的数量 = 隐藏的图片数量 */
      let len =
        this.listImg.length - $(".all-minimg").width() / this.listImg.width();

      let index = 0;
      /* 左侧箭头事件 */
      /* 点击左键减小小图父元素的left */
      /* 正 -> 负 */
      /* 缺少取消默认事件 */
      this.right.on("click", (eve) => {
        index++;
        if (index > len) {
          index = len;
          this.aListimg.animate({
            left: -this.listImg.width() * len,
          });
        } else {
          this.aListimg.animate({
            left: -this.listImg.width() * index,
          });
        }
      });
      /* 右侧箭头 */
      /* 点击右键增大小图父元素的left */
      /* 负 -> 正 */
      this.left.on("click", () => {
        index--;
        if (index <= 0) {
          index = 0;
          this.aListimg.animate({
            left: 0,
          });
        } else {
          this.aListimg.animate({
            left: -this.listImg.width() * index,
          });
        }
      });
    }
  }
  return Magnifier
  
});