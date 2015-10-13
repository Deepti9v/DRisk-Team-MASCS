<?php
class User{
	private $name;
	private $troopNum;
	private $territories = array();
	private $cardList = array();

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
		$count = -1;
		foreach ($this->territories as $temp) {
			$count += 1
			if( $temp->name == $territory->name){
				$tag = 1;
				array_splice($this->territories, $count, 1);
				return 1;
			}
		}
		return 0;
	}
	function changeTerritoryTroop(&$territory, $troopNum){
		$count = -1;
		foreach ($this->territories as $temp) {
			$count += 1
			if( $temp->name == $territory->name){
				$this->territories[$count]->setTroopNum($troopNum);
				return 1;
			}
		}
		return 0;
	}
	function getcard(){
		return $this->cardList;
	}
	function addCard($card_id){
		$this->cardList[] = $card_id;
	}
	function delCard($card_id){
		$count = -1;
		foreach ($this->cardList as $temp) {
			$count += 1
			if( $temp == $card_id){
				array_splice($this->cardList, $count, 1);
				return 1;
			}
		}
		return 0;
	}
}
?>