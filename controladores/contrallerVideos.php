<?php
	require_once('modelos/videos_model.php');

	class Controller_video {

		
		public static function all_videos(){
			// Intanciamos un nuevo objeto y llamamos a la funcion get_all
		    $video = new Video();	
			return $video->get_all();
		}

		public static function get_video($id=''){
			// Intanciamos un nuevo objeto y llamamos a la funcion get
			$video = new Video();	
			$video->get($id);
		}

		public static function add_video($video_data=array()){			
			// Intanciamos un nuevo objeto y llamamos a la funcion add
			$video = new Video();				
			$video->add($video_data);
		}

		public static function edit_video($video_data=array()){
			// Intanciamos un nuevo objeto y llamamos a la funcion edit
			$video = new Video();				
			$video->edit($video_data);
		}

		public static function delete_video($id=''){
			// Intanciamos un nuevo objeto y llamamos a la funcion delete
			$video = new Video();				
			$video->delete($id);
		}
		public static function upload_image($Files,$name_image){
			// agregamos una imagen la servidor
			if (isset($Files)) { 				
    			$extension = pathinfo($Files['name'], PATHINFO_EXTENSION);    			
     			$nombre = $name_image.".".$extension;
   				if (move_uploaded_file($Files['tmp_name'], "uploads/$nombre")) {   	
   				return $extension;			 
		   } 
		   return "xex";
		}				

		}
	}


?>