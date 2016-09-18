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

<h4>Silahkan sesuaikan template skala-nya</h4>
 <a href="kuesionerbag2.php" class="tombol2" style="float:right">Selanjutnya</a> 
 
	<div id="likert">
		<table border="1px">
			<tr>
					<td>Jumlah pilihan jawaban</td><td>:</td><td><input id="jumlik" class="form" type="text" name="jumlahlikert" style="width:50px"></td>
					
			</tr>
				<div>
					<td><input id="pilik" class="form" type="text" name="jawabanlikert" style="width:100px"></td>
				</div>
		</table>
	</div>
	
	<div id="guttman">
		<table>
			<tr>
				<td>Pilihan jawaban</td><td>:</td><td> <select class="form" name="pilihanjawab" style="width:180px" value="<?php echo $pilihanjawab; ?>" placeholder="pilihan jawaban"> 
						<option>Ya-Tidak</option>
						<option>Benar-Salah</option>
						<option>Pernah-Tidak pernah</option>
						<option>Positif-Negatif</option>
						<option>other</option></select>
				</td>
			</tr>
		</table>
	</div>
	<div id="semantic">
		
	</div>
	

</body>