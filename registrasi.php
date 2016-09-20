<?php
include "header.php";
include "reg_validate.php";
?>
<center>
	<div>
    <form action="" method="post" enctype="multipart/form-data">
	<div class="form-signin text-muted">
	<h3> Silahkan lengkapi data berikut! </h3>
	<table border="0px" height="500">
		<tr>
			<td width="180px">Nama Lengkap</td><td>:</td><td> <input class="form-control" type="text" name="name" value="<?php echo $name; ?>" placeholder="Nama Anda"></td>
		</tr>
		<tr><td class="m_error"><?php echo $nameError;?></td></tr>
		<tr>
			<td>Email</td><td>:</td><td><input class="form-control" type="text" name="email" value="<?php echo $email; ?>" placeholder="E-mail"></td>
		</tr>
		<tr><td class="m_error"><?php echo $emailError;?></td></tr>
		<tr>
			<td>Password</td><td>:</td><td><input class="form-control" type="password" name="password" value="<?php echo $pass; ?>" placeholder="Kata sandi"></td>
		</tr>
		<tr><td class="m_error"><?php echo $passError;?></td></tr>
		<tr>
			<td>Password (lagi)</td><td>:</td><td><input class="form-control" type="password" name="repassword"value="<?php echo $repass; ?>" placeholder="Masukkan ulang kata sandi"></td>
		</tr><tr><td class="m_error"><?php echo $passError;?></td></tr>
		<tr>
			<td>Tanggal Lahir</td><td>:</td><td><input class="form-control" type="date" name="ttl" value="<?php echo $ttl; ?>" placeholder="Tanggal lahir"></td>
		</tr>
		<tr><td class="m_error"><?php echo $ttlError;?></td></tr>
		<tr>
			<td>Jenis kelamin</td><td>:</td><td> <select class="form-control" name="jekel" value="<?php echo $jekel; ?>" placeholder="Pilih jenis kelamin"> <option>Laki-laki</option> <option>Perempuan</option></select></td>
		</tr>
		<tr><td class="m_error"><?php echo $jekelError;?></td></tr>
		<tr>
			<td>Alamat</td><td>:</td><td><input class="form-control" type="text" name="alamat" value="<?php echo $alamat; ?>" placeholder="Alamat"></td>
		</tr>
		<tr><td class="m_error"><?php echo $alamatError;?></td></tr>
		<tr>
	        <td>Kepentingan</td><td>:</td><td> <select class="form-control" name="kepentingan" value="<?php echo $kepentingan; ?>" placeholder="Maksud keperluan"><option>Organisasi</option> <option>Pribadi</option></select></td>
		</tr>
		<tr><td class="m_error"><?php echo $kepentinganError;?></td></tr>
		<tr><td><?php if(isset($_GET['success'])){ echo "Data added succesfully"; }?></td></tr>
		<tr>
		<td colspan="3"><center><input type="submit" name="btn_daftar" value="Daftar" class="btn btn-lg btn-primary"> </center></td>
		</tr>
	</table>
	</div>
    </form>	
  </div>