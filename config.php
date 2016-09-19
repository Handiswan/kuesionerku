<?php
session_start();
$host = "localhost";
$user = "root";
$pass = "";
$database = "kuesioner";
$homepage = "http://localhost/coba";

// !Pengaturan tampilan error dengan error_reporting
ini_set('display_errors',0);

// !Koneksi ke database pakai PDO
try {
	$PDO = new PDO("mysql:host=$host;dbname=$database", $user, $pass);
	// echo "koneksi berhasil";
} catch(PDOException $e) {
	echo "Tidak dapat terhubung ke databse, periksa koneksi";
}
?>
