<?php
include "../config.php";
$q = $PDO->prepare("UPDATE q_liker_pilihan_f SET nilai = ?, keterangan = ? WHERE id = ?");
$r = $PDO->prepare("UPDATE q_liker_pilihan_uf SET nilai = ?, keterangan = ? WHERE id = ?");

if($q && $r) {
    $q->bindParam(1, $_POST['nilai']);
    $q->bindParam(2, $_POST['jawaban']);
    $q->bindParam(3, $_POST['q_liker_id']);

    $r->bindParam(1, $_POST['nilai']);
    $r->bindParam(2, $_POST['jawaban']);
    $r->bindParam(3, $_POST['q_liker_id']);

    if($q->execute() && $r->execute()) {
	echo "ok";
    }
}
