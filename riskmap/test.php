<?php
$num = $_POST["num"];
require 'connect.inc.php';
$query = "SELECT * FROM `users` WHERE `ID` = '".$num."'";

if ($query_run = mysqli_query($con, $query)) {
	$row=mysqli_fetch_assoc($query_run);
	printf ("%s %s %s %s\n",$row["Name"],$row["ID"],$row["Colour"],$row["Territories"],$row["rank"]);
	
}	else {
	echo 'query failed';
}

?>