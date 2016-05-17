/**
 * Created by 岩 on 2016/5/6.
 */

window.onload=function(){//在整个页面完全加载完成时执行
    var page = document.getElementsByClassName("page");
    alert(page[1].scrollTop);
    alert(page[1].offsetHeight);
    var iliHeight = 24;  //每次滚动的高度
    var speed = 50;  //滚动速度
    var time;
    var delay = 3000;//滚动延迟
    function srartScroll(){//滚动速度控制
        time = setInterval("scrollUp()",speed);
        page[0].scrollTop++;
    }
    function scrollUp() {//滚动间隔控制
        if (page[0].scrollTop % iliHeight == 0){
            clearInterval(time);
            setTimeout("srartScroll()",delay);
        }
        else {
            page[0].scrollTop++;
            if(page[0].scrollTop >= page[0].scrollHeight/2){
                page[0].scrollTop = 0;
            }
        }
    }
    setTimeout("srartScroll()",delay);
};