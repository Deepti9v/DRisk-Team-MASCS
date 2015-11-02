<?php
require 'connect.inc.php';

$query = 'SELECT * FROM `users`';

if ($query_run = mysqli_query($con, $query)) {
	$row=mysqli_fetch_assoc($query_run);
	printf ("%s (%s)\n",$row["Name"],$row["ID"]);

	$arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);
	
}	else {
	echo 'query failed';
}
?>
<script type="text/javascript">
var book = <?php echo json_encode($arr, JSON_PRETTY_PRINT) ?>;
alert(book.title);
</script>