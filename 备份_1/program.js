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
    console.log(speed);
    console.log(delay);
    console.log(time);
    console.log(area.scrollTop);
    console.log(area.innerHTML);
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

setInterval(delivery(),1000*60);//定时请求
//向后端发送请求数据
function delivery(){
    var name = "#";//获取用户名或其它
    var request = new XMLHttpRequest();
    request.open("GET","#?userName="+name,true);
    request.send();
}
var receiveText;
var request = new XMLHttpRequest();
request.onreadystatechange = function(){
    if (request.readyState === 4 || request.status === 200){//响应完成||请求成功
        receiveText = request.responseText;//接收后端数据
    }
};

var jsondata = '{"staff":[{"name":"洪七","age":123},{"name":"洪七","age":123}]}';//模拟来自后端的数据
var jsonobj = JSON.parse(jsondata);//JSON解析
alert(jsonobj.staff[0].name);//获得解析后的数据
/*问题待解决*/