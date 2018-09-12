<?php
	header("Access-Control-Allow-Origin:*");
	$username = $_POST['username'];
	$pwd = $_POST['pwd'];
	mysql_connect('localhost','root','');
	mysql_select_db('project');
	$checkname = "SELECT username,password FROM user WHERE (username = '$username') AND (password = '$pwd')";
	$resource = mysql_query($checkname);
	//echo if($isSucc);
	$topArr = array();
	while ($arr = mysql_fetch_array($resource)) {
		array_push($topArr, $arr);
	}
	$isSucc = json_encode($topArr);
	mysql_query("set names 'utf8'");
	if($isSucc.length != 2){
		echo "false";
	}else{
		echo "true";
	}	
	mysql_close();// 
?> 

