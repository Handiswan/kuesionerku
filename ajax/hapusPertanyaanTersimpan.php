<?php
include "../config.php";
$r = $PDO->prepare("DELETE FROM soal WHERE id_soal = ?");
if($r) {
    $r->bindParam(1, $_POST['id']);
    if($r->execute()) {
	echo "ok";
    }
}
