$(() => {
	$(".login_btn").click(() => {
var phone=$("#txtName").val();
		var upwd=$("#txtPwd").val();
		var reg= /^(\+86|0086)?\s*1[34578]\d{9}$/;
		if(phone==null||phone==""){
            $(".error").html("请输入您的手机号码");
            $(".error").css("opacity","1")
		}else if(!reg.test(phone)){
			$(".error").html("请您输入正确的手机号码");
            $(".error").css("opacity","1")
		}else if(upwd == "") {
            $(".error").html("请输入您的密码");
            $(".error").css("opacity", "1");
        }else{
                $(".error").css("opacity","0");
			$.post("data/users/login.php?phone="+phone+"&upwd="+upwd)
		//$.post(
			//"data/users/login.php",
			//$("#login").serialize()
		.then(data=>{
			console.log(data)
			if(data.ok==1){
				//alert("登录成功!");
				location="index.html";
				console.log(data);
				//
			}else{//location=document.referrer;
				//alert("登录失败!");//+data.msg
                $(".error").css("opacity", "1");
               $(".error").html("您输入的密码和账户名不匹配，请重新输入");
				}
		})
        }
	})

});

