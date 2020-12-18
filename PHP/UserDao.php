<?php
  interface UserDao {
    function getProfile($id);
    function updateProfile($user);
    function resetPassword($user);
    function addUser($user);
    function verifyPassword($email, $password);
  }
?>