<?php
    include_once 'User.php';
    include_once 'UserDaoImpl.php';

    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin, Access-Control-Allow-Methods");
    
    $method = $_SERVER['REQUEST_METHOD'];

    if($method == 'OPTIONS'){
        http_response_code(200);
    }else
    if($method == 'POST') {
      $data = json_decode(file_get_contents('php://input'), true);
      $udi = new UserDaoImpl();
      $user = new User(null, $data['fullName'], $data['username'], $data['mobileNumber'], $data['password'], null);
      $id = $udi->addUser($user);
      $user->setId($id);

      http_response_code(200);
      echo json_encode($user);
    }else{
        http_response_code(405);
        echo (json_encode(array("message"=>"method not allowed")));
    }
    
?>