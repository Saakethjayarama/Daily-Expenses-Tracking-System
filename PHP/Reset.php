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
    if($method == 'PUT') {
        $data = json_decode(file_get_contents('php://input'), true);

        if(isset($data['id'])){

          $udi = new UserDaoImpl();
          $user = $udi->getProfile($data['id']);
          $password = $user->getPassword();


          if($password == ($data['oldPassword'])) {
            $udi->resetPassword(new User($data['id'], null, null, null, ($data['password']), null));
            http_response_code(200);
            echo json_encode(array(
              "status" => "Password Updated"
            ));
          }
          else {
            http_response_code(403);
            echo json_encode(array(
              "message" => "Password didn't match"
            ));
          }
          
        }else {
            http_response_code(406);
            echo(json_encode(array("message"=>"Not Acceptable")));
        }
    }else{
        http_response_code(405);
        echo (json_encode(array("message"=>"method not allowed")));
    }
    
?>