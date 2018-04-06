
$(() => {
	//页面头部
	if(location.pathname.endsWith("cart.html"))
{
	$.ajax({
		type: "get",
		url: "header.html"
	}).then(html => {
		$("#header").html(html);
	$.get("data/users/isLogin.php").then(data => {
		if(data.ok == 0)
	{
		alert("请先登陆");
		location = "login.html";
	}
}
)
})
}
$("#header").load("header.html",function() {
//登陆
	$.getJSON("data/users/isLogin.php").then(data => {
		//	console.log(data)
		if(data.ok == 0)
		$("#loginList").show().next().hide()
		else {
			$("#loginList").hide().next().show();
	$("#uName").html(data.phone);
}
//添加搜索
var $input = $("#txtSearch");
$("[data-trigger=search]").click(function () {
	if ($input.val().trim().length > 0) {
		location = "products.html?kw=" + $input.val().trim();
	}
});

//注销
$("#logout").click(function () {
	$.get("data/users/logout.php").then(() => {
		$("#loginList").show().next().hide();
})
})
})
})
	
	//导航栏
	$.ajax({
        type:"get",
        url:"nav.html"
    }).then(function (html) {
        $(".nav_box").html(html);
    }).then(
    $(".nav_box").on("mouseenter",".all_product",function () {
       // console.log(11)
        $('.product_list').slideDown();
    }).mouseleave(function(){
        $('.product_list').hide();
    }).on("mouseenter",".product_row_child,.product_row_",function () {
        $(this).children('a').siblings('.three_nav').stop().slideDown()
    }).on("mouseleave",".product_row_child,.product_row_",function(){
      $(this).children().siblings('.three_nav').stop(true,true).hide();
    })
    
    )
	

	// 购物车
	var nume = $("#number");
	//输入框的值
	var count = parseInt(nume.val());
	//购物车数量
	//  var cartNum;// = parseInt($(".c_dity").html());
	function loadCart() {
		$.getJSON("data/cart/get.php")
			.then(data => {
				var html = "";
				var total = 0;
				for(var item of data) {
					// console.log(item.subtitle)
					total += item.price * item.count;
					html += `<li class="cart_item">
 				<div class="cart_item_pic">
 				<a href="detailContent.html?lcid=${item.lcid}" onclick="">
 				<img src=${item.pic}></a>
 				</div>
 				<div class="cart_item_desc">
 				<a href="#" onclick="" class="cart_item_name">${item.title}</a>
 				<div class="cart_item_sku">
 				<span>${item.subtitle}</span>
 				</div>
 				<div class="cart_item_price">
 				<span class="cart_price" g-price=${item.price}>¥${item.price}</span><a class="sc2017" title="删除" data-iid=${item.iid}>删除</a>
 				</div>
 				</div>
 				</li>`;
				}
				$(".accounts").html(`<span class="cart_accounts_left">共
										<span class="c_dity">${data.length}</span>件商品
									</span>
									<span class="cart_accounts_right">￥${total.toFixed(2)}</span>`);
				// $(".cart_accounts_right ").html("¥"+total.toFixed(2));
				cartNum = data.length;
				$(".quantity").html(cartNum);
				$(".cart_content").html(html);
			})
	}
	loadCart()
	//删除商品
	$(document).on("click", ".cart_item_price>a", e => {
		e.preventDefault();
		//console.log(1)
		//if(confirm("是否继续删除?")) {
			var $a = $(e.target);
			var iid = $a.attr("data-iid");
			$.get("data/cart/delete.php", {
				iid
			}).then(() => {
	//			console.log(iid)
				loadCart();
				if(parseInt($(".quantity").html()) - 1 == 0) {
					$("#_cart").html(`<a class="emptyCartTime">您的购物车为空，快去购物吧</a>`);
					$(".accounts_box").html(" ");
					$(".accounts_bom").html(" ");
				}
			})
		//};
	})
	//右侧边栏
	$(".right_strip").on("click","span.logo",function(){
    	console.log(55)
	$(".tml-dialog").css("display", "block");
    })
	$("a.close").click(function() {
	$(".tml-dialog").css("display", "none");
})


	
	//加载页面底部
	$.ajax({
		type:"GET",
		url:"footer.html"
	}).then(function(html){
		$("#footer").html(html);
	})
})