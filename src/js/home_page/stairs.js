/* 楼梯模块 */
define([], function () {
  class Stairs {
    constructor() {
      this.aUl = $(".nav-side");
      this.titleH = $("div>ul>h3"); /* 所有的标题与右侧隐藏导航相对应 */
      this.returnTop = $(".return-top"); /* 返回顶部 */
      this.list = $(".shopping"); /* 购物车客服等 */
      this.init();
    }
    init() {
      /* 滚动条事件 */
      $(window).on("scroll", () => {
        /* 滑动过程中测导航的样式 */
        $.each(this.titleH, (index, value) => {
          /* 测导航栏样式切换的位置 */
          let h =
            this.titleH.eq(index).offset().top - $(".phone-img a").height();
          if ($(window).scrollTop() >= h) {
            /* 清除测导航栏中所有a的样式 */
            $(".nav-side li a").removeClass("activeli");
            /* 当前的添加样式 */
            this.aUl.children().eq(index).children().addClass("activeli");
          }
        });

        /* 滑动过程中滚动条隐藏的效果 */
        this.scrollStyle();
      });
      /* 点击楼梯 */
      this.clickHandler();
    }
    /* 滑动过程中滚动条隐藏的效果 */
    scrollStyle() {
      /* 测导航栏出现的时机 */
      if ($(window).scrollTop() > 1700) {
        this.aUl.stop().animate({
          right: 10,
        });
      } else {
        this.aUl.stop().animate({
          right: -85,
        });
      }
      /* 返回顶部 */
      if ($(window).scrollTop() > 1000) {
        this.returnTop.show();
      } else {
        this.returnTop.hide();
      }
    }
    /* 楼梯 */
    clickHandler() {
      /* 点击回到顶部 */
      this.returnTop.on("click", function () {
        $("html,body").animate({
          scrollTop: 0,
        });
      });
      /* 测导航中的所有li */
      let arrList = this.aUl.children();
      let that = this;
      /* 点击测导航栏中的li 获得对应的下标 */
      /* 利用下标寻找对应的的标题（h3标签）所在的位置 */
      arrList.on("click", function () {
        $("html,body").animate({
          scrollTop: that.titleH.eq($(this).index()).offset().top,
        });
        /* 所有测导航中的a */
        $(".nav-side li a").removeClass("activeli");
        /* 被点击元素中的a */
        $(this).children(0).addClass("activeli");
      });
    }
  }
  return Stairs
 
});

