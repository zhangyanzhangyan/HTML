/**
 * Created by 岩 on 2016/5/8.
 */

var area = document.getElementById('rollBox');
var informationText = document.getElementsByClassName("informationText");
var informationTime = document.getElementsByClassName("informationTime");
var iliHeight = 24;//单行滚动的高度
var speed = 50;//滚动的速度
var time;
var period;
var delay= 2000;
area.scrollTop=0;
area.innerHTML+=area.innerHTML;//克隆一份一样的内容
var number;//用于计数
function startScroll(){
    time=setInterval("scrollUp()",speed);
    area.scrollTop++;
}
function scrollUp(){
    if(area.scrollTop % iliHeight==0){
        clearInterval(time);
        period = setTimeout(startScroll,delay);
    }
    else{
        area.scrollTop++;
        if(area.scrollTop >= area.scrollHeight/2){
            area.scrollTop =0;
        }
    }
}
setTimeout(startScroll,delay);
area.onmouseover = function(){    //鼠标移入时发生
    clearInterval(time);
    clearTimeout(period);
};
area.onmouseout = function(){     //鼠标移出时发生
    //time = setInterval("scrollUp()",speed);
    period = setTimeout(startScroll,delay);

};
//alert(informationText[2].innerHTML);
//alert(informationTime[0].innerHTML);
setInterval(gain(),1000*60);
function gain(){
    var request = new XMLHttpRequest();
    request.open("GET","#",true);
    request.send();
}
//向后端发送数据
function delivery(){
    var name = "#";
    var request = new XMLHttpRequest();
    request.open("GET","#?userName="+name,true);
    request.send();
}

/*var jsondata = '{"staff":[{"name":"洪七"，"age":123},{"name":"洪七"，"age":123}]}';//模拟来自后端的数据
var jsonobj = JSON.parse(jsondata);//JSON解析
alert(jsonobj.staff[0].name);//获得解析后的数据
/*问题待解决*/