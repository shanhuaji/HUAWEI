
/* 购物车主模块 */
require.config({
    paths:{
        'jquery':'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'jqcookies':'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie',
       
    }
});
/* 调用配置模块 */
require(['jquery','jqcookies'],function($,jqcookies){
    /* 调用定义模块 */
    require(['shopping'],function(Shop){
        let shop = new Shop
       
    })
})