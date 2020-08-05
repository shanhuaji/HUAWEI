/* 登录模块 */

define([], function () {
  class Sign {
    constructor() {
      this.sub = $(".content-right .sub"); /* 登录 */
      this.textNum = $(".textnum"); /* 账号 */
      this.password = $(".password"); /* 密码 */
      this.textHtml = $(".texthtml"); /* 账号提示 */
      this.passHtml = $(".passhtml"); /* 密码提示 */
      this.init();
    }
    init() {
      console.log(this.sub);
      this.sendNumber();
    }
    /* 发送获取数据 */
    sendNumber() {
      /* 账号中的内容发送给数据库 */
      this.sub.on("click", (eve) => {
        $.ajax({
          type: "post",
          url: "http://127.0.0.1/HUAWEI/php/signup.php",
          data: {
            textNum: this.textNum.val(),
          },
          dataType: "json",
        }).done((date) => {
          /* 存在账号,返回的数组一定有长度 */
          /* 成功后验证密码,验证成功跳转至首页 */
          if (date.length !== 0) {
            date = $(date).get(0);
            this.verifyPassword(date);
          } else {
            /* 账号错误 */
            this.textHtml.html("账号不存在");
            this.textHtml.css({ color: "red" });
          }
        });
      });
    }
    /* 验证密码 */
    verifyPassword(date) {
      /* 账号相同,验证密码 */
      if (this.password.val() === date.pass) {
        /* 跳转首页  设置cook */
        $.cookie("username", this.textNum.val(), { expires: 7, path: "/" });
        location.href = "http://127.0.0.1/HUAWEI/src/home_page.html";
      } else {
        this.passHtml.html("密码有误");
        this.passHtml.css({ color: "red" });
      }
    }
  }
  return Sign;
});
