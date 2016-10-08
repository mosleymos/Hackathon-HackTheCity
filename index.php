
<?php
	if (isset($_POST['json']) || isset($_GET['json']))
	{
		echo file_get_contents('json/data.json');
		exit();
	}
?>
<html>
	<head>
		<title>MySmartList!</title>
		<script type="text/javascript">
			<?php include 'js/SmartList.php'; ?>
		</script>
		<script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
		<script type="text/javascript" src="js/jscolor.js"></script>
		<link rel="stylesheet" type="text/css" href="css/styles.css">
	</head>
	<body onload="interface.preconstruct()"></body>
</html>