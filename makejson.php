<?php


if($_POST["decree"]=="prepare the arrangements"){
	$songdata = $_POST['songdata'];
	if($songdata["song_url"] && $_POST["segments_palette"] && $songdata["artist"] && $songdata["title"] && $songdata["soundpalette_algorithm_version"] ){

		// post analysis 

		$shortname = shortname($songdata["artist"], $songdata["title"]);
		$json_filename = $shortname . ".json";
		$json_str = stripslashes($_POST["segments_palette"]);
		file_put_contents("analysis/" . $json_filename, $json_str); //or die("failed to make json file");
		
		// grab mp3

		$mp3filename =  "mp3/" . $songdata["artist"] . "-" . $songdata["title"] . substr($songdata["song_url"],-4);

		file_put_contents($mp3filename, fopen(str_replace(" ","%20",$songdata["song_url"]),'r'));

		// make room file

		$room = array(
			"song_url" => $mp3filename,
			"video_url" => "",
			"artist" => $songdata["artist"],
			"title" => $songdata["title"],
			"analysis_filename" => $json_filename,
			"savedloops" => array());

		$json_str = json_encode($room);

		file_put_contents("rooms/" . $json_filename, $json_str); //or die("failed to make json file");


		die(json_encode(array("roomname"=>$shortname)));
		
	}
}


function shortname($artist, $title){
	return substr(preg_replace('/[^a-z]/i', '', strtolower($artist)),0,16) . "_" .
		 substr(preg_replace('/[^a-z]/i', '', strtolower($title)),0,16);
}

?>