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
    var jenis_skala = '<?php echo $r['jenis_skala']; ?>';
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
  <div class="row" style="margin:0" id='boxJawaban'>
    <?php
    // pengulangan jawaban untuk likert
    if ($r['jenis_skala'] == 'likert') {
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
          echo "<ul id='daftarJawaban' class='daftar-jawaban'>";
          while($row = $m->fetch(PDO::FETCH_ASSOC)) {
            echo "<li>" . $row['keterangan'] . "</li>";
            // echo "hool";
          }
          echo "</ul>";
        }
      } else {
        // echo "persiapan gagal";
      }
    } else if ($r['jenis_skala'] == 'guttman') {
      $s = $PDO->prepare("SELECT * FROM q_gutman_pilihan WHERE kuesioner_id = ?");
      if ($s) {
        $s->bindParam(1, $r['id_kuesioner']);
        if ($s->execute()) {
          $d_jawaban_a = [];
          $d_jawaban_b = [];
          while($daftar = $s->fetch(PDO::FETCH_ASSOC)) {
            $d_jawaban_a[] = $daftar['keterangan_a'];
            $d_jawaban_b[] = $daftar['keterangan_b'];
          }
          // print_r($d_jawaban_a);
          // print_r($d_jawaban_b);
          echo "<script type='text/javascript' language='javascript'>";
          echo "var jawaban_a = new Array();";
          echo "var jawaban_b = new Array();";
          foreach($d_jawaban_a as $key => $value) {
            echo "jawaban_a.push('$value');";
          }
          foreach($d_jawaban_b as $key => $value) {
            echo "jawaban_b.push('$value');";
          }
          echo "</script>";
        }
        // tampilkan html
        echo "<ul id='daftarJawaban' class='daftar-jawaban'>";
        echo "<li>$d_jawaban_a[0]</li>";
        echo "<li>$d_jawaban_b[0]</li>";
        echo "</ul>";
      }
    } else if ($r['jenis_skala'] == 'rating') {
      // echo "ini skala ratin loh";
      $s = $PDO->prepare("SELECT * FROM q_rating_pilihan WHERE kuesioner_id = ?");
      if ($s) {
        $s->bindParam(1, $r['id_kuesioner']);
        if ($s->execute()) {
          $rs = $s->fetch(PDO::FETCH_ASSOC);
          $interval = floor(($rs['nilai_max'] - $rs['nilai_min']) / 4);
          $nilai_a = $rs['nilai_min'];
          $nilai_b = $nilai_a + $interval;
          $nilai_c = $nilai_a + ($interval * 2);
          $nilai_d = $rs['nilai_max'];
          // print_r($rs);
          echo "<ul id='daftarJawaban' class='daftar-jawaban'>";
          echo "<li>" . $nilai_a . "</li>";
          echo "<li>" . $nilai_b . "</li>";
          echo "<li>" . $nilai_c . "</li>";
          echo "<li>" . $nilai_d . "</li>";
          echo "</li>";
          echo "</ul>";
        }
      }
    } else if ($r['jenis_skala'] == 'semantic') {
      $q = $PDO->prepare("SELECT * FROM q_semantik_pilihan WHERE kuesioner_id = ?");
      if ($q) {
        $q->bindParam(1, $r['id_kuesioner']);
        if ($q->execute()) {
          $d_jawaban_a = [];
          $d_jawaban_b = [];
          $d_nilai_a = [];
          $d_nilai_b = [];
          $interval = [];
          while($daftar = $q->fetch(PDO::FETCH_ASSOC)) {
            $dalam_interval = [];
            for ($i = 0; $i < 5; $i++) {
              $selisih = floor(($daftar['nilai_max'] - $daftar['nilai_min']) / 5);
              if ($i == 0) {
                $dalam_interval[] = $daftar['nilai_min'];
              } else if ($i == 4) {
                $dalam_interval[] = $daftar['nilai_max'];
              } else {
                $dalam_interval[] = $daftar['nilai_min'] + ($selisih * $i);
              }
            }
            $d_jawaban_a[] = $daftar['label_min'];
            $d_jawaban_b[] = $daftar['label_max'];
            $d_nilai_a[] = $daftar['nilai_min'];
            $d_nilai_b[] = $daftar['nilai_max'];
            $interval[] = $dalam_interval;
          }
          //echo "<pre>";
          //print_r($d_jawaban_a);
          //print_r($d_jawaban_b);
          //print_r($d_nilai_a);
          //print_r($d_nilai_b);
          // print_r($interval);
          //echo "</pre>";
          echo "<script type='text/javascript' language='javascript'>";
          echo "var jawaban_a = new Array();";
          echo "var jawaban_b = new Array();";
          echo "var nilai_a = new Array();";
          echo "var nilai_b = new Array();";
          echo "var interval = new Array();";
          foreach($d_jawaban_a as $key => $value) {
            echo "jawaban_a.push('$value');";
          }
          foreach($d_jawaban_b as $key => $value) {
            echo "jawaban_b.push('$value');";
          }
          foreach($d_nilai_a as $key => $value) {
            echo "nilai_a.push('$value');";
          }
          foreach($d_nilai_b as $key => $value) {
            echo "nilai_b.push('$value');";
          }
          foreach($interval as $key => $value) {
            echo "interval.push(" . json_encode($value) . ");";
          }
          echo "</script>";
          // tampilkan html nya
          echo "<ul id='daftarJawaban' class='daftar-jawaban-semantic'>";
          echo "<li style='overflow:auto'>";
          echo "<div id='jawaban_a' class='boks-semantic' style='border-color:#fff'>" . $d_jawaban_a[0] . "</div>";
          $i = 0;
          foreach ($interval[0] as $key => $value) {
            echo "<div id='interval_" . $i . "' class='boks-semantic omob'>" . $value . "</div>";
            $i++;
          }
          echo "<div id='jawaban_b' class='boks-semantic' style='border-color:#fff'>" . $d_jawaban_b[0] . "</div>";
          /*
          echo "<span style='float:left'>" . $d_jawaban_a[0] . " (" . $d_nilai_a[0] . ")</span>";
          echo "<input type='range' id='batasan' min='" . $d_nilai_a[0] . "' max='" . $d_nilai_b[0] . "'>";
          echo "<span style='float:right'>" . $d_jawaban_b[0] . " (" . $d_nilai_b[0] . ")</span>";
          */
          echo "</li>";
          echo "</ul>";
        }
      }
    }
    ?>
    <div onclick="pratinjau.berikutnya()" id="berikutnya" class="pratinjau-lainnya">Berikutnya</div>
  </div>
</body>
</html>
