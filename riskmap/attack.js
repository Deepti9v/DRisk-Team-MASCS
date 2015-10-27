function showmodal() {
	el = document.getElementById("dicemodal");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

function updateAttackModal(text){
    return function(){
        document.getElementById('result').innerHTML = text;
    }
}