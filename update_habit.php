<?php
include 'connect.php';
if(isset($_POST['id'])){
    $id = $_POST['id'];
    $stmt = $conn->prepare("UPDATE habits SET done=1 WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
}
?>
