/* const { cssHooks } = require("jquery"); */

/* const { cssHooks } = require("jquery"); */

/* 登录注册主模块 */
require.config({
  paths: {
    jquery: "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min",
  }
});

require(["jquery"], function ($) {
    /* 判断当前是哪个html文件 */
  let mod = $("#signup").attr("paging");
  /* js文件夹的名字必须和html中paging属性值相同 */
  if (mod) {
      console.log(mod)
    require([mod], function (Data) {
      let data = new Data
    
    });
  }
});
