<?php
class User{
	private $name;
	private $troopNum;
	private $territories = array();

	function getName(){
		return $this->name;
	}
	function setName($str){
		$this->name = $str;
	}
	function getTroopNum(){
		return $this->troopNum;
	}
	function setTroopNum($num){
		$this->troopNum = $num;
	}
	function getTerritories(){
		return $this->territories;
	}
	function addTerritory(&$territory){
		$tag = 0;
		foreach ($this->territories as $temp) {
			if( $temp->name == $territory->name){
				$tag = 1;
			}
		}
		if($tag == 1)
			return 0;
		$this->territorires[] = &$territory;
		return 1;
	}
	function delTerritory(&$territory){
		$tag = 0;
		$count = -1;
		foreach ($this->territories as $temp) {
			$count += 1
			if( $temp->name == $territory->name){
				$tag = 1;
				break;
			}
		}
		if($tag == 0)
			return 0;
		array_splice($this->territories, $count, 1);
		return 1;
	}
}
?>