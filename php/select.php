<?php
header('Access-Control-Allow-Origin:*'); //任意域名访问
header('Access-Control-Allow-Method:POST,GET');
header('content-type:text/html;charset=utf-8');
$conn = @new mysqli('localhost', 'root', 'root', 'huawei');
/* @include "conn"; */
/* if (isset($_POST['name'])) {

    $name = $_POST['name'];
    $result = $conn->query("SELECT * FROM select WHERE listname='$name'");
    $arr = array(); //准备一个空数组
    for ($i = 0; $i < $result->num_rows; $i++) {
        $arr[$i] = $result->fetch_assoc();
    }

    echo json_encode($arr);
} */
if (isset($_POST['name'])) {

    $name = $_POST['name'];
    $result = $conn->query("SELECT * FROM second WHERE listname='$name'");
    $arr = array(); //准备一个空数组
    for ($i = 0; $i < $result->num_rows; $i++) {
        $arr[$i] = $result->fetch_assoc();
    }

    echo json_encode($arr);
}
