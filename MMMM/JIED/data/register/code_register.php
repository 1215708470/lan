<?php
header("Content-Type:application/json;charset=utf-8");

	 @$yzm = $_REQUEST["yzm"];  //获取用户输入验证码值
	session_start();          //开启session
	$bk = $_SESSION["code"];  //获取系统验证码值
	if($bk != $yzm){
	die('{"code":-1,"msg":"验证码错误，请重试"}');
	}else{
	die('{"code":1,"msg":"正确"}');
	}
	
?>
