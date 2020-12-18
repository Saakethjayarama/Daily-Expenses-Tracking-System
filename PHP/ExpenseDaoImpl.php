<?php
  include_once 'JdbcUtil.php';
  include_once 'ExpenseDao.php';
  include_once 'Expense.php';

  class ExpenseDaoImpl implements ExpenseDao{
    function addExpense($expense) {

      $userId = $expense->getUserId();
      $expenseDate = $expense->getExpenseDate();
      $expenseItem = $expense->getExpenseItem();
      $expenseCost = $expense->getExpenseCost();

      $connection = JdbcUtil::getConnection();

      $sql = 'insert into tblexpense(UserId, ExpenseDate, ExpenseItem, ExpenseCost) values (?,?,?,?)';
      $statement = $connection->prepare($sql);

      $statement->bind_param('isss', $userId, $expenseDate, $expenseItem, $expenseCost);

      $n = '';
      if($statement->execute()) {
        $n = $connection->insert_id;
      }

      $connection->close();
      return $n;

    }

    function editExpense($expense) {
      
      $id = $expense->getId();
      $expenseDate = $expense->getExpenseDate();
      $expenseItem = $expense->getExpenseItem();
      $expenseCost = $expense->getExpenseCost();

      $connection = JdbcUtil::getConnection();

      $sql = 'update tblexpense set ExpenseDate = ?, ExpenseItem = ?, ExpenseCost = ? where ID = ?';
      $statement = $connection->prepare($sql);

      $statement->bind_param('sssi', $expenseDate, $expenseItem, $expenseCost, $id);

      $statement->execute();
      $connection->close();

    }

    function deleteExpense($id) {
      $connection = JdbcUtil::getConnection();

      $sql = 'delete from tblexpense where id = ?';
      $statement = $connection->prepare($sql);
      $statement->bind_param('i', $id);

      $statement->execute();
      $connection->close();
    }
    
    function expenseByDate($date, $userId) {
      $connection = JdbcUtil::getConnection();


      $startDate = $date.' 00:00:00';
      $endDate = $date.' 23:59:59';
      $sql = 'SELECT * FROM tblexpense where ExpenseDate BETWEEN ? and ? and UserId = ?';
      $statement = $connection->prepare($sql);
      $statement->bind_param('ssi', $startDate, $endDate, $userId);

      $expenses = [];
      if($statement->execute()) {
        $statement->bind_result($id, $userId, $expenseDate, $expenseItem, $expenseCost, $noteDate);
        while($statement->fetch()) {
          $expenses[] = new Expense($id, $userId, $expenseDate, $expenseItem, $expenseCost, $noteDate);
        }
      }

      $connection->close();
      return $expenses;
      
    }

    function expensesOverPeriod($Startdate, $endDate, $userId) {
      $connection = JdbcUtil::getConnection();

      $startDate = $Startdate.' 00:00:00';
      $endDate = $endDate.' 23:59:59';
      $sql = 'SELECT * FROM tblexpense where ExpenseDate BETWEEN ? and ? and UserId = ?';
      $statement = $connection->prepare($sql);
      $statement->bind_param('ssi', $startDate, $endDate, $userId);

      $expenses = [];
      if($statement->execute()) {
        $statement->bind_result($id, $userId, $expenseDate, $expenseItem, $expenseCost, $noteDate);
        while($statement->fetch()) {
          $expenses[] = new Expense($id, $userId, $expenseDate, $expenseItem, $expenseCost, $noteDate);
        }
      }

      $connection->close();
      return $expenses;
    }

    function getExpensesById($id) {
      $connection = JdbcUtil::getConnection();

      $sql = 'select * from tblexpense where UserId = ?';
      $statement = $connection->prepare($sql);
      $statement->bind_param('i', $id);

      $expenses = [];
      if($statement->execute()) {
        $statement->bind_result($id, $userId, $expenseDate, $expenseItem, $expenseCost, $noteDate);
        while($statement->fetch()) {
          $expenses[] = new Expense($id, $userId, $expenseDate, $expenseItem, $expenseCost, $noteDate);
        }
      }

      $connection->close();
      return $expenses;
    }

  }
?>