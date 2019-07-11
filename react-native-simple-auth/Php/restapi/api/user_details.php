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
    $user_id = $_GET['id']; 
    $opUser = new UserOperation();
   if($user_id!=null || $user_id!=""){
  
        $response['error'] = false;
        header('Status: 200', TRUE, 200);
    
        $response['user'] = $opUser->getUserByID($user_id);
        echo json_encode($response);
    
}else {
    $response["error"] = true;
    $response["message"] = "userId is misssing";
    header('Status: 403', TRUE, 403);
    echo json_encode($response);
}
}else {
    $response["error"] = true;
    $response["message"] = "This method is not allowed ";
    header('Status: 400', TRUE, 400);
    echo json_encode($response);
}

?>