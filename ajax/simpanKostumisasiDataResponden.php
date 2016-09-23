<?php
include "../config.php";
$r = $PDO->prepare(
       "INSERT INTO form_isian (kuesioner_id, keterangan, tipe)
        VALUES (?, ?, ?)"
     );
if($r) {
  $r->bindParam(1, $_POST['kuesioner_id']);
  $r->bindParam(2, $_POST['keterangan']);
  $r->bindParam(3, $_POST['tipe']);
  if ($r->execute()) {
    echo "Data tersimpan";
  } else {
    echo "Terjadi kesalahan.";
  }
}
?>
