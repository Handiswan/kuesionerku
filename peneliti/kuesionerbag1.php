<?php
include "header.php";
include "menu.php";
?>
<div class="atasberanda col-md-10" style="position:fixed">
	 <h4>
		 <span class="glyphicon glyphicon-list" aria-hidden="true"></span> Kuesioner
	 </h4>
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
	<form>
	<table border="0px">
		<tr valign="top">
			<td> <input required class="form-control" autofocus="autofocus" style="margin-top:0;margin-bottom:10px" id="judul" name="judul" placeholder="Judul .... "></td>
		</tr>
		<tr valign="top">
			<td> <textarea  required class="form-control" id="keterangan" type="text" name="keterangan" style=" width:700px; height: 150px">Keterangan diisi disini...</textarea></td>
		</tr>
		<tr>
		  <td>Skala
		    <select style="display:inline;margin-top:10px;width:200px;" class="form-control" id="skala" name="skala" >
		      <option value="likert">Likert</option>
		      <option value="guttman">Guttman</option>
		      <option value="rating">Rating Scale</option>
		      <option value="semantic">Semantic Defferensial</option>
		    </select>
                  </td>
		</tr>
	</table>
	</form>

<br>
<button onclick="kuesioner.likert.simpanJudul()" class="btn btn-lg btn-primary">Selanjutnya</button>
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
