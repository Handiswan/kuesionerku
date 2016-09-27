<?php
include "../config.php";

if ($_POST['last_insert_id'] == 0) {
  $q = $PDO->prepare("INSERT INTO soal (id_kuesioner, pertanyaan) VALUES (?, ?)");
  if($q) {
    $q->bindParam(1, $_POST['id_kuesioner']);
    $q->bindParam(2, $_POST['pertanyaan']);
    if($q->execute()) {
        $id_terakhir = $PDO->lastInsertId();
    }
    // tambahkan juga data pada tabel q_semantik_pilihan
    $s = $PDO->prepare(
      "INSERT INTO q_semantik_pilihan(
        q_semantik_id,
        kuesioner_id,
        nilai_min,
        nilai_max,
        label_min,
        label_max
      ) VALUES (?, ?, ?, ?, ?, ?)"
    );
    if ($s) {
      $s->bindParam(1, $_POST['q_semantic_id']);
      $s->bindParam(2, $_POST['id_kuesioner']);
      $s->bindParam(3, $_POST['nilai_min']);
      $s->bindParam(4, $_POST['nilai_max']);
      $s->bindParam(5, $_POST['label_min']);
      $s->bindParam(6, $_POST['label_max']);
      if ($s->execute()) {
        $last_semantic_id = $PDO->lastInsertId();
        // echo "q_semantik_pilihan di basis data bertambah";
        // data sudah tersimpan
      }
    }
    $j = json_encode(array(
      'result' => 'ok',
      'last_insert_id' => $id_terakhir,
      'tersimpan' => 'terbaru_ditambahkan',
      'last_semantic_id' => $last_semantic_id
    ));
    echo $j;
  }
} else {
  // karena data POST last_insert_id != 0, maka update data tersebut.
  $q = $PDO->prepare("UPDATE soal SET pertanyaan = ? WHERE id_soal = ?");
  if ($q) {
    $q->bindParam(1, $_POST['pertanyaan']);
    $q->bindParam(2, $_POST['last_insert_id']);
    if ($q->execute()) {
      // semua data aman..
    }
    // perbaharui data base
    $s = $PDO->prepare(
        "UPDATE q_semantik_pilihan
         SET nilai_min = ?,
             nilai_max = ?,
             label_min = ?,
             label_max = ?
         WHERE id = ?"
    );
    /*
    $s = $PDO->prepare(
    "UPDATE q_semantik_pilihan
      SET nilai_min = ?,
      nilai_max = ?,
      label_min = ?,
      label_max = ?
      WHERE id = ?)" <------ salah gara" tanda buka kurung..
    );
    */
    if ($s) {
      // echo 'persiapan query pembaharuan q_semantik_pilihan ok';
      $s->bindParam(1, $_POST['nilai_min']);
      $s->bindParam(2, $_POST['nilai_max']);
      $s->bindParam(3, $_POST['label_min']);
      $s->bindParam(4, $_POST['label_max']);
      $s->bindParam(5, $_POST['last_semantic_id']);

      if ($s->execute()) {
          // echo "Data berhasil di update buat JSON";
      } else {
        print_r($PDO->errorInfo());
        // echo "eksekusi pembaharuan data pada q_sematik_pilihan  GAGAL";
      }
    }
    $r = json_encode(array(
      'result' => 'ok',
      'terupdate' => 'pada tabel soal di basis data',
      'last_insert_id' => $_POST['last_insert_id'],
      'last_semantic_id' => $_POST['last_semantic_id']
    ));
    echo $r;
    // print_r($_POST);
  }
}
?>
