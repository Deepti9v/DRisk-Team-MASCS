<?php
include'User.php';
class UserManager
{
    protected static $_instance;
    protected function __construct(){}
    protected function __clone(){}
    public static function getInstance(){
        if (self::$_instance === null) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    function deploy(&$User, &$Territory){
    	$User->changeTerritoryTroop($Territory, $Territory->getTroopNum() + 1);
    	$User->setdeplolyStrength($User->getdeplolyStrength() - 1);

    }
    function cancelDeploy(&$User, &$Territory){
    	$User->changeTerritoryTroop($Territory, $Territor->getTroopNum() - 1);
    	$User->setdeplolyStrength($User->getdeplolyStrength() + 1);
    }
    function IsDeployfinished(&$User){
    	if($User->getdeplolyStrength() == 0)
    		return 1;
    	else
    		return 0;
    }
    function fortify(&$User, &$BeginTerritory, &$EndTerritory, $num){
    	if($BeginTerritory->getTroopNum() <= $num)
    		return 0;
    	$tag = 0;
    	foreach($User->getTerritories() as $temp) {
    		if($temp->getName() == $BeginTerritory->getName()){
    			$BeginNum = $BeginTerritory->getTroopNum();
    			$tag += 1;
    		}
    		if($temp->getName() == $EndTerritory->getName()){
    			$EndNum = $EndTerritory->getTroopNum();
    			$tag += 1;
    		}
    	}
    	if($tag != 2)
    		return 0;
    	$User->changeTerritoryTroop($BeginTerritory,$BeginNum - $num);
    	$User->changeTerritoryTroop($EndTerritory,$EndNum + $num);
    }
    function calculateStrengh(&$User){
		$terNum = count($User->getTerritories()) / 3;
		if($terNum < 3)
			$terNum = 3;
		$value1 = array();
		$value2 = array();
		$value3 = array();
		$count = 0;
		$cardNum = 0;
		foreach ($User->getCard() as $temp) {
			if($temp->getValue() == 1)
				$value1[] = $count;
			if($temp->getValue() == 2)
				$value2[] = $count;
			if($temp->getValue() == 3)
				$value3[] = $count;
			$count += 1;
		}
		if(count($value1) >= 3){
			for($i =0; $i < 3; $i++) {
				array_splice($User->cardList, $value1[$i], 1);
			}
			$cardNum += 1;
		}
		if(count($value2) >= 3){
			for($i =0; $i < 3; $i++) {
				array_splice($User->cardList, $value2[$i], 1);
			}
			$cardNum += 1;
		}
		if(count($value3) >= 3){
			for($i =0; $i < 3; $i++) {
				array_splice($User->cardList, $value3[$i], 1);
			}
			$cardNum += 1;
		}
		if(count($value1) >= 1 and count($value2) >= 1 and count($value3) >= 1){
			array_splice($User->cardList, $value1[0], 1);
			array_splice($User->cardList, $value2[0], 1);
			array_splice($User->cardList, $value3[0], 1);
			$cardNum += 1;
		}
		$result = $terNum + $cardNum;
		$User->setdeplolyStrength($result);
	}

}

$User1 = new User("abc");
$User1->setdeplolyStrength(10);
$territory1 = new territory("China");
$territory2 = new territory("India");
$territory2->setTroopNum(5);
$User1->addTerritory($territory1);
$User1->addTerritory($territory2);
$Card1 = new card(1,2);
$Card2 = new card(2,2);
$Card3 = new card(3,2);
$Card4 = new card(4,1);
$User1->addCard($Card1);
$User1->addCard($Card2);
$User1->addCard($Card3);
$User1->addCard($Card4);
$Manager = Usermanager::getInstance();
$Manager->calculateStrengh($User1);
echo($User1->getdeplolyStrength());
$Manager->deploy($User1,$territory1);
echo($User1->getdeplolyStrength());
$Manager->fortify($User1,$territory2,$territory1,2);
$temp = $User1->getTerritories();
echo($temp[0]->getName());
echo($temp[0]->getTroopNum());
?>