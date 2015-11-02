<!doctype html>
<html>
  <head>
    <link href="enter.css" rel="stylesheet" type="text/css" />
  </head>
  <?php
  include 'MysqlOperation.php';
    $Username = md5(uniqid()); 
    setcookie('Username',$Username);
  ?>
  <body background="main1.jpg" style="background-repeat:no-repeat">
    <div class = "word">
      <p><font color = "#660000"><strong>DRISK</strong></font></p>
      <div>
        <form method="post" action="room.php">
        <input class = "JoinGameButton" type="submit" style="background:#00ff00" value= "Join Game">
        </form>

        <form method="post" action="configure.php">
        <input class = "NewGameButton" type="submit" style="background:#00ff00" value= "New Game">
        </form>
      </div>
    </div>
  </body>
</html>