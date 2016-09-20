<?php
include "../config.php";
switch($_POST['skala']) {
    case "likert":
	$sv = $PDO->prepare("INSERT INTO kuesioner(judul_penelitian, keterangan, jenis_skala) VALUES(?, ?, ?)");
	if($sv) {
	    $sv->bindParam(1, $_POST['judul']);
	    $sv->bindParam(2, $_POST['keterangan']);
	    $sv->bindParam(3, $_POST['skala']);
	    if($sv->execute()) {
                // switch lagi berdasarkan tipe skala yang digunakan
	        switch($_POST['step']) {
		    case "judul":
			// yang ditampilkan selanjutnya adalah jumlah jawaban yang harus diberikan.
			// dibuat dengan javascript!
			$output = <<<"EOT"
                        <h4>Input pilihan jawaban yang Anda inginkan</h4>
			<div id='pilihanJawaban'>
			<input id='n1' class="form-control" style='display:inline;width:100px;' type="number" placeholder="Nilai">
			<input id='j1' class="form-control" style='display:inline;width:400px;' type="text" placeholder="Keterangan">
			<button id='s1' style='display:inline' class="btn btn-primary" onclick='kuesioner.likert.simpanPilihan(1)'>Simpan</button><br>
			</div>
			<button onclick='kuesioner.likert.tambahPilihan()' class='btn btn-default' style='margin-top:10px'>Tambah Pilihan Jawaban</button><br>
			<button class='btn btn-lg btn-primary' style='margin-top:10px'>Selanjutnya</button>
EOT;
			$hasil = json_encode(array(
			 			'hasil' => 'ok',
						));
			echo $output;
		        break;
		}
	    } else {
		echo "GAGAL menyimpan DATA";
	    }
	}
}
?>
