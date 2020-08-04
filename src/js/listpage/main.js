/* 列表页主模块 */
/* 配置模块 */
require.config({
  paths: {
    'jquery': "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min",
    'lazyload':
      "https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload",
     
  },
});

/* 调用模块 */
require(["jquery", "lazyload"], function ($, List) {
  require(["rander"], function (Randers) {
   let randers = new Randers(); /* 渲染页面 */
   /* let list = new List() *//* 列表页 */
  });
});
