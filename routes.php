<?php
	require_once('controladores/contrallerVideos.php');	
	

	switch($_POST["controller"]){ 
		case 'get_all': 
			// Mandamos todos los videos de la tabla
			echo Controller_video::all_videos();					
		break;
		case 'get_item':
			// Mandamos solo un item de la tabla 
			Controller_video::get_video($_POST['id']);
		break;
		case 'add_item':
			// Agragamos un video 
			Controller_video::add_video($_POST['array']);
		break;
		case 'edit_item':
			// Editamos un video
			Controller_video::edit_video($_POST['array']);
		break;
		case 'delete_item':
			// Borramos un video
			Controller_video::delete_video($_POST['id']);
		break;
		case 'upload_Image':
			// Cargamos la imagenes
			echo Controller_video::upload_image($_FILES['imagen'],$_POST['name_file']);
		break;		
		default:			
			echo "opcion invalida";
		break;
	}	
?> 