<?php
include "../config.php";
$q = $PDO->prepare("DELETE FROM kuesioner WHERE id_kuesioner = ?");
if($q) {
	$q->bindParam(1, $_POST['id']);
	if($q->execute()) {
		echo "terhapus";
	}
}
