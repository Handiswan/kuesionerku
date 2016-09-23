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

                // switch lagi berdasarkan tipe skala yang digunakan
	        switch($_POST['step']) {
		    case "judul":
			// yang ditampilkan selanjutnya adalah jumlah jawaban yang harus diberikan.
			// dibuat dengan javascript!
			$output = <<<"EOT"
                        <h4>Input pilihan jawaban yang Anda inginkan</h4>
			<div id='pilihanJawaban' status='notAdded' next='2' q_liker_id='$last_id_skala'>
			<ul id="listJawaban">
                          <li id="li_1">
			    <input id='j1' class="form-control" style='display:inline;width:400px;' type="text" placeholder="Jawaban">
			    <input id='n1' class="form-control" style='display:inline;width:100px;' type="number" placeholder="Nilai">
			    <button id='s1' style='display:inline' class="btn btn-primary" onclick='kuesioner.likert.simpanPilihan(1)'>Simpan</button>
                          </li>
                        </ul>
			</div>
			<button onclick='kuesioner.likert.tambahPilihan()' class='btn btn-default' style='margin-top:10px'>Tambah Pilihan Jawaban</button><br>
			<button class='btn btn-lg btn-primary' style='margin-top:10px' onclick='kuesioner.tampilkanFormInputPertanyaan()'>Selanjutnya</button>
EOT;
			$hasil = json_encode(array(
			 			'hasil' => 'ok',
						'jenis_skala' => $_POST['skala'],
						'last_id_skala' => $last_id_skala,
						'id_kuesioner' => $last_id,
						));
			echo $hasil;
		        break;
		}
	    } else {
		echo "GAGAL menyimpan DATA";
	    }
	}
}
?>
