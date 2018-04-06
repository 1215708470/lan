<?php
//data/users/login.php
header("Content-Type:application/json");
require_once("../init.php");
@$phone=$_REQUEST["phone"];
@$upwd=$_REQUEST["upwd"];
if($phone&&$upwd){
	$sql="select * from gd_user where phone='$phone' and binary upwd='$upwd'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	if($row!=null){
		$uid=$row[0];
		session_start();
		$_SESSION["uid"]=$uid;
		echo json_encode(["ok"=>1]);
	}else
		echo json_encode(["ok"=>0,"msg"=>"用户名密码不正确!"]);
}