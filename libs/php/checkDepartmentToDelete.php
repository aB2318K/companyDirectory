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

    // Retrieve department ID from request parameters
    $departmentID = $_REQUEST['id'];

    // Prepare SQL statement to check if department is associated with any personnel
    $query = $conn->prepare('SELECT d.name AS departmentName, COUNT(p.id) as personnelCount FROM department d LEFT JOIN personnel p ON (p.departmentID = d.id) WHERE d.id = ?');
    $query->bind_param("i", $departmentID);

    $query->execute();

    $result = $query->get_result();

    $row = mysqli_fetch_assoc($result);

    // Include department name and count in the response
    $output['data']['departmentName'] = $row['departmentName'];
    $output['data']['personnelCount'] = $row['personnelCount'];
    $output['data']['departmentID'] = $departmentID;

    // Check if there are associated personnel
    if ($row['personnelCount'] > 0) {
        // Department is associated with personnel and is not deletable
        $output['status']['code'] = "200"; 
        $output['status']['name'] = "success";
        $output['status']['description'] = "Department is not eligible for deletion"; // Update description
    } else {
        // Department is not associated with personnel and is deletable
        $output['status']['code'] = "200";
        $output['status']['name'] = "success";
        $output['status']['description'] = "Department is eligible for deletion";
    }

    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";

    echo json_encode($output);

    mysqli_close($conn);

?>
