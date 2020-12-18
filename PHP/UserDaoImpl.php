<?php
  include_once 'User.php';
  include_once 'UserDao.php';
  include_once 'UserDaoImpl.php';
  include_once 'JdbcUtil.php';

  class UserDaoImpl implements UserDao {
    function getProfile($id) {
      $connection = JdbcUtil::getConnection();

      $sql = "select * from tbluser where ID = ?";
      $statement = $connection->prepare($sql);

      $statement->bind_param('i', $id);

      $user = null;
      if($statement->execute()) {
        $statement->bind_result($id, $fullName, $email, $mobileNumber, $password, $regDate);
        if($statement->fetch()) {
          $user = new User($id, $fullName, $email, $mobileNumber, $password, $regDate);
        }
      }

      $connection->close();
      return $user;
    }
    function updateProfile($user) {
        $id = $user->getId();
        $fullName = $user->getFullName();
        $mobileNumber = $user->getMobileNumber();

        
        $connection = JdbcUtil::getConnection();
        $sql = 'update tbluser set FullName = ?, MobileNumber = ? where ID = ?';

        $statement = $connection->prepare($sql);
        $statement->bind_param('sii', $fullName, $mobileNumber, $id);

        $statement->execute();

        print_r($statement);
        $connection->close();
    }

    function resetPassword($user) {
      $id = $user->getId();
      $password = $user->getPassword();

      $connection = JdbcUtil::getConnection();
      $sql = 'update tbluser set Password = ? where ID = ?';

      $statement = $connection->prepare($sql);
      $statement->bind_param('si', $password, $id);

      $statement->execute();

      $connection->close();
    }

    function addUser($user) {
      $fullName = $user->getFullName();
      $mobileNumber = $user->getMobileNumber();
      $password = $user->getPassword();
      $email = $user->getEmail();

      $connection = JdbcUtil::getConnection();
      $sql = 'insert into tbluser(FullName, Email, MobileNumber, Password) values(?,?,?,?)';

      $statement = $connection->prepare($sql);
      $statement->bind_param('ssis', $fullName, $email, $mobileNumber, $password);
      $statement->execute();
      $n = $connection->insert_id;


      $connection->close();
      return $n;

    }

    function verifyPassword($email, $password) {
      $connection = JdbcUtil::getConnection();
      $sql = 'select Password, ID from tbluser where Email = ?';

      $statement=$connection->prepare($sql);
      $statement->bind_param('s', $email);

      if($statement->execute()) {
        $statement->bind_result($pswrd, $id);
        if($statement->fetch()) {
          if($password == $pswrd) {
            $connection->close();
            return $id;
          }
        }
      }
    }
  }

?>