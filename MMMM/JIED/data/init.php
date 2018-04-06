<?php
$conn=mysqli_connect('127.0.0.1','root','','gd',3306);
$sql="set names utf8";
$result=mysqli_query($conn,$sql);
header("Access-Control-Allow-Origin:*");
/*$conn=mysqli_connect('127.0.0.1','root','','xz',3306);
$sql="set names utf8";
$result=mysqli_query($conn,$sql);*/

	
?>