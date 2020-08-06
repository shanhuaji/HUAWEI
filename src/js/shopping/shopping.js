const { cssHooks } = require("jquery");
/* const { cosh } = require("core-js/fn/number"); */

/* 购物车页面 */
define([], function () {
  class Shop {
    constructor() {
      this.middle = $(".main-middle"); /* 主框 */
      this.init();
    }
    init() {
      this.arr = [];
      this.getNumber();
    }
    getNumber() {
      /* 保存cookie中传的商品id和数量 */
      this.idArr = $.cookie("cookiesid").split(",");
      this.numArr = $.cookie("cookienum").split(",");
      /* 使用cook中传的值，获取后端的数据 */
      /* 获取数组库的数据 */
      $.ajax({
        type: "post",
        url: "http://127.0.0.1/HUAWEI/php/home_page.php",
        data: {
          id: "1",
        },
        dataType: "json",
      }).done((date) => {
        this.data = date;
        this.display(date);
      });
    }
    /* 渲染数据 */
    display(date) {
      let strHtml = "";
      $.each(date, (index, value1) => {
        /*  cookie中的id值 */
        $.each(this.idArr, (index, value) => {
          /*   数据中的Id和cookie中的id相同 */
          if (value1.Id === value) {
            /* 购物车数据渲染 */
            strHtml += `
                    <div class="select-product">
                    <!-- 商品内容 -->
                    <div class="select-content">
                        <!-- 左边内容 -->
                        <div class="select-left">
                        <!-- 选框 -->
                        <input type="checkbox" />
                        <!-- 商品图 -->
                        <a href=""><img src="${value1.banuser}" alt="" /></a>
                        <!-- 商品名 -->
                        <a href="" class="word">${
                          value1.phoneName
                        }<br /><em>分期免息</em></a>
                        </div>
                        <!-- 右边内容 -->
                        <div class="select-right">
                        <!-- 单价 -->
                        <span class="unit-price">￥${value1.price}</span>
                        <!-- 数量 -->
                        <div class="sr-num">
                            <button class="minus">-</button>
                            <input value="${this.numArr[index]}"></input>
                            <button class="add">+</button>
                        </div>
                        <!-- 小计 -->
                        <span class="sr-min">￥${
                          this.numArr[index] * value1.price
                        }.00</span>
                        <!-- 删除 -->
                        <i>删除</i>
                        </div>
                    </div>
                    <!-- 赠送产品 -->
                    <div class="select-give">
                        <div class="sg-left">
                        <a href=""
                            ><img
                            src="https://res.vmallres.com/pimages//product/6901443303236/55_55_1557135438924mp.png"
                            alt=""
                        /></a>
                        <em>配</em>
                        <span>HUAWEI 蓝牙鼠标（灰色）灰色</span>
                        </div>
                        <div class="sg-right">
                        <span>￥0.00</span>
                        <em>x1</em>
                        <span>￥0.00</span>
                        </div>
                    </div>

                    <!-- 增值服务 -->
                    <!-- 不是所有的都有 -->
                    <div class="select-increment">
                        <!-- 空白左边 -->
                        <div class="si-service">
                        <div class="si-left">
                            <input type="checkbox" />
                            <em>华为无忧服务</em>
                            <span>￥1299.00</span>
                        </div>
                        <!-- 空白右边 -->
                        <div class="si-right">
                            <i>(服务范围服务范围大于水平服务宝大于水平服务宝)</i>
                            <a href="">了解详情</a>
                        </div>
                        </div>
                    </div>
                    </div>
              `;
          }
        });
      });
      /* 添加数据 */
      this.middle.html(strHtml);
      /* 渲染完成数据后立即渲染总数量和总价格 */
      /* 所有商品总数量和总价格 */
      this.totalPriceNum();
      /* 点击添加商品修改价格 */
      this.clickHandler();
      this.clickCheckbox(); /* 复选框 */
      this.removeCommodity(); /* 删除当前产品 */
      this.removeHandler();/* 删除 */
    }
    /* 总价格和总数量 */
    totalPriceNum() {
      /* 找到所有的价格 */
      let addPrice = 0; /* 总价格 */
      let addNumber = 0; /* 总数量 */
      $.each($(".sr-min"), (index, value) => {
        addPrice += parseInt($(value).html().split("￥")[1]);
        addNumber += parseInt($(".sr-num input").eq(index).val());
      });
      /* 总价格 */
      $(".ms-right em").html("￥" + addPrice);
      $(".ms-right li:last i").html(addNumber);
    }
    /* 点击的时候获取单价 数量 单商品总价 */
    singlePrice(index) {
      let uPrice = $(".unit-price").eq(index).html().split("￥"); /* 单价 */
      let cNum = $(".sr-num input").eq(index).val(); /* 数量 */
      $(".sr-min")
        .eq(index)
        .html("￥" + $(uPrice).get(1) * cNum + ".00"); /* 单商品总价 */
    }
    /* 加减 */
    clickHandler() {
      this.addTo = $(".add"); /* + */
      this.reduce = $(".minus"); /* - */
      let that = this;
      /* 遍历所有的+ 点击寻找它的兄弟元素em */
      $.each(this.addTo, (index, value) => {
        /* 获取数量的初始值 */
        $(value).on("click", function () {
          let num = $(".sr-num input").eq(index).val();
          num++;
          $(this).siblings(".sr-num input").val(num);
          /* 点击的时候获取单价 数量 单商品总价 */
          that.singlePrice(index);
          /* 总价和总数量 */
          that.totalPriceNum();
        });
      });
      /* 减号 */
      $.each(this.reduce, (index, value) => {
        $(value).on("click", function () {
          /* 获取数量的初始值 */
          let num = $(".sr-num input").eq(index).val();
          if (num < 2) {
            num = 1;
          } else {
            num--;
            $(this).siblings(".sr-num input").val(num);
          }
          /* 点击的时候获取单价 数量 单商品总价 */
          that.singlePrice(index);
          /* 点击时候修改总价 总个数 */
          that.totalPriceNum();
        });
      });
      /* 离开输入框的时候触发 */
      $.each($(".sr-num input"), function (index, value) {
        $(value).on("change", function () {
          that.singlePrice(index); /* 单商品总价 */
          that.totalPriceNum(); /* 所有商品总数量和总价格 */
        });
      });
    }

    /* 选框 */
    clickCheckbox() {
      /* 两个全部起一样的class名字 */
      let first = $(".allcheck"); /* 第一个全选和最后一个全选 */
      // let last = $(".allcheck"); /* 最后一个全选 */
      /* 其它按钮 */
      let other = $("input[type='checkbox']").not("input:last,input:first");
      /* 定义状态 用来全部按钮的切换 */
      let bool = false;
      first.on("click", () => {
        bool = !bool;
        bool ? other.prop("checked", true) : other.prop("checked", false);
        bool ? first.prop("checked", true) : first.prop("checked", false);
      });

      /* 单选框 */
      other.on("click", function () {
        /* 除了全选框其它的框 */
        let singleCheck = $("input[type='checkbox']:checked").not(".allcheck");
        /* 判断被选中的单选框的个数 */
        if (other.size() === singleCheck.size()) {
          first.prop("checked", true);
          /* last.prop("checked", true); */
        } else {
          first.prop("checked", false);
         /*  last.prop("checked", false); */
        }
      });
    }
    /* 删除 */
    removeCommodity() {
      /* 购物车中的商品 */
      const $current = $(".select-product");
      /* 删除按钮 */
      const $remove = $(".select-right i");
      let that = this;
      $remove.on("click", function () {
       /* 被点击元素的下标 */
        let index = $remove.index($(this));
        /* 删除对应的商品 */
        $current.eq(index).remove();
        /* 删除对应商品在cookie中的值 */
        that.idArr.splice(index, 1);
        /* 创建新的数组 在删除商品和之前删除的cook中对应的值 */
        /* 获取页面中剩余商品的数量 */
        /* 将剩余的商品的id和剩余商品的数量上传到cookie */
        let newnumArr = [];
        $.each($(".sr-num input"), (index, value) => {
          newnumArr.push($(value).val());
        });
      /* 删除一个 */
       that.totalPriceNum()
        // /* 将删除后剩余的商品的id和数量传给cookie */
        $.cookie("cookiesid", that.idArr, { expires: 7, path: "/" });
        $.cookie("cookienum", newnumArr, { expires: 7, path: "/" });
      });
    }
    /* 总删除 */
    removeHandler() {
      
      /* 清除cookie */
      /* 点击全部商品 删除全部商品，结算，全选 */
      /* 清除所有的cookie  重新给cookie赋值 保证程序正常进行 */
      $(".ms-left span:last").on("click", () => {
        $(".main-middle").remove();
        $(".main-settlement").remove();
        $(".main-top").remove();
        $.cookie("cookiesid", null, { expires: -1, path: "/" });
        $.cookie("cookienum", null, { expires: -1, path: "/" });
         $.cookie('cookiesid', "",{ expires: 7, path: "/" });
         $.cookie('cookienum', "",{ expires: 7, path: "/" });
      });
    }
  }
  return Shop;
});
