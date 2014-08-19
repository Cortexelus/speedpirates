<?php

// for offline speedpirates use
// list all the existing "rooms" 


/*
if($_GET["analysis"]){
	// make a room
	$json_object = {"song_url":"mp3/vaetxh - cuntpressor.mp3",
		"video_url":"",
		"artist":"Vaetxh",
		"title":"Cuntpressor",
		"analysis_filename":"vaetxh_cuntpres.102.1.json",
		"savedloops":{}
	}
	...
}*/



// make a list of all JSON analyses. 
//(hide/show) 
//new room. creates room.json

$room_html = "";

$dir    = 'rooms';
$dirfiles = scandir($dir);
foreach ($dirfiles as $file){
	if(substr(strtolower($file),-5) == ".json"){
		$roomname = substr($file,0,-5);
		$html = "<div><a href='speedpirates.html?room=" . $roomname . "'>" . $roomname . "</a></div>\n";
		$room_html .= $html;
	}
	
}

/*
$analysis_html = "";

$dir    = 'analysis';
$dirfiles = scandir($dir);
foreach ($dirfiles as $file){
	if(substr(strtolower($file),-5) == ".json"){
		$analysisname = substr($file,0,-5);
		$html = "<div><a href='speedpirates.html?room=" . $analysisname . "'>" . $analysisname . "</a></div>\n";
		$analysis_html .= $html;
	}
}*/


?>

<html>
<head>
<style>
#rooms.div {
	display: block;

}
</style>
</head>
<body>
<h3>speed pirates</h3>

<h4>rooms</h4>
<div id="rooms">
<?=$room_html?>
</div>

<!--
<h4>analyses</h4>
<div id="analyses">
<?=$analysis_html?>
</div>-->

</body>
</html>


