<?php
//data/cart/cart.php
require_once("../init.php");
function delete($iid){
	global $conn;
	$sql="delete from gd_shoppingcart_item where iid=$iid";
	mysqli_query($conn,$sql);
}
function update($iid,$count){
	global $conn;
	if($count>0){
		$sql="update gd_shoppingcart_item set count=$count where iid=$iid";
		mysqli_query($conn,$sql);
	}else
		delete($iid);
}
function insert($uid,$lcid,$count){
	global $conn;
	$sql="select cid,count from gd_shoppingcart_item where user_id=$uid and product_id=$lcid";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	if($row==null){
		$sql="insert into gd_shoppingcart_item values (null,$uid,$lcid,$count,0)";
		mysqli_query($conn,$sql);
	}else{
		update($row[0],$row[1]+$count);
	}
}
/*function noLoginInsert($lcid,$count){
	global $conn;
	$sql="select count from gd_shoppingcart_item where product_id=$lcid";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	if($row==null){
		$sql="insert into gd_shoppingcart_item values (null,$lcid,$count,0)";
		mysqli_query($conn,$sql);
	}else{
		update($row[0],$row[1]+$count);
	}
}*/
function clear($uid){
	global $conn;
	$sql="delete from gd_shoppingcart_item where user_id=$uid";
	mysqli_query($conn,$sql);
}
function check($iid,$checked){
	global $conn;
	$sql="update gd_shoppingcart_item set is_checked=$checked where iid=$iid";
	mysqli_query($conn,$sql);
}
function checkAll($uid,$checked){
	global $conn;
	$sql="update gd_shoppingcart_item set is_checked=$checked where user_id=$uid";
	mysqli_query($conn,$sql);
}
function deleteChecked($uid){
	global $conn;
	$sql="delete from gd_shoppingcart_item where user_id=$uid and is_checked=1";
	mysqli_query($conn,$sql);
}