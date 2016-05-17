//滚动后导航固定
$(function () {
    $(window).scroll(function () {
        height = $(window).scrollTop();
        console.log(height);
        var h = height - 93 + "px";

        if (height > 10) {
            $('.header').slideUp();
            $("#sider").css("top", h);
            $("#sider").css("height", "575px");
            // $("#sider").animate({top:"0px"},10);
        } else {
            $('.header').slideDown();
            $("#sider").css("top", "1px");
            $("#sider").css("height", "545px");
            // $("#sider").animate({top:"98px"},10);
        }
        ;

    });
});