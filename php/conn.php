<?php

define('HOST', 'localhost');
define('USERNAME', 'root');
define('PASSWORD', 'root');
define('DBNAME', 'taobao');

$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);

if($conn->connect_error){
	die('数据库连接失败');
}

// 设置中文编码
$conn->query('SET NAMES UTF8');


