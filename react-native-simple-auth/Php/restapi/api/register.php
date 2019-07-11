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

$name = $data['name'];
$email = $data['email'];
$password = $data['password'];
$mobile = $data['mobile'];

if ($name!=null || $name!="" && $email!=null || $email!="" && $password!=null || $password!="" && $mobile!=null || $mobile!="") {
 
    $opUser = new UserOperation();
    $res = $opUser->register($name, $email, $password, $mobile);

    if ($res == 0) {

        $response["error"] = false;
        $response["message"] = "You are successfully registered";
        $response['user'] = $opUser->getUser($email);
        header('Status: 201', TRUE, 201);
        echo json_encode($response);
      
    } else if ($res == 1) {
        $response["error"] = true;
        $response["code"] = 400;
        header('Status: 400', TRUE, 400);
        $response["message"] = "Oops! An error occurred while registereing";
        echo json_encode($response);
    } else if ($res == 2) {
        $response["error"] = true;
        $response["message"] = "Sorry, this user  already existed";
        header('Status: 409', TRUE, 409);
        echo json_encode($response);
    }
    $opUser = null;

} else {
    $response["error"] = TRUE;
    $response["error_msg"] = "Required parameters (name, email, mobile or password) is missing!";
    echo json_encode($response);
 }
}else{
    $response['error'] = true;
    $response['message'] = "The request method is not allowed";
    header('Status: 405', TRUE, 405);
    echo json_encode($response);
}

?>