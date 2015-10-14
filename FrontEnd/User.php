<?php
include'territory.php';
include'card.php';
class User{
	private $name;
	private $troopNum;
	private $territories = array();
	public $cardList = array();
	private $deplolyStrength;

	function __construct($Username) {
		$this->name = $Username;
    }

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
			if( $temp->getName() == $territory->getName()){
				$tag = 1;
			}
		}
		if($tag == 1)
			return 0;
		$this->territories[] = $territory;
		return 1;
	}
	function delTerritory(&$territory){
		$count = -1;
		foreach ($this->territories as $temp) {
			$count += 1;
			if( $temp->getName() == $territory->getName()){
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
			$count += 1;
			if( $temp->getName() == $territory->getName()){
				$this->territories[$count]->setTroopNum($troopNum);
				return 1;
			}
		}
		return 0;
	}
	function getCard(){
		return $this->cardList;
	}
	function addCard(&$card){
		$this->cardList[] = $card;
	}
	function delCard(&$card){
		$count = -1;
		foreach ($this->cardList as $temp) {
			$count += 1;
			if( $temp->getId() == $card->getId()){
				array_splice($this->cardList, $count, 1);
				return 1;
			}
		}
		return 0;
	}
	function getdeplolyStrength(){
		return $this->deplolyStrength;
	}
	function setdeplolyStrength($Num){
		$this->deplolyStrength = $Num;
	}

}
?>