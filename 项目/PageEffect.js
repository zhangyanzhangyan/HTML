/**
 * Created by 岩 on 2016/4/21.
 */

window.onload = function() {//表示在整个页面加载完之后再执行
    var div0 = page1[0].offsetTop;
    var div1 = page1[1].offsetTop;
    var time;
    //var exchange = page1[0].offsetTop;
    //page1[0].offsetTop = page1[1].offsetTop;
    //page1[1].offsetTop = exchange;
    //setInterval(function(){move();}, 10);
    //setTimeout(function{change},2000)
};

var page1 = document.getElementsByClassName('page');//获取class的page标签
//alert(page1[0]);

function change() {
    time = setInterval("move()",50);//循环执行
    page1[0].offsetTop--;
    page1[1].offsetTop--;
}

function move() {
    page1[0].style.top--;
    page1[1].style.top--;
    page1[0].style.top = -5;
    //clearTimeout(time);
    //var page1 = document.getElementsByClassName('page');//获取class的page标签
    //page1[0].style.top--;
    //page1[0].style.top = page1[0].offsetTop - 1 + "px";
    //page1[1].style.top = page1[1].offsetTop - 1 + "px";
    //console.log(page1[1].style.top);
}
setTimeout("change",2000);//仅执行一次
//var time = null;


//var test = document.getElementsByClassName('page');//获取class的page标签
//console.log(test[0]);
//console.log(page1);
//console.log(page1);
//console.log(page1[1]);
//alert(page1[1]);
//alert(page1[0].offsetTop);
//var page1 = document.getElementsByClassName('page');//获取class的page标签
//var div0 = page1[0].offsetTop;
//console.log(page1[0].offsetTop);
//var div1 = page1[1].offsetTop;