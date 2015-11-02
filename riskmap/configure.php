<!doctype html>
<html>
  <head>
    <link href="configure.css" rel="stylesheet" type="text/css" />
    <?php
    include 'MysqlOperation.php';
    $Username = $_COOKIE['Username'];
    setcookie('Host',1);
    insertUser($Username);
    ?>
  </head>
  <body background="main1.jpg" style="background-repeat:no-repeat">
    <h1 class = "title">Configuration</h1>
    <form method = "post" action = "RiskMap.php">
      <div>
        <p class = "players">number of players</p>
        <select name = "players" class = "players">
           <option value='6' selected>6</option>
           <option value='5'>5</option>
           <option value='4'>4</option>
           <option value='3'>3</option>
           <option value='2'>2</option>
        </select>
      </div>
      <div class = "complexity">
        <p class = "complexity">complexity</p>
        <select name = "complexity" class = "complexity">
          <option value='1' selected>easy</option>
          <option value='2'>medium</option>
          <option value='3'>hard</option>
        </select>
      </div>
      <div>
        <input class = "startGameButton" type="submit" style="background:#00ff00" value="  Start  "></a>
        <input class = "cancelButton" type="button" style="background:#00ff00" onclick="javascript:history.back(-1);" value="Cancel">
      </div>
    </form>
  </body>
</html>