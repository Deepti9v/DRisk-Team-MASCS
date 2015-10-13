<?php
class territory{
	private $name;
	private $troopNum;

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
}

?>