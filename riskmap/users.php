<?php
require 'connect.inc.php';
$query = "SELECT `ID` FROM `users`";
$val = 0;
if ($query_run = mysqli_query($con, $query)) {
	while($row=mysqli_fetch_assoc($query_run)) {
	$val++;
	}
printf ("%s",$val);
} 
else {
	echo 'query failed';
}

?>
