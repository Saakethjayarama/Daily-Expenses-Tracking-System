<?php
  interface ExpenseDao{
    function addExpense($expense);
    function editExpense($expense);
    function deleteExpense($id);
    function expenseByDate($date, $userId);
    function expensesOverPeriod($Startdate, $endDate, $userId);
    function getExpensesById($id);
  }
?>