const { ajax, cssHooks } = require("jquery");
/* 调用首页数据渲染模块 */
require([], function () {
  
});
/* 定义文件 */
define([], function () {
  
  /* 轮播图 */
  class Banner {
    constructor() {
      this.tadver = $(".t-adver");
      this.tai = $(".t-adver i");
      this.ban = $(".ban-img");
      this.list = $(".banner .list");
      this.left = $(".arrow .left");
      this.right = $(".arrow .right");
      this.banBox = $(".banner");
      this.index = 0; /* 提前记录下标 */
      this.item; /* 计时器 */
      this.init();
      this.getNumber();
      this.enterStop();
    }
    init() {
      /* 顶部广告 */
      this.tai.on("click", () => {
        this.tadver.hide();
      });
      this.clickHandler();
      /* 判断cook用户名是否存在 */
      this.cookie()
    }
    cookie(){
      if($.cookie("username")){
        $(".nav-right li:first a").html("欢迎登陆"+$.cookie("username"))
        $(".nav-right li:eq(1)").hide()/* 注册隐藏 */
        $(".nav-right li:eq(2)").show()/* 退出显示 */
      }
      /* 点击退出清除cook */
      $(".nav-right li:eq(2)").on('click',()=>{
        $(".nav-right li:first a").html('请登录')
        $.cookie('username', null, { expires:-1, path: '/' });
        $(".nav-right li:eq(1)").show()/* 注册显示 */
        $(".nav-right li:eq(2)").hide()/* 退出隐藏 */
      })
    }
    /* 接受数据 */
    getNumber() {
      $.ajax({
        type: "post",
        url: "http://127.0.0.1/HUAWEI/php/home_page.php",
        data: {
          /* 后边数据库判断返回的数据 */
          banner: "banner",
        },
        dataType: "json",
      }).done((date) => {
        this.display(date);
      });
    }
    /* 添加轮播图 */
    display(date) {
      let str = "";
      $.each(date, (index, value) => {
        str += `<img src="${value.banuser}">`;
      });
      this.ban.html(str);
      /* 获取所有的图片 */
      this.aImg = $(".ban-img img");
      this.move();
    }
    /* 小圆点 */
    move() {
      /* 创建小圆点 */
      let strhtml = "";
      $.each(this.aImg, (index, value) => {
        strhtml += `<li></li>`;
      });
      $(".banner .list").html(strhtml);
      this.ali = $(".banner .list li"); /* 获得所有的li */
      this.ali.eq(0).css("active"); /* 第一个小圆点的初始颜色 */
      this.aImg.eq(0).css({ opacity: 1 }); /* 第一张图片显示 */
      let that = this;
      /* 滑过小圆点 */
      this.ali.on("mouseenter", function () {
        /* 小圆点的样式 */
        $(this).addClass("active").siblings(".list li").removeClass("active");
        /* 滑过的时候图片切换 */
        that.aImg
          .eq($(this).index())
          .stop()
          .animate({ opacity: 1 }, 800)
          .siblings(".ban-img img")
          .stop()
          .animate({ opacity: 0 }, 800);
        that.index = $(this).index(); /* 将最后一次滑动过下标记录 */
      });
    }
    /* 点击事件 */
    clickHandler() {
      let that = this;
      /* 点击左键 */
      this.left.on("click", function () {
        that.index--;
        if (that.index < 0) {
          that.index = that.aImg.length - 1;
        }
        /* 小圆点 */
        that.ali
          .eq(that.index)
          .addClass("active")
          .siblings(".list li")
          .removeClass("active");
        /* 图片 */
        that.aImg
          .eq(that.index)
          .animate({ opacity: 1 }, 800)
          .siblings(".ban-img img")
          .stop()
          .animate({ opacity: 0 }, 800);
      });
      /* 点击右键 */
      this.right.on("click", function () {
        that.rightClick();
      });
      /* 自动轮播 */
      that.item = setInterval(() => {
        this.rightClick();
      }, 3000);
    }
    /* 点击右键 */
    rightClick() {
      this.index++;
      if (this.index > this.aImg.length - 1) {
        this.index = 0;
      }
      /* 小圆点 */
      this.ali
        .eq(this.index)
        .addClass("active")
        .siblings(".list li")
        .removeClass("active");
      /* 图片 */
      this.aImg
        .eq(this.index)
        .animate({ opacity: 1 }, 800)
        .siblings(".ban-img img")
        .stop()
        .animate({ opacity: 0 }, 800);
    }
    /* 划入停止自动轮播 */
    enterStop() {
      /* 划入停止 */
      this.banBox.on("mouseenter", () => {
        clearInterval(this.item);
      });
      /* 滑出播放 */
      this.banBox.on("mouseleave", () => {
        clearInterval(this.item);
        this.item = setInterval(() => {
          this.rightClick();
        }, 3000);
      });
    }
  }
 return Banner
  /* let banner = new Banner(); */
});
console.log("banner图模块");
