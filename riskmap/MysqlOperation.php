<?php
define('DB_HOST', 'localhost');  
define('DB_USER', 'root');  
define('DB_PASS', '111111');  
define('DB_DATABASENAME', 'riskusers');  
define('DB_TABLENAME', 'users');  
define('DB_ROOMTABLE', 'room'); 
//数据库表的列名  

function getNameByID($ID){
	$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS) or die("connect failed" . mysql_error());  
	mysql_select_db(DB_DATABASENAME, $conn);   
	$sql = sprintf("select Name from %s where ID = $ID", DB_TABLENAME);
	$result = mysql_query($sql, $conn);
	return mysql_result($result, 0);
	mysql_free_result($result);  
	mysql_close($conn);
}


function getRoombyUserID($ID){
	$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS) or die("connect failed" . mysql_error());  
	mysql_select_db(DB_DATABASENAME, $conn);   
	$sql = sprintf("select room from %s where ID = $ID", DB_TABLENAME);
	$result = mysql_query($sql, $conn);
	return mysql_result($result, 0);
}

function setRoombyName($Name,$room){
	$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS) or die("connect failed" . mysql_error());  
	mysql_select_db(DB_DATABASENAME, $conn);   
	$sql = sprintf("update %s set room = '$room' where Name = '$Name'", DB_TABLENAME);
	mysql_query($sql, $conn);
}

function insertUser($Name){
	$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS) or die("connect failed" . mysql_error());  
	mysql_select_db(DB_DATABASENAME, $conn);
	$sql = sprintf("select ID from %s where Name = '$Name'", DB_TABLENAME);
	$res = mysql_query($sql, $conn);
	if(mysql_num_rows($res) < 1){
		$sql = sprintf("insert into %s (Name, Territories,Colour,room) values ('$Name',0,'NULL',0)", DB_TABLENAME);
		mysql_query($sql, $conn);
	}
	return $res;
}

function insertRoom($Host,$Maxplayer,$complexity){
	$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS) or die("connect failed" . mysql_error());  
	mysql_select_db(DB_DATABASENAME, $conn);
	$sql = sprintf("select ID from %s where Host = '$Host'", DB_ROOMTABLE);
	$res = mysql_query($sql, $conn);
	if(mysql_num_rows($res) < 1){
		$sql = sprintf("insert into %s (Host, maxplayer,complexity,currentPlayer) values ('$Host','$Maxplayer','$complexity',1)", DB_ROOMTABLE);
		mysql_query($sql, $conn);
	}
	return $res;
}
?>