																	 $(".quick_links_panel li").mouseenter(function(){
		$(this).children(".mp_tooltip").animate({left:-92,queue:true});
		$(this).children(".mp_tooltip").css("visibility","visible");
		$(this).children(".ibar_login_box").css("display","block");
	});
	$(".quick_links_panel li").mouseleave(function(){
		$(this).children(".mp_tooltip").css("visibility","hidden");
		$(this).children(".mp_tooltip").animate({left:-121,queue:true});
		$(this).children(".ibar_login_box").css("display","none");
	});
	$(".quick_toggle li").mouseover(function(){
		$(this).children(".mp_qrcode").show();
	});
	$(".quick_toggle li").mouseleave(function(){
		$(this).children(".mp_qrcode").hide();
	});

// 元素以及其他一些变量
var eleFlyElement = document.querySelector("#flyItem"), eleShopCart = document.querySelector("#shopCart");
var numberItem = 0;
// 抛物线运动
var myParabola = funParabola(eleFlyElement, eleShopCart, {
	speed: 400, //抛物线速度
	curvature: 0.0008, //控制抛物线弧度
	complete: function() {
		eleFlyElement.style.visibility = "hidden";
		eleShopCart.querySelector("span").innerHTML = ++numberItem;
	}
});
// 绑定点击事件
if (eleFlyElement && eleShopCart) {
	
	[].slice.call(document.getElementsByClassName("btnCart")).forEach(function(button) {
		button.addEventListener("click", function(event) {
			// 滚动大小
			var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
			    scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
			eleFlyElement.style.left = event.clientX + scrollLeft + "px";
			eleFlyElement.style.top = event.clientY + scrollTop + "px";
			eleFlyElement.style.visibility = "visible";
			
			// 需要重定位
			myParabola.position().move();			
		});
	});
}

//新增一个调用小能前判断是否登录的函数
var _login_status = '';
function SERVER_NTKF(){
  if(_login_status){
    NTKF.im_openInPageChat('kf_9549_1491462167868');
    return true;
  }else{
    pop_login();
    return false;
  }
}

/***********订阅邮箱****************/
function add_email_list()
{
    //先判断是否有登录
    if(_login_status){
      var _email = '';
        //判断邮箱是否为空
        if(!_email){
          pop_email_follow(0);
          return false;
        }
      if (check_email(_email))
      {
        pop_email_follow(1);
      }
    }else{
        pop_login();
        return false;
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
function check_email(email)
{
  // var email = document.getElementById('user_email');
  if (elf_isEmail(email))
  {
    return true;
  }
  else
  {
    alert('此Email不是合法的地址');
    // email.focus();
    return false;
  }
}
/***********订阅邮箱****************/
</script>




  <script language="javascript" type="text/javascript">
  NTKF_PARAM = {
    siteid:"kf_9549",               //企业ID，为固定值，必填
    settingid:"kf_9549_1491462167868",  //接待组ID，为固定值，必填
    uid:"",                    //用户ID，未登录可以为空，但不能给null，uid赋予的值显示到小能客户端上
    uname:"",        //用户名，未登录可以为空，但不能给null，uname赋予的值显示到小能客户端上
    isvip:"0",                          //是否为vip用户，0代表非会员，1代表会员，取值显示到小能客户端上
    userlevel:"0",                    //网站自定义会员级别，0-N，可根据选择判断，取值显示到小能客户端上
    itemid:"",                      //(必填)商品ID
    itemparam:"girdear",                //对接平台的参数,girdear代表官网，girdearshop代表微商城,girdearmall代表二折微商城
    orderid:"",              //订单ID
    orderprice:"",//订单总价
    erpparam:"gd"                      //erpparam为erp功能的扩展字段，可选，购买erp功能后用于erp功能集成
    }
    var orderid = NTKF_PARAM.orderid;
    var orderprice = NTKF_PARAM.orderprice;
    if(orderid && !orderprice){
        $.ajax({
            url:'user.php?act=checkorder_ajax',
            type:'post',
            data:{'orderid':orderid,'orderprice':orderprice},
            success:function(data){
            
            }
        })
    }