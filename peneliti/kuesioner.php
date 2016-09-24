<?php
include "header.php";
include "menu.php";
?>
<div class="atasberanda col-md-10" style="position:fixed;z-index:9">
	 <h4>
		 <span class="glyphicon glyphicon-list" aria-hidden="true"></span> Kuesioner
	 </h4>
</div>
<div class="body2">
  <h2 class="a">DAFTAR KUESIONER</h2>
  <?php
  // print_r($_SESSION);
  $q_list = $PDO->prepare("SELECT * FROM kuesioner WHERE id_peneliti = ?");
  if($q_list) {
      $q_list->bindParam(1, $_SESSION['id_peneliti']);
      $q_list->execute();
      $q_list_count = $q_list->rowCount();
      if($q_list_count == 0) {
	      echo "<p class='bg-warning' style='padding:10px'>Maaf belum ada data</p>";
      } else {
	  echo "<table class='table table-striped'>";
	  echo "<thead style='font-weight:bold'><tr><td>#</td><td>Judul</td><td>Skala</td><td>Link</td><td>Pilihan</td><td>Dibuat</td></tr></thead>";
	  $num = 1;
	  while($f = $q_list->fetch(PDO::FETCH_ASSOC)) {
	      echo "<tr><td>$num</td>";
	      echo "<td>" . $f['judul_penelitian'] . "<br><p style='font-size:10px;margin:0' class='text-muted'>" . $f['keterangan'] . "</p></td>";
              echo "<td>" . $f['jenis_skala'] . "</td>";
	      echo "<td><a href='pratinjau.php?k=" . $f['url'] . "'>Pratinjau</a> | <a href='$homepage/kuesioner.php?q=" . $f['url'] . "'>" . $f['url'] . "</a></td>";
	      echo "<td><button class='btn btn-danger' ik='" . $f['id_kuesioner'] . "' id='hapus" . $f['id_kuesioner'] .  "' onclick='kuesioner.hapusData(" . $f['id_kuesioner'] . ")'>Hapus</button>";
	      echo "<td>" . $f['tanggal'] . "</td>";
	      echo "</tr>";
	      $num++;
	  }
	  echo "</table>";
	  // echo "ADA DATA!!!, proses untuk ditampilkan belum DIBuat";
      }
  }
  ?>
  <div class="">
  </div>
  <a href="buatkuesioner.php" style="float:right"><button class="btn btn-lg btn-primary" style="margin-bottom:20px">Buat Baru</button></a>
</div>
</body>
