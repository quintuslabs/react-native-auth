<?php
/**
 * React Native User Authentication App
 * https://github.com/quintuslabs/react-native-auth
 * Created on:- 29/06/2019
 * Santosh Kumar Dash:- http://santoshdash.epizy.com
 */

class UserOperation extends DbOperation
   {

        //Method to register a new User
    public function register($name, $email, $password, $mobile)
    {
        date_default_timezone_set('Asia/Kolkata');
        $dateTime = date('d-m-Y H:i:s');

        if (!$this->isUserExists($email, $mobile)) {
            $password = hash('sha256', $password);
            $stmt = $this->con->prepare("INSERT INTO users(name, email, password, mobile,created) values(?,?,?,?,?)");
            $stmt->bind_param("sssss", $name, $email, $password, $mobile, $dateTime);
            $result = $stmt->execute();
            $stmt->close();
            if ($result) {
              
               return 0;
               
            } else {
                echo $stmt->error;
                return 1;
            }
        } else {
            return 2;
        }
    }


     //Method to let a User log in
     public function userLogin($email, $pass)
     {
        
         $password = hash('sha256', $pass);
         //error_log("Password->".$password);
         $user = $this->getUser($email);
         //error_log("Password from DB ->".$user['password']);
         if ($user && (strcmp($user['password'], $password) == 0)){
             return true;
         }
         else {
             return false;
         }
     }
 
     //Method to get User details
     public function getUser($email)
     {
         $stmt = $this->con->prepare("SELECT * FROM users WHERE email = ? OR mobile = ?");
         $stmt->bind_param("ss", $email, $email);
         $stmt->execute();
         $users = $this->get_result($stmt);
         $stmt->close();
         if(count($users) > 0){
             return $users[0];
         }
         else {
             return null;
         }
      }
  //Method to get User details
  public function getUserByID($user_id)
  {
      $stmt = $this->con->prepare("SELECT * FROM users WHERE id = ? ");
      $stmt->bind_param("s", $user_id);
      $stmt->execute();
      $users = $this->get_result($stmt);
      $stmt->close();
      if(count($users) > 0){
          return $users[0];
      }
      else {
          return null;
      }
   }

  
     //Method to check the User email already exist or not
     public function isUserExists($email, $mobile)
     {
         $stmt = $this->con->prepare("SELECT id from users WHERE email = ? OR mobile = '$mobile'");
         $stmt->bind_param("s", $email);
         $stmt->execute();
         $stmt->store_result();
         $num_rows = $stmt->num_rows;
         $stmt->close();
         return $num_rows > 0;
     }
 

     //Method to get User details
    public function getUserDetails($id)
    {
        $stmt = $this->con->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $users = $this->get_result($stmt);
        $stmt->close();
        		if(count($users) > 0){
			return $users[0];
		}
		else {
			return null;
		}
    }
    public function getAllUsers()
    {
        $stmt = $this->con->prepare("SELECT * FROM users");
        $stmt->execute();
        $users = $this->get_result($stmt);
        $stmt->close();
        if(count($users) > 0){
			return $users;
		}
		else {
			return null;
		}
    }


     public function getProfileImage($userId)
     {
         $stmt = $this->con->prepare("SELECT image FROM users WHERE id = '$userId' ");
         if ($stmt->execute()) {
             $stmt->bind_result($image);
             $stmt->fetch();
             $stmt->close();
             return $image;
         } else {
             return null;
         }
     }
     
   
   

    }
?>