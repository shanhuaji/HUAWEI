/* 注册模块 */
/* require.config([],function(){

}) */

define([], function () {
  class Up {
    constructor() {
      this.text = $(".num"); /* 账号 */
      this.email = $(".email"); /* 邮箱 */
      this.phone = $(".phone"); /* 手机 */
      this.pass = $(".pass"); /* 密码 */
      this.confirmPass = $(".confirmPass"); /* 确认密码 */
      this.sub = $(".reg-list p a"); /* 提交 */
      this.init();
      console.log("注册");
    }
    init() {
      this.textEvent(); /* 账号 */
      this.emailEvent(); /* 邮箱 */
      this.submitHandler(); /* 注册 */
    }
    /* 账号 */
    textEvent() {
      this.text.on("blur", () => {
        let textReg = /^[A-Z]{1}[0-9a-z]{7,11}$/g; /* 最少8位 最少12位 */
        let textNum = this.text.val(); /* 输入框的值 */
        /* 判断是否为空 */
        if (this.text.val()) {
          /* 判断账号长度 */
          if (this.text.val().length <= 12 && this.text.val().length >= 8) {
            /* 判断密码是否正确 */
            if (textReg.test(textNum)) {
              this.text.siblings("em").html("√");
              this.text.siblings("em").css("color", "red");
            } else {
              this.text.siblings("em").html("请输入正确的账号格式");
              this.text.siblings("em").css("color", "green");
            }
          } else {
            this.text.siblings("em").html("您输入账号长度有误");
            this.text.siblings("em").css("color", "green");
          }
        } else {
          this.text.siblings("em").html("账号不能为空");
          this.text.siblings("em").css("color", "green");
        }
      });
    }
    /* 邮箱 */
    emailEvent() {
      this.email.on("blur", () => {
        /* 8342@qq.con.cn  格式 */
        let emailReg = /^([a-zA-Z0-9_])+@([a-zA-Z0-9_])+\.([a-zA-Z0-9])+\.*([a-zA-Z0-9]){0,}$/g; /* 最少8位 最少12位 */
        let emailNum = this.email.val(); /* 输入框的值 */
        console.log(emailReg.test(emailNum));
      });
    }
    /* 注册 */
    submitHandler() {
      this.sub.on("click", (eve) => {
        eve.preventDefault();
      });
    }
  }
  return Up;
});
