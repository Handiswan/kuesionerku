<?php
include "../config.php";
if($_POST['last_insert_id'] == 0) {
    $r = $PDO->prepare("INSERT INTO soal(id_kuesioner, pertanyaan, f_or_uf) VALUES(?, ?, ?)");
    if($r) {
        $r->bindParam(1, $_POST['id_kuesioner']);
        $r->bindParam(2, $_POST['pertanyaan']);
        $r->bindParam(3, $_POST['f_or_uf']);

        if($r->execute()) {
   	    $id_terakhir_ditambahkan = $PDO->lastInsertId();
	    $r = json_encode(array(
		'result' => 'ok',
		'last_insert_id' => $id_terakhir_ditambahkan,
  	    ));
	    echo $r;
        }
    }
} else {
    $r = $PDO->prepare("UPDATE soal SET pertanyaan = ?, f_or_uf = ? WHERE id_soal = ?");
    if($r) {
	$r->bindParam(1, $_POST['pertanyaan']);
	$r->bindParam(2, $_POST['f_or_uf']);
	$r->bindParam(3, $_POST['last_insert_id']);

	if($r->execute()) {
	    echo "Di update!";
	}
    }    
    echo "perbahaui!";
}
