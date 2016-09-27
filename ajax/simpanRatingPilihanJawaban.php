<?php
include "../config.php";

// update bila last_insert_id terdapat pada POST
if ($_POST['last_insert_id'] == 0) {
  // karena nilai last_insert_id sama dengan nol, maka tambah data baru
  $q = $PDO->prepare(
    "INSERT INTO q_rating_pilihan (nilai_min, nilai_max, kuesioner_id)
     VALUES(?, ?, ?)");
  if ($q) {
    $q->bindParam(1, $_POST['nilai_min']);
    $q->bindParam(2, $_POST['nilai_max']);
    $q->bindParam(3, $_POST['kuesioner_id']);
    if ($q->execute()) {
      $last_insert_id = $PDO->lastInsertId();
      $j = json_encode(array(
        'hasil' => 'ok',
        'info' => 'data baru pada q_rating_pilihan telah ditambahkan',
        'last_insert_id' => $last_insert_id
      ));
      echo $j;
    }
  }
} else {
  // karena last_insert_id tidak sama dengan nol maka perbaharui data di basis data
  $q = $PDO->prepare("UPDATE q_rating_pilihan SET nilai_min = ?, nilai_max = ? WHERE id = ?");
  if ($q) {
    $q->bindParam(1, $_POST['nilai_min']);
    $q->bindParam(2, $_POST['nilai_max']);
    $q->bindParam(3, $_POST['last_insert_id']);
    if ($q->execute()) {
      $j = json_encode(array(
        'hasil' => 'ok',
        'info' => 'data telah di perbaharui',
        'last_insert_id' => $_POST['last_insert_id']
      ));
      echo $j;
    }
  }
}
?>
