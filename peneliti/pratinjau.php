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
    $d_pernyataan = [];
    while($daftar = $s->fetch(PDO::FETCH_ASSOC)) {
      $d_pernyataan[] = $daftar['pertanyaan'];
    }
    $jumlah_pernyataan = $s->rowCount();
    $pernyataan = $s->fetch(PDO::FETCH_ASSOC);
    // echo sizeof($pernyataan);
    for($i = 0; $i < sizeof($pernyataan); $i++) {
      echo $pernyataan[$i];
    }
    print_r($pernyataan);
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
  <script type="text/javascript" language="javascript">
    var pertanyaan = new Array();
    <?php
    foreach($d_pernyataan as $key => $value) {
    ?>
      pertanyaan.push("<?php echo $value; ?>");
    <?php
    }
    echo "var halaman_utama = '" . $homepage . "';";
    ?>
    $(document).ready(function() {
      $("#pertanyaan").html(pertanyaan[0]);
    });
  </script>
</head>
<body>
  <div class="kop-judul header">
    <img src="../lib/img/logo.png" style="height:100%"> -- Pratinjau
  </div>
  <div class="row" style="margin:0">
    <div class="col-md-10"></div>
    <div class="col-md-2"><div class="jumlah-soal"><span id="saat_ini">1</span>/<span id="total"><?php echo $jumlah_pernyataan; ?></span></div></div>
  </div>
  <div class="row" style="margin:0">
    <div id="pertanyaan" class="col-md-12 pertanyaan"></div>
  </div>
  <div class="row" style="margin:0">
    <?php
    // Ambil data dari tabel q_liker terlebih dahulu
    $q_liker = $PDO->prepare("SELECT * FROM q_liker WHERE kuesioner_id = ?");
    if($q_liker) {
      $q_liker->bindParam(1, $r['id_kuesioner']);
      if($q_liker->execute()) {
        $hasil_q_liker = $q_liker->fetch(PDO::FETCH_ASSOC);
        // kita sudah dapat nilai dari q_liker_id
        // print_r($hasil_q_liker);
      }
    }

    // echo $pernyataan['f_or_uf'];
    if ($pernyataan['f_or_uf'] == 'f') {
      $m = $PDO->prepare("SELECT * FROM q_liker_pilihan_f WHERE q_liker_id = ?");
    } else {
      $m = $PDO->prepare("SELECT * FROM q_liker_pilihan_uf WHERE q_liker_id = ?");
    }

    if($m) {
      // echo "persiapan berhasil";
      $m->bindParam(1, $hasil_q_liker['id_liker']);
      if($m->execute()) {
        echo "<ul class='daftar-jawaban'>";
        while($row = $m->fetch(PDO::FETCH_ASSOC)) {
          echo "<li>" . $row['keterangan'] . "</li>";
          // echo "hool";
        }
        echo "</ul>";
      }
    } else {
      // echo "persiapan gagal";
    }
    ?>
    <div onclick="pratinjau.berikutnya()" id="berikutnya" class="pratinjau-lainnya">Berikutnya</div>
  </div>
</body>
</html>
