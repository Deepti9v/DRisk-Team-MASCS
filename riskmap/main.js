/*
We have to use an asset manager (located in assetManager.js) to download every large picture before we show anything, 
otherwise the map would be imperfect (some images may not appear or load slowly)
 */

var ASSET_MANAGER = new AssetManager();

switch(complexityLevel){
	case 1:
		ASSET_MANAGER.queueDownload('img/complexity1.jpg');
		break;

	case 2:
	 	ASSET_MANAGER.queueDownload('img/complexity2.jpg');
		break;

	case 3:
		ASSET_MANAGER.queueDownload('img/map_grey.jpg');
		break;
}

ASSET_MANAGER.queueDownload('img/names.png');

ASSET_MANAGER.downloadAll(function() {
	Risk.init();
	$("#overlay").fadeOut('slow');
});