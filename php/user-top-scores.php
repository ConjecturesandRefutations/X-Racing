<?php
session_start();

if (!isset($_SESSION["user_id"])) {
    die("Unauthorized");
}

$user_id = $_SESSION["user_id"];

$mysqli = require __DIR__ . "/database.php";

// Fetch the user's name
$name_sql = "SELECT name FROM user WHERE user_id = ?";
$name_stmt = $mysqli->prepare($name_sql);
$name_stmt->bind_param("i", $user_id);
$name_stmt->execute();
$name_stmt->bind_result($user_name);
$name_stmt->fetch();
$name_stmt->close();

$top_scores_sql = "SELECT score, DATE(timestamp) AS date FROM scores
                  WHERE user_id = ?
                  ORDER BY score DESC, timestamp ASC
                  LIMIT 10";

$top_scores_stmt = $mysqli->prepare($top_scores_sql);
$top_scores_stmt->bind_param("i", $user_id);
$top_scores_stmt->execute();
$top_scores_result = $top_scores_stmt->get_result();

if ($top_scores_result) {
    echo "<h1>" . $user_name . "'s Top 10 Scores</h1>"; 
    echo "<table>";
    echo "<tr><th>Position</th><th>Score</th><th>Date</th></tr>";

    $rank = 1; // Initialize the rank counter
    
    while ($row = $top_scores_result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $rank . "</td>"; // Display the rank
        echo "<td>" . $row["score"] . "</td>";
        
        // Format the date in the desired format
        $formattedDate = date("j M Y", strtotime($row["date"]));
        echo "<td>" . $formattedDate . "</td>";
        
        echo "</tr>";
        
        $rank++; // Increment the rank counter
    }

    echo "</table>";
} else {
    echo "Error retrieving your top scores: " . $mysqli->error;
} 

$mysqli->close();
?>


<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top Scores</title>
    <link rel="stylesheet" type="text/css" href="../styles.css">
</head>
<body class="top-ten">
<a href="../index.php" class='score-back'>Go Back</a>    
