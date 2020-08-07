/* 数据渲染模块 */

define([], function() {
   /* 列表数据渲染 */
  class BoxShow {
    constructor() {
      this.oUl = $(".banner .content"); /* 类目外的ul */
      
      this.boxPhone = $(".phone-img");/* 手机外边的div */
      
      this.init();
    }
    init() {
      this.getNum();
    }
    /* 渲染手机 */
    /* 接收数据 */
    getNum() {
      $.ajax({
        type:"post",
        url: "http://10.31.163.66/HUAWEI/php/home_page.php",
        data:{
          /* 后边数据库判断返回的数据 */
          phone:"phone"
        },
        dataType: "json",
      }).done((date) => {
        this.display(date)
      });
    }
    display(date){
      let str = ''
      /* 此处懒加载没生效 */
      $.each(date,(index,value)=>{
       str += `
          <a href="http://10.31.163.66/HUAWEI/src/details.html?sid=${value.Id}" target='_blank'>
            <img data-original="${value.banuser}" alt="" class="lazyload" width="170" height="175" >
            <em>${value.phoneName}</em>
            <span>${value.discount}</span>
            <i>￥${value.price}</i>
          </a>
        `
      })
      this.boxPhone.html(str)
     
      $(function(){
        $("img.lazyload").lazyload({effect:"fadeIn"})
      })
      /* 删除除了第一个元素中除了img的其他子元素 */
      $(".phone-img a:first-child img").siblings().remove()
    }
    
  }
  return BoxShow
 
});
