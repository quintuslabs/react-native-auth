<?php
/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */

require '../operation/DbOperation.php';
require '../operation/UserOperation.php';
if($_SERVER['REQUEST_METHOD']=='POST'){
$response = array("error" => FALSE);
$json = file_get_contents('php://input');
$data = json_decode($json,true);

$email = $data['email'];
$password = $data['password'];

if ( $email!=null ||$email!="" && $password!="" && $password!=null) {

    $opUser = new UserOperation();
    $response = array();
    $response['error'] = true;
    $response['message'] = "Invalid email or password";
    if ($opUser->userLogin($email, $password)) {
        $response['error'] = false;
        header('Status: 200', TRUE, 200);
        $response['message'] = "Login Successfull !!";
        $response['user'] = $opUser->getUser($email);
        echo json_encode($response);
    }else{
        $response["error"] = true;
        header('Status: 404', TRUE, 404);
        $response["message"] = "Sorry, wrong email or password";
        echo json_encode($response);
    }
    $opUser = NULL;
}else {
    $response["error"] = TRUE;
    $response["error_msg"] = "Required parameters (email / mobile or password) is missing!";
    echo json_encode($response);
}
}else{
    $response['error'] = true;
    header('Status: 405', TRUE, 405);
    $response['message'] = "The request method is not allowed";
    echo json_encode($response);
}

?>