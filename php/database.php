<?php

$host = "localhost";
$dbname = "x-racing";
$username = "root";
$password = "";
$mysqli = new mysqli($host, $username, $password, $dbname);

if ($mysqli->connect_errno) {
    die("Connection error: " . $mysqli->connect_error);
    console.log('connection error');
}

return $mysqli;

?>