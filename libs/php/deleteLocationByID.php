<?php

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    include("config.php");

    header('Content-Type: application/json; charset=UTF-8');

    $conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

    if (mysqli_connect_errno()) {
        $output['status']['code'] = "300";
        $output['status']['name'] = "failure";
        $output['status']['description'] = "Database unavailable";
        $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
        $output['data'] = [];

        mysqli_close($conn);

        echo json_encode($output);

        exit;
    }

    // Retrieve location ID from request parameters
    $locationID = $_REQUEST['id'];

    // Prepare SQL statement to delete location by ID
    $query = $conn->prepare('DELETE FROM location WHERE id = ?');
    $query->bind_param("i", $locationID);

    // Execute SQL statement
    $query->execute();

    // Check if delete operation was successful
    if ($query) {
        $output['status']['code'] = "200";
        $output['status']['name'] = "success";
        $output['status']['description'] = "Location deleted successfully";
    } else {
        $output['status']['code'] = "400";
        $output['status']['name'] = "failure";
        $output['status']['description'] = "Failed to delete location";
    }

    // Calculate execution time
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";

    echo json_encode($output);

    mysqli_close($conn);

?>
