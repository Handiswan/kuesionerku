<?php
include "header.php";
include "menu.php";
?>
<div class="atasberanda">
	<img src="../lib/img/logo_kuesioner_a.png" class="logonya" style="width:30px; float:left"> <h2 style="margin:0;padding-left:40px">Kuesioner</h2>
</div>
<div class="body2">
  <h2 class="a">DAFTAR KUESIONER</h2>
  <?php
  $q_list = $PDO->prepare("SELECT * FROM kuesioner"); 
  if($q_list) {
      $q_list->execute();
      $q_list_count = $q_list->rowCount();
      if($q_list_count == 0) {
	  echo "<p class='bg-warning' style='padding:10px'>Maaf belum ada data</p>";
      } else {
	  echo "<table class='table table-striped'>";
	  echo "<thead style='font-weight:bold'><tr><td>#</td><td>Judul</td><td>Link</td><td>Pilihan</td></tr></thead>";
	  $num = 1;
	  while($f = $q_list->fetch(PDO::FETCH_ASSOC)) {
	      echo "<tr><td>$num</td>";
	      echo "<td>" . $f['judul_penelitian'] . "<br><p style='font-size:10px;margin:0' class='text-muted'>" . $f['keterangan'] . "</p></td>";
	      echo "<td>URL masih kosong</td>";
	      echo "<td><button class='btn btn-danger'>Hapus</button>";
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
  <a href="kuesionerbag1.php" style="float:right"><div class="btn btn-lg btn-primary">Buat Baru</div></a>
</div>


</body>
