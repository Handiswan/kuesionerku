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
$q_list = $PDO->prepare("SELECT * FROM kuesioner WHERE id_peneliti = ?");
echo "Ini adalah halaman kuesioner untuk para responden dengan kode " . $_GET['q'];
?>
<body>
  <div class="navbar navbar-default navbar-fixed-top">
    <a href="#"> <img src="lib/img/logo.png" style="padding: 10px; width:250px; margin-left:20px"> </a>
  </div>
<center>
 <div class="form-signin text-muted" style="margin-top: 70px">
		<h4> Selamat datang di E-Questionnaire! </h4>
		Anda akan mengisi kuesioner dari seorang peneliti.
			<?php echo $_SESSION['judul_penelitian']; ?>
		Apakah anda yakin ingin melanjutkan?
    <br>
    <button type="button" class="btn btn-primary">Ya</button>
    <button type="button" class="btn btn-primary">Tidak</button>
</div>
</center>
