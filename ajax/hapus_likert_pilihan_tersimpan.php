<?php
include "../config.php";
$r = $PDO->prepare("DELETE from q_liker_pilihan_f WHERE id = ?");
$q = $PDO->prepare("DELETE from q_liker_pilihan_uf WHERE id = ?");

if($r && $q) {
    $r->bindParam(1, $_POST['id']);
    $q->bindParam(1, $_POST['id']);

    if($r->execute() && $q->execute()) {
        echo "ok";
    }
}
