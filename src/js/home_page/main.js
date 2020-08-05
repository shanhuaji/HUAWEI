/* 文件的名字和html文件中currentmod的值相同 */
/* 首页 */
/* 配置模块 */
require.config({
  paths:{
    'jquery':'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery',
    'lazyload':'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min',
    'jqcookie':"https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie",
  },
  shim:{
    'lazyload':{
      deps:['jquery'],
     /*  exports:'$.lazyload' */
    },
    'jqcookie':{
      deps:['jquery'],
      /* exports:'$.jqcookie' */
    },
  },
})
/* 调用模块  */
/* 主文件  包含导航栏和底部等公用效果 */
/* 依赖上面配置的jQuery文件 */
require(['jquery','lazyload','jqcookie'],function($,lazyload,jqcookie){
  require(['home-top',"render", "secounds", "stairs"],function(Banner,Second,Stairs,BoxShow){
      let banner = new Banner
      let second = new Second
      let stairs = new Stairs
      let boxShow = new BoxShow
    
  })
 
})
