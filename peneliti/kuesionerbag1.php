<body bgcolor="CDE6F7">
<head>
<script type="text/javascript" src="../lib/style.js"></script>
</head>
<body onload="kuesioner2_button()">
<?php
include "header.php";
include "menu.php";
?>
<div class="atasberanda">
	<img src="../lib/img/logo_kuesioner_a.PNG" class="logonya" style="width:30px; float:left"> <h2>Kuesioner</h2>
</div>
<div class="body2">
<h4>Silahkan lengkapi data berikut </h4>
<br>
	<form style="padding: 0 50 0 50">
	<table border="0px" height="500">
		<tr valign="top">
			<td>Judul</td><td>:</td><td> <textarea class="form" name="judul" style=" width:700px; height: 90px"> </textarea> </td>
		</tr>
		<tr valign="top">
			<td>Keterangan</td><td>:</td><td> <textarea  class="form" type="text" name="keterangan" style=" width:700px; height: 150px"> </textarea></td>
		</tr>
		<tr>
			<td>Skala</td><td>:</td><td> <select class="form" name="skala" value="<?php echo $skala; ?>" placeholder="jenis skala"> <option> </option><option>Likert</option> <option>Guttman</option> <option>Rating Scale</option> <option>Semantic Desferential</option><option>Guttman</option></select></td>
		</tr>
	</table>
	</form>

<br>
<a href="kuesionerbag2.php" class="tombol2" style="float:right">Selanjutnya</a> 
</div>


</body>