/* 列表页主模块 */
/* 配置模块 */
require.config({
  paths: {
    jquery: "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min",
    lazyload:
      "https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload",
    pagination:
      "https://cdn.bootcdn.net/ajax/libs/paginationjs/2.1.5/pagination",
    
  },
  shim: {
    lazyload: {
      deps: ["jquery"],
      exports: "$.lazyload",
    },
    pagination: {
      deps: ["jquery"],
      exports: "$.lazyload",
    },
   
  },
});

/* 调用模块 */
require(["jquery", "lazyload", "pagination"], function ($,lazyload,pagination) {
  require(["listpage"], function (List) {
   
    let list = new List(); /* 列表页 */
   
  });
});
