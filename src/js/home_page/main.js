/* 文件的名字和html文件中currentmod的值相同 */
/* 首页 */
/* 配置模块 */
require.config({
  paths:{
    'jquery':'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery',
    'lazyload':'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min',
  
  }
})
/* 调用模块  */
/* 主文件  包含导航栏和底部等公用效果 */
/* 依赖上面配置的jQuery文件 */
require(['jquery','lazyload'],function($,lazyload){

  /* 获取html文件中currentmod的值 */
  let mod = $('#homepage').attr('currentmod');
 if(mod){
    /* 依赖home-top.js文件 */
    require([mod],function(){
      
    })
  }
})
