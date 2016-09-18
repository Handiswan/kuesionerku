<body bgcolor="CDE6F7">
<?php
include "header.php";
include "login_validate.php";

?>
<center>
	<form action="" method="POST">
	<div class="kotak">
	<h4> Silahkan Login!</h4> <br> <br>
	<table border="0px" height="150px">
		<tr>
			<td><i>E-mail</i></td><td>:</td><td> <input class="form" type="text" name="email"></td>
		</tr>
		<tr>
			<td>Password</td><td>:</td><td><input class="form" type="password" name="password"></td>
		</tr>
		<tr>
			<td>Login sebagai</td><td>:</td><td> <select class="form" name="loginas"> <option>Admin</option> <option> Peneliti </option></select></td>
		</tr>
		<tr>
			<td colspan="3"><center><input type="submit" value="Login" class="tombol" name="login_btn" > </center></td>
		</tr>
	</table>
	</div>
	</form>
</body>
<?php
?>