<?php

include 'dbh.php';

    $sql = "SELECT * FROM estate_type_languages LIMIT 10";
    $result = mysqli_query($conn, $sql);

    if(mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            echo "<p>";
            echo $row['name'];
            echo "<br>";
            echo "</p>";
        }
    } else {
        echo "There are no lists!";
    }
?>