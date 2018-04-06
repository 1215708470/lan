<?php
//data/cart/check.php
require_once("cart.php");
@$cid=$_REQUEST["iid"];
@$checked=$_REQUEST["checked"];
if($cid!=null&&$checked!=null)
	check($cid,$checked);