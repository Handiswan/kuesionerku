<?php
include "../config.php";
if ($_POST['id_form_isian'] != 0) {
  // data lama atau data telah tersimpan
  // maka perbaharui tabel form_isian pada database
  $u = $PDO->prepare(
            "UPDATE form_isian SET keterangan = ?, tipe = ? WHERE id = ?"
  );
  if ($u) {
    $u->bindParam(1, $_POST['keterangan']);
    $u->bindParam(2, $_POST['tipe']);
    $u->bindParam(3, $_POST['id_form_isian']);
    if ($u->execute()) {
      // tampilkan json terbaharukan
      $r = json_encode(array(
        'hasil' => 'ok',
        'id_form_isian' => $_POST['id_form_isian'],
        'terbaharukan' => 'ya',
      ));
      echo $r;
    }
  }

} else {
  // data baru, simpan ke basis data
  $r = $PDO->prepare(
       "INSERT INTO form_isian (kuesioner_id, keterangan, tipe)
        VALUES (?, ?, ?)"
  );
  if($r) {
    $r->bindParam(1, $_POST['kuesioner_id']);
    $r->bindParam(2, $_POST['keterangan']);
    $r->bindParam(3, $_POST['tipe']);

    // fetch data url dari kuesioner_id
    $q = $PDO->prepare("SELECT url FROM kuesioner WHERE id_kuesioner = ?");
    if($q) {
      $q->bindParam(1, $_POST['kuesioner_id']);
      $q->execute();
      $h = $q->fetch(PDO::FETCH_ASSOC);
      $url = $h['url'];
    }

    if ($r->execute()) {
      // tampilkan juga id terakhir yang ditambahkan, untuk penghapusan dan ubah
      $id_baru_baru_ini = $PDO->lastInsertId();
      $hasil = json_encode(array(
        'hasil' => 'ok',
        'url' => $url,
        'id_form_isian' => $id_baru_baru_ini,
        'data_baru' => 'berhasil ditambahkan'
      ));
      // berikan respons ke klien dengan data json
      echo $hasil;
    } else {
      echo "Terjadi kesalahan.";
    }
  }
}
?>
