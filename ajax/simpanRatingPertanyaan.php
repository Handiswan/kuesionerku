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
    // simpan data baru juga untuk q_rating pilihan
    $s = $PDO->prepare(
      "INSERT INTO q_rating_pilihan (
        kuesioner_id,
        q_rating_id,
        nilai_min,
        nilai_max
       )
       VALUES(?, ?, ?, ?)"
    );
    if ($s) {
      //echo "persiapan q_rating_pilihan berhasil";
      $s->bindParam(1, $_POST['id_kuesioner']);
      $s->bindParam(2, $id_terakhir);
      $s->bindParam(3, $_POST['nilai_min']);
      $s->bindParam(4, $_POST['nilai_max']);
      if ($s->execute()) {
        // ok aman, semestinnya keluaran dalam bentuk JSONnya dibawah
      } else {
        echo "eksekusi q_rating_pilihan GAGAL";
      }
    } else {
      echo "persiapan proses penambahan data pada tabel q_gutman_pilihan gagal";
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
        'terupdate' => 'ok',
        'last_insert_id' => $_POST['last_insert_id']
      ));
      echo $r;
    }
    // perbaharui juga data baru untulk q_rating_pilihan
    $s = $PDO->prepare(
      "UPDATE q_rating_pilihan
       SET nilai_min = ?,
       nilai_max = ?,
       WHERE q_rating_id = ?
       "
    );
    if ($s) {
      $s->bindParam(1, $_POST['nilai_min']);
      $s->bindParam(2, $_POST['nilai_max']);
      $s->bindParam(3, $_POST['last_insert_id']);
      $s->execute();
    }
  }
}
?>
