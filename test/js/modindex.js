/* 定义模块 */
/* 在定义模块文件中写每一个小的的效果 */
/* 第一个参数  依赖的js文件，可调用其中的方法 */
/* 第二个参数 实现的效果 */
/* 回调函数中的参数 是依赖的文件中的值 */

/* define([], function() {
    return{
        
        show(){
            return "定义模块"
        },
        showa:(function(){
        return "自执行函数"
        })()
    }
       
}); */


/* 引入第三方配置文件 */
require(["config"],function(){
    /* 依赖第三方配置文件 回调函数中的参数就是 path 中的属性名（引入的第三方文件） */
    require(["jquery"],function(){
        !function(){
            console.log("定义模块"+$(".box1").html())
        }()
       
       
    })
})