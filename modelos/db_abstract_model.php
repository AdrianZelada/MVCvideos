<?php 

	abstract class DBAbstractModel{		
		private static $db_host= 'localhost';
		private static $db_user= 'root';
		private static $db_pass= '';
		protected $db_name='mydb';
		protected $query="";
		protected $rows=array();
		private $conn;

		abstract protected function get();	
		abstract protected function add();
		abstract protected function edit();
		abstract protected function delete();

		private function open_connection(){
			$this->conn=new mysqli(self::$db_host,self::$db_user,
									self:: $db_pass,$this->db_name);
		}

		private function close_connection(){
			$this->conn->close();		
		}

		protected function execute_single_query(){
			$this->open_connection();
			$this->conn->query($this->query);
			$this->close_connection();
		}

		protected function get_result_from_query(){
			$this->open_connection();
			$resutl=$this->conn->query($this->query);
			while($this->rows[] = $resutl->fetch_assoc());
			$resutl->close();
			$this->close_connection();
			array_pop($this->rows);
		}
	}

 ?>