$('.all_product').hover(function()
{
	$('.product_list').slideDown();
},function()
{
	$('.product_list').hide();
})

$('.product_row_child').hover(function()
{
	$(this).children('a').addClass('product_row_child').siblings('.three_nav').stop(true,true).slideDown()
},function()
{
	$(this).children('a').removeClass('product_row_child').siblings('.three_nav').stop(true,true).hide()
})

	
    $('body').click(function()
    {
        $('#showsearch').hide();
    });
	
    //选中搜索框时的事件
    function seleText(ob)
    {
        if($.trim($(ob).val()) == '请输入商品关键字') 
        {
            $(ob).val('');
        }
    }

    //搜索时候鼠标离开文本框时执行的方法
    function keySearch(ob)
    {
        if($.trim($(ob).val()) == '')
        {
            $('#showsearch').hide();
            return false;
        }else
        {
            var title = $("#keyword").val();
            $.ajax({
                url : 'search_goods.php?op=key&title='+title,
                dataType : 'json',
                success : function(data){
                    if (data.status == 1){
                        $('#showsearch').html(data.content).show();	
                    } else {
                        $('#showsearch').hide();
                    }
                }
            });
        }
    }

    //离开搜索框时候的事件
    function leaveText(ob)
    {	
        if($.trim($(ob).val()) == '') $(ob).val('请输入商品关键字');
	
    }

    //鼠标移到导航上时的事件
    $("#navigation").find("li.parentLi").hover( function() {
        $(this).children('div.childrenUl').stop(true,true).show();
    }, function() {
        $(this).children('div.childrenUl').hide();
    });

    function checkSearchForm()
    {		
        var val = $.trim($('#keyword').val());
        if ( val == '' || val == "请输入商品关键字")
        {
            $('#keyword').addClass('flashBg').animate({'opacity':.2},500,function()
            {
                $(this).animate({'opacity':1},500,function(){
					$(this).removeClass('flashBg');
					});
            });
			return false;			
        }else
        {
            $("#keywords").val(encodeURIComponent($("#keyword").val()));
            document.forms['searchForm'].submit();
        }
    }
    //懒加载
    /*$(function() {          
        $("img").lazyload({
            failure_limit : 10,
            effect : "fadeIn",
            threshold : 500  //距离目标时就加载
        });
    });*/
	/*function Lazy()
	{	
		var lazy = new ImagesLazyLoad({
			container: "LazyContainer",
			placeholder : "_blank",
			onLoad: function(img) {}
		});
	}*/