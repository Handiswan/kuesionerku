<?php
include "../config.php";
$q = $PDO->prepare("SELECT * FROM kuesioner WHERE url = ?");
if ($q) {
  $q->bindParam(1, $_GET['k']);
  if($q->execute()) {
    $r = $q->fetch(PDO::FETCH_ASSOC);
  }
}

// dapatkan jumlah pertanyaan/pernyataan berdasarkan kuesionernya
$s = $PDO->prepare("SELECT * FROM soal WHERE id_kuesioner = ?");
if ($s) {
  $s->bindParam(1, $r['id_kuesioner']);
  if ($s->execute()) {
    $jumlah_pernyataan = $s->rowCount();
    $pernyataan = $s->fetch(PDO::FETCH_ASSOC);
  } else {
    echo "Tidak bisa mengeksekusi";
  }
}

?>
<html>
<head>
  <title><?php echo $r['judul_penelitian']; ?></title>
  <link rel="stylesheet" type="text/css" href="../lib/style.css">
  <link rel="stylesheet" type="text/css" href="../lib/css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href="../lib/css/bootstrap-theme.css">
  <link rel="stylesheet" type="text/css" href="../lib/animate.css/animate.min.css">
  <link rel="stylesheet" type="text/css" href="../lib/jquery-ui-1.12.1/jquery-ui.css">
  <link rel="stylesheet" type="text/css" href="../lib/jquery-ui-1.12.1/jquery-ui.theme.css">
  <script src="../lib/js/jquery-3.1.0.min.js"></script>
  <script src="../lib/js/kuesioner.js"></script>
  <script src="../lib/js/bootstrap.js"></script>
  <script src="../lib/jquery-ui-1.12.1/jquery-ui.js"></script>
</head>
<body>
  <div class="kop-judul">
    <?php echo $r['judul_penelitian']; ?>
  </div>
  <div class="row" style="margin:0">
    <div class="col-md-10"></div>
    <div class="col-md-2"><div class="jumlah-soal">1/<?php echo $jumlah_pernyataan; ?></div></div>
  </div>
  <div class="row" style="margin:0">
    <div class="col-md-12 pertanyaan"><?php echo $pernyataan['pertanyaan']; ?></div>
  </div>
  <div class="row" style="margin:0">
    <?php
    // Ambil data dari tabel q_liker terlebih dahulu
    $q_liker = $PDO->prepare("SELECT * FROM q_liker WHERE kuesioner_id = ?");
    if ($pernyataan['f_or_uf'] == 'u') {
      $m = $PDO->preapre("SELECT * FROM q_liker_pilihan_f WHERE ");
    } else {
      # code...
    }

    $m = $PDO->prepare("SELECT * FROM ")
    ?>
  </div>
</body>
</html>
