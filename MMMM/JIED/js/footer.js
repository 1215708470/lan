$(()=>{
	$.ajax({
		type:"GET",
		url:"footer.html"
	}).then(function(html){
		$("#footer").html(html);
	})
})
