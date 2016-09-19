<?php
include "header.php";
include "menu.php";
?>
<div class="atasberanda">
	<img src="../lib/img/logo_kuesioner_a.png" class="logonya" style="width:30px; float:left"> <h2 style="margin:0;padding-left:40px">Kuesioner</h2>
</div>
<div class="body2">
<h4>Silahkan lengkapi data berikut </h4>
<br>
	<form style="padding: 0 50 0 50">
	<table border="0px" height="500">
		<tr valign="top">
			<td>Judul</td><td> <textarea class="form-control" name="judul" style=" width:700px; height: 90px"> </textarea> </td>
		</tr>
		<tr valign="top">
			<td>Keterangan</td><td> <textarea  class="form-control" type="text" name="keterangan" style=" width:700px; height: 150px"> </textarea></td>
		</tr>
		<tr>
		  <td>Skala</td>
		  <td>
		    <select class="form-control" name="skala" value="<?php echo $skala; ?>" placeholder="jenis skala">
		      <option>Likert</option>
		      <option>Guttman</option>
		      <option>Rating Scale</option>
		      <option>Semantic Desferential</option>
		    </select>
                  </td>
		</tr>
	</table>
	</form>

<br>
<a href="kuesionerbag2.php" style="float:right"><button class="btn btn-lg btn-primary">Selanjutnya</button></a> 
</div>


</body>
