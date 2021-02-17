<?php
$myfile = fopen("../leaderboard.txt", "a") or die("Unable to open file!");
$txt = getCookie();
if($txt == "") {
    header('Location: ../index.php');
} else{
    fwrite($myfile, "\n". $txt);
    fclose($myfile);
    header('Location: ../index.php');
}


function getCookie(){
    if(isset($_COOKIE['username'])){
        $cookie = $_COOKIE['username'];
        unset($_COOKIE['username']);
        setcookie('username', '', time() - 3600, '/');
    }
    return $cookie;
}
?>