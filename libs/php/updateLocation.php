<?php

    // remove next two lines for production

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    include("config.php");

    header('Content-Type: application/json; charset=UTF-8');

    $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

    if (mysqli_connect_errno()) {

        $output['status']['code'] = "300";
        $output['status']['name'] = "failure";
        $output['status']['description'] = "database unavailable";
        $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
        $output['data'] = [];

        mysqli_close($conn);

        echo json_encode($output);

        exit;

    }

    // Extract and sanitize input data
    $locationID = $_REQUEST["id"];
    $locationName = $_REQUEST["name"];

    // Prepare and execute the SQL update statement using prepared statements to prevent SQL injection
    $query = $conn->prepare("UPDATE location SET name = ? WHERE id = ?");
    $query->bind_param("si", $locationName, $locationID);
    $query->execute();

    // Check if the update was successful
    if ($query->affected_rows > 0) {
        $output['status']['code'] = "200";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "Location information updated successfully";
    } else {
        $output['status']['code'] = "500";
        $output['status']['name'] = "error";
        $output['status']['description'] = "Error updating location information";
    }

    mysqli_close($conn);

    echo json_encode($output);
    
?>
