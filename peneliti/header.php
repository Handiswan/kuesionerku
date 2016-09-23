<head>
  <link rel="stylesheet" type="text/css" href="../lib/style.css">
  <link rel="stylesheet" type="text/css" href="../lib/css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href="../lib/css/bootstrap-theme.css">
  <link rel="stylesheet" type="text/css" href="../lib/animate.css/animate.min.css">
  <script src="../lib/js/jquery-3.1.0.min.js"></script>
  <script src="../lib/js/kuesioner.js"></script>
  <script src="../lib/js/bootstrap.js"></script>
</head>
<div class="header" style="position:fixed;width:100%;height:100px">
  <a href="index.php"> <img src="../lib/img/logo.png" style="padding: 10px; width:250px; margin-left:20px"> </a>
  <?php
include "../config.php";
session_start();
	if(!$_SESSION['peneliti']) {
		header("location: " . $homepage);
	}
?>

    <script type='text/javascript'>
      function haaa() {
        var e = document.getElementById('menulog');
        if (e.style.display == 'block')
          e.style.display = 'none';
        else
          e.style.display = 'block';
      }

      function sembunyikah() {
        document.getElementById('menulog').style.display = 'none';
      }
    </script>




    <div class="dropdown" style="margin-top:-50px; margin-left:85%">
      <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
        <?php echo $_SESSION['nama_peneliti']; ?>
          <span class="caret"></span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li><a href="#">Profil</a></li>
        <li role="separator" class="divider"></li>
        <li><a href="../logout.php">Keluar</a></li>
      </ul>
    </div>

</div>
<div class="backheader"></div>
<!--end class header-->
