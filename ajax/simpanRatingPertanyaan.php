<?php
include "../config.php";

if ($_POST['last_insert_id'] == 0) {
  $q = $PDO->prepare("INSERT INTO soal (id_kuesioner, pertanyaan) VALUES (?, ?)");
  if($q) {
    $q->bindParam(1, $_POST['id_kuesioner']);
    $q->bindParam(2, $_POST['pertanyaan']);
    if($q->execute()) {
        $id_terakhir = $PDO->lastInsertId();
        $j = json_encode(array(
          'result' => 'ok',
          'last_insert_id' => $id_terakhir,
          'tersimpan' => 'terbaru_ditambahkan',
        ));
        echo $j;
    }
  }
} else {
  // karena data POST last_insert_id != 0, maka update data tersebut.
  $q = $PDO->prepare("UPDATE soal SET pertanyaan = ? WHERE id_soal = ?");
  if ($q) {
    $q->bindParam(1, $_POST['pertanyaan']);
    $q->bindParam(2, $_POST['last_insert_id']);
    if ($q->execute()) {
      $r = json_encode(array(
        'result' => 'ok',
        'terupdate' => 'pada tabel soal di basis data',
        'last_insert_id' => $_POST['last_insert_id']
      ));
      echo $r;
    }
  }
}
?>
