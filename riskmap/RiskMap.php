<!doctype html>
<html>
	<head>
        <?php
          include 'MysqlOperation.php';
          $Usernumber = $_POST["players"];
          $complexity = $_POST["complexity"];
          $Username = $_COOKIE['Username'];
          if($_COOKIE['Host'] == 1)
            insertRoom($Username, $Usernumber, $complexity);
          echo $Usernumber;
          echo $complexity;
          echo "<script> var Usernumber = \"$Usernumber\" </script>";
          echo "<script> var complexity = \"$complexity\" </script>";
        ?>
        <title>MASCS - DRisk</title>
        <style>
          html,body {
          width:  100%;
          height: 100%;
          margin: 0px;
          padding: 0px;
          }

          #overlay {
            width:100%;
            height: 100%;
            position:absolute;
            top:0;
            left: 0;
            background-color:#111;
            z-index:2000;
          }

          #overlay>img {
            position: absolute;
            top: 50%;
            left:50%;
            margin: -135px 0 0 -140px;
            z-index:2001;
          }

          #info-overlay {
            position: absolute;
            top:10px;
            left: 10px;
            z-index: 1000;
            background-color: #FBFFCB;
            padding: 9px 18px;
            box-shadow: 0 5px 5px -3px black;
            border-radius: 20px/60px;
            color: black;
            opacity: 0.9;
            font-family: 'Trebuchet MS', sans-serif;
          }

          #info-overlay:hover {
            opacity: 1;
          }

          #info-overlay p {
            padding: 3px 0;
            margin: 0;
          }
        </style>
        <link rel="stylesheet" href="modal.css">
        <script src="jquery.min.js"></script>
        <!--<script src="kinetic-v3.10.5.min.js"></script>-->
        <script src="kinetic-v4.4.2.min.js"></script>
        <script src="gameData.js"></script>
        <script src="paths.js"></script>
        <script src="coordinates.js"></script>
        <script src="risk.js"></script>
        <script src="assetManager.js"></script>
        <script src="main.js"></script>
        <script src="attack.js"></script>
        <script src="jquery-1.11.3.js"></script>
    </head>

    <body>
      <div id="map"></div>
      <div id="overlay">
        <img src="img/loading.gif">
      </div>
      <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','analytics.js','ga');

        ga('create', 'UA-31462044-5', 'asu.edu');
        ga('send', 'pageview');
      </script>

      <div id="dicemodal">
          <p>Attacker and Defender rolls dice</p>
          <div id="result">
          </div>
          <a href='#' onclick='showmodal()'><img class = "close" src = "img/close_button.png" alt="Close"></a>
      </div>
    </body>
</html>