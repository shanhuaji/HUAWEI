

/* 列表页 */
define([], function() {
    class List{
        constructor(){
            console.log("列表页")
            console.log($(".content").children())
            this.init()
        }
        init(){
            console.log("列表页")
        }
    }
    return List
});

