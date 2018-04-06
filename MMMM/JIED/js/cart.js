function loadCart(){
	$.getJSON("data/cart/get.php")
		.then(data=>{
		var html="";
		var selected=0;
		var total=0;
		for(var item of data){
			console.log(item)
			html+=`<div class="imfor">
				<div class="check">
					<img data-iid="${item.iid}" src="${
						item.is_checked==1?
				    'img/cart/product_true.png':
						'img/cart/product_normal.png'
					}" alt="">
				</div>
				<div class="product">
					<a href="product_details.html?lcid=${item.lcid}">
						<img src="${item.pic}" alt="">
					</a>
					<p class="desc">
						<a href="product_details.html?lcid=${item.lcid}">${item.title}</a>
					</p>
					<p class="col">
						<span>颜色：${item.subtitle}</span>
						
					</p>
				</div>
				<div class="price">
					<p class="price-desc"><b>¥</b>${item.price}</p>
					<p></p>
				</div>
				<div class="num">
					<span class="reduce" data-iid="${item.iid}"> - </span>
					<input type="text" value="${item.count}">
					<span class="add" data-iid="${item.iid}"> + </span>
				</div class="m-col-agio">
					<div class="m-promo-list">无</div>
				<div class="total-price">
					<span>¥</span>
					<span>${(item.count*item.price).toFixed(2)}</span>
				</div>
				<div class="del">
					<a href="#" data-iid="${item.iid}">删除</a>
				</div>
			</div>`;
			if(item.is_checked==1){
				total+=item.price*item.count;
				selected+=parseInt(item.count);
			}
		}
		$(".total,.totalOne").html(selected);
		$(".totalPrices,.foot-price").html("¥"+total.toFixed(2));
		$("#content-box-body").html(html);
		$(".check-top>img,.all>span>img").attr("src",data.some(function(item){
				return item.is_checked==0
			})||data.length==0?
			"img/cart/product_normal.png":
			"img/cart/product_true.png"
		);
	})
}
$(()=>{
	loadCart();
	$("#content-box-body").on("click",".del>a",e=>{
			e.preventDefault();
console.log(123111)
			if(confirm("是否继续删除?")){
				var $a=$(e.target);
				var iid=$a.data("iid");
				$.get("data/cart/delete.php",{iid}).then(()=>{
					loadCart()
				});
			}
	}).on("click",".reduce,.add",e=>{
		var $span=$(e.target);
		var iid=$span.data("iid");
		console.log(iid)
		var count=parseInt($span.siblings("input").val());
		if($span.is(".add"))
			count++;
		else 
			count--;
		$.get("data/cart/update.php",{iid,count}).then(()=>{
			loadCart();
		})
	}).on("click",".check>img",e=>{
		console.log()
		var $img=$(e.target);
		var iid=$img.data("iid");
			checked=
			$img.attr("src").endsWith("normal.png")?1:0;
		$.get("data/cart/check.php",{iid,checked}).then(()=>{
			loadCart();
		});
	});
	$(".check-top>img,.all>span>img").click(e=>{
		var $img=$(e.target);
		$.get(
			"data/cart/checkAll.php",
			{
				checked:
					$img.attr("src").endsWith("normal.png")?1:0
			}	
		).then(loadCart);
	});
	$(".base>a").click(()=>{

		$.get("data/cart/deleteChecked.php").then(loadCart);
	})
})