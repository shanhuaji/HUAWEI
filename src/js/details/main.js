
/* 详情页主模块 */
require.config({
    paths:{
        'jquery':"https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min",
        'jqcookie':"https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie",
    }
})

require(['jquery','jqcookie'],function($,jqcookie){
    require(["details","content"],function(Magnifier,Cookies){
        let magn = new Magnifier;
        let cookie = new Cookies;
    })
})