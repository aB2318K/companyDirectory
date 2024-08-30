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

    // Prepare SQL statement to check if location is associated with any departments
    $query = $conn->prepare('SELECT l.name AS locationName, COUNT(d.id) as departmentCount FROM location l LEFT JOIN department d ON (d.locationID = l.id) WHERE l.id = ?');
    $query->bind_param("i", $locationID);

    $query->execute();

    $result = $query->get_result();

    $row = mysqli_fetch_assoc($result);

    // Include location ID, location name, and department count in the response
    $output['data']['locationID'] = $locationID;
    $output['data']['locationName'] = $row['locationName'];
    $output['data']['departmentCount'] = $row['departmentCount'];

    // Check if there are associated departments
    if ($row['departmentCount'] > 0) {
        // Location is associated with departments and is not deletable
        $output['status']['code'] = "200";
        $output['status']['name'] = "success";
        $output['status']['description'] = "Location is associated with departments";
    } else {
        // Location is not associated with departments and is deletable
        $output['status']['code'] = "200";
        $output['status']['name'] = "success";
        $output['status']['description'] = "Location is eligible for deletion";
    }

    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";

    echo json_encode($output);

    mysqli_close($conn);

?>
