<?php
$mysqli = require __DIR__ . "/database.php";

$top_scores_sql = "SELECT user.name, scores.score, DATE(scores.timestamp) AS date FROM scores
                  JOIN user ON scores.user_id = user.user_id
                  ORDER BY scores.score DESC, scores.timestamp ASC
                  LIMIT 10";


$top_scores_result = $mysqli->query($top_scores_sql);

if ($top_scores_result) {
    echo "<h1>Top 10 Scores of All Time</h1>";
    echo "<table>";
    echo "<tr><th>Username</th><th>Score</th><th>Date</th></tr>";

    while ($row = $top_scores_result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row["name"] . "</td>";
        echo "<td>" . $row["score"] . "</td>";
        echo "<td>" . $row["date"] . "</td>";
        echo "</tr>";
    }

    echo "</table>";
} else {
    echo "Error retrieving top scores: " . $mysqli->error;
} 

$mysqli->close();

?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Top Scores</title>
    <link rel="stylesheet" type="text/css" href="../styles.css">
</head>
<body class="top-ten">
