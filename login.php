<body bgcolor="CDE6F7">
<?php
include "header.php";
include "login_validate.php";

?>
<center>
	<form action="" method="POST">
	<div class="form-signin">
	<h2 class="form-signin-heading"> Silahkan Login!</h2>
	<table border="0px" height="150px">
		<tr>
			<td> <input class="form-control" type="text" name="email" placeholder="e-mail" ></td>
		</tr>
		<tr>
			<td><input class="form-control" type="password" name="password"></td>
		</tr>
		<tr>
		<td> <select class="form-control" name="loginas"> <option>Admin</option> <option> Peneliti </option></select></td>
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