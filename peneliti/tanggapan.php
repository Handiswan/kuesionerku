<head>
<script type="text/javascript" src="../lib/style.js"></script>
</head>
<body onload="responden2_button()">
<?php
include "header.php";
include "menu.php";
?>
<div class="atasberanda">
	 <h4> <span class="glyphicon glyphicon glyphicon-list-alt" aria-hidden="true"> </span> Tanggapan </h4>
</div>
<div class="body2">
  <h5 class="a">Silahkan pilih kuesioner!</h5>

<select class="form-control" value="<?php echo $kuesioner; ?>" placeholder="Pilih"></select>

<br>

  <div class="">
  </div>
  <a href="#" style="float:left"><div class="btn btn-group btn-primary">Tampilkan Individu</div></a>
   <a href="#" style="float:left"><div class="btn btn-group btn-primary">Tampilkan Kelompok</div></a>
</div>


</body>