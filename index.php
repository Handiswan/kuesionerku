<?php
include "header.php";
include "reg_validate.php";
?>

<div>
<img src="lib/img/halaman.png" style="float: left; width:880px;">
</div>

<form action="" method="post" enctype="multipart/form-data">
	<div class="kotakregis">
	<h3> Silahkan lakukan pendaftaran untuk memulai menggunakan E-Questionnaire! </h3>
	<table border="0px" height="500">
		<tr>
			<td width="180px">Nama Lengkap</td><td>:</td><td> <input class="form" type="text" name="name" value="<?php echo $name; ?>" placeholder="Nama Anda"></td>
		</tr>
		<tr><td class="m_error"><?php echo $nameError;?></td></tr>
		<tr>
			<td>Email</td><td>:</td><td><input class="form" type="text" name="email" value="<?php echo $email; ?>" placeholder="E-mail"></td>
		</tr>
		<tr><td class="m_error"><?php echo $emailError;?></td></tr>
		<tr>
			<td>Password</td><td>:</td><td><input class="form" type="password" name="password" value="<?php echo $pass; ?>" placeholder="Kata sandi"></td>
		</tr>
		<tr><td class="m_error"><?php echo $passError;?></td></tr>
		<tr>
			<td>Password (lagi)</td><td>:</td><td><input class="form" type="password" name="repassword"value="<?php echo $repass; ?>" placeholder="Masukkan ulang kata sandi"></td>
		</tr><tr><td class="m_error"><?php echo $passError;?></td></tr>
		<tr>
			<td>Tanggal Lahir</td><td>:</td><td><input class="form" type="date" name="ttl" value="<?php echo $ttl; ?>" placeholder="Tanggal lahir"></td>
		</tr>
		<tr><td class="m_error"><?php echo $ttlError;?></td></tr>
		<tr>
			<td>Jenis kelamin</td><td>:</td><td> <select class="form" name="jekel" value="<?php echo $jekel; ?>" placeholder="Pilih jenis kelamin"> <option> </option><option>Laki-laki</option> <option>Perempuan</option></select></td>
		</tr>
		<tr><td class="m_error"><?php echo $jekelError;?></td></tr>
		<tr>
			<td>Alamat</td><td>:</td><td><input class="form" type="text" name="alamat" value="<?php echo $alamat; ?>" placeholder="Alamat"></td>
		</tr>
		<tr><td class="m_error"><?php echo $alamatError;?></td></tr>
		<tr>
    ?>
			<td>Kepentingan</td><td>:</td><td> <select class="form" name="kepentingan" value="<?php echo $kepentingan; ?>" placeholder="Maksud keperluan"> <option> </option><option>Organisasi</option> <option>Pribadi</option></select></td>
		</tr>
		<tr><td class="m_error"><?php echo $kepentinganError;?></td></tr>
		<tr><td><?php if(isset($_GET['success'])){ echo "Data added succesfully"; }?></td></tr>
		<tr>
			<td colspan="3"><center><input type="submit" name="btn_daftar" value="daftar" class="tombol" > </center></td>
		</tr>
	</table>
	</div>
</form>
	
<?php include "footer.php"; ?>
</body>
</html>

