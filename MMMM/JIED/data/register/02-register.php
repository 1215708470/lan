<?php

   #2.接收前端传递过来的数据
    // @$uname=$_REQUEST["uname"];
	@$phone=$_REQUEST["phone"];
	 @$upwd=$_REQUEST["upwd"];
	// $email=$_REQUEST["email"];
	 
	/* @$yzm = $_REQUEST["yzm"];  //获取用户输入验证码值
	session_start();          //开启session
	$bk = $_SESSION["code"];  //获取系统验证码值
	if($bk != $yzm){
	die('{"code":-1,"msg":"验证码错误，请重试"}');
	}else{
	die('{"code":1,"msg":"正确"}');
	}*/
	#1.数据库连接
     require("../init.php");
	// $user_name=$_REQUEST["user_name"];
	// $gender=$_REQUEST["gender"];
	#3.拼接slq语句
	 //$sql="insert into gd_user(uname,upwd,phone) values('$uname','$upwd','$phone')";
	 $sql="insert into gd_user(phone,upwd,mtime) values('$phone','$upwd',now())";
	#4.执行sql并获取结果
	 $result=mysqli_query($conn,$sql);
	#5.根据结果输入响应
	 if($result==true){
	   echo "注册成功";
	 }else{
	   echo "注册失败";
	 }
	 
?>
