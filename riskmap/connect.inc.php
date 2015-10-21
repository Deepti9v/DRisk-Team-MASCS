
<?php
$mysql_host = '';
$mysql_user = 'root';
$mysql_pass = '';
$con = @mysqli_connect($mysql_host,$mysql_user,$mysql_pass,"riskusers");

// Check connection
if (@mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: ";
  }
?>
