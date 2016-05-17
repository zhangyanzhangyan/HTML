/**
 * Created by 岩 on 2016/4/21.
 */


window.onload=function()
{
    showTime();
}
function showTime()
{
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth();
    var date = nowDate.getDate();
    var d = nowDate.getDay();
    var hours = nowDate.getHours();
    var minutes = nowDate.getMinutes();
    var seconds = nowDate.getSeconds();
}