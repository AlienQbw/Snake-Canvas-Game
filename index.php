<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles/style.css" />
    <link rel="shortcut icon" href="#" />
    <title>AlienQ's Snake Game</title>
  </head>
  <body onload="removeCookies()">
<!--     <div class="container">
      <h1>Welcome to my simple snake game!</h1>
    </div> -->
    <div class="content">
      <p class="score flex">Score: 0</p>
      <div class="restart-btn-div">
        <button onClick="window.location.reload();" class="restart-btn flex">Restart</button>
        <button class="restart-btn flex" onClick="showLeaderboard();">Leaderboard</button> <!-- TO DO HERE !!! -->
      </div>
      <div class="canvas-space flex">
        <canvas id="canvas"></canvas>
      </div>
    </div>
    <div class="overlay">
    <div class="leaderboard">
      <form action="includes/saveScore.php" method="post" class="save_score_form" name="save_score_form">
        <p class="score_label">Leaderboard</p>
        <label for="user_name">Your name:</label>
        <input type="text" name="user_name" id="user_name" placeholder="Name...">
        <input type="submit" value="Save Score" name="submit_score" class="leaderboard-btn">
        <button onClick="window.location.reload();" class="leaderboard-btn">Cancel</button>
      </form>
      <br>
      <h2>Leaderboard:</h2>
      <?php
        $scores = "";
        if($file = fopen("leaderboard.txt", "r")) {
          while(!feof($file)) {
            $textLine = fgets($file);
            $scores = $scores.$textLine." ";

          }
        }
        $scores = substr_replace($scores ,"", -1);
        $max = 0;
        $maxI;
        $sc = explode(" ", $scores);
        $indexes = array();
        $justScores = array();
        for($k = 1; $k < count($sc); $k+=2){
          $sc[$k] = (float)$sc[$k];
        }
        for($i = 1; $i < count($sc); $i+=2){
          for($z = 1; $z < count($sc); $z+=2){
            if($max < $sc[$z]){
              $max = $sc[$z];
              $maxI = $z;
            }
          }
          array_push($justScores, $sc[$maxI]);
          $sc[$maxI] = 0;
          array_push($indexes, $maxI);
          $max = 0;
          $maxI = "";
        }
        for($l = 0; $l < count($indexes); $l++){
          $n = $l + 1;
          echo $n.". ".$sc[$indexes[$l] - 1]."'s score: ".$justScores[$l]."<br>";
        }
      ?>
    </div>
    </div>
    <script src="scripts/index.js"></script>
    <script src="scripts/cookies.js"></script>
  </body>
</html>
