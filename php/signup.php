<?php

header('Access-Control-Allow-Origin:*'); //任意域名访问
header('Access-Control-Allow-Method:POST,GET');
header('content-type:text/html;charset=utf-8');

$conn = @new mysqli('localhost', 'root', 'root', 'huawei');
/* @include "conn"; */
/* 注册 */
if (isset($_POST['text'])) {
    $text = $_POST['text'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $pass = $_POST['pass'];
    $conn->query("insert signup values(null,'$text','$email','$phone','$pass')");
}

/* 注册 */
if (isset($_POST['textNum'])) {

    $textNum = $_POST['textNum'];
    $result = $conn->query("SELECT * FROM signup WHERE text='$textNum'");
    $arr = array(); //准备一个空数组
    for ($i = 0; $i < $result->num_rows; $i++) {
        $arr[$i] = $result->fetch_assoc();
    }

    echo json_encode($arr);
}
