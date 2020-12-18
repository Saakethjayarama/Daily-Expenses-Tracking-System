<?php

  class Expense {

    private $id;
    private $userId;
    private $expenseDate;
    private $expenseItem;
    private $expenseCost;
    private $noteDate;

    function __construct($id, $userId, $expenseDate, $expenseItem, $expenseCost, $noteDate){
      $this->id = $id;
      $this->userId = $userId;
      $this->expenseDate = $expenseDate;
      $this->expenseItem = $expenseItem;
      $this->expenseCost = $expenseCost;
      $this->noteDate = $noteDate;
    }

    function getId() {
      return $this->id;
    }
    function getUserId() {
      return $this->userId;
    }
    function getExpenseDate() {
      return $this->expenseDate;
    }
    function getExpenseItem() {
      return $this->expenseItem;
    }
    function getExpenseCost() {
      return $this->expenseCost;
    }
    function getNoteDate() {
      return $this->noteDate;
    }
    
    function setId($id) {
      $this->id = $id;
    }
    function setUserId($userId) {
      $this->userId = $userId;
    }
    function setExpenseDate($expenseDate) {
      $this->expenseDate = $expenseDate;
    }
    function setExpenseItem($expenseItem) {
      $this->expenseItem = $expenseItem;
    }
    function setExpenseCost($expenseCost) {
      $this->expenseCost = $expenseCost;
    }
    function setNoteDate($noteDate) {
      $this->noteDate = $noteDate;
    }

    function toArray() {
      return array(
        "id" => $this->id,
        "userId" => $this->userId,
        "expenseDate" => $this->expenseDate,
        "expenseItem" => $this->expenseItem,
        "expenseCost" => $this->expenseCost,
        "setNoteDate" => $this->noteDate
      );
    }
  }

?>