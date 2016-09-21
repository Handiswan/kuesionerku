<?php
include "header.php";
include "menu.php";
?>
<div class="atasberanda">
	<img src="../lib/img/logo_kuesioner_a.png" class="logonya" style="width:30px; float:left"> <h2 style="margin:0;padding-left:40px">Kuesioner</h2>
</div>

<div class="body2" id="body2">
<?php
if(isset($_GET['skala'])) {
    echo "kita swicth antar skala";
    switch($_GET['skala']) {
	case "likert":
	    echo "ada likert";
	    break;
	case "guttman":
	    echo "ada guttman";
	    break;
	case "semantic":
	    echo "ada semantic";
	    break;
	case "rating":
	    echo "ada rating";
	    break;
	default:
	    echo "default adalah rating";
    }
} else {

?>

<h4>Silahkan lengkapi data berikut </h4>
<br>
	<form style="padding: 0 50 0 50">
	<table border="0px" height="500">
		<tr valign="top">
			<td>Judul</td><td> <textarea required class="form-control" id="judul" name="judul" style=" width:700px; height: 90px"> </textarea> </td>
		</tr>
		<tr valign="top">
			<td>Keterangan</td><td> <textarea  required class="form-control" id="keterangan" type="text" name="keterangan" style=" width:700px; height: 150px"> </textarea></td>
		</tr>
		<tr>
		  <td>Skala</td>
		  <td>
		    <select class="form-control" id="skala" name="skala" >
		      <option value="likert">Likert</option>
		      <option value="guttman">Guttman</option>
		      <option value="rating">Rating Scale</option>
		      <option value="semantic">Semantic Desferential</option>
		    </select>
                  </td>
		</tr>
	</table>
	</form>

<br>
<button style="float:right" onclick="kuesioner.likert.simpanJudul()" class="btn btn-lg btn-primary">Selanjutnya</button>
<?php
}
if(isset($_GET['skala'])) {
    if($_GET['skala'] == "likert") {
	echo "aka likert";
    }
    echo "Lkert";
}
// print_r($_GET);
?>

</div>


</body>
