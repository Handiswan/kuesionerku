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
	       }
      }
      break;
      case "guttman":
        $sv = $PDO->prepare(
          "INSERT INTO kuesioner(
            judul_penelitian,
            keterangan,
            jenis_skala, tanggal, url) VALUES (?, ?, ?, NOW(), ?)"
        );
        // jika persiapan aman ...
        if ($sv) {
          /* echo "persiapan eksekusi berhasil"; */
          // lakukan tambatan data
          $sv->bindParam(1, $_POST['judul']);
          $sv->bindParam(2, $_POST['keterangan']);
          $sv->bindParam(3, $_POST['skala']);
          $sv->bindParam(4, generateRandomString());
          // kemudian lakukan pengujian eksukusi
          if ($sv->execute()) {
            // dapatkan id terakhir yang baru saja ditambahkan
            $id_terakhir = $PDO->lastInsertId(); // untuk digunakan pada q_gutman
            // tambah data pada tabel q_gutman
            $q = $PDO->prepare("INSERT INTO q_gutman(kuesioner_id) VALUES (?)");
            if ($q) {
              $q->bindParam(1, $id_terakhir);
              $q->execute();
              $id_skala_terakhir = $PDO->lastInsertId();
              // berikutnya perbaharui tabel kuesioner
              $u = $PDO->prepare(
                "UPDATE kuesioner
                 SET id_peneliti = ?, id_skala = ? WHERE id_kuesioner = ?
                 "
              );
              // jika persiapan ok ...
              if ($u) {
                // lakukan tambatan data
                $u->bindParam(1, $_SESSION['id_peneliti']);
                $u->bindParam(2, $id_skala_terakhir);
                $u->bindParam(3, $i_terakhir);
                $u->execute();
              }
            }

            $hasil = json_encode(array(
                'hasil' => 'ok',
                'jenis_skala' => $_POST['skala'],
                'id_skala_terakhir' => $id_skala_terakhir,
                'id_kuesioner' => $id_terakhir,
            ));
            echo $hasil;
          }
        } else {
          echo "persiapan eksekusi gagal";
        }
      break;

      case "rating":
      break;

      case "semantic":
      break;
    }
?>
