/**
 * Created by 岩 on 2016/5/8.
 */

var informationText = document.getElementsByClassName("informationText");
var informationTime = document.getElementsByClassName("informationTime");
//setInterval(delivery(),1000*6);//定时请求

//向后端请求通知数据
function delivery(){
    var name = "#";
    var request = new XMLHttpRequest();//创建一个XMLHttpRequest对象
    request.open("GET","#?userName="+name,true);
    request.send();//发送
    request.onreadystatechange = function(){//在每一次readyState变化时发生
        //if(true){
        if (request.readyState === 4 || request.status === 200){//请求已完成||请求成功
            var notice = JSON.parse(request.responseText);//接收后端数据并JSON解析
        }
    };
}
var jsondata = '{"staff":[{"noticeText":"这是一个动态通知","noticeTime":"2016-5-16"}' +
    ',{"noticeText":"这是另一个一个动态通知","noticeTime":"2060-5-16"}]}';//模拟来自后端的数据
var jsonobj = JSON.parse(jsondata);
informationText[0].innerHTML = jsonobj.staff[0].noticeText;//将相关信息进行替换
informationTime[0].innerHTML = jsonobj.staff[0].noticeTime;
informationText[1].innerHTML = jsonobj.staff[1].noticeText;
informationTime[1].innerHTML = jsonobj.staff[1].noticeTime;
//var jsonobj = JSON.parse(jsondata);//JSON解析
//alert(jsonobj.staff[0].notice);
//alert(jsonobj.staff[0].name);//获得解析后的数据


//实现滚动
    var area = document.getElementById('rollBox');
    var iliHeight = 24;//单行滚动的高度
    var speed = 50;//滚动的速度
    var time;
    var period;
    var delay = 2000;
    area.scrollTop = 0;
    area.innerHTML += area.innerHTML;//克隆一份一样的内容
    function startScroll() {
        time = setInterval("scrollUp()", speed);
        area.scrollTop++;
        console.log(speed);
        console.log(time);
        console.log(delay);
    }
    function scrollUp() {
        if (area.scrollTop % iliHeight == 0) {
            clearInterval(time);
            period = setTimeout(startScroll, delay);
        }
        else {
            area.scrollTop++;
            if (area.scrollTop >= area.scrollHeight / 2) {
                area.scrollTop = 0;
            }
        }
    }
    setTimeout(startScroll, delay);
    area.onmouseover = function () {    //鼠标移入时发生
        clearInterval(time);
        clearTimeout(period);
    };
    area.onmouseout = function () {     //鼠标移出时发生
        period = setTimeout(startScroll, delay);
    };
