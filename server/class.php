<?php

class RiskRoom {
	public $roomNumber;  // id for this room
	public $userInfo;  // an array for user class
	public $userNumber;  // total user number 
	public $complexity;  // complexity for this room
	public $territoryInfo;  // an array for territory class
	
	function __construct($roomNumber, $userInfo, $userNumber, $complexity, $territoryInfo) {
		$this->roomNumber = $roomNumber;
		$this->userInfo = $userInfo;
		$this->userNumber = $userNumber;
		$this->complexity = $complexity;
		$this->territoryInfo = $territoryInfo;
	}
} 

class UserInfo {
	public $color;  // user's color
	public $territoryCount;  // territories own by user
	public $territories;  // an array about which territories user own
	public $card;  // card info
	public $newArmies;  // new armies in each turn
	
	function __construct($color, $territoryCount, $territories, $card, $newArmies) {
		$this->color = $color;
		$this->territoryCount = $territoryCount;
		$this->territories = $territories;
		$this->card = $card;
		$this->newArmies = $newArmies;
	}
}

class territoryInfo {
	public $name;  // territory id
	public $color;  // which user owns this territory
	public $armyNumber;  // armies in this territory
	
	function __construct($name, $color, $armyNumber) {
		$this->name = $name;
		$this->color = $color;
		$this->armyNumber = $armyNumber;
	}
}

class  cardInfo {
	public $cardType;
	// todo
}

$territories = array(1, 2, 3);
$card = new cardInfo();
$user[1] = new UserInfo('blue', 0, $territories, $card, 3);
echo "<br>", $user[1]->color, "<br>";
echo $user[1]->territories[1];

?>