<?php
	header("Access-Control-Allow-Origin:*");
	$name = $_POST['username'];
	$email = $_POST['email'];
	$pwd = $_POST['pwd'];	
	header("content-type:text/html;charset=utf8");
	mysql_connect("127.0.0.1","root","");
	mysql_select_db("project");	
	$sql = "INSERT INTO user (username,password,email) VALUES ('$name','$pwd','$email')";	
	mysql_query("set names 'utf8'");
	$isSucc = mysql_query($sql);
	if($isSucc){
		echo "true";
	}else{
		echo "flase";
	}	
	mysql_close();
?>