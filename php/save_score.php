<?php
session_start();

if (!isset($_SESSION["user_id"]) || empty($_POST["score"])) {
    die("Unauthorized or missing data");
}

$score = intval($_POST["score"]);
$user_id = $_SESSION["user_id"];

$mysqli = require __DIR__ . "/database.php";

// Insert score into the score table
$score_sql = "INSERT INTO scores (user_id, score) VALUES (?, ?)";
$score_stmt = $mysqli->prepare($score_sql);
$score_stmt->bind_param("is", $user_id, $score);
$score_stmt->execute();

// Update scores field in the user table
$update_sql = "UPDATE user SET scores = IFNULL(scores, 0) + ? WHERE user_id = ?";
$update_stmt = $mysqli->prepare($update_sql);
$update_stmt->bind_param("ii", $score, $user_id);
$update_stmt->execute();

echo "Score saved successfully";
?>
