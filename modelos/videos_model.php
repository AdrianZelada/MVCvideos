<?php 
	require_once('db_abstract_model.php');
	/**
	* 
	*/
	class Video extends DBAbstractModel
	{
		public $Titulo;
		public $Categoria;
		public $Director;
		public $Duracion;
		public $Image;
		protected $id;
		
		function __construct()
		{
			$this->db_name='tienda';
		}		

		public function get_all(){
			$this->query="
					SELECT * 
					FROM videos";
			$this->get_result_from_query();
			return json_encode($this->rows);			
		}

		public function get($id_video=''){			
			if($id_video!=''):
				$this->query="
					SELECT *
					FROM videos
					WHERE id='$id_video'";			
				$this->get_result_from_query();
			endif;
			if(count($this->rows) == 1):				
				foreach ($this->rows[0] as $propiedad=>$valor):					
	                $this->$propiedad = $valor;	        
	            endforeach;
	        endif;
		}

		public function add($video_data=array()){		
	                foreach ($video_data as $campo=>$valor):
	                    $$campo = $valor;	                
	                endforeach;	                
	            $this->query = "
	                    INSERT INTO     videos
	                    (Titulo, Categoria, Director, Duracion,Image)
	                    VALUES
	                    ('$Titulo', '$Categoria', '$Director', '$Duracion','$Image')";
	            $this->execute_single_query();	        	
		}

		public function edit($video_data=array()){
			foreach ($video_data as $campo => $valor):
				$$campo=$valor;
			endforeach;
			$this->query="
				UPDATE videos
				SET Titulo='$Titulo',
					Categoria='$Categoria',
					Duracion='$Duracion',
					Director='$Director',
					Image='$Image'
				WHERE id='$id'";
			$this->execute_single_query();
		}

		public function delete($video_id=''){
			$this->query="
				DELETE FROM 	videos
				WHERE 			id='$video_id'";
			$this->execute_single_query();
		}
	} 			
 ?>