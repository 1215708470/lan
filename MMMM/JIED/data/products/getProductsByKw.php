<?php
header("Content-Type:application/json");
/*查询功能*/
require_once("../init.php");
$sql="SELECT lcid, title, price, (SELECT md from gd_clothing_pic WHERE clothing_id =lcid limit 1) as pic FROM `gd_clothing` ";
@$kw=$_REQUEST["kw"];
if($kw!=null){
	$kws=explode(" ",$kw);
	for($i=0;$i<count($kws);$i++){
		$kws[$i]=" title like '%$kws[$i]%' ";
	}
	$where=implode(" and ",$kws);
	$sql.=" where $where ";
}
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
@$pno=$_REQUEST["pno"];
if($pno==null) $pno=1;
$psize=9;
$count=count($rows);
$sql.=" limit ".(($pno-1)*$psize).",$psize";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
$output=[
	"pno"=>$pno,
	"psize"=>$psize,
	"count"=>$count,
	"pcount"=>ceil($count/$psize),
	"data"=>$rows
];
echo json_encode($output);