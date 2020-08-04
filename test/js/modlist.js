
/* 定义模块 */
/* 在定义模块文件中写每一个小的的效果 */
/* 第一个参数  依赖的js文件，可调用其中的方法 */
/* 第二个参数 实现的效果 */

define(['jquery'], function() {
   
    class Box{
        constructor(){
            this.name = "admin";
            /* this.b = $(".box1").html() */
        }
        showa(){
           /*  return "构造函数,配置文件" */
            $('button').on('click',function(){
                $(this).addClass('active').siblings('button').removeClass('active');
                $('.item').eq($(this).index()).addClass("showbox").siblings(".tab .item").removeClass('showbox')
            })
        }
    }
    return Box;
});