<?php
//data/cart/checkAll.php
require_once("cart.php");
session_start();
@$uid=$_SESSION["uid"];
@$checked=$_REQUEST["checked"];
if($uid!=null&&$checked!=null)
	checkAll($uid,$checked);