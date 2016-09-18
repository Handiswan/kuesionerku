<?php

$name ="";
$email =""; // Sender Name
$pass =""; // Sender's email ID
$repass="";
$ttl="";
$jekel="";
$alamat="";
$kepentingan="";
$konfirmasi="0";


$nameError="";
$emailError ="";
$passError ="";
$repassError="";
$ttlError="";
$jekelError="";
$alamatError="";
$kepentinganError="";
$errors = 0;

if(isset($_POST['btn_daftar'])) {
	$name=$_POST['name'];
	$email = $_POST["email"]; // Sender Name
	$pass = $_POST["password"]; // Sender's email ID
	$repass= $_POST['repassword'];
	$ttl= $_POST['ttl'];
	$jekel= $_POST['jekel'];
	$alamat= $_POST ['alamat'];
	$kepentingan= $_POST ['kepentingan'];

	
	if (empty($_POST["name"])){
		$nameError = "User Name required";
		$errors = 1;
	}
	if(!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL))
	{
		$emailError = "E-mail is not valid";
		$errors = 1;
	}
	if (empty($_POST["password"])){
		$passError = "Password required";
		$errors = 1;
	}
	if ($_POST["password"] != $_POST["repassword"]){
		$repassError = "Repassword is no valid";
		$errors = 1;
	}
	if (empty($_POST["ttl"])){
		$ttlError = "Tanggal Lahir required";
		$errors = 1;
	}
	if (empty($_POST["jekel"])){
		$jekelError = "Jenis Kelamin required";
		$errors = 1;
	}
	if (empty($_POST["alamat"])){
		$alamatError = "Alamat required";
		$errors = 1;
	}
	if (empty($_POST["kepentingan"])){
		$kepentinganError = "Kepentingan required";
		$errors = 1;
	}
	
	if ($errors==0){
		$save_user = $PDO->prepare("INSERT INTO peneliti (nama_peneliti, email, password, ttl, jenis_kelamin, alamat, kepentingan, konfirmasi) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
		if($save_user) {
			$save_user->bindParam(1, $_POST['name']);
			$save_user->bindParam(2, $_POST['email']);
			$save_user->bindParam(3, md5($_POST['password']));
			$save_user->bindParam(4, $_POST['ttl']);
			$save_user->bindParam(5, $_POST['jekel']);
			$save_user->bindParam(6, $_POST['alamat']);
			$save_user->bindParam(7, $_POST['kepentingan']);
			$save_user->bindParam(8, $konfirmasi);
			if($save_user->execute()) {
				header("location: " . $homepage . "/index.php?success");
				exit();
			}
		}
	}
}
?>