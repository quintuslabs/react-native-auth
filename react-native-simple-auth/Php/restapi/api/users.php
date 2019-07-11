<?php
/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */

require '../operation/DbOperation.php';
require '../operation/UserOperation.php';
if($_SERVER['REQUEST_METHOD']=='GET'){
    $opUser = new UserOperation();
        $response['error'] = false;
        header('Status: 200', TRUE, 200);
        $response['users'] = $opUser->getAllUsers();
        echo json_encode($response);
}else {
    $response["error"] = true;
    $response["message"] = "This method is not allowed ";
    header('Status: 400', TRUE, 400);
    echo json_encode($response);
}


?>