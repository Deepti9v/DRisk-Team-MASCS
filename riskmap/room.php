<!DOCTYPE HTML>
<html>
<head>
<?php
  include 'MysqlOperation.php';
  $Username = $_COOKIE['Username'];
  insertUser($Username);
?>
<link href="room.css" rel="stylesheet" type="text/css" />
</head>
<body background="main1.jpg" style="background-repeat:no-repeat">
<div>
<h1 class = "title">Join Room</h1>
<div class = "table">
  <table border="1px" cellspacing="0px" align="center" class = "tab">
  <tr>
    <td>Room</td>
    <td>Player</td>
    <td>Complexity</td>
  </tr>
  <tr>
    <td>row 2, cell 1</td>
    <td>row 2, cell 2</td>
    <td>row 2, cell 3</td>
  </tr>
</table>
</div>
</div>
</body>
</html>