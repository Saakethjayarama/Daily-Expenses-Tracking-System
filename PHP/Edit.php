<?php
    include_once 'Expense.php';
    include_once 'ExpenseDaoImpl.php';

    $edi = new ExpenseDaoImpl();


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

          $id = $data['id'];
          $expenseDate = $data['expenseDate'];
          $expenseItem = $data['expenseItem'];
          $expenseCost = $data['expenseCost'];

          $expense = new Expense($id, null, $expenseDate, $expenseItem, $expenseCost, null);
          $edi->editExpense($expense);


          http_response_code(200);
          echo json_encode($expense);
            
        }else {
            http_response_code(406);
            echo(json_encode(array("message"=>"Not Acceptable")));
        }

    }else{
        http_response_code(405);
        echo (json_encode(array("message"=>"method not allowed")));
    }
    
?>