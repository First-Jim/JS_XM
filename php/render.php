<?php
header('content-type:text/html;charset=utf-8');
define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','root');
define('DBNAME','taobao');
$conn = new mysqli(HOST,USERNAME,PASSWORD,DBNAME);

if($conn->connect_errno){
    die('数据库连接错误'.$conn->connect_errno);
}

$sql = "SELECT * FROM taobaogoods";

$result = $conn->query($sql);
// print_r($result->fetch_assoc());

$arr = Array();

for($i=0;$i<$result->num_rows;$i++){
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);

    // http://localhost/JS_2002/007/2.render.php

    $conn->close();
?>