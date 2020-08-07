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
     
    }
    init() {
      this.textEvent(); /* 账号 */
      this.emailEvent(); /* 邮箱 */
      this.phoneEvent(); /* 手机 */
      this.passEvent(); /* 密码 */
      this.confirmPassEvent(); /* 确认密码 */
      this.submitHandler(); /* 注册 */
     
    }
    /* 账号 */
    textEvent() {
      this.text.on("blur", () => {
        this.textBool = false;
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
              this.textBool = true;
            } else {
              this.text.siblings("em").html("请输入正确的账号格式");
              this.text.siblings("em").css("color", "green");
              this.textBool = false;
            }
          } else {
            this.text.siblings("em").html("您输入账号长度有误");
            this.text.siblings("em").css("color", "green");
            this.textBool = false;
          }
        } else {
          this.text.siblings("em").html("账号不能为空");
          this.text.siblings("em").css("color", "green");
          this.textBool = false;
        }
      });
    }
    /* 邮箱 */
    emailEvent() {
      this.email.on("blur", () => {
        this.emailBool = false;
        let emailReg = /^([a-zA-Z0-9_])+@([a-zA-Z0-9_])+\.([a-zA-Z0-9])+\.{0,1}([a-zA-Z0-9]){0,}$/g;
        let emailNum = this.email.val(); /* 输入框的值 */
        if (emailNum) {
          /* 验证输入邮箱是否正确 */
          if (emailReg.test(emailNum)) {
            this.email.siblings("em").html("√");
            this.email.siblings("em").css("color", "red");
            this.emailBool = true;
          } else {
            this.email.siblings("em").html("输入邮箱格式有误");
            this.email.siblings("em").css("color", "green");
            this.emailBool = false;
          }
        } else {
          this.email.siblings("em").html("邮箱不可为空");
          this.email.siblings("em").css("color", "green");
          this.emailBool = false;
        }
      });
    }
    /* 手机 */
    phoneEvent() {
      this.phone.on("blur", () => {
        this.phoneBool = false;
        let phoneReg = /^[1][3,5,8][0-9]{9}$/g;
        let phoneNum = this.phone.val(); /* 输入框的值 */
        /* 输入框是否有值 */
        if (phoneNum) {
          /* 长度 */
          if (phoneNum.length === 11) {
            /* 手机号码格式是否正确 */
            if (phoneReg.test(phoneNum)) {
              this.phone.siblings("em").html("√");
              this.phone.siblings("em").css("color", "red");
              this.phoneBool = true;
            } else {
              this.phone.siblings("em").html("输入的手机号码有误");
              this.phone.siblings("em").css("color", "green");
              this.phoneBool = false;
            }
          } else {
            this.phone.siblings("em").html("手机号码长度有误");
            this.phone.siblings("em").css("color", "green");
            this.phoneBool = false;
          }
        } else {
          this.phone.siblings("em").html("手机号码不可为空");
          this.phone.siblings("em").css("color", "green");
          this.phoneBool = false;
        }
      });
    }
    /* 密码 */
    passEvent() {
      this.passBool = false;
      this.pass.on("input", () => {
        let type = 0;
        let passNum = this.pass.val(); /* 输入框的值 */
        /* 判断密码的强度 */
        if (/\d+/.test(passNum)) {
          type++;
        }
        if (/[a-z]+/.test(passNum)) {
          type++;
        }
        if (/[A-Z]+/.test(passNum)) {
          type++;
        }
        switch (type) {
          case 1:
            this.pass.siblings("em").html("密码强度较弱,请输入正确格式的密码");
            this.pass.siblings("em").css("color", "red");
            this.passBool = false;
            break;
          case 2:
            this.pass.siblings("em").html("中");
            this.pass.siblings("em").css("color", "red");
            this.passBool = true;
            break;
          case 3:
            this.pass.siblings("em").html("强");
            this.pass.siblings("em").css("color", "red");
            this.passBool = true;
            break;
        }
     
      });
    }
    /* 确认密码 */
    confirmPassEvent() {
      this.confirmPass.on("change", () => {
        this.confirmPassBool = false;
        let confirmPassNum = this.confirmPass.val(); /* 确认密码 */
        let passNum = this.pass.val(); /* 密码框 */
        if (confirmPassNum) {
          if (confirmPassNum === passNum) {
            this.confirmPass.siblings("em").html("√");
            this.confirmPass.siblings("em").css("color", "red");
            this.confirmPassBool = true;
          } else {
            this.confirmPass.siblings("em").html("两次输入的密码不同");
            this.confirmPass.siblings("em").css("color", "green");
            this.confirmPassBool = false;
          }
        } else {
          this.confirmPass.siblings("em").html("密码确认不能为空");
          this.confirmPass.siblings("em").css("color", "green");
          this.confirmPassBool = false;
        }
       
      });
    }
    /* 注册按钮 */
    submitHandler() {
      /* 每一项内容输入正确，跳转到登录页面 */
      /* 将数据发送给数据库 */
      this.sub.on("click", (eve) => {
        if (
          this.textBool &&
          this.emailBool &&
          this.phoneBool &&
          this.passBool &&
          this.confirmPassBool
        ) {
          this.sendOutNumber(); /* 发送数据 */
          this.sub.attr("href", "http://10.31.163.66/HUAWEI/src/Loginpage.html");
        } else {
          eve.preventDefault();
        }
      });
    }
    /* 发送数据 */
    sendOutNumber() {
      this.text = $(".num"); /* 账号 */
      this.email = $(".email"); /* 邮箱 */
      this.phone = $(".phone"); /* 手机 */
      this.pass = $(".pass"); /* 密码 */
      $.ajax({
        type:"post",
        url:"http://10.31.163.66/HUAWEI/php/signup.php",
        data:{
          text:this.text.val(),
          email:this.email.val(),
          phone:this.phone.val(),
          pass:this.pass.val(),
        }
      })
    }
  }
  return Up;
});
