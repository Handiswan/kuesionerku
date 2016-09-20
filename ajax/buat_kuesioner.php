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
			$li = "";
			for($i = 1; $i < 9; $i++) {
			    $li .= "<option value='" . $i . "'>" . $i . "</option>";
			}
			$output = <<<"EOT"
                        <h4>Pilih jumlah jawaban yang Anda butuhkan</h4>
			<select style='width:200px' class='form-control'>
			$li
			</select><br>
			<button class='btn btn-lg btn-primary'>Selanjutnya</button>
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
