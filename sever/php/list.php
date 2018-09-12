<?php
	header("Access-Control-Allow-Origin:*");
	$id = $_GET['id'];
	//$id = 'list1';
	//$pageCount = 12;
	//$index = 1;
	$pageCount = $_GET['pageCount'];
	$index = $_GET['index'];
	header("content-type:text/html;charset = 'utf8'");
	mysql_connect("127.0.0.1","root","");
	mysql_select_db("project");
	mysql_query("set names 'utf8'");	
	$getData = "SELECT * FROM $id LIMIT ".($index-1)*$pageCount.",".$pageCount;
	$allData = "SELECT COUNT(*)  as AllNum FROM $id";
	$resource = mysql_query($getData);
	$count = mysql_query($allData);
	$count = mysql_fetch_assoc($count);
	
	$dataArr = array();
	while($arr = mysql_fetch_array($resource,MYSQL_ASSOC)){
		array_push($dataArr, $arr);
	};
	$json = array("alldata" => $count['AllNum'] , "data" => $dataArr);
	$data = json_encode($json);	
	echo $data;
	mysql_close();
?>