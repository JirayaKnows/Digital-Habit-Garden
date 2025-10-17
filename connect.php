<?php
$servername = "sql103.infinityfree.com";      // MySQL Hostname
$username = "if0_40189174";                   // MySQL Username
$password = "3xid6qokg4Flq";                  // MySQL Password
$dbname = "if0_40189174_digitalhabitgarden";  // MySQL Database Name 

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
