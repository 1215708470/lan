<?php
//data/cart/clear.php
require_once("cart.php");
session_start();
@$uid=$_SESSION["uid"];
if($uid!=null)
	clear($uid);