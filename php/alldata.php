<?php
  //需要服务器(提供接口的源码里面)添加下面两句话。
header('Access-Control-Allow-Origin:*');  //允许跨域的网址，*所有的网址。
header('Access-Control-Allow-Method:POST,GET'); //允许跨域的请求方式。
include "conn.php";
$sql = "select * from goods"; //获取所有的数据
$result = $conn->query($sql); //获取数据的结果集(记录集)
$arr = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $arr[$i] = $result->fetch_assoc();
}
echo json_encode($arr);//输出接口
