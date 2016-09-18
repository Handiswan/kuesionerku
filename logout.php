<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
<?php
session_start();
include "config.php";
	$_SESSION = array();
	header("location: " . $homepage);
?> 
</body>
</html>
