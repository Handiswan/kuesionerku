<?php

$email =""; // Sender Name
$pass =""; // Sender's email ID

$emailError ="";
$passError ="";
$errors = 0;
$as=$_POST["loginas"];
if(isset($_POST['login_btn'])) { // Checking null values in message.
	$email = $_POST["email"]; // Sender Name
	$pass = $_POST["password"]; // Sender's email ID
	
	//echo $as ;
	if(empty($_POST["email"]))
	{
		$emailError = "Email is not valid";
		$errors = 1;
	}
	if (empty($_POST["password"])){
		$passError = "Password required";
		$errors = 1;
	}
	if($errors==0){
		if ($as=="Admin") {
		$check_login2 = $PDO->prepare("SELECT * FROM admin WHERE user = ? AND password = ?");
		if($check_login2) {
			$check_login2->bindParam(1, $_POST['email']);
			$check_login2->bindParam(2, $_POST['password']);
			$check_login2->execute();
			$check_login2_count = $check_login2->rowCount();
			$row_check_login2 = $check_login2->fetch(PDO::FETCH_ASSOC);
			// echo "hasil " . $check_login2_count;
			if($check_login2_count == 1) {
				$_SESSION['admin'] = $row_check_login2['user'];
				$_SESSION['password'] = $row_check_login2['password'];
				// $_SESSION['id_client'] = $row_check_login2['id'];
				header("location: " . $homepage . "/admin/index.php");
			}	
		}
		}
		if ($as=="Peneliti") {
		$check_login1 = $PDO->prepare("SELECT * FROM peneliti WHERE email = ? AND password = ?");
		if($check_login1) {
			$check_login1->bindParam(1, $_POST['email']);
			$check_login1->bindParam(2, md5($_POST['password']));
			$check_login1->execute();
			$check_login1_count = $check_login1->rowCount();
			$row_check_login1 = $check_login1->fetch(PDO::FETCH_ASSOC);
			// echo "hasil " . $check_login_count;
			if($check_login1_count == 1) {
				$_SESSION['peneliti'] = $row_check_login1['email'];
				$_SESSION['pass_peneliti'] = $row_check_login1['password'];
				$_SESSION['id_peneliti'] = $row_check_login1['id_peneliti'];
				$_SESSION['nama_peneliti'] = $row_check_login1['nama_peneliti'];
				header("location: " . $homepage . "/peneliti/index.php");
			}
		}	
		}
	}
}	
?>