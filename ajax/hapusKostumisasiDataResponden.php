<?php
include "../config.php";
$q = $PDO->prepare("DELETE FROM form_isian WHERE id = ?");
if($q) {
  $q->bindParam(1, $_POST['hapus_data_dengan_id_berikut']);
  if($q->execute()) {
    $h = json_encode(array(
      'hasil' => 'ok',
      'penghapusan_status' => 'berhasil',
    ));
  }
}
?>
