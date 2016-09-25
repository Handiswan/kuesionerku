<?php
include "../config.php";

// buat string acak dengan fungsi berikut untuk menjadi URL kuesioner
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

switch($_POST['skala']) {
    case "likert":
	    $sv = $PDO->prepare(
              "INSERT INTO kuesioner(
                judul_penelitian,
                keterangan,
                jenis_skala, tanggal, url) VALUES(?, ?, ?, NOW(), ?)"
      );
	    if($sv) {
	       $sv->bindParam(1, $_POST['judul']);
	       $sv->bindParam(2, $_POST['keterangan']);
	       $sv->bindParam(3, $_POST['skala']);
         $sv->bindParam(4, generateRandomString());
	       if($sv->execute()) {
		        $last_id = $PDO->lastInsertId(); // untuk digunakan pada q_liker
		        $q = $PDO->prepare("INSERT INTO q_liker(kuesioner_id) VALUES (?)");
		        if($q) {
		           $q->bindParam(1, $last_id);
		           $q->execute();
		           $last_id_skala = $PDO->lastInsertId();
		           // selanjutnya update tabel kuesioner
		           $u = $PDO->prepare(
                 "UPDATE kuesioner
                  SET id_peneliti = ?, id_skala = ? WHERE id_kuesioner = ?"
               );
		           if($u) {
			            $u->bindParam(1, $_SESSION['id_peneliti']);
			            $u->bindParam(2, $last_id_skala);
			            $u->bindParam(3, $last_id);
			            $u->execute();
		           }
		        }

			$hasil = json_encode(array(
			 			'hasil' => 'ok',
						'jenis_skala' => $_POST['skala'],
						'last_id_skala' => $last_id_skala,
						'id_kuesioner' => $last_id,
						));
			echo $hasil;
		        break;

	    } else {
		echo "GAGAL menyimpan DATA";
	    }
	}
}
?>
