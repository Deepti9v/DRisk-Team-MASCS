<?php
$num = $_POST["num"];
require 'connect.inc.php';
$query = "SELECT `1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`10`,`11`,`12`,`13`,`14`,`15`,`16`,`17`,`18`,`19`,`20`,`21`,`22`,`23`,`24`,`25`,`26`,`27`,`28`,`29`,`30`,`31`,`32`,`33`,`34`,`35`,`36`,`37`,`38`,`39`,`40`,`41`,`42` FROM `territories` WHERE `userID` = '."$num".'";
$val = 0;
$query_run = mysqli_query($con, $query);

if ($query_run) {	
	$row=mysqli_fetch_assoc($query_run);
	printf("Territories player 1 occoupies:");
	while ($finfo = mysqli_fetch_field($query_run)) {
        if ($row[$finfo->name] == '1') {	
			  printf("%s , 	",$finfo->name);
		}
		$val = $val + 1;
    }		

}	else {
	echo 'query failed';
}

?>
