<?php
include "conn.php";


//检测用户名是否重名
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    $result = $conn->query("select * from admins where username='$user'");
   
    if ($result->fetch_assoc()) { //存在
        echo true; //1
    } else {
        echo false; //空
    }
}

//接收前端表单提交的数据
if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = sha1($_POST['password']);
    $repass = sha1($_POST['repass']);
    $email = $_POST['email'];
    $tel = $_POST['tel'];
    var_dump($tel);
    $conn->query("insert admins values(null,'$username','$password','$repass','$email','$tel',NOW())");
   echo 'ok';
    header('location:http://localhost/JS_2002/xiaomi/src/login.html');
}
