/**
 * Created by web-01 on 2018/3/14.
 */
(function () {
    $.ajax({
        type:"get",
        url:"nav.html"
    }).then(function (html) {
        $(".nav_box").html(html);
    }).then(
    $(".nav_box").on("mouseenter",".all_product",function () {
        console.log(11)
        $('.product_list').slideDown();
    }).mouseleave(function(){
        $('.product_list').hide();
    }).on("mouseenter",".product_row_child,.product_row_",function () {
        $(this).children('a').siblings('.three_nav').stop().slideDown()
    }).on("mouseleave",".product_row_child,.product_row_",function(){
      $(this).children().siblings('.three_nav').stop(true,true).hide();
    })
    )
})();
