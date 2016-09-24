<?php
include "header.php";
include "login_validate.php";

?>
<center>
	<form action="" method="POST">
	<div class="form-signin text-muted" style="margin-top: 100px">
	<h2 class="form-signin-heading"> Silahkan Login!</h2>
	<table border="0px" height="150px">
	  <tr>
            <td> <input class="form-control" type="text" name="email" placeholder="Alamat e-mail Anda" ></td>
	  </tr>
	  <tr>
	    <td><input placeholder="Kata sandi Anda" class="form-control" type="password" name="password"></td>
	  </tr>
          <tr><td class="text-center text-muted">Login sebagai:</td></tr>
	  <tr>
	    <td> <select class="form-control" name="loginas"> <option>Peneliti</option> <option>Admin</option></select></td>
	  </tr>
	  <tr>
	    <td colspan="3"><center><input type="submit" value="Login" class="btn btn-lg btn-primary" name="login_btn" > </center></td>
	  </tr>
	</table>
	</div>
	<h5>Anda belum punya akun sebagai peneliti?</h5>
	Silahkan <a href="registrasi.php" style="text-decoration:none">daftar</a>
	</form>
</center>
</body>
<?php
include "footer.php";

?>
