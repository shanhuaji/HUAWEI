/* 主模块文件 */
/* 调用模块 */
/* 实现所有的效果 */
/* 第一个参数 数组  调用的文件 */
/* 第二个参数   接收的调用文件的返回值 */

/* require(["modindex"],function(date){
    console.log(date)
   
    console.log(date.show())
    console.log(date.showa)
    
}) */
/* 直接执引入的第三方文件的定义模块 */
require(["modindex"])
/* 面向对象 */
require(["modlist"],function(Box){
    let a = new Box
   console.log(a.showa())
   
})
/* 配置第三方文件 */
require(["config"],function(){
    /* 回调函数中的参数就是 path 中的属性名（引入的第三方文件） */
    require(["jquery"],function(){
        console.log("第三方文件"+$(".box1").html())
    })
})