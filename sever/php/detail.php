<?php
	header("Access-Control-Allow-Origin:*");
	$id = $_GET['id'];
	//$id = 1;
	$act = $_GET['act'];
	header("content-type:text/html;charset = 'utf8'");
	mysql_connect("127.0.0.1","root","");
	mysql_select_db("project");
	mysql_query("set names 'utf8'");	
	if($act == 'cart'){
		$getData = "SELECT * FROM cart WHERE id = $id";
	}else{
		$getData = "SELECT * FROM detail WHERE id = $id";
	}	
	$resource = mysql_query($getData);
	$dataArr = array();
	while($arr = mysql_fetch_array($resource,MYSQL_ASSOC)){
		array_push($dataArr, $arr);
	};
	$json = array("data" => $dataArr);
	$data = json_encode($dataArr);	
	echo $data;
	mysql_close();
?>