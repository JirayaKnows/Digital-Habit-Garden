<?php
include 'connect.php';
if(isset($_POST['name'])){
    $name = $_POST['name'];
    $stmt = $conn->prepare("INSERT INTO habits (name) VALUES (?)");
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $stmt->close();
}
?>
