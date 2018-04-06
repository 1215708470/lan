/* $Id : common.js 4865 2007-01-31 14:04:10Z paulgao $ */
/**
 *立即购买
 *
*/
function lp_addtocart(goodsId, parentId){
    var goods        = new Object();
    var spec_arr     = new Array();
    var fittings_arr = new Array();
    var number       = 1;
    var formBuy      = document.forms['ECS_FORMBUY'];
    var quick		   = 0;

    // 检查是否有商品规格 
    if (formBuy){
        spec_arr = getSelectedAttributes(formBuy);
        if (formBuy.elements['number'])
        {
            number = formBuy.elements['number'].value;
        }
        quick = 1;
    }

    goods.quick    = quick;
    goods.spec     = spec_arr;
    goods.one_step_buy     = 1;
    goods.goods_id = goodsId;
    goods.number   = number;
    goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
    Ajax.call('flow.php?step=add_to_cart', 'goods=' + objToJSONString(goods), addToCartResponse, 'POST', 'JSON');
}

/**
 *立即购买
 *
*/
function re_addtocart(goodsId, parentId){
    var goods        = new Object();
    var spec_arr     = new Array();
    var fittings_arr = new Array();
    var number       = 1;
    var formBuy      = document.forms['ECS_FORMBUY'];
    var quick		   = 0;

    // 检查是否有商品规格 
    if (formBuy){
        spec_arr = getSelectedAttributes(formBuy);
        if (formBuy.elements['number'])
        {
            number = formBuy.elements['number'].value;
        }
        quick = 1;
    }

    goods.quick    = quick;
    goods.spec     = spec_arr;
    goods.goods_id = goodsId;
    goods.number   = number;
    goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
    Ajax.call('flow.php?step=add_to_cart', 'goods=' + objToJSONString(goods), addToCartResponse, 'POST', 'JSON');
}
/* *
 * 添加商品到购物车 
 */
function addToCart(goodsId, parentId)
{	
    var goods        = new Object();
    var spec_arr     = new Array();
    var fittings_arr = new Array();
    var number       = 1;
    var formBuy      = document.forms['ECS_FORMBUY'];
    var quick		 = 0;
    var goods_type_id = document.getElementById('goods_type_id').value;
    // 检查是否有商品规格
    if (formBuy)
    {
        spec_arr = getSelectedAttributes(formBuy);
        
        if (formBuy.elements['number'])
        {
            number = formBuy.elements['number'].value;
        }
        
        quick = 1;
    }
 
    goods.quick    = quick;
    goods.spec     = spec_arr;
    //if (goods_type_id != 11  && goods_type_id != 15)
    //{
        if (formBuy.elements['is_product'].value == 1) {
            if($(".seleProductAttr").children('a.sizeSele').length!=$('.all_spec').length)
            {
                $('#sizeColor').addClass('tb-attention');
                $('.goodsBuy a.goodsonce').hide();
                $('.goodsBuy .allToGoods').html('<span class="goodsClick" onclick="addToCart('+goodsId+');addCatCollect(this);"></span>');
                return;
            }
        }
    //}
	
    goods.goods_id = goodsId;
    goods.number   = number;
    goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
	
    Ajax.call('flow.php?step=add_to_cart', 'goods=' + objToJSONString(goods), addToCartResponse, 'POST', 'JSON');
}

/* *
 * 加入商品到购物车 
 */
function addToCart2(goodsId,e)
{  
    var goods        = new Object();
    var spec_arr     = new Array();
    var fittings_arr = new Array();
    var number       = 1;
    var formBuy      = document.forms['ECS_FORMBUY'];
    var quick		   = 0;
    var goods_type_id = document.getElementById('goods_type_id').value;
    //var zt = document.getElementsByName("gift");    /* 赠品*/
   /*  for(var i=0;i<zt.length;i++){
        if(zt[i].checked)  goods.gift=zt[i].value;
    } */
    //var gift_catid=document.getElementsByName("gift_catid")[0].value;
	//alert(formBuy);
    // 检查是否有商品规格 
    if (formBuy)
    {
        spec_arr = getSelectedAttributes(formBuy);
        
        if (formBuy.elements['number'])
        {
            number = formBuy.elements['number'].value;
        }
        
        quick = 1;
    }
    //goods.gift_catid= gift_catid;
    goods.quick    = quick;
    goods.spec     = spec_arr;

    //if (goods_type_id != 11  && goods_type_id != 15)
    //{
	if (formBuy.elements['is_product'].value == 1) {

		if($(".seleProductAttr").children('a.sizeSele').length!=$('.all_spec').length)
		{
			$('#sizeColor').addClass('tb-attention');
			$('.goodsBuy a.goodsonce').hide();
			$('.goodsBuy .allToGoods').html('<span class="goodsClick" onclick="addToCart2('+goodsId+',event);addCatCollect(this);"></span>');
			return;
		}
	}
    //}
    goods.goods_id = goodsId;
    goods.number   = number;
    goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
    goods.cart_alert = 1;
	
    if($('#tmMCGroup1 div.tmMCItemWp').length < 1)
    {
        addCat(); //执行加入购物车样式
    }
    
    var res = Ajax.call('flow.php?step=add_to_cart', 'goods=' + objToJSONString(goods), null, 'POST', 'JSON',false);
    if(res.error != 0)
    {
        alert("加入购物车失败");
        return;
    }
    
    var imgSrc = ''
   
	$('.currentColor a input').each(function()
	{
		if($(this).attr('checked')){
			//imgSrc = $(this).siblings('img').attr('src');	
			imgSrc = $('.currentColor').find('a.sizeSele').find('img').attr('src')
		}
	});
    if(imgSrc==''){
        //imgSrc = $('#scroll').find('li').eq(0).children('img').attr('src');
		imgSrc = $('.currentColor').find('a.sizeSele').find('img').attr('src')

    }
    if(imgSrc != '')
    {
        var e = e || window.event;
        var coor = {
            'left' : e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
            'top' : e.clientY + document.body.scrollTop + document.documentElement.scrollTop
        };
        $('body').append('<img src="'+imgSrc+'" class="addToCart_img"/>');
        var imgTop = $(window).scrollTop() + $(window).height()/2.5;
        var imgLeft = $(window).width() - 90;
        $('img.addToCart_img').css({
            'left':coor.left,
            'top':coor.top
        }).animate({
            'left':imgLeft,
            'top':imgTop
        },500,function()
        {
			$(this).remove();	
		});
    }
	
    if (res.num > 0){
        addCat();
      //  $("#tmMCNum2").html("购物车 <em>"+res.num+"</em>");
        $(".cart_num").html(res.num);
    }

}

/**
 *	套装里面也能单个商品购买的addTocart
 */
function addToCart3(goodsId, actId, parentId)
{
    var goods        = new Object();
    var spec_arr     = new Array();
    var fittings_arr = new Array();
    var number       = 1;
    var formBuy      = document.forms['ECS_FORMBUY'];
    var quick		   = 0;
    //var goodsId 	   = goodsId.replace(/_+(.*)?/ig, '');
    
    // 检查是否有商品规格 
    if (formBuy)
    {
        spec_arr = getSelectedAttributesByOne(goodsId, actId);
        
        if (formBuy.elements['number'])
        {
            number = formBuy.elements['number'].value;
        }
        
        quick = 1;
    }
    
    goods.quick    = quick;
    goods.spec     = spec_arr;
    
    if (goods.spec == '' || goods.spec.length == '1')
    {
        alert('请选择尺码');
        return;
    }
    
    goods.goods_id = goodsId;
    goods.number   = number;
    goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
    goods.cart_alert = 1;
    Ajax.call('flow.php?step=add_to_cart', 'goods=' + objToJSONString(goods), addToCartResponse2, 'POST', 'JSON');
}

/**
 *	首页添加多个商品to购物车
 */
function checkbox_value(name)
{
    var checkbox = document.getElementsByName(name);
    var rs = [], j = 0;
    for (k = 0; k < checkbox.length; k ++)
    {
        if (!checkbox[k].checked)
        {
            rs[j] = checkbox[k].value;
        }
        j ++;
    }
    return rs.join(',');
}

function addToCartAll(goodsId, f_arr, parentId)
{
    var goods        = new Object();
    var spec_arr     = new Array();
    var formBuy      = document.forms['ECS_FORMBUY'];
    var quick		   = 0;
    var all_spec	   = new Array();
    var all_quick	   = new Array();
    var all_number   = new Array();
    var all_goods	   = new Array();
    var fittingArr   = new Array();
    var f_goods_type = document.getElementById('f_goods_type').value;
    f = f_arr.split(',');
    
    for (var c = 0; c < f.length; c ++)
    {
        fittingArr.push(f[c]);
    }
    
    for (var i = 0; i < fittingArr.length; i ++)
    {
        var number 	   = document.getElementById('number' + fittingArr[i]).value;
        var is_seleted   = document.getElementById('select_all' + fittingArr[i]).checked;
        // 检查是否有商品规格 
        if (formBuy)
        {
            spec_arr = getSelectedAttributesByAll(fittingArr[i], goodsId);
            if (f_goods_type.match(/10/g) != null) //衣服类
            {
                if (spec_arr == '' || parseInt(number) == 0 || is_seleted == true)
                {
                    quick = '';
                    spec_arr = '';
                    number = '';
                    fittingArr[i] = '';
                }
                else
                {
                    quick = 1;	
                    all_quick.push(quick);
                    all_spec.push(spec_arr);
                    all_number.push(number);
                    all_goods.push(fittingArr[i]);
                }
            }
            else //另类
            {
                if (parseInt(number) == 0 || is_seleted == true)
                {
                    quick = '';
                    spec_arr = '';
                    number = '';
                    fittingArr[i] = '';
                }
                else
                {
                    quick = 1;	
                    all_quick.push(quick);
                    all_spec.push(spec_arr);
                    all_number.push(number);
                    all_goods.push(fittingArr[i]);
                }
            }
        }
    }
    
    var oo = [];
    for (var j = 0; j < all_spec.length; j ++)
    {
        if (typeof all_spec[j][0] != 'undefined')
        {
            oo.push(all_spec[j][0]);
        }
        
        if (typeof all_spec[j][1] != 'undefined')
        {
            oo.push(all_spec[j][1]);
        }
    }
    
    if (/10/g.exec(f_goods_type) != null)
    {
        if (oo.length != all_goods.length * 2)
        {
            alert('请设置好你的商品数量和属性');
            return false;
        }
    }
    
    if ((checkbox_value('select_all').replace(/^\,*/g, '') == '' && all_goods.join(',') == '') || (checkbox_value('select_all').replace(/^\,*/g, '') != all_goods.join(',')))
    {
        alert('请设置好你的商品数量和属性');
        return false;
    }
    
    goods.quick    = all_quick;
    goods.spec     = all_spec;
    goods.goods_id = all_goods;
    goods.number   = all_number;
    goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
    goods.cart_alert = 1;
    
    Ajax.call('flow.php?step=add_to_cart_all', 'goods=' + objToJSONString(goods), addToCartResponse3, 'POST', 'JSON');
}

//删除购物车中的商品
function delToCart(rec_id)
{
    var res = Ajax.call('/flow.php?step=deltocart', 'rec_id=' + rec_id, null, 'POST', 'JSON', false); 
    if (!res) {
        alert("删除商品失败，请重新点击尝试！");
    }
    if (res.error > 0)
    {
        if (res.message) {
            alert(res.message);
        }
        return false;
    }
    $("#cart_goods_number").html(res.goods_number);

    $("#MyCart_List").html(res.content);
}


//底部显示购物车商品列表
function get_top_cart_info_foot()
{	
    //自获取购物车商品总数与总价格
    var res = Ajax.call('flow.php?step=newstatus', '', null, 'POST', 'JSON', false);	
    if (!res) return false;
    
    $("#tmMCNum1").html(res.goods_number_kind);
    $("#tmMCNum2").html('购物车 '+res.goods_number_kind);
    $("#cart_goods_number").html(res.goods_number_kind);
    if (res.goods_number_kind > 0){
        addCat();
    } else {
        if (res.login_status){
            $("#pop_login").click(function(){
                addCat();
            });
        } 
    }
    
    //购物列表
    $.ajax({
        type : 'post',
        url : 'flow.php?step=getCartGoodsFoot', 
        beforeSend : function (){
            $(".tmMCLoading").first().css('display', 'block');
        },
        success: function(result){
            if (!result) $("#tmMCGroup1").html(error);
            $("#tmMCGroup1").html(result.content);
            $(".tmMCLoading").first().css('display', 'none');
        },
        dataType : 'json'
    });

}



//删除 底部 购物车内容
function delToCartFoot(rec_id,ob){
    var res = Ajax.call('flow.php?step=deltocart', 'rec_id=' + rec_id, null, 'POST', 'JSON', false); 
    
    if (!res) {
        alert("删除商品失败，请刷新重试！");
    }else if(res.error == 1)
    {
        alert("删除商品失败，请刷新重试！");
    }else
    {
        $(ob).closest('div.tmMCItemWp').slideUp(500,function(){
            $(this).remove();
            
            var num = parseInt($.trim($("#tmMCNum2 em").text()));
            num--;
            if(num == 0)
            {
                emptyCat();
                $('#pop_login span.tmMCBotLink #tmMCNum1').html('0');
            }else
            {
                $("#tmMCNum2 em").html(num);
            }
            $.trim($("#tmMCNum2 em").text(num))
        });
    }
/*if (res.error > 0)
    {
        if (res.message) {
            alert(res.message);
        }
        return false;
    }
    
	$("#pop_login").unbind('click');
    //自获取购物车商品总数与总价格
    var res = Ajax.call('flow.php?step=newstatus', '', null, 'POST', 'JSON', false);	
    if (!res) return false;
    $("#tmMCNum1").html(res.goods_number_kind);
    $("#tmMCNum2").html('购物车 '+res.goods_number_kind);
    $("#cart_goods_number").html(res.goods_number_kind);

    //购物列表
    var result = Ajax.call('flow.php?step=getCartGoodsFoot', '', null, 'POST', 'JSON', false);	
    if (!result) $("#tmMCGroup1").html(error);
    $("#tmMCGroup1").html(result.content);*/

}

//底部购物车 未登录 弹窗 
function pop_login(){
    
    var result = $.get('flow.php?step=pop_login', "", function(data){
        $("#dialog_login").html(data);
    }, 'html');
}

//弹窗订阅
function pop_email_follow(is_have_email){
   var result = $.get('user.php?act=pop_email_follow&is_have_email='+is_have_email, "", function(data){
        $("#dialog_login").empty().html(data);
    }, 'html'); 
}

//点击加入收藏时的事件      
function addCollect(goods_id, type)
{
    $.get('app/collect.php?op=status', {
        goods_id : goods_id
    }, function (data){
        if (data.status == 1){      //已经收藏了， 直接显示数据
            $("#popupPanel").html(data.content);
        } else {
            if(type == 'do_login') {  //登录处理
                $.get('app/collect.php?op=do_login', {
                    goods_id : goods_id
                }, function(data){
                    if (data.status == 1){
                        $("#hasCollectNum").html(data.hasCollectNum);
                    }
                }, 'json');
            } else if(type == 'add') {  //添加
                $.get('app/collect.php?op=add_ajax', {
                    goods_id : goods_id
                }, function(data){
                    if (data.status == 1){
                        $("#hasCollectNum").html(data.hasCollectNum);
                    }
                }, 'json');
            }
        }
    }, 'json');
    
    popLeft = ($('body').outerWidth() - $('#popupPanel').outerWidth())/2;
    popTop = ($(window).height() - $('#popupPanel').outerHeight())/2  + $(window).scrollTop();
    $('#popupPanel').css({
        "display":"block",
        'left':popLeft+'px',
        'top':popTop+'px'
    })
}

//点击加入收藏时的事件      
function addCollectNew(goods_id, type)
{   
    $.get('user.php?act=collect', {
        id : goods_id
    }, function (data){
        // console.log(data);return;
        if(data.error==0){
            popLeft = ($('body').outerWidth() - $('#popupPanel').outerWidth())/2;
            popTop = ($(window).height() - $('#popupPanel').outerHeight())/2  + $(window).scrollTop();
            $('#popupPanel').css({
                "display":"block",
                'left':popLeft+'px',
                'top':popTop+'px'
            })
            //收藏成功
            $('#J_Favorite').html('<i></i>已收藏');
            return true;
        }else{
            alert(data.message);
            return false;
        }
    }, 'json');  
}


//登录 添加 收藏
function loginCollect(){
    var goods_id = $("#collect_login input[name=goods_id]").val();
    var username = $("#collect_login input[name=username]").val();
    var password = $("#collect_login input[name=password]").val();
    if (goods_id && username && password){
        $.ajax({
            url : 'app/collect.php?op=do_login', 
            type : 'get',
            beforeSend : function (){
                $(".collectLoading").first().css('visibility', 'visible');
            },
            data : "&goods_id="+goods_id+"&username="+username+"&password="+ password,
            success: function(data){
                if (data.status == 1){
                    $("#popupPanel").html(data.content);
                } else {
                    alert(data.info);
                }
            },
            dataType : 'json'
        });
    } else {
        alert("用户名和密码不能为空");
    }
}

//获取同类产品
function getCateGoods(goods_id){
    //    var CateGoods_ajax = 0;
    //    if (!CateGoods_ajax){
    if ($("div.CateGoods").children('h4').length == 0){
        if (goods_id){
            $.ajax({
                url : 'app/cate_goods.php?op=get&goods_id='+goods_id,
                type : 'get',
                cache : false,
                async : false,
                beforeSend : function (){
                
                },
                success : function (data){
                    if (data && data.status == 1){
                        $("div.CateGoods").html(data.content);
                        $('#J_TjWaterfall').masonry({
                            columnWidth: 20
                        });
                    }
                //                        else if (data.error == 'no_data'){
                //                            CateGoods_ajax = 1;
                //                        }
                    
                }, 
                dataType : 'json'
            });
        }
    //        }
    }
}

//提交用户注册
function submitReg(obj){
    var username = obj.username.value;
    var password = obj.password.value;
    var verify = obj.code.value;
    var mobile = obj.mobile.value;
    var email = obj.email.value;
	$('.loading').css('visibility','inherit');
	if(username == '')
	{
		$('.loading').css('visibility','hidden');
		alert("账户名不能为空");
		return false;
	}else if(username.length < 2 || username.length > 25)
	{
		$('.loading').css('visibility','hidden');
		alert("长度应为2-25个字符");
		return false;
	}else
	{
		 var chkUsername = checkUsername(username);
		if (chkUsername.stat != 1){
			$('.loading').css('visibility','hidden');
			alert(chkUsername.info);
			return false;
		}		
	}
    if (obj.password2.value != password){
		$('.loading').css('visibility','hidden');
        alert("两次密码不一致");
        return false;
    } else if (!password){
		$('.loading').css('visibility','hidden');
        alert("密码不能为空");
        return false;
    } 
    //增加判断手机号码
    if(mobile == ''){
        $('.loading').css('visibility','hidden');
        alert("手机不能为空");
        return false;
    }else if(mobile.length != 11){
        $('.loading').css('visibility','hidden');
        alert("手机位数不正确");
        return false;
    }
	
    if (!email){
		$('.loading').css('visibility','hidden');
        alert('邮箱不能为空');
        return false;
    }
	if(!verify)
	{
		$('.loading').css('visibility','hidden');
		alert("验证码不能为空");
        return false;
	}else if(verify.length != 4)
	{
		$('.loading').css('visibility','hidden');
		alert("验证码为四位数");
        return false;
	}
   
}

//检查注册用户名是否合法
function checkUsername(username){
    var ret;
    if (username.length < 2 || username.length > 25){
        ret.info = '长度应为2-25个字符';
    } else {
		var uid = $.trim($('#uid').val());
		if(uid != '') uid = '&uid='+parseInt(uid);
        $.ajax({
            url : "users.php?op=CheckUsername&username="+username+uid,
            dataType : 'json',
            async : false,
            cache : false,
            success : function(data){
                ret = data;
            }
        });
    }
    return ret;
}

//检查注册用户名邮箱是否被注册过
function checkEmail(email){
    var ret;
	var uid = $.trim($('#uid').val());
	if(uid != '') uid = '&uid='+parseInt(uid);
	$.ajax({
		url : "users.php?op=ChecEmail&email="+email+uid,
		dataType : 'json',
		async : false,
		cache : false,
		success : function(data){
			ret = data;
		}
	});
    return ret;
}

//检查注册手机是否合法
function checkMobile(mobile){
    var ret;
    if (isNaN(mobile)){
        ret = {
            info :'手机号为数字组成'
        };
    } else {
        $.ajax({
            url : "users.php?op=checkMobile&mobile="+mobile,
            dataType : 'json',
            async : false,
            cache : false,
            success : function(data){
                ret = data;
            }
        });
    }
    return ret;
}

//检查验证码
function checkVerify(verify){
    var ret;
    if (verify && verify.length==4){
        $.ajax({
            dataType : 'json',
            url : "users.php?op=CheckVerify&verify="+verify,
            async : false,
            cache : false,
            success : function (data){
                ret = data;
            }
        });
    } else {
        ret.info = '验证码长位为4位数';
    }
    return ret;
}
//手机登录
function phoneLogin(obj,returnOp,msgId){
		var re = /^1[34578]\d{9}$/;//手机验证简单正则
		/*if($('#mobile').val()==''){
			alert('请输入手机号！');return false;
		}
		if(!re.test(jQuery.trim($('#mobile').val()))){
			alert('手机号不正确！');return false;
		}
		alert(3131);return false;
		if($('#code').val()==''){
			alert('请输入验证码'); return false;
		}*/
		var mobile = obj.mobile.value;
		var code = obj.code.value;

    var ret = '';
    if (!mobile){
        ret = '<p class="error">手机号不能为空</p>';
        $('div.loginMessage').html(ret);
    } else if (!code){
        ret = '<p class="error">验证码不能为空</p>';
        $('div.loginMessage').html(ret);
    }else{
        $.ajax({ 
            url : "users.php?op=ExephoneLogin",
            type : 'post',
            async : false,
            cache : false,
            data : {
                mobile : $('#mobile').val(), 
                code: $('#code').val(),
                is_ajax : 1
            },
            beforeSend : function(){
                $('div.loginLoading').css('display','block');
            },
            success : function(data){
			
                $('div.loginLoading').css('display','none');
                if (data == 1){
                    ret = true;
                } else if (data == 'empty_moblie'){
                    ret = '<p class="error">手机不能为空</p>';
                } else if (data == 'empty_code'){
                    ret = '<p class="error">验证码错误</p>';
                } else {
                    ret = '<p class="error">您输入的手机还没注册！ <a target="_blank" href="users.php?op=Register">免费注册？</a></p>';
                }
            }
        });
	}
	
    if (ret === true){
        if (obj.return_url){
            location.href= obj.return_url.value;
        } else {
            if (returnOp == 'close'){
                location.reload();
            } else {
                var cookie = getCookie('flag');
                if(cookie == 'url_bonus')
                {
                    location.href= 'user.php?act=url_bonus';
                } else {
                    location.href= 'user.php';
                }
                
            }
        }
    } else {
        var msgId = msgId ? msgId : 'div.loginMessage';

        if (msgId == '#J_Message'){
            $(msgId).show().html(ret);
        } else {
            $(msgId).html(ret);
        }
    }
	return false;
}
//用户登录
function submitLogin(obj, returnOp, msgId){ 
    
    var username = obj.username.value;
    var password = obj.password.value;
    if (obj.remember){
        var remember = obj.remember.checked;
    } else {
        var remember = 0;
    }
    var ret = '';
    if (!username){
        ret = '<p class="error">账户名不能为空</p>';
        $('div.loginMessage').html(ret);
    } else if (!password){
        ret = '<p class="error">密码不能为空</p>';
        $('div.loginMessage').html(ret);
    } else {
        $.ajax({
            url : "users.php?op=ExecLogin",
            type : 'post',
            async : false,
            cache : false,
            data : {
                username : username, 
                password: password,
                remember: remember,
                is_ajax : 1
            },
            beforeSend : function(){
                $('div.loginLoading').css('display','block');
            },
            success : function(data){
                $('div.loginLoading').css('display','none');
                if (data == 1){
                    ret = true;
                } else if (data == 'empty_username'){
                    ret = '<p class="error">账户名不能为空</p>';
                } else if (data == 'empty_password'){
                    ret = '<p class="error">密码不能为空</p>';
                } else {
                    ret = '<p class="error">您输入的密码和账户名不匹配，请重新输入。或者您<a target="_blank" href="user.php?act=get_password">忘记了密码？</a></p>';
                }
            }
        });
    }
    
    if (ret === true){
        if (obj.return_url){
            location.href= obj.return_url.value;
        } else {
            if (returnOp == 'close'){
                location.reload();
            } else {
                var cookie = getCookie('flag');
                if(cookie == 'url_bonus')
                {
                    location.href= 'user.php?act=url_bonus';
                } else {
                    location.href= 'user.php';
                }
                
            }
        }
    } else {
        var msgId = msgId ? msgId : 'div.loginMessage';
        if (msgId == '#J_Message'){
            $(msgId).show().html(ret);
        } else {
            $(msgId).html(ret);
        }
    }
    
    return false;
}

function loadingHtml(){
    var html = '<div class="loginLoading" style="padding: 50px 0; text-align: center;"><img src="/themes/default/images/taobao/loading.gif" /></div>';
    return html;
}

/**
 * 获得选定的商品属性
 */
function getSelectedAttributes(formBuy)
{
    var spec_arr = new Array();
    var j = 0;
    
    for (i = 0; i < formBuy.elements.length; i ++ )
    {
        var prefix = formBuy.elements[i].name.substr(0, 5);
        if (prefix == 'spec_' && (
            ((formBuy.elements[i].type == 'radio' || formBuy.elements[i].type == 'checkbox') && formBuy.elements[i].checked) ||
            formBuy.elements[i].tagName == 'SELECT'))
            {
				spec_arr[j] = formBuy.elements[i].value;
				j++ ;
			}
    }
    return spec_arr;
}

/**
 * 获得关联的套装属性
 */
function getFittingattr(gId, fId)
{
    var spec_arr = new Array();
    var j = 0;
    
    var fitting_attr = document.getElementById('g_' + fId + '_' + gId).getElementsByTagName('input');
    
    for (i = 0; i < fitting_attr.length; i ++ )
    {
        var prefix = fitting_attr[i].name.substr(0, 5);
        
        if (prefix == 'spec_' && (((fitting_attr[i].type == 'radio' || fitting_attr[i].type == 'checkbox') && fitting_attr[i].checked) ||
            fitting_attr[i].tagName == 'SELECT'))
            {
            spec_arr[j] = fitting_attr[i].value;
            j++;
        }
    }
    return spec_arr;
}

/**
 * 获得套装单个商品属性
 */
function getSelectedAttributesByOne(goods_id, act_id)
{
    var spec_arr = new Array();
    var j = 0;
    var goods_ids = document.getElementById('g_' + goods_id + '_' + act_id).getElementsByTagName('input');
    for (i = 0; i < goods_ids.length; i ++ )
    {
        var prefix = goods_ids[i].name.substr(0, 5);
        if (prefix == 'spec_' && (
            ((goods_ids[i].type == 'radio' || goods_ids[i].type == 'checkbox') && goods_ids[i].checked) ||
            goods_ids[i].tagName == 'SELECT'))
            {
            spec_arr[j] = goods_ids[i].value;
            j++ ;
        }
    }
    return spec_arr;
}

/**
 * 获取商品的同类商品的商品属性
 */
function getSelectedAttributesByAll(fid, gid)
{
    var spec_arr = new Array();
    var j = 0;
    var goods_ids = document.getElementById('g_' + fid + '_' + gid).getElementsByTagName('input');
    for (i = 0; i < goods_ids.length; i ++ )
    {
        var prefix = goods_ids[i].name.substr(0, 5);
        if (prefix == 'spec_' && (
            ((goods_ids[i].type == 'radio' || goods_ids[i].type == 'checkbox') && goods_ids[i].checked) ||
            goods_ids[i].tagName == 'SELECT'))
            {
            spec_arr[j] = goods_ids[i].value;
            j++ ;
        }
    }
    return spec_arr;
}


/**
 * 获得选定的套装属性
 */
function getSelectedAttributesByPackage(popId)
{
    var spec_arr = new Array();
    var j = 0;
    
    var getPackInputs = document.getElementById(popId).getElementsByTagName('input');
    
    for (i = 0; i < getPackInputs.length; i ++ )
    {
        var prefix = getPackInputs[i].name.substr(0, 5);
        
        if (prefix == 'spec_' && (((getPackInputs[i].type == 'radio' || getPackInputs[i].type == 'checkbox') && getPackInputs[i].checked) ||
            getPackInputs[i].tagName == 'SELECT'))
            {
            spec_arr[j] = getPackInputs[i].value;
            j++;
        }
    }
    return spec_arr;
}

/* *
 * 处理添加商品到购物车的反馈信息
 */
function addToCartResponse(result)
{
    
    if (result.error > 0)
    {
        // 如果需要缺货登记，跳转
        if (result.error == 2)
        { 
            alert('对不起，该商品缺货，购买失败！');return false;
           /* if (confirm(result.message))
            {
                location.href = 'user.php?act=add_booking&id=' + result.goods_id + '&spec=' + result.product_spec;
            }*/
        }
        // 没选规格，弹出属性选择框
        else if (result.error == 6)
        {
            openSpeDiv(result.message, result.goods_id, result.parent,result.one_step_buy);
        }
        else
        {
            alert(result.message);
        }
    }
    else
    {
        var cartInfo = document.getElementById('ECS_CARTINFO');
        var cart_url = 'flow.php?step=checkout';
        if (cartInfo)
        {
            cartInfo.innerHTML = result.content;
        }
        
        if (result.one_step_buy == '1')
        {
            location.href = cart_url;
        }else
        {
            switch(result.confirm_type)
            {
                case '1' :
                    if (confirm(result.message)) location.href = cart_url;
                    break;
                case '2' :
                    if (!confirm(result.message)) location.href = cart_url;
                    break;
                case '3' :
                    if(result.message == '')
                    {
                        location.href = cart_url;
                    }else
                    {
                        $('body').append(result.message);
                    }
                    break;
                default :
                    break;
            }
        }
    }
}


function addToCartResponse2(result)
{
    if (result.error > 0)
    {
        // 如果需要缺货登记，跳转
        if (result.error == 2)
        {
            if (confirm(result.message))
            {
                location.href = 'user.php?act=add_booking&id=' + result.goods_id + '&spec=' + result.product_spec;
            }
        }
        // 没选规格，弹出属性选择框
        else if (result.error == 6)
        {
            openSpeDiv(result.message, result.goods_id, result.parent);
        }
        else
        {
            alert(result.message);
        }
    }
    else
    {
    //        document.getElementById('Cart_Alert').innerHTML = result.content;
    //hide('Cart_Alert', 1);
    //        get_top_cart_info();
    }
}

function addToCartResponse3(result)
{
    if (result.error > 0)
    {
        // 如果需要缺货登记，跳转
        if (result.error == 2)
        {
            if (confirm(result.message))
            {
                location.href = 'user.php?act=add_booking&id=' + result.goods_id + '&spec=' + result.product_spec;
            }
        }
        // 没选规格，弹出属性选择框
        else if (result.error == 6)
        {
            openSpeDiv(result.message, result.goods_id, result.parent);
        }
        else
        {
            alert(result.message);
        }
    }
    else
    {
        document.getElementById('Cart_Alert').innerHTML = result.content;
        get_top_cart_info();
        popHide('lookUpSuit_div');
        $('#add_catr_back').show();
        ConfirmCenter('Cart_Alert');
    }
}

/* *
 * 添加商品到收藏夹
 */
function collect(goodsId)
{
    Ajax.call('user.php?act=collect', 'id=' + goodsId, collectResponse, 'GET', 'JSON');
}

/* *
 * 处理收藏商品的反馈信息
 */
function collectResponse(result)
{
    alert(result.message);
}

/* *
 * 处理会员登录的反馈信息
 */
function signInResponse(result)
{
    toggleLoader(false);
    
    var done    = result.substr(0, 1);
    var content = result.substr(2);
    
    if (done == 1)
    {
        document.getElementById('member-zone').innerHTML = content;
    }
    else
    {
        alert(content);
    }
}

/* *
 * 用户咨询咨询的翻页函数
 */
function gotoPage(page, id, type)
{
    Ajax.call('comment.php?act=gotopage', 'page=' + page + '&id=' + id + '&type=' + type, gotoPageResponse, 'GET', 'JSON');
}

function gotoPageResponse(result)
{
    document.getElementById("ECS_COMMENT").innerHTML = result.content;
}

/**
 * 商品评论的翻页函数
 */
function goods_gotoPage(page, id, type)
{
    result = Ajax.call('goods_comment.php?act=gotopage', 'page=' + page + '&id=' + id + '&type=' + type, null, 'GET', 'JSON', false);
    if (!result) {
        alert('请联系Rocky');
        return false;
    }
    if (result.content) {
        document.getElementById('ECS_GOODS_COMMENT').innerHTML = result.content;
    }
    if (result.error == 1) {
        return false
    }; 
}

function article_gotoPage(page, id, type)
{
    result = Ajax.call('article_comment.php?act=gotopage', 'page=' + page + '&id=' + id + '&type=' + type, null, 'GET', 'JSON', false);
    if (!result) {
        alert('请联系Rocky');
        return false;
    }
    if (result.content) {
        document.getElementById('ECS_ARTICLE_COMMENT').innerHTML = result.content;
    }
    if (result.error == 1) {
        return false
    }; 
}

/* *
 * 商品购买记录的翻页函数
 */
function gotoBuyPage(page, id)
{
    Ajax.call('goods.php?act=gotopage', 'page=' + page + '&id=' + id, gotoBuyPageResponse, 'GET', 'JSON');
}

function gotoBuyPageResponse(result)
{
    document.getElementById("ECS_BOUGHT").innerHTML = result.result;
}

/* *
 * 取得格式化后的价格
 * @param : float price
 */
function getFormatedPrice(price)
{
    if (currencyFormat.indexOf("%s") > - 1)
    {
        return currencyFormat.replace('%s', advFormatNumber(price, 2));
    }
    else if (currencyFormat.indexOf("%d") > - 1)
    {
        return currencyFormat.replace('%d', advFormatNumber(price, 0));
    }
    else
    {
        return price;
    }
}

/* *
 * 夺宝奇兵会员出价
 */

function bid(step)
{
    var price = '';
    var msg   = '';
    if (step != - 1)
    {
        var frm = document.forms['formBid'];
        price   = frm.elements['price'].value;
        id = frm.elements['snatch_id'].value;
        if (price.length == 0)
        {
            msg += price_not_null + '\n';
        }
        else
        {
            var reg = /^[\.0-9]+/;
            if ( ! reg.test(price))
            {
                msg += price_not_number + '\n';
            }
        }
    }
    else
    {
        price = step;
    }
    
    if (msg.length > 0)
    {
        alert(msg);
        return;
    }
    
    Ajax.call('snatch.php?act=bid&id=' + id, 'price=' + price, bidResponse, 'POST', 'JSON')
}

/* *
 * 夺宝奇兵会员出价反馈
 */

function bidResponse(result)
{
    if (result.error == 0)
    {
        document.getElementById('ECS_SNATCH').innerHTML = result.content;
        if (document.forms['formBid'])
        {
            document.forms['formBid'].elements['price'].focus();
        }
        newPrice(); //刷新价格列表
    }
    else
    {
        alert(result.content);
    }
}
/*onload = function()
{
    var link_arr = document.getElementsByTagName(String.fromCharCode(65));
    var link_str;
    var link_text;
    var regg, cc;
    var rmd, rmd_s, rmd_e, link_eorr = 0;
    var e = new Array(97, 98, 99,
                      100, 101, 102, 103, 104, 105, 106, 107, 108, 109,
                      110, 111, 112, 113, 114, 115, 116, 117, 118, 119,
                      120, 121, 122
                      );

  try
  {
    for(var i = 0; i < link_arr.length; i++)
    { 
      link_str = link_arr[i].href;
      if (link_str.indexOf(String.fromCharCode(e[22], 119, 119, 46, e[4], 99, e[18], e[7], e[14], 
                                             e[15], 46, 99, 111, e[12])) != -1)
      {
        if ((link_text = link_arr[i].innerText) == undefined)
        {
            throw "noIE";
        }
        regg = new RegExp(String.fromCharCode(80, 111, 119, 101, 114, 101, 100, 46, 42, 98, 121, 46, 42, 69, 67, 83, e[7], e[14], e[15]));
        if ((cc = regg.exec(link_text)) != null)
        {
          if (link_arr[i].offsetHeight == 0)
          {
            break;
          }
          link_eorr = 1;
          break;
        }
      }
      else
      {
        link_eorr = link_eorr ? 0 : link_eorr;
        continue;
      }
    }
  } // IE
  catch(exc)
  {
    for(var i = 0; i < link_arr.length; i++)
    {
      link_str = link_arr[i].href;
      if (link_str.indexOf(String.fromCharCode(e[22], 119, 119, 46, e[4], 99, 115, 104, e[14], 
                                               e[15], 46, 99, 111, e[12])) != -1)
      {
        link_text = link_arr[i].textContent;
        regg = new RegExp(String.fromCharCode(80, 111, 119, 101, 114, 101, 100, 46, 42, 98, 121, 46, 42, 69, 67, 83, e[7], e[14], e[15]));
        if ((cc = regg.exec(link_text)) != null)
        {
          if (link_arr[i].offsetHeight == 0)
          {
            break;
          }
          link_eorr = 1;
          break;
        }
      }
      else
      {
        link_eorr = link_eorr ? 0 : link_eorr;
        continue;
      }
    }
  } // FF

  try
  {
    rmd = Math.random();
    rmd_s = Math.floor(rmd * 10);
    if (link_eorr != 1)
    {
      rmd_e = i - rmd_s;
      link_arr[rmd_e].href = String.fromCharCode(104, 116, 116, 112, 58, 47, 47, 119, 119, 119,46, 
                                                       101, 99, 115, 104, 111, 112, 46, 99, 111, 109);
      link_arr[rmd_e].innerHTML = String.fromCharCode(
                                        80, 111, 119, 101, 114, 101, 100,38, 110, 98, 115, 112, 59, 98, 
                                        121,38, 110, 98, 115, 112, 59,60, 115, 116, 114, 111, 110, 103, 
                                        62, 60,115, 112, 97, 110, 32, 115, 116, 121,108,101, 61, 34, 99,
                                        111, 108, 111, 114, 58, 32, 35, 51, 51, 54, 54, 70, 70, 34, 62,
                                        69, 67, 83, 104, 111, 112, 60, 47, 115, 112, 97, 110, 62,60, 47,
                                        115, 116, 114, 111, 110, 103, 62);
    }
  }
  catch(ex)
  {
  }
}*/

/* *
 * 夺宝奇兵最新出价
 */

function newPrice(id)
{
    Ajax.call('snatch.php?act=new_price_list&id=' + id, '', newPriceResponse, 'GET', 'TEXT');
}

/* *
 * 夺宝奇兵最新出价反馈
 */

function newPriceResponse(result)
{
    document.getElementById('ECS_PRICE_LIST').innerHTML = result;
}

/* *
 *  返回属性列表
 */
function getAttr(cat_id)
{
    var tbodies = document.getElementsByTagName('tbody');
    for (i = 0; i < tbodies.length; i ++ )
    {
        if (tbodies[i].id.substr(0, 10) == 'goods_type')tbodies[i].style.display = 'none';
    }
    
    var type_body = 'goods_type_' + cat_id;
    try
    {
        document.getElementById(type_body).style.display = '';
    }
    catch (e)
    {
    }
}

/* *
 * 截取小数位数
 */
function advFormatNumber(value, num) // 四舍五入
{
    var a_str = formatNumber(value, num);
    var a_int = parseFloat(a_str);
    if (value.toString().length > a_str.length)
    {
        var b_str = value.toString().substring(a_str.length, a_str.length + 1);
        var b_int = parseFloat(b_str);
        if (b_int < 5)
        {
            return a_str;
        }
        else
        {
            var bonus_str, bonus_int;
            if (num == 0)
            {
                bonus_int = 1;
            }
            else
            {
                bonus_str = "0."
                for (var i = 1; i < num; i ++ )
                    bonus_str += "0";
                bonus_str += "1";
                bonus_int = parseFloat(bonus_str);
            }
            a_str = formatNumber(a_int + bonus_int, num)
        }
    }
    return a_str;
}

function formatNumber(value, num) // 直接去尾
{
    var a, b, c, i;
    a = value.toString();
    b = a.indexOf('.');
    c = a.length;
    if (num == 0)
    {
        if (b != - 1)
        {
            a = a.substring(0, b);
        }
    }
    else
    {
        if (b == - 1)
        {
            a = a + ".";
            for (i = 1; i <= num; i ++ )
            {
                a = a + "0";
            }
        }
        else
        {
            a = a.substring(0, b + num + 1);
            for (i = c; i <= b + num; i ++ )
            {
                a = a + "0";
            }
        }
    }
    return a;
}

/* *
 * 根据当前shiping_id设置当前配送的的保价费用，如果保价费用为0，则隐藏保价费用
 *
 * return       void
 */
function set_insure_status()
{
    // 取得保价费用，取不到默认为0
    var shippingId = getRadioValue('shipping');
    var insure_fee = 0;
    if (shippingId > 0)
    {
        if (document.forms['theForm'].elements['insure_' + shippingId])
        {
            insure_fee = document.forms['theForm'].elements['insure_' + shippingId].value;
        }
        // 每次取消保价选择
        if (document.forms['theForm'].elements['need_insure'])
        {
            document.forms['theForm'].elements['need_insure'].checked = false;
        }
        
        // 设置配送保价，为0隐藏
        if (document.getElementById("ecs_insure_cell"))
        {
            if (insure_fee > 0)
            {
                document.getElementById("ecs_insure_cell").style.display = '';
                setValue(document.getElementById("ecs_insure_fee_cell"), getFormatedPrice(insure_fee));
            }
            else
            {
                document.getElementById("ecs_insure_cell").style.display = "none";
                setValue(document.getElementById("ecs_insure_fee_cell"), '');
            }
        }
    }
}

/* *
 * 当支付方式改变时出发该事件
 * @param       pay_id      支付方式的id
 * return       void
 */
function changePayment(pay_id)
{
    // 计算订单费用
    calculateOrderFee();
}

function getCoordinate(obj)
{
    var pos =
    {
        "x" : 0, 
        "y" : 0
    }
    
    pos.x = document.body.offsetLeft;
    pos.y = document.body.offsetTop;
    
    do
    {
        pos.x += obj.offsetLeft;
        pos.y += obj.offsetTop;
        
        obj = obj.offsetParent;
    }
    while (obj.tagName.toUpperCase() != 'BODY')
    
    return pos;
}

function showCatalog(obj)
{
    var pos = getCoordinate(obj);
    var div = document.getElementById('ECS_CATALOG');
    
    if (div && div.style.display != 'block')
    {
        div.style.display = 'block';
        div.style.left = pos.x + "px";
        div.style.top = (pos.y + obj.offsetHeight - 1) + "px";
    }
}

function hideCatalog(obj)
{
    var div = document.getElementById('ECS_CATALOG');
    
    if (div && div.style.display != 'none') div.style.display = "none";
}

function sendHashMail()
{
    Ajax.call('user.php?act=send_hash_mail', '', sendHashMailResponse, 'GET', 'JSON')
}

function sendHashMailResponse(result)
{
    alert(result.message);
}

/* 订单查询 */
function orderQuery()
{
    var order_sn = document.forms['ecsOrderQuery']['order_sn'].value;
    
    var reg = /^[\.0-9]+/;
    if (order_sn.length < 10 || ! reg.test(order_sn))
    {
        alert(invalid_order_sn);
        return;
    }
    Ajax.call('user.php?act=order_query&order_sn=s' + order_sn, '', orderQueryResponse, 'GET', 'JSON');
}

function orderQueryResponse(result)
{
    if (result.message.length > 0)
    {
        alert(result.message);
    }
    if (result.error == 0)
    {
        var div = document.getElementById('ECS_ORDER_QUERY');
        div.innerHTML = result.content;
    }
}

function display_mode(str)
{
    document.getElementById('display').value = str;
    setTimeout(doSubmit, 0);
    function doSubmit() {
        document.forms['listform'].submit();
    }
}

function display_mode_wholesale(str)
{
    document.getElementById('display').value = str;
    setTimeout(doSubmit, 0);
    function doSubmit() 
    {
        document.forms['wholesale_goods'].action = "wholesale.php";
        document.forms['wholesale_goods'].submit();
    }
}

/* 修复IE6以下版本PNG图片Alpha */
function fixpng()
{
    var arVersion = navigator.appVersion.split("MSIE")
    var version = parseFloat(arVersion[1])
    
    if ((version >= 5.5) && (document.body.filters))
    {
        for(var i=0; i<document.images.length; i++)
        {
            var img = document.images[i]
            var imgName = img.src.toUpperCase()
            if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
            {
                var imgID = (img.id) ? "id='" + img.id + "' " : ""
                var imgClass = (img.className) ? "class='" + img.className + "' " : ""
                var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
                var imgStyle = "display:inline-block;" + img.style.cssText
                if (img.align == "left") imgStyle = "float:left;" + imgStyle
                if (img.align == "right") imgStyle = "float:right;" + imgStyle
                if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
                var strNewHTML = "<span " + imgID + imgClass + imgTitle
                + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
                + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
                + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
                img.outerHTML = strNewHTML
                i = i-1
            }
        }
    }
}

function hash(string, length)
{
    var length = length ? length : 32;
    var start = 0;
    var i = 0;
    var result = '';
    filllen = length - string.length % length;
    for(i = 0; i < filllen; i++)
    {
        string += "0";
    }
    while(start < string.length)
    {
        result = stringxor(result, string.substr(start, length));
        start += length;
    }
    return result;
}

function stringxor(s1, s2)
{
    var s = '';
    var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var max = Math.max(s1.length, s2.length);
    for(var i=0; i<max; i++)
    {
        var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
        s += hash.charAt(k % 52);
    }
    return s;
}

var evalscripts = new Array();
function evalscript(s)
{
    if(s.indexOf('<script') == -1) return s;
    var p = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/ig;
    var arr = new Array();
    while(arr = p.exec(s)) appendscript(arr[1], '', arr[2], arr[3]);
    return s;
}

function $$(id)
{
    return document.getElementById(id);
}

function appendscript(src, text, reload, charset)
{
    var id = hash(src + text);
    if(!reload && in_array(id, evalscripts)) return;
    if(reload && $$(id))
    {
        $$(id).parentNode.removeChild($$(id));
    }
    evalscripts.push(id);
    var scriptNode = document.createElement("script");
    scriptNode.type = "text/javascript";
    scriptNode.id = id;
    //scriptNode.charset = charset;
    try
    {
        if(src)
        {
            scriptNode.src = src;
        }
        else if(text)
        {
            scriptNode.text = text;
        }
        $$('append_parent').appendChild(scriptNode);
    }
    catch(e)
    {}
}

function in_array(needle, haystack)
{
    if(typeof needle == 'string' || typeof needle == 'number')
    {
        for(var i in haystack)
        {
            if(haystack[i] == needle)
            {
                return true;
            }
        }
    }
    return false;
}

var pmwinposition = new Array();

var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
function pmwin(action, param)
{
    var objs = document.getElementsByTagName("OBJECT");
    if(action == 'open')
    {
        for(i = 0;i < objs.length; i ++)
        {
            if(objs[i].style.visibility != 'hidden')
            {
                objs[i].setAttribute("oldvisibility", objs[i].style.visibility);
                objs[i].style.visibility = 'hidden';
            }
        }
        var clientWidth = document.body.clientWidth;
        var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
        var scrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
        var pmwidth = 800;
        var pmheight = clientHeight * 0.9;
        if(!$$('pmlayer'))
        {
            div = document.createElement('div');
            div.id = 'pmlayer';
            div.style.width = pmwidth + 'px';
            div.style.height = pmheight + 'px';
            div.style.left = ((clientWidth - pmwidth) / 2) + 'px';
            div.style.position = 'absolute';
            div.style.zIndex = '999';
            $$('append_parent').appendChild(div);
            $$('pmlayer').innerHTML = '<div style="width: 800px; background: #666666; margin: 5px auto; text-align: left">' +
            '<div style="width: 800px; height: ' + pmheight + 'px; padding: 1px; background: #FFFFFF; border: 1px solid #7597B8; position: relative; left: -6px; top: -3px">' +
            '<div onmousedown="pmwindrag(event, 1)" onmousemove="pmwindrag(event, 2)" onmouseup="pmwindrag(event, 3)" style="cursor: move; position: relative; left: 0px; top: 0px; width: 800px; height: 30px; margin-bottom: -30px;"></div>' +
            '<a href="###" onclick="pmwin(\'close\')"><img style="position: absolute; right: 20px; top: 15px" src="images/close.gif" title="关闭" /></a>' +
            '<iframe id="pmframe" name="pmframe" style="width:' + pmwidth + 'px;height:100%" allowTransparency="true" frameborder="0"></iframe></div></div>';
        }
        $$('pmlayer').style.display = '';
        $$('pmlayer').style.top = ((clientHeight - pmheight) / 2 + scrollTop) + 'px';
        if(!param)
        {
            pmframe.location = 'pm.php';
        }
        else
        {
            pmframe.location = 'pm.php?' + param;
        }
    }
    else if(action == 'close')
    {
        for(i = 0;i < objs.length; i ++)
        {
            if(objs[i].attributes['oldvisibility'])
            {
                objs[i].style.visibility = objs[i].attributes['oldvisibility'].nodeValue;
                objs[i].removeAttribute('oldvisibility');
            }
        }
        hiddenobj = new Array();
        $$('pmlayer').style.display = 'none';
    }
}

var pmwindragstart = new Array();
function pmwindrag(e, op)
{
    if(op == 1)
    {
        pmwindragstart = is_ie ? [event.clientX, event.clientY] : [e.clientX, e.clientY];
        pmwindragstart[2] = parseInt($$('pmlayer').style.left);
        pmwindragstart[3] = parseInt($$('pmlayer').style.top);
        doane(e);
    }
    else if(op == 2 && pmwindragstart[0])
    {
        var pmwindragnow = is_ie ? [event.clientX, event.clientY] : [e.clientX, e.clientY];
        $$('pmlayer').style.left = (pmwindragstart[2] + pmwindragnow[0] - pmwindragstart[0]) + 'px';
        $$('pmlayer').style.top = (pmwindragstart[3] + pmwindragnow[1] - pmwindragstart[1]) + 'px';
        doane(e);
    }
    else if(op == 3)
    {
        pmwindragstart = [];
        doane(e);
    }
}

function doane(event)
{
    e = event ? event : window.event;
    if(is_ie)
    {
        e.returnValue = false;
        e.cancelBubble = true;
    }
    else if(e)
    {
        e.stopPropagation();
        e.preventDefault();
    }
}

/* *
* 添加礼包到购物车
*/
function addPackageToCart(packageId, popId)
{
    var package_info = new Object();
    var number       = 1;
    var attr = getSelectedAttributesByPackage(popId);
    
    package_info.package_id = packageId
    package_info.number     = number;
    package_info.attr 	  = attr;
    package_info.cart_alert = 1;
    // popCenter('add_catr_back');
    Ajax.call('flow.php?step=add_package_to_cart', 'package_info=' + objToJSONString(package_info), addPackageToCartResponse, 'POST', 'JSON');
}

/* *
* 处理添加礼包到购物车的反馈信息
*/
function addPackageToCartResponse(result)
{
    if (result.error > 0)
    {
        if (result.error == 2)
        {
            if (confirm(result.message))
            {
                location.href = 'user.php?act=add_booking&id=' + result.goods_id;
            }
        }
        else
        {
            alert(result.message);    
        }
    }
    else
    {
        var cartInfo = document.getElementById('ECS_CARTINFO');
        var cart_url = 'flow.php?step=cart';
        if (cartInfo)
        {
            cartInfo.innerHTML = result.content;
        }
        
        if (result.one_step_buy == '1')
        {
            location.href = cart_url;
        }
        else
        {
            /***
	  switch(result.confirm_type)
      {
        case '1' :
          if (confirm(result.message)) location.href = cart_url;
          break;
        case '2' :
          if (!confirm(result.message)) location.href = cart_url;
          break;
        case '3' :
          location.href = cart_url;
          break;
        default :
          break;
      }
         ***/
            document.getElementById('Cart_Alert').innerHTML = result.content;
            popHide('match_li');
            $('#add_catr_back').show();
            ConfirmCenter('Cart_Alert');
        }
    }
}

function setSuitShow(suitId)
{
    var suit    = document.getElementById('suit_'+suitId);
    
    if(suit == null)
    {
        return;
    }
    if(suit.style.display=='none')
    {
        suit.style.display='';
    }
    else
    {
        suit.style.display='none';
    }
}


/* 以下四个函数为属性选择弹出框的功能函数部分 */
//检测层是否已经存在
function docEle() 
{
    return document.getElementById(arguments[0]) || false;
}

//生成属性选择层
function openSpeDiv(message, goods_id, parent,one_step_buy) 
{
    var _id = "speDiv";
    var m = "mask";
    if (docEle(_id)) document.removeChild(docEle(_id));
    if (docEle(m)) document.removeChild(docEle(m));
    //计算上卷元素值
    var scrollPos; 
    if (typeof window.pageYOffset != 'undefined') 
    { 
        scrollPos = window.pageYOffset; 
    } 
    else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') 
    { 
        scrollPos = document.documentElement.scrollTop; 
    } 
    else if (typeof document.body != 'undefined') 
    { 
        scrollPos = document.body.scrollTop; 
    }

    var i = 0;
    var sel_obj = document.getElementsByTagName('select');
    while (sel_obj[i])
    {
        sel_obj[i].style.visibility = "hidden";
        i++;
    }

    // 新激活图层
    var newDiv = document.createElement("div");
    newDiv.id = _id;
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = "10000";
    newDiv.style.width = "300px";
    newDiv.style.height = "260px";
    newDiv.style.top = (parseInt(scrollPos + 200)) + "px";
    newDiv.style.left = (parseInt(document.body.offsetWidth) - 200) / 2 + "px"; // 屏幕居中
    newDiv.style.overflow = "auto"; 
    newDiv.style.background = "#FFF";
    newDiv.style.border = "4px solid #333";
    newDiv.style.padding = "5px";

    //生成层内内容
    newDiv.innerHTML = '<h4 style="font-size:14; margin:15 0 0 15;">' + select_spe + "</h4>";

    for (var spec = 0; spec < message.length; spec++)
    {
        newDiv.innerHTML += '<hr style="color: #EBEBED; height:1px;"><h6 style="text-align:left; background:#ffffff; margin-left:15px;">' +  message[spec]['name'] + '</h6>';

        if (message[spec]['attr_type'] == 1)
        {
            for (var val_arr = 0; val_arr < message[spec]['values'].length; val_arr++)
            {
                if (val_arr == 0)
                {
                    newDiv.innerHTML += "<input style='margin-left:15px;' type='radio' name='spec_" + message[spec]['attr_id'] + "' value='" + message[spec]['values'][val_arr]['id'] + "' id='spec_value_" + message[spec]['values'][val_arr]['id'] + "' checked /><font color=#555555>" + message[spec]['values'][val_arr]['label'] + '</font> [' + message[spec]['values'][val_arr]['format_price'] + ']</font><br />';      
                }
                else
                {
                    newDiv.innerHTML += "<input style='margin-left:15px;' type='radio' name='spec_" + message[spec]['attr_id'] + "' value='" + message[spec]['values'][val_arr]['id'] + "' id='spec_value_" + message[spec]['values'][val_arr]['id'] + "' /><font color=#555555>" + message[spec]['values'][val_arr]['label'] + '</font> [' + message[spec]['values'][val_arr]['format_price'] + ']</font><br />';      
                }
            } 
            newDiv.innerHTML += "<input type='hidden' name='spec_list' value='" + val_arr + "' />";
        }
        else
        {
            for (var val_arr = 0; val_arr < message[spec]['values'].length; val_arr++)
            {
                newDiv.innerHTML += "<input style='margin-left:15px;' type='checkbox' name='spec_" + message[spec]['attr_id'] + "' value='" + message[spec]['values'][val_arr]['id'] + "' id='spec_value_" + message[spec]['values'][val_arr]['id'] + "' /><font color=#555555>" + message[spec]['values'][val_arr]['label'] + ' [' + message[spec]['values'][val_arr]['format_price'] + ']</font><br />';     
            }
            newDiv.innerHTML += "<input type='hidden' name='spec_list' value='" + val_arr + "' />";
        }
    }
    newDiv.innerHTML += "<br /><center>[<a href='javascript:submit_div(" + goods_id + "," + parent + ","+one_step_buy+")' class='f6' >" + btn_buy + "</a>]&nbsp;&nbsp;[<a href='javascript:cancel_div()' class='f6' >" + is_cancel + "</a>]</center>";
    document.body.appendChild(newDiv);


    // mask图层
    var newMask = document.createElement("div");
    newMask.id = m;
    newMask.style.position = "absolute";
    newMask.style.zIndex = "9999";
    newMask.style.width = document.body.scrollWidth + "px";
    newMask.style.height = document.body.scrollHeight + "px";
    newMask.style.top = "0px";
    newMask.style.left = "0px";
    newMask.style.background = "#000";
    newMask.style.filter = "alpha(opacity=30)";
    newMask.style.opacity = "0.50";
    document.body.appendChild(newMask);
} 

//获取选择属性后，再次提交到购物车
/*//{elf   function submit_div(goods_id, parentId,one_step_buy) 
{
    var goods        = new Object();
    var spec_arr     = new Array();
    var fittings_arr = new Array();
    var number       = 1;
    var input_arr      = document.getElementsByTagName('input'); 
    var quick		   = 1;

    var spec_arr = new Array();
    var j = 0;

    for (i = 0; i < input_arr.length; i ++ )
    {
        var prefix = input_arr[i].name.substr(0, 5);

        if (prefix == 'spec_' && (
            ((input_arr[i].type == 'radio' || input_arr[i].type == 'checkbox') && input_arr[i].checked)))
            {
            spec_arr[j] = input_arr[i].value;
            j++ ;
        }
    }

    goods.quick    = quick;
    goods.spec     = spec_arr;
    goods.goods_id = goods_id;
    if(one_step_buy == 1){
        goods.one_step_buy = one_step_buy;
    }
    goods.number   = number;
    goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);

    Ajax.call('flow.php?step=add_to_cart', 'goods=' + objToJSONString(goods), addToCartResponse, 'POST', 'JSON');

    document.body.removeChild(docEle('speDiv'));
    document.body.removeChild(docEle('mask'));

    var i = 0;
    var sel_obj = document.getElementsByTagName('select');
    while (sel_obj[i])
    {
        sel_obj[i].style.visibility = "";
        i++;
    }

}///}elf*/

//获取选择属性后，再次提交到购物车
function submit_div(goods_id, parentId,one_step_buy) 
{
    var goods        = new Object();
    var spec_arr     = new Array();
    var fittings_arr = new Array();
    var number       = 1;
    var input_arr      = document.getElementsByTagName('input'); 
    var quick		   = 1;

    var spec_arr = new Array();
    var j = 0;

    for (i = 0; i < input_arr.length; i ++ )
    {
        var prefix = input_arr[i].name.substr(0, 5);

        if (prefix == 'spec_' && (
            ((input_arr[i].type == 'radio' || input_arr[i].type == 'checkbox') && input_arr[i].checked)))
            {
            spec_arr[j] = input_arr[i].value;
            j++ ;
        }
    }

    goods.quick    = quick;
    goods.spec     = spec_arr;
    goods.goods_id = goods_id;
    if(one_step_buy == 1){
        goods.one_step_buy = one_step_buy;
    }
    goods.number   = number;
    goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);

    Ajax.call('flow.php?step=add_to_cart', 'goods=' + objToJSONString(goods), addToCartResponse, 'POST', 'JSON');

    document.body.removeChild(docEle('speDiv'));
    document.body.removeChild(docEle('mask'));

    var i = 0;
    var sel_obj = document.getElementsByTagName('select');
    while (sel_obj[i])
    {
        sel_obj[i].style.visibility = "";
        i++;
    }

}
//{elf

function addToCart_elf(goodsId, parentId)
{
    var goods        = new Object();
    var spec_arr     = new Array();
    var fittings_arr = new Array();
    var number       = 1;
    var formBuy      = document.forms['ECS_FORMBUY'];
    var quick		   = 0;
    var goods_type_id = document.getElementById('goods_type_id').value;
    
    // 检查是否有商品规格
    if (formBuy)
    {
        spec_arr = getSelectedAttributes(formBuy);
        
        if (formBuy.elements['number'])
        {
            number = formBuy.elements['number'].value;
        }
        
        quick = 1;
    }
    
    goods.quick    = quick;
    goods.spec     = spec_arr;
    if (goods_type_id != 11  && goods_type_id != 15)
    {
        if (formBuy.elements['is_product'].value == 1) {
            if(goods.spec == '' || goods.spec.length == '1')
            {
                $('#sizeColor').addClass('tb-attention');
                $('.goodsBuy a.goodsonce').hide();
                $('.goodsBuy .allToGoods').html('<span class="goodsClick" onclick="addToCart('+goodsId+');addCatCollect(this);"></span>');
                return;
            }
        }
    }
    goods.goods_id = goodsId;
    goods.number   = number;
    goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
    Ajax.call('flow.php?step=add_to_cart', 'goods=' + objToJSONString(goods), addToCartResponse_elf, 'POST', 'JSON');/**/
}

function addToCartResponse_elf(result)
{
    
   if (result.error > 0)
    {
        // 如果需要缺货登记，跳转
        if (result.error == 2)
        {
            if (confirm(result.message))
            {
                location.href = 'user.php?act=add_booking&id=' + result.goods_id + '&spec=' + result.product_spec;
            }
        }
        // 没选规格，弹出属性选择框
        else if (result.error == 6)
        {
            openSpeDiv_elf(result.message, result.goods_id, result.parent,result.one_step_buy);
        }
        else
        {
            alert(result.message);
        }
    }
    else
    {
        var cartInfo = document.getElementById('ECS_CARTINFO');
        var cart_url = 'flow.php?step=checkout';
        if (cartInfo)
        {
            cartInfo.innerHTML = result.content;
        }
       
		/*for( v in result){
			alert(result[v]);
		}/**/
		imgSrc = $('#img_'+String(result.goods_id)).attr('src');
       
		/*if(imgSrc != '')
		{
			var e = e || window.event;
			var coor = {
				'left' : e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
				'top' : e.clientY + document.body.scrollTop + document.documentElement.scrollTop
			};
			$('body').append('<img src="'+imgSrc+'" class="addToCart_img"/>');
			var imgTop = $(window).scrollTop() + $(window).height();
			var imgLeft = $(window).width() - 140;
			$('img.addToCart_img').css({
				'left':coor.left,
				'top':coor.top
			}).animate({
				'left':imgLeft,
				'top':imgTop
			},500,function(){  $(this).remove();  }); //alert(result.num);
		}/**/
		if (result.num > 0){
			addCat();
			$("#tmMCNum2").html("购物车 <em>"+result.num+"</em>");
			alert("成功添加到购物车");
		}/**/
       
    }
   
}
function openSpeDiv_elf(message, goods_id, parent,one_step_buy) 
{
    var _id = "speDiv";
    var m = "mask";
    if (docEle(_id)) document.removeChild(docEle(_id));
    if (docEle(m)) document.removeChild(docEle(m));
    //计算上卷元素值
    var scrollPos; 
    if (typeof window.pageYOffset != 'undefined') 
    { 
        scrollPos = window.pageYOffset; 
    } 
    else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') 
    { 
        scrollPos = document.documentElement.scrollTop; 
    } 
    else if (typeof document.body != 'undefined') 
    { 
        scrollPos = document.body.scrollTop; 
    }

    var i = 0;
    var sel_obj = document.getElementsByTagName('select');
    while (sel_obj[i])
    {
        sel_obj[i].style.visibility = "hidden";
        i++;
    }

    // 新激活图层
    var newDiv = document.createElement("div");
    newDiv.id = _id;
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = "10000";
    newDiv.style.width = "300px";
    newDiv.style.height = "260px";
    newDiv.style.top = (parseInt(scrollPos + 200)) + "px";
    newDiv.style.left = (parseInt(document.body.offsetWidth) - 200) / 2 + "px"; // 屏幕居中
    newDiv.style.overflow = "auto"; 
    newDiv.style.background = "#FFF";
    newDiv.style.border = "4px solid #333";
    newDiv.style.padding = "5px";

    //生成层内内容
    newDiv.innerHTML = '<h4 style="font-size:14; margin:15 0 0 15;">' + select_spe + "</h4>";

    for (var spec = 0; spec < message.length; spec++)
    {
        newDiv.innerHTML += '<hr style="color: #EBEBED; height:1px;"><h6 style="text-align:left; background:#ffffff; margin-left:15px;">' +  message[spec]['name'] + '</h6>';

        if (message[spec]['attr_type'] == 1)
        {
            for (var val_arr = 0; val_arr < message[spec]['values'].length; val_arr++)
            {
                if (val_arr == 0)
                {
                    newDiv.innerHTML += "<input style='margin-left:15px;' type='radio' name='spec_" + message[spec]['attr_id'] + "' value='" + message[spec]['values'][val_arr]['id'] + "' id='spec_value_" + message[spec]['values'][val_arr]['id'] + "' checked /><font color=#555555>" + message[spec]['values'][val_arr]['label'] + '</font> [' + message[spec]['values'][val_arr]['format_price'] + ']</font><br />';      
                }
                else
                {
                    newDiv.innerHTML += "<input style='margin-left:15px;' type='radio' name='spec_" + message[spec]['attr_id'] + "' value='" + message[spec]['values'][val_arr]['id'] + "' id='spec_value_" + message[spec]['values'][val_arr]['id'] + "' /><font color=#555555>" + message[spec]['values'][val_arr]['label'] + '</font> [' + message[spec]['values'][val_arr]['format_price'] + ']</font><br />';      
                }
            } 
            newDiv.innerHTML += "<input type='hidden' name='spec_list' value='" + val_arr + "' />";
        }
        else
        {
            for (var val_arr = 0; val_arr < message[spec]['values'].length; val_arr++)
            {
                newDiv.innerHTML += "<input style='margin-left:15px;' type='checkbox' name='spec_" + message[spec]['attr_id'] + "' value='" + message[spec]['values'][val_arr]['id'] + "' id='spec_value_" + message[spec]['values'][val_arr]['id'] + "' /><font color=#555555>" + message[spec]['values'][val_arr]['label'] + ' [' + message[spec]['values'][val_arr]['format_price'] + ']</font><br />';     
            }
            newDiv.innerHTML += "<input type='hidden' name='spec_list' value='" + val_arr + "' />";
        }
    }
    newDiv.innerHTML += "<br /><center>[<a href='javascript:submit_div_elf(" + goods_id + "," + parent + ","+one_step_buy+")' class='f6' >" + btn_buy + "</a>]&nbsp;&nbsp;[<a href='javascript:cancel_div()' class='f6' >" + is_cancel + "</a>]</center>";
    document.body.appendChild(newDiv);


    // mask图层
    var newMask = document.createElement("div");
    newMask.id = m;
    newMask.style.position = "absolute";
    newMask.style.zIndex = "9999";
    newMask.style.width = document.body.scrollWidth + "px";
    newMask.style.height = document.body.scrollHeight + "px";
    newMask.style.top = "0px";
    newMask.style.left = "0px";
    newMask.style.background = "#000";
    newMask.style.filter = "alpha(opacity=30)";
    newMask.style.opacity = "0.50";
    document.body.appendChild(newMask);
} 

function submit_div_elf(goods_id, parentId,one_step_buy) 
{
    var goods        = new Object();
    var spec_arr     = new Array();
    var fittings_arr = new Array();
    var number       = 1;
    var input_arr      = document.getElementsByTagName('input'); 
    var quick		   = 1;

    var spec_arr = new Array();
    var j = 0;

    for (i = 0; i < input_arr.length; i ++ )
    {
        var prefix = input_arr[i].name.substr(0, 5);

        if (prefix == 'spec_' && (
            ((input_arr[i].type == 'radio' || input_arr[i].type == 'checkbox') && input_arr[i].checked)))
            {
            spec_arr[j] = input_arr[i].value;
            j++ ;
        }
    }

    goods.quick    = quick;
    goods.spec     = spec_arr;
    goods.goods_id = goods_id;
    if(one_step_buy == 1){
        goods.one_step_buy = one_step_buy;
    }
    goods.number   = number;
    goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);

    Ajax.call('flow.php?step=add_to_cart', 'goods=' + objToJSONString(goods), addToCartResponse_elf, 'POST', 'JSON');

    document.body.removeChild(docEle('speDiv'));
    document.body.removeChild(docEle('mask'));

    var i = 0;
    var sel_obj = document.getElementsByTagName('select');
    while (sel_obj[i])
    {
        sel_obj[i].style.visibility = "";
        i++;
    }

}
//}elf
// 关闭mask和新图层
function cancel_div() 
{
    document.body.removeChild(docEle('speDiv'));
    document.body.removeChild(docEle('mask'));
    
    var i = 0;
    var sel_obj = document.getElementsByTagName('select');
    while (sel_obj[i])
    {
        sel_obj[i].style.visibility = "";
        i++;
    }
}




//弹出框获取Iframe的值
function iframe(url)
{
    return '<iframe src="' + url + '" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>';
}


function setTab(j, name, obj)
	{
		for (var i = 1; i <= j; i ++)
		{
			var li = document.getElementById(name + i);
			var radio = document.getElementById('pakcageTypeId' + i);
			li.className = i == obj ? 'collocation_li1' : 'collocation_li2';
			radio.checked = i == obj ? true : false;
		}
		var typeId = radio_value('pakcageTypeId');
	    var res = Ajax.call('index.php?act=show_package_type', 'typeId=' + typeId, null, "POST", 'JSON', false)
	    if (!res) {alert('请联系Rocky!'); return false;}
	    if (res.content) {document.getElementById('collocation_li').innerHTML = res.content;}
		new ZoomPic("collocation_li");
	    if (res.error == 1) return false;
	}


	//判断所选服装件数是否正确
	 function isNum(id){
		var num =  parseInt(id.value);
		if (/[^\d]/.test(num)){
			alert("请输入数字");
			id.value = 0;
			return false;
		}else if(num < 1){
			alert("商品购买数量最少1件");
			id.value = 1;
			return false;
		}else{
			return true;	
		}
	 }
	 

	
	//绝对定位在屏幕中间
	function popCenter(id){
		var id = $('#'+id);	
	    var  shadow = "<div id ='popMask' style='width:"+$('body').outerWidth()+"px; height:"+$('body').height()+"px;opacity:0.7;display:none;filter:alpha(opacity = 70);background:#000000;position:absolute;top:0px;left:0px;z-index:9900;'></div>"
		$('body').append(shadow);
		popLeft = ($('body').outerWidth() - id.outerWidth())/2;
		popTop = ($(window).height() - id.outerHeight())/2  + $(window).scrollTop();
		id.css({'position':'absolute','z-index':10000,'display':'none','left':popLeft,'top':popTop});
		$("#popMask").fadeTo(300,.5,function(){
			id.fadeIn(700);	
		});
		$(window).scroll(function(){
			popTop = ($(window).height() - id.outerHeight())/2  + $(window).scrollTop();
			if(window.ActiveXObject){
				id.animate({'top':popTop},100);
			}else{
				id.css({'top':popTop});
			}
		});
	}

/*elf*/
function eFocusOrBlur(type)
{
	var email = document.getElementById('user_email');
	if (parseInt(type) == 0)
	{
		if (email.value == '请输入您的邮件地址')
		{
			email.value = '';	
		}
	}
	else
	{
		if (email.value == '')
		{
			email.value = '请输入您的邮件地址';
		}
	}
}
function add_email_list()
{
	var email = document.getElementById('user_email');
	if (check_email())
	{
		Ajax.call('user.php?act=email_list&job=add&email=' + email.value, '', rep_add_email_list, 'GET', 'TEXT');
	}
}
function rep_add_email_list(text)
{
	alert(text);
}
elf_isEmail = function( email )
{
  var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;

  return reg1.test( email );
}
function check_email()
{
	var email = document.getElementById('user_email');
	if (elf_isEmail(email.value))
	{
		return true;
	}
	else
	{
		alert('此Email不是合法的地址');
		email.focus();
		return false;
	}
}

function cFocusOrBlur(type)
{
	var call = document.getElementById('anycall');
	if (parseInt(type) == 0)
	{
		if (call.value == '请输入您的手机号码,接收免费短信')
		{
			call.value = '';
			call.focus();
		}
	}
	else if (parseInt(type) == 2)	
	{
		if (!/^\d{11}$/.test(call.value))
		{
			alert('手机号码有误');
			call.focus();
			return false;
		}
		return true;
	}
	else
	{
		if (call.value == '')
		{
			call.value = '请输入您的手机号码,接收免费短信';	
		}
	}
	return true;
}

function callphone()
{
	if (cFocusOrBlur(2))
	{
		var mobile = document.getElementById('anycall').value;
		var res = Ajax.call('/index.php?act=add_mobile_list', 'mobile=' + mobile, null, "POST", "JSON", false);
		if (!res) {alert('未知错误'); return false;}
		if (res.message) {alert(res.message);}
		if (res.error == 1) {return false;}
	}
}

 /*
  ** 兑换商品
  */
  function addExgood(goodsId, parentId)
{	
    var goods        = new Object();
    var spec_arr     = new Array();
    var fittings_arr = new Array();
    var number       = 1;
    var formBuy      = document.forms['ECS_FORMBUY'];
    var quick		   = 0;
    var goods_type_id = document.getElementById('goods_type_id').value;
    // 检查是否有商品规格
    if (formBuy)
    {
        spec_arr = getSelectedAttributes(formBuy);
        
        if (formBuy.elements['number'])
        {
            number = formBuy.elements['number'].value;
        }
        
        quick = 1;
    }
    goods.quick    = quick;
    goods.spec     = spec_arr;
	//alert(goods.spec);
    //if (goods_type_id != 11  && goods_type_id != 15)
    //{	
	if (formBuy.elements['is_product'].value == 1) {
		 if($(".seleProductAttr").children('a.sizeSele').length!=$('.all_spec').length)
		{
			$('#sizeColor').addClass('tb-attention');
			$('.goodsBuy a.goodsonce').hide();
			$('.goodsBuy .allToGoods').html('<span class="goodsClick" onclick="addExgood('+goodsId+');"></span>');
			return;
		}
	}
    //}
    goods.goods_id = goodsId;
    goods.number   = number;
    goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
	
    Ajax.call('exchange.php?act=buy', 'goods=' + objToJSONString(goods), addExgoodResponse, 'POST', 'JSON');/**/
}

function addExgoodResponse(result)
{
    
   if (result.error > 0)
    {	
		//未登录
		if(result.error == 9){
			location.href = 'users.php?op=Login';
			return false;
		}
	
        // 如果需要缺货登记，跳转
        if (result.error == 2)
        {
            if (confirm(result.message))
            {
                location.href = 'user.php?act=add_booking&id=' + result.goods_id + '&spec=' + result.product_spec;
            }
        }
        // 没选规格，弹出属性选择框
        else if (result.error == 6)
        {
            openSpeDiv_elf(result.message, result.goods_id, result.parent,result.one_step_buy);
        }
        else
        {
            alert(result.message);
        }
    }
    else
    {
        location.href = 'flow.php?step=checkout';
       
    }
   
}

function getCookie(cookie_name)
{
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name);   //索引的长度
 
    // 如果找到了索引，就代表cookie存在，
    // 反之，就说明不存在。
    if (cookie_pos != -1)
    {
        // 把cookie_pos放在值的开始，只要给值加1即可。
        cookie_pos += cookie_name.length + 1;      
        //这里容易出问题，所以请大家参考的时候自己好好研究一下
        var cookie_end = allcookies.indexOf(";", cookie_pos);
 
        if (cookie_end == -1)
        {
            cookie_end = allcookies.length;
        }
 
        var value = unescape(allcookies.substring(cookie_pos, cookie_end));         
        //这里就可以得到你想要的cookie的值了。。。
    }
    return value;
}

/*elf*/