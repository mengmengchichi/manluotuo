<?php
	$username = $_POST['username'];
	$pwd = $_POST['pwd'];
	mysql_connect('localhost','root','');
	mysql_select_db($database_name);
	mysql_query($query);
	while($arr = mysql_fetch_array($result)){
        // $arr1[] = $arr;
        array_push($arr1,$arr);
    }
    $json = array('allNum' => $num['ALLNum'],"data" => $arr1);
    echo json_encode($json);
?>