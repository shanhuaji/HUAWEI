<?php


header('content-type:text/html;charset=utf-8');
$conn = @new mysqli('127.0.0.1', 'root', 'root', 'huawei');
/* 登录注册 */
if ($_GET['sid']) {

    $sid = $_GET['sid'];
    $result = $conn->query("SELECT * FROM signup");
    $arr = array(); //准备一个空数组
    for ($i = 0; $i < $result->num_rows; $i++) {
        $arr[$i] = $result->fetch_assoc();
    }

    echo json_encode($arr);
}
