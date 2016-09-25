<?php
include "../config.php";
echo "<pre>";
$id = $_POST['q_liker_id'];

$q = $PDO->prepare("SELECT * FROM q_liker_pilihan_f WHERE q_liker_id = ?");
if($q) {
  $q->bindParam(1, $id);
  if($q->execute()) {
    $susunan_f = [];
    while($r = $q->fetch(PDO::FETCH_ASSOC)) {
      $susunan_f[] = $r['nilai'];
    }
    echo "susunan f asli ";
    print_r($susunan_f);
    $susunan_f = (array_reverse($susunan_f));
    echo "susunan f reversed ";
    print_r($susunan_f);

    $n = $PDO->prepare("SELECT * FROM q_liker_pilihan_uf WHERE q_liker_id = ?");
    if($n) {
      $n->bindParam(1, $id);
      if($n->execute()) {
        $susunan_uf = [];
        $susunan_uf_id = [];
        while($r = $n->fetch(PDO::FETCH_ASSOC)) {
          $susunan_uf[] = $r['nilai'];
          $susunan_uf_id[] = $r['id'];
        }
        echo "susunan uf asli ";
        print_r($susunan_uf);
        echo "susunan uf id";
        print_r($susunan_uf_id);
        // sekarang balik datanya..

        $d = $PDO->prepare("UPDATE q_liker_pilihan_uf SET nilai = ? WHERE id = ?");
        $x = 0;
        for($x = 0; $x < sizeof($susunan_uf_id); $x++) {
          echo $susunan_uf_id[$x];
          echo " ----- " . $susunan_f[$x] . " ---- ";
          if($d) {
            $d->bindParam(1, $susunan_f[$x]);
            $d->bindParam(2, $susunan_uf_id[$x]);
            // $d->bindParam(2, $id);
            $d->execute();
          }
        }
      }
    }
  }
}
echo "</pre>";
?>
