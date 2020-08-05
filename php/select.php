<?php
header('content-type:text/html;charset=utf-8');
$conn = @new mysqli('127.0.0.1', 'root', 'root', 'huawei');

/* if ($_POST['name']) {

    $name = $_POST['name'];
    $result = $conn->query("SELECT * FROM select WHERE listname='$name'");
    $arr = array(); //准备一个空数组
    for ($i = 0; $i < $result->num_rows; $i++) {
        $arr[$i] = $result->fetch_assoc();
    }

    echo json_encode($arr);
} */
if ($_POST['name']) {

    $name = $_POST['name'];
    $result = $conn->query("SELECT * FROM second WHERE listname='$name'");
    $arr = array(); //准备一个空数组
    for ($i = 0; $i < $result->num_rows; $i++) {
        $arr[$i] = $result->fetch_assoc();
    }

    echo json_encode($arr);
}
