//轮播广告
(function(){
	//var noNum =  localStorage.getItem("nowNum");
	// $(".quantity").html(noNum);
	$.getJSON("data/index/getCarousel.php").then(data => {

		var html = "";
		for(var p of data) {
			html += `<li>
              <a href="${p.href}">
                <img src="${p.img}" title="${p.title}">
              </a>
            </li>`
		}
		html += `<li>
            <a href="${data[0].href}">
              <img src="${data[0].img}" title="${data[0].title}">
            </a>
          </li>`

		var LIWIDTH = 1908,
			moved = 0,
			interval = 500,
			wait = 3000,
			timer = null;
		var $ul = $("[data-load=bannerImgs]")
		$ul.html(html).css("width", (data.length + 1) * LIWIDTH);

		var $ulIdx = $("[data-load=bannerInds]") //添加小圆点
		$ulIdx.html("<li></li>".repeat(data.length))
			.children().first().addClass("hover");

		function move(dir = 1) { //第一个定时器只动一次
			if(moved == 0 && dir == -1) {
				moved = data.length; //
				$ul.css("left", -LIWIDTH * data.length);
			}
			moved += dir;
			$ul.animate({
				left: -LIWIDTH * moved
			}, interval, function() { //到第四张时回到第一张
				if(moved == data.length) {
					moved = 0;
					$ul.css("left", 0);
				}
				//让小圆点跟着图片动起来
				$ulIdx.children(":eq(" + moved + ")").addClass("hover").siblings().removeClass("hover");
			});
		}
		timer = setInterval(move, wait + interval); //第二个定时器实现循环轮播
		$("#banner").hover( //鼠标放在图片上暂停播放
			function() {
				clearInterval(timer);
				timer = null;;
			},
			function() {
				timer = setInterval(move, wait + interval);
			}
		) //鼠标点击小圆点，走到指定的图片
		$ulIdx.on("click", "li:not(.hover)", function() {
			var i = $(this).index();
			moved = i
			$ul.stop(true).animate({
				left: -LIWIDTH * moved
			}, interval, function() {
				$ulIdx.children(":eq(" + moved + ")").addClass("hover").siblings().removeClass("hover");
			})
		}) //右边按钮
		$("[data-move=right]").click(function() {
			if(!$ul.is(":animated"))
				move();
		});
		$("[data-move=left]").click(function() {
			if(!$ul.is(":animated"))
				move(-1);
		});
	});
})();
//加载优选匠心好货列表
$(() => {
	$.getJSON("data/index/getRecommended.php").then(data => {
		//console.log(data);
		var html = "";
		for(var i = 0; i < data.length; i++) {
			var p = data[i];
			html += `<li>
				<div>
					<a href="${p.href}" ><img class="scrollLoading" src="${p.pic}"></a>
				</div>
				<div class="text-font">
					<a href="#">${p.title}</a>
				</div>
				<div class="univalence_box">
				￥${p.price}<span>总销量:${p.seq_top_sale}</span>
				</div>
			</li>`;
		}
		$("ul.elf_table").html(html);
	});
});
