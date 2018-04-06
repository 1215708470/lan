if(typeof jQuery!=="function")
	throw new Error(
		"myBoot依赖于jQuery，必须先引入jquery.js")
else{
	/*$("[data-trigger=dropdown]").parent().hover(function(){
			$(this).children(".dropdown-menu")
          .toggleClass("in")
  })*/

	$(".tabs:has([data-toggle=tab])").on("click","[data-toggle=tab]",function(e){
		e.preventDefault();
		var $tar=$(e.target);
		if(!$tar.parent().is(".active")){
			$tar.parent().addClass("active").siblings().removeClass("active");
			var id=$tar.attr("href");
			//$(id).addClass("active").siblings().removeClass("active");
			$(id).css("display","block").siblings().css("display","none");
		}
	})
}