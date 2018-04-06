<?php
//data/cart/delete.php
require_once("cart.php");
@$iid=$_REQUEST["iid"];
if($iid!=null)
	delete($iid);
