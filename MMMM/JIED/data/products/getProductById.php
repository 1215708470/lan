

<?php
//data/products/getProductById.php
header("Content-Type:application/json");
require_once("../init.php");
$output=[
	//"product"=>{...},
	//"specs"=>[...],
	//"pics"=>[...]
];
@$lcid=$_REQUEST["lcid"];
if($lcid!=null){
	$sql="SELECT * FROM `gd_clothing` where lcid=$lcid";
	$result=mysqli_query($conn,$sql);
	$product=mysqli_fetch_all($result,1)[0];
	$output["product"]=$product;

	$fid=$product["family_id"];
	$sql="SELECT lcid, spec FROM `gd_clothing` where family_id=$fid";
	$result=mysqli_query($conn,$sql);
	$output["specs"]=mysqli_fetch_all($result,1);

	$sql="SELECT * FROM `gd_clothing_pic` where clothing_id=$lcid";
	$result=mysqli_query($conn,$sql);
	$output["pics"]=mysqli_fetch_all($result,1);

	echo json_encode($output);
}
/*@$clothing_id=$_REQUEST["clothing_id"];

	$sql="SELECT * FROM `gd_clothing` where clothing_id=$clothing_id";
	$result=mysqli_query($conn,$sql);
	$product=mysqli_fetch_all($result,1);
	$output["product"]=$product;*/
	
	/*$fid=$product["family_id"];
	$sql="SELECT lid, spec FROM `gd_clothing` where family_id=$clothing_id";
	$result=mysqli_query($conn,$sql);
	$output["specs"]=mysqli_fetch_all($result,1);*/

	/*$sql="SELECT * FROM `gd_clothing_pic` where clothing_id=$clothing_id";

	$result=mysqli_query($conn,$sql);
	$output["pics"]=mysqli_fetch_all($result,1);

echo json_encode($output);
	*/
?>