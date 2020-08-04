<?php
// 设置字符编码。
header('content-type:text/html;charset=utf-8');
/* 二级菜单数据 */
if ($_POST['name']) {
    $name = $_POST['name'];
    $conn = @new mysqli('127.0.0.1', 'root', 'root', 'huawei');
    // $result = $conn->query("SELECT * FROM banner WHERE Id='{$sid}'");
    $result = $conn->query("SELECT * FROM secounds WHERE name='{$name}'");
    $arr = array(); //准备一个空数组
    for ($i = 0; $i < $result->num_rows; $i++) {
        $arr[$i] = $result->fetch_assoc();
    }

    echo json_encode($arr);
}

/* 详情页数据 */
if ($_POST['names']) {

    $names = $_POST['names'];
    $conn = @new mysqli('127.0.0.1', 'root', 'root', 'huawei');
    $result = $conn->query("SELECT * FROM secounds WHERE names='{$names}'");

    $arr = array(); //准备一个空数组
    for ($i = 0; $i < $result->num_rows; $i++) {
        $arr[$i] = $result->fetch_assoc();
    }

    echo json_encode($arr);
}
