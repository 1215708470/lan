function myId(id){
  return document.getElementById(id);
}
function createXhr(){
		    var xhr=null;
			if(window.XMLHttpRequest){
			 xhr=new XMLHttpRequest(); //标准创建
			}else{
				//IE8以下的创建方式
			 xhr=new ActiveXObject("Microsoft.XMLHttp");
			}
			return xhr;
		 }
 var isUname=true; //允许注册
 var isName=true;
	    //检查用户名是否存在
	      function check_uname(){
		     //1.创建xhr对象
			 var xhr=createXhr();
			 //2.创建请求
			 var uname=myId("uname").value;
	       var url="data/register/02-check-uname.php?uname="+uname;
			 xhr.open("get",url,true);
			 //3.设置回调函数
			xhr.onreadystatechange=function(){
			   if(xhr.readyState==4&&xhr.status==200){
			      var res=xhr.responseText;
				  if(res=="1")
				   {
				   myId("uname-show").innerHTML="用户名已存在";
				     isUname=false; //不让注册
				   }else if(uname==""){
				   	myId("uname-show").innerHTML="用户名不能为空";
				   	isName=false; //不让注册
				   }else if(uname.length<6||uname.length>18){
				   		myId("uname-show").innerHTML="用户名格式不对";
				   			isName=false; //不让注册
				   }else{
				      myId("uname-show").innerHTML="通过"; 
					  isUname=true; 
					  isName=true;
				   }
			   }
			}
			xhr.send(null);
		  }
	      //用户名获取焦点
	       function uname_focus(){
		       myId("uname-show").innerHTML="用户名6-18位";
		   }
	     var isUpwd=true;//允许注册
	       //密码获取焦点
			function upwd_focus(){
			myId("upwd-show").innerHTML="密码6-18位";
			}
		 //密码失去焦点
		 function upwd_blur(){
			var upwd=myId("upwd").value;
			if(upwd==""){
				myId("upwd-show").innerHTML="密码不能为空";
				isUpwd=false;//不让注册
			}else if(upwd.length<6 || upwd.length>18){

				myId("upwd-show").innerHTML="密码格式不对！";
				isUpwd=false;//不让注册
			}else{		
				myId("upwd-show").innerHTML="通过！";
				isUpwd=true;//允许注册
			}
			}
		 var isCpwd=true;//允许注册
		//重复密码失去焦点时,判断两次密码是否一致
		function cpwd_blur(){
		if((myId("upwd").value==myId("cpwd").value)&&(myId("upwd").value!="")){
			      myId("cpwd-show").innerHTML="通过！";
			      isCpwd=true;//允许注册
			   }else{
			      myId("cpwd-show").innerHTML="两次密码不一致！";
			      isCpwd=false;//不允许注册
			   }
		}    
		 //注册按钮
		 function user_register(){
		    
			   //1.创建xhr对象
			     var xhr=createXhr();
			   //2.创建请求
			     xhr.open("post","data/register/02-register.php",true);
			   //3.设置回调
			     xhr.onreadystatechange=function(){
				    if(xhr.readyState==4&&xhr.status==200){
					    alert(xhr.responseText);
					}
				 }
				//增加:更改请求头
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			   //4.发送请求
			   var uname=myId("uname").value;
			   var upwd=myId("upwd").value;
			   //var email=myId("email").value;
			   var phone=myId("phone").value;
			  //var user_name=myId("user_name").value;
			   var gender=myId("gender").value
			 var msg="uname="+uname+"&upwd="+upwd+"&phone="+phone+"&gender="+gender; 
			 if(!isUname){
			   alert("该用户不能注册,请修改后再注册");
			}else if(!isName){
				alert("用户名格式不正确,请修改后再注册");
			}else if(!isUpwd){
				alert("密码格式不正确,请修改后再注册");
			}else if(!isCpwd){
				alert("两次密码不一致,请修改后再注册")
			}else{
			  xhr.send(msg);
			}
		 }
		   