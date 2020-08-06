<?php
header('Access-Control-Allow-Origin:*'); //任意域名访问
header('Access-Control-Allow-Method:POST,GET');
/* $ban = $_POST['banner']; */
header('content-type:text/html;charset=utf-8');
$conn = @new mysqli('127.0.0.1', 'root', 'root', 'huawei');
if ($_POST['banner']) {
    $result = $conn->query("SELECT * FROM banner WHERE name = 'ban'");
    $arr = array(); //准备一个空数组
    for ($i = 0; $i < $result->num_rows; $i++) {
        $arr[$i] = $result->fetch_assoc();
    }

    echo json_encode($arr);
}
/* 手机 */
if ($_POST['phone']) {
    $result = $conn->query("SELECT * FROM banner WHERE name = 'allphone'");
    $arr = array(); //准备一个空数组
    for ($i = 0; $i < $result->num_rows; $i++) {
        $arr[$i] = $result->fetch_assoc();
    }

    echo json_encode($arr);
}


/* sid */
if ($_GET['sid']) {

    $sid = $_GET['sid'];
    $result = $conn->query("SELECT * FROM banner WHERE Id='{$sid}'");
    $arr = array(); //准备一个空数组
    for ($i = 0; $i < $result->num_rows; $i++) {
        $arr[$i] = $result->fetch_assoc();
    }

    echo json_encode($arr);
}

/* 二级菜单 */
if ($_POST['name']) {

    $name = $_POST['name'];
    $result = $conn->query("SELECT * FROM banner WHERE listname='{$name}'");
    $arr = array(); //准备一个空数组
    for ($i = 0; $i < $result->num_rows; $i++) {
        $arr[$i] = $result->fetch_assoc();
    }

    echo json_encode($arr);
}
/* 购物车 */
if ($_POST["id"]) {
    $id = $_POST['id'];
    $result = $conn->query("SELECT * FROM banner");
    // $result = $conn->query("SELECT * FROM banner WHERE Id='{$id}'");
    $arr = array(); //准备一个空数组
    for ($i = 0; $i < $result->num_rows; $i++) {

        $arr[$i] = $result->fetch_assoc();
    }

    echo json_encode($arr);
};
