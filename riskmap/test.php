<?php
<<<<<<< HEAD
include "MysqlOperation.php";
define('DB_HOST', 'localhost');  
define('DB_USER', 'root');  
define('DB_PASS', '111111');  
define('DB_DATABASENAME', 'riskusers');  
define('DB_TABLENAME', 'users');  
//数据库表的列名  
$dbcolarray = array('Name', 'ID', 'Territories','Colour','room'); 
$DB_DATABASENAME = 'riskusers';
  
//mysql_connect  
$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS) or die("connect failed" . mysql_error());  
mysql_select_db(DB_DATABASENAME, $conn);  
  
//读取表中纪录条数  
$sql = sprintf("select count(*) from %s", DB_TABLENAME);  
$result = mysql_query($sql, $conn);  
if ($result)  
{  
    $count = mysql_fetch_row($result);  
}  
else  
{  
    die("query failed");  
}  
echo "$count[0]<br />";  


 
//$sql = sprintf("update %s set room = 2 where Name = 'anant'", DB_TABLENAME);
//mysql_query($sql, $conn);
insertUser('ABCD');
insertRoom('ABCD',6,3);

//$sql = sprintf("insert into %s (Name, ID, Territories,Colour,room) values ('Chaoyi',3,0,'gray',0)", DB_TABLENAME);
//mysql_query($sql, $conn);
  
  
$sql = sprintf("select %s from %s", implode(",",$dbcolarray), DB_TABLENAME);  
$result = mysql_query($sql, $conn);  
//表格  
echo '<table id="Table" border=1 cellpadding=10 cellspacing=2 bordercolor=#ffaaoo>';   
//表头  
$thstr = "<th>" . implode("</th><th>", $dbcolarray) . "</th>";  
echo $thstr;  
//表中的内容  
while ($row=mysql_fetch_array($result, MYSQL_ASSOC))//与$row=mysql_fetch_assoc($result)等价  
{  
    echo "<tr>";  
    $tdstr = "";  
    foreach ($dbcolarray as $td)  
        $tdstr .= "<td>$row[$td]</td>";  
    echo $tdstr;  
    echo "</tr>";  
}  
echo "</table>";  
mysql_free_result($result);  
mysql_close($conn);  
?>
=======
$num = $_POST["num"];
require 'connect.inc.php';
$query = "SELECT * FROM `users` WHERE `ID` = '".$num."'";

if ($query_run = mysqli_query($con, $query)) {
	$row=mysqli_fetch_assoc($query_run);
	# change print style to match dispaly!
	print_r($row);


}	else {
	echo 'query failed';
}

?>
	
>>>>>>> origin/master
