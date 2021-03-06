/* const { cssHooks } = require("jquery"); */

//  /* 二级菜单 */
define([], function () {
  class Second {
    constructor() {
      this.oUl = $(".banner .content"); /* 类目外的ul */
      this.aLi = $(".content li"); /* 类目 */
      this.list = $(".min-list"); /* 隐藏框 */
      this.name;
      this.init();
    }
    init() {
      /* 每个LI的高度 */
      this.aLi.css(
        "height",
        parseInt(this.oUl.css("height")) / this.aLi.length
      );
      this.move();
    }
    /* 滑动显示 */
    move() {
      let that = this;
      this.aLi.on("mouseenter", function () {
        that.list.show();
        that.name = $(this).children().eq(0).html();
        $.ajax({
          type: "post",
          url: "http://10.31.163.66/HUAWEI/php/select.php",
          data: {
            /* 当前滑过元素的内容 */
            name: that.name,
          },
          dataType: "json",
        }).done(function (date) {
          that.display(date);
        });
      });
      this.list.on("mouseenter", () => {
        this.list.show();
      });
      this.list.on("mouseleave", () => {
        this.list.hide();
      });
      this.aLi.on("mouseleave", () => {
        this.list.hide();
      });
    }
    /* 数据渲染 */
    display(date) {
     
      let urlArr = date[0].url.split(",");
      let imgArr = date[0].imgname.split(",");

      let str = "";
      $.each(urlArr, (index, value) => {
        str += `
          <li>
            <a href="http://10.31.163.66/HUAWEI/src/listpage.html?name=${this.name}" target="_blank">
              <img src='${urlArr[index]}' alt="">
              <i>${imgArr[index]}</i>
            </a>
				  </li>
            `;
      });
      str += `
          <li>
					  <a href="">
              <i>播放</i>
					    <i>查看全部</i>
				  	</a>
				</li>
            `;
      /* 添加数据 */
      $(".min-list div").html(str);
    }
  }
  return Second;
 
});


