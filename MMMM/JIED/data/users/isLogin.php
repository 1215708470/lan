<?php
//data/users/isLogin.php
header("Content-Type:application/json");
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
//var_dump( $uid);
if($uid!=null){
	$sql="select phone from gd_user where uid=$uid";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	$phone=$row[0];
	echo json_encode(["ok"=>1,"phone"=>$phone]);
}else
	echo json_encode(["ok"=>0]);