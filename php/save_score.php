<?php
session_start();

if (!isset($_SESSION["user_id"]) || empty($_POST["score"]) || empty($_POST["timestamp"])) {
    die("Unauthorized or missing data");
}

$score = intval($_POST["score"]);
$timestamp = $_POST["timestamp"];
$user_id = $_SESSION["user_id"];

$mysqli = require __DIR__ . "/database.php";

// Fetch the current scores for the user from the user table
$select_sql = "SELECT scores FROM user WHERE user_id = ?";
$select_stmt = $mysqli->prepare($select_sql);
$select_stmt->bind_param("i", $user_id);
$select_stmt->execute();
$select_stmt->bind_result($current_scores);

if ($select_stmt->fetch()) {
    // Close the result set from the SELECT query
    $select_stmt->close();

    // Append the new score to the current scores
    $current_scores .= "," . $score;

    // Split the current scores into an array and sort them
    $current_scores_array = explode(",", $current_scores);
    rsort($current_scores_array);

    // Keep only the top 10 scores
    $current_scores_array = array_slice($current_scores_array, 0, 10);

    // Update scores field in the user table
    $current_scores = implode(",", $current_scores_array);
    $update_sql = "UPDATE user SET scores = ? WHERE user_id = ?";
    $update_stmt = $mysqli->prepare($update_sql);
    $update_stmt->bind_param("si", $current_scores, $user_id);

    if ($update_stmt->execute()) {
        // Check if the new score is among the top 10
        if (in_array($score, $current_scores_array)) {
            // Check if there are more than 10 scores for this user in the scores table
            $count_scores_sql = "SELECT COUNT(*) FROM scores WHERE user_id = ?";
            $count_scores_stmt = $mysqli->prepare($count_scores_sql);
            $count_scores_stmt->bind_param("i", $user_id);
            $count_scores_stmt->execute();
            $count_scores_stmt->bind_result($score_count);
            $count_scores_stmt->fetch();
            $count_scores_stmt->close();

            if ($score_count >= 10) {
                // Find the lowest score for this user

                echo "Debug: Before Lowest Score Query<br>";
                echo "Debug: Current Scores: " . $current_scores . "<br>";
                $lowest_score_sql = "SELECT score_id FROM scores WHERE user_id = ? ORDER BY score ASC, timestamp ASC LIMIT 1";
                
                echo "Debug: After Finding Lowest Score<br>";
                echo "Debug: Lowest Score ID: " . $lowest_score_id . "<br>";
                $lowest_score_stmt = $mysqli->prepare($lowest_score_sql);
                $lowest_score_stmt->bind_param("i", $user_id);
                $lowest_score_stmt->execute();
                $lowest_score_stmt->bind_result($lowest_score_id);
                $lowest_score_stmt->fetch();
                $lowest_score_stmt->close();

                echo "Debug: After Finding Lowest Score<br>";
                echo "Debug: Lowest Score ID: " . $lowest_score_id . "<br>";

                // Replace the lowest score with the new score
                $replace_score_sql = "UPDATE scores SET score = ?, timestamp = ? WHERE score_id = ?";
                $replace_score_stmt = $mysqli->prepare($replace_score_sql);
                $replace_score_stmt->bind_param("isi", $score, $timestamp, $lowest_score_id);

                if ($replace_score_stmt->execute()) {
                    echo "Score replaced successfully in scores table";
                } else {
                    echo "Error replacing score in scores table: " . $mysqli->error;
                }

                $replace_score_stmt->close();
            } else {
                // Insert the new score into the scores table
                $insert_score_sql = "INSERT INTO scores (user_id, score, timestamp) VALUES (?, ?, ?)";
                $insert_score_stmt = $mysqli->prepare($insert_score_sql);
                $insert_score_stmt->bind_param("iss", $user_id, $score, $timestamp);

                if ($insert_score_stmt->execute()) {
                    echo "Score saved successfully in scores table";
                } else {
                    echo "Error saving score in scores table: " . $mysqli->error;
                }

                $insert_score_stmt->close();
            }
        } else {
            echo "Score not among top 10, not saved in scores table.";
        }
    } else {
        echo "Error updating user scores";
    }

    $update_stmt->close();
} else {
    echo "Error fetching user data";
}

$mysqli->close();
?>
