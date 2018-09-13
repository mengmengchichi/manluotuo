<?php
	header("Access-Control-Allow-Origin:*");
	$id = $_GET['id'];
	//$id = 1;
	$pageCount = $_GET['pageCount'];
	$index = $_GET['index'];
	$act = $_GET['act'];
	$keywords = $_GET['keywords'];
	header("content-type:text/html;charset = 'utf8'");
	mysql_connect("127.0.0.1","root","");
	mysql_select_db("project");
	mysql_query("set names 'utf8'");	
	if($act == 'cart'){
		$getData = "SELECT * FROM cart WHERE id in (";
		for($i = 0;$i<count($id);$i++){
			$getData = $getData."".$id[$i];	
			if($i != count($id) -1){
				$getData = $getData.",";
			}
		}
		$getData = $getData.")";
	}else if($act == "search"){
		$getData = "SELECT * FROM `project`.`list1` WHERE CAST(`project`.`list1`.`status` AS CHAR) LIKE '%$keywords%' OR CAST(`project`.`list1`.`introduce` AS CHAR) LIKE '%$keywords%' OR CAST(`project`.`list1`.`time` AS CHAR) LIKE '%$keywords%' OR CAST(`project`.`list1`.`url` AS CHAR) LIKE '%$keywords%' LIMIT ".($index-1)*$pageCount.",".$pageCount;
	}else{
		$getData = "SELECT * FROM detail WHERE id = $id";
	}
//	echo $getData;
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