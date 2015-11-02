<?php
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
	