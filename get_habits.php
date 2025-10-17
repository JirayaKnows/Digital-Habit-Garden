<?php
include 'connect.php';
$result = $conn->query("SELECT * FROM habits");
$habits = [];
while($row = $result->fetch_assoc()) $habits[] = $row;
echo json_encode($habits);
?>