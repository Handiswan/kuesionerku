<?php
include "../config.php";
switch($_POST['step']) {
    case "judul":
	$sv = $PDO->prepare("INSERT INTO kuesioner(judul_penelitian, keterangan, jenis_skala) VALUES(?, ?, ?)");
	if($sv) {
	    $sv->bindParam(1, $_POST['judul']);
	    $sv->bindParam(2, $_POST['keterangan']);
	    $sv->bindParam(3, $_POST['skala']);
	    if($sv->execute()) {
                echo "penyimpanan sukses!";
	    } else {
		echo "GAGAL menyimpan DATA";
	    }
	}
}
?>
