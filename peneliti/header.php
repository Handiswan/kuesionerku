<head>
<link rel="stylesheet" type="text/css" href="../lib/style.css">
<link rel="stylesheet" type="text/css" href="../lib/css/bootstrap.css";
<script src="../lib/js/bootstrap.js"></script>
</head>
<div class="header">
	<a href="index.php"> <img src="../lib/img/logo.png" style="padding: 10px; width:250px; margin-left:20px"> </a>
<?php
include "../config.php";
session_start();
	if(!$_SESSION['peneliti']) {
		header("location: " . $homepage);
	}
?>

<script type='text/javascript'>
	function haaa(){
		var e = document.getElementById('menulog');
    	if(e.style.display == 'block')
    		e.style.display = 'none';
    	else
	   	e.style.display = 'block';
		}
		
		function sembunyikah(){
		document.getElementById('menulog').style.display = 'none';
		}
</script>


	<a href="#" class="menu" onclick="haaa()"> <?php echo $_SESSION['nama_peneliti']; ?></a>
		<div style="width:200px; position:fixed; right:2px; display:none; " id="menulog">
		<div class="beranda" ><a href="">Profil </a></div>
		<div class="beranda"><a href="../logout.php"> Logout </a></div>
</div>

</div> 
<div class="backheader"></div><!--end class header-->
