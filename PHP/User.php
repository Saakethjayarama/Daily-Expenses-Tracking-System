<?php

  class User {
    private $id;
    private $fullName;
    private $email;
    private $mobileNumber;
    private $password;
    private $regDate;

    function __construct($id, $fullName, $email, $mobileNumber, $password, $regDate) {
      $this->id = $id;
      $this->fullName = $fullName;
      $this->email = $email;
      $this->mobileNumber = $mobileNumber;
      $this->password = $password;
      $this->regDate = $regDate;
    }

    function getId() {
      return $this->id;
    }
    function getFullName() {
      return $this->fullName;
    }
    function getEmail() {
      return $this->email;
    }
    function getMobileNumber() {
      return $this->mobileNumber;
    }
    function getPassword() {
      return $this->password;
    }
    function getRegDate() {
      return $this->regDate;
    }

    function setId($id) {
      $this->id = $id;
    }
    function setFullName($fullName) {
      $this->fullName = $fullName;
    }
    function setEmail($email) {
      $this->email = $email;
    }
    function setMobileNumber($mobileNumber) {
      $this->mobileNumber = $mobileNumber;
    }
    function setPassword($password) {
      $this->password = $password;
    }
    function setRegDate($regDate) {
      $this->regDate = $regDate;
    }

    function toArray() {
      return array(
        "id" => $this->id,
        "fullName" => $this->fullName,
        "email" => $this->email,
        "mobileNumber" => $this->mobileNumber,
        "password" => $this->password,
        "regDate" => $this->regDate
      );
    }

  }

?>