<?php
include "../config.php";
header('Content-type: application/json');
$q = $PDO->prepare("INSERT INTO q_gutman_pilihan_f(q_gutman_id, nilai, keterangan) VALUES (?, ?, ?)");
$r = $PDO->prepare("INSERT INTO q_gutman_pilihan_uf(q_gutman_id, nilai, keterangan) VALUES (?, ?, ?)");
if($q && $r) {
    $q->bindParam(1, $_POST['q_guttman_id']);
    $q->bindParam(2, $_POST['nilai']);
    $q->bindParam(3, $_POST['jawaban']);

    $r->bindParam(1, $_POST['q_guttman_id']);
    $r->bindParam(2, $_POST['nilai']);
    $r->bindParam(3, $_POST['jawaban']);

    if($q->execute() && $r->execute()) {
	$last_id = $PDO->lastInsertId();
	$r = json_encode(array(
		'result' => 'ok',
		'last_id' => $_POST['q_guttman_id'],
		'q_liker_id' => $last_id,
	));
	echo $r;
    }
}
?>
