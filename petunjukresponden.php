<html>
<head>
  <title>Kuesioner</title>
  <link rel="stylesheet" type="text/css" href="lib/style.css">
  <link rel="stylesheet" type="text/css" href="lib/css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href="lib/css/bootstrap-theme.css">
  <script src="lib/js/jquery-3.1.0.min.js"></script>
</head>



<?php
include "config.php";
$get_kuesioner = $PDO->prepare("SELECT * FROM kuesioner WHERE url = ?");
if($get_kuesioner) {
	$get_kuesioner->bindParam (1, $_GET ['q']);
	$get_kuesioner->execute();
	$row_get_kuesioner =$get_kuesioner->fetch(PDO::FETCH_ASSOC);
	print_r($row_get_kuesioner);
	}

echo "Ini adalah halaman kuesioner untuk para responden dengan kode " . $_GET['q'];
?>
<body>
  <div class="navbar navbar-default navbar-fixed-top">
    <a href="index.php"> <img src="lib/img/logo.png" style="padding: 10px; width:250px; margin-left:20px"> </a>
  </div>
<center>
 <div class="form-signin text-muted" style="margin-top: 70px">
		<h4>Silahkan baca petunjuk pengisian!</h4>
		<br>

		<br>
		Apakah Anda sudah paham?
		Klik Lanjutkan untuk menuju tahap berikutnya!
    <br>
    <a href="kuesioner.php?k=<?php echo $_GET['k']; ?>"> <button type="button" class="btn btn-primary">Kembali</button></a>
    <a href="dataresponden.php?k=<?php echo $_GET['k']; ?>"> <button type="button" class="btn btn-primary">Lanjutkan</button>
</div>
<?php
?>
</center>
