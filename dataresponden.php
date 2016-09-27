<html>
<head>
  <title>Kuesioner</title>
  <link rel="stylesheet" type="text/css" href="lib/style.css">
  <link rel="stylesheet" type="text/css" href="lib/css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href="lib/css/bootstrap-theme.css">
  <link rel="stylesheet" type="text/css" href="lib/jquery-ui-1.12.1/jquery-ui.css">
  <link rel="stylesheet" type="text/css" href="lib/jquery-ui-1.12.1/jquery-ui.theme.css">

  <script src="lib/js/jquery-3.1.0.min.js" type="text/javascript"></script>
  <script src="lib/js/kuesioner.js" type="text/javascript"></script>
  <script src="lib/jquery-ui-1.12.1/jquery-ui.js"></script>
</head>

<?php
include "config.php";
$get_kuesioner = $PDO->prepare("SELECT * FROM kuesioner WHERE url = ?");
if($get_kuesioner) {
	$get_kuesioner->bindParam (1, $_GET ['k']);
	$get_kuesioner->execute();
	$row_get_kuesioner =$get_kuesioner->fetch(PDO::FETCH_ASSOC);
	// print_r($row_get_kuesioner);
	}

// echo "Ini adalah halaman kuesioner untuk para responden dengan kode " . $_GET['q'];
?>
<body>
  <div class="navbar navbar-default navbar-fixed-top">
    <a href="index.php"> <img src="lib/img/logo.png" style="padding: 10px; width:250px; margin-left:20px"> </a>
  </div>
<center>
 <div class="form-signin text-muted" style="margin-top: 70px">
		<h4>Silahkaan lengkapi data Anda!</h4>
		<br>
<?php
// dapatkan data dari tabel form_isian di basis data
$q = $PDO->prepare("SELECT * FROM form_isian WHERE kuesioner_id = ?");
if ($q) {
  $q->bindParam(1, $row_get_kuesioner['id_kuesioner']);
  $q->execute();
  echo "<ul>";
  $i = 1;
  while($hasil = $q->fetch(PDO::FETCH_ASSOC)) {
    echo "<li>";
    echo "" . $hasil['keterangan'] . "";
    if ($hasil['tipe'] == 'gender') {
      echo "<select id='bio_$i' class='form-control' name='" . $hasil['keterangan'] . "'>";
      echo "<option value='L'>Laki-Laki</option><option value='P'>Perempuan</option>";
      echo "</select>";
    } else {
      echo "<input id='bio_$i' style='width: 300px' name='" . $hasil['keterangan'] . "' type='";
      switch($hasil['tipe']) {
        case "angka":
          echo "number' min='10";
        break;
        case "text":
          echo "text";
        break;
        case "tanggal":
          echo "date";
        break;
      }
      echo "' class='form-control'>";
    }
    echo "</li>";
    $i++;
  }
  echo "</ul>";
}

?>
		1.Nama
		2.Jenis Kelamin
		3.Umur, dll (Sesuai yang diminta di atas)
		<br>
		Apakah Data yang anda masukkan sudah benar?
		Klik Lanjutkan untuk mengisi pertanyaan!
    <br>
    <a href="kuesioner.php"> <button type="button" class="btn btn-primary">Kembali</button></a>
    <button onclick="kuesioner.simpanDataResponden()" type="button" class="btn btn-primary">Lanjutkan dan Mulai Kuesioner</button>
</div>
<div id='dialogInfo'></div><div id='dialogHapus'></div>
<?php
?>
</center>
