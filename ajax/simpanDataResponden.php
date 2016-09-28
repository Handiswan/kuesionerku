<?php
include "../config.php";

$data = explode("|||||", $_POST['data']);

// simpan data responden ke tabel responden
$q = $PDO->prepare("INSERT INTO responden (kuesioner_id) VALUES (?)");
if ($q) {
  $q->bindParam(1, $_POST['id']);
  if ($q->execute()) {
    // id diperlukan untuk penyimpanan di responde_info
    $last_insert_id = $PDO->lastInsertId();

    $s = $PDO->prepare("INSERT INTO responden_info (responden_id, nilai, keterangan) VALUES (?, ?, ?)");

    for ($i = 0; $i < sizeof($data); $i++) {
      if ($i != 0) {
        $bagian = explode(">>>", $data[$i]);
        // simpan ke basis data apa yang telah di input pengguna
        $s->bindParam(1, $last_insert_id);
        $s->bindParam(2, $bagian[1]);
        $s->bindParam(3, $bagian[0]);
        $s->execute();
        // print_r($bagian[0]);
      }
    }
  }
}

/*
print_r($data);
echo $data;
echo "jioij";
echo $_POST['data'];
*/
?>
