function showmodal() {
	el = document.getElementById("dicemodal");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	closeAutomatically("#dicemodal");
}

function closeAutomatically(divid){
    $(document).ready(function() {
            $(divid).delay(5000).fadeOut(2000, function() {
                $(this).css({"display": "block","visibility": "hidden"});
            });
        });
}

function updateAttackModal(text){
    return function(){
        document.getElementById('result').innerHTML = text;
    }
}