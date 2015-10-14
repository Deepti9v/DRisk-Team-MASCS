<?php
class card{
	private $id;
	private $value;
	private $image;
	function __construct($Cid, $Cvalue) {
		$this->id = $Cid;
		$this->value = $Cvalue;
    }

	function getId(){
		return $this->id;
	}
	function setId($num){
		$this->id = $num;
	}
	function getValue(){
		return $this->value;
	}
	function setValue($num){
		$this->value = $num;
	}
	function getImage(){
		return $this->image;
	}
	function setImage($newImage){
		$this->image = $newImage;
	}
}
?>