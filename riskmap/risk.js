var Risk = {

	/**
	 * Settings Object, holding application wide settings
	 */
	Settings :{
		globalScale: 1,
		colors: {yellow: '#ff0', green: '#0f0', blue: '#00f', red: '#f00', purple: '#f0f', cyan: '#00ffe4'},
	},

	/**
	 * Our main Territories object
	 * It looks like:
	 * Territories: {
	 *     Alaska: {path: Object, color: String, name: 'Alaska', ...},
	 *	   ... 
	 *	}
	 */
	Territories: {},

	Users: {},

	stage: null,
	mapLayer: null,
	topLayer:  null,
	backgroundLayer: null,

	userNumber: 2,
	initialTroopNumber: 40,
	currentUser: 0,

	init: function() {
		//Initiate our main Territories Object, it contains essential data about the territories current state
		Risk.setUpTerritoriesObj();
		Risk.setUpUsersObj();

		//Initiate a Kinetic stage
		Risk.stage = new Kinetic.Stage({
			container: 'map',
			width: 1920,
			height: 1080
		});

		Risk.mapLayer = new Kinetic.Layer({
			scale: Risk.Settings.globalScale
		});

		Risk.topLayer = new Kinetic.Layer({
			scale: Risk.Settings.globalScale
		});

		Risk.drawBackgroundImg();
		Risk.drawTerritories();

		Risk.stage.add(Risk.backgroundLayer);
		Risk.stage.add(Risk.mapLayer);
		Risk.stage.add(Risk.topLayer);

		Risk.mapLayer.draw();
//		Risk.divideTerritories();
	},

	/**
	 * Initiate the  Risk.Territories Object, this will contain essential informations about the territories 
	 */
	setUpTerritoriesObj: function() {
		for(id in TerritoryNames) {

			var pathObject = new Kinetic.Path({
				data: TerritoryPathData[id].path,
				id: id //set a unique id --> path.attrs.id
			});

//			modified by Shujian Ke
			var armyObject = new Kinetic.Label({
				x: ArmyPoints[id].x,
				y: ArmyPoints[id].y,
				draggable: false
			})
			var text = new Kinetic.Text({
               	text: "",
                fontSize: 15,
                fontFamily: 'Calibri',
                fill: 'black'
    		})
//   			console.log(text.getText());
    		armyObject.add(text);


			//Using a sprite image for territory names
			//see: drawImage() -- https://developer.mozilla.org/en-US/docs/Canvas_tutorial/Using_images , and see Kinetic.Image() docs for more
			var sprite = new Image();
			sprite.src = 'img/names.png';
			var territoryNameImg = new Kinetic.Image({
				image: sprite,
				x: FontDestinationCoords[id].x,
				y: FontDestinationCoords[id].y,
				width: FontSpriteCoords[id].sWidth, //'destiantion Width' 
				height: FontSpriteCoords[id].sHeight, //'destination Height'
				crop: [FontSpriteCoords[id].sx, FontSpriteCoords[id].sy, FontSpriteCoords[id].sWidth, FontSpriteCoords[id].sHeight]

			});

			var group = new Kinetic.Group();

			Risk.Territories[id] = {
				name: TerritoryNames[id],
				path: pathObject,
				nameImg: territoryNameImg,
				color: null,
				neighbours: Neighbours[id],
				army: armyObject,
				armyNum: null,
				group: group,
				text: text
			};
		}
		
	},

	setUpUsersObj: function() {
		var colors = ['yellow', 'green', 'blue', 'red', 'purple', 'cyan'];
		for (i = 0; i < Risk.userNumber; i++) {
			var territories = [];
			for (t in TerritoryNames) {
				territories[t] = false;
			}
			Risk.Users[i] = {
				color: colors[i],
            	territoryCount: 0,
            	territories: territories,
            	cards: null,
            	newArmies: 3
			}
		}

	},

	drawBackgroundImg: function() {
		Risk.backgroundLayer = new Kinetic.Layer({
			scale: Risk.Settings.globalScale
		});
		var imgObj = new Image();
		imgObj.src = 'img/map_grey.jpg';
		
		var img = new Kinetic.Image({
			image: imgObj,
			//alpha: 0.8
		});
		Risk.backgroundLayer.add(img);
	},

	drawTerritories: function() {

//		a botton to start game
		var rect = new Kinetic.Rect({
        	width: 100,
        	height: 50,
         	fill: 'grey',
        	strokeWidth: 5
        });
    	rect.setId('start');
        Risk.mapLayer.add(rect);

        rect.on('click', function() {
        	Risk.startPhase(0);
        	rect.off('click');
        	rect.off('mouseover');
        	rect.off('mouseout');
        });
        rect.on('mouseover', function() {
        	rect.setOpacity(0.3);
			rect.setFill('#eee');
            rect.moveTo(Risk.topLayer);
            Risk.topLayer.drawScene();
        });
        rect.on('mouseout', function() {
            rect.setOpacity(0.4);
			rect.setFill('grey');
            rect.moveTo(Risk.mapLayer);
            Risk.topLayer.draw();
            Risk.mapLayer.draw();
        });
//

		for (t in Risk.Territories) {
			var path = Risk.Territories[t].path;
			var nameImg = Risk.Territories[t].nameImg;
			var army = Risk.Territories[t].army;
			var group = Risk.Territories[t].group;

//			We have to set up a group for proper mouseover on territories and sprite name images
			group.add(path);
			group.add(nameImg);
			group.add(army);

			Risk.mapLayer.add(group);
		}
	},

	startPhase: function() {
		for (t in Risk.Territories) {
			var path = Risk.Territories[t].path;
			var text = Risk.Territories[t].text;
			var group = Risk.Territories[t].group;
//			console.log(text.getText());
			Risk.mouseFunction(path, t, text, group);

		}
	},


	mouseFunction: function(path, t, text, group) {

		group.on('mouseover', function() {
			if (Risk.Territories[t].color == null ||
					Risk.Users[Risk.currentUser].color == Risk.Territories[t].color) {
    			path.setFill('#eee');
                path.setOpacity(0.3);
                group.moveTo(Risk.topLayer);
                Risk.topLayer.drawScene();
        	}
		});

		group.on('mouseout', function() {
			if (Risk.Territories[t].color == null ||
					Risk.Users[Risk.currentUser].color == Risk.Territories[t].color) {

				path.setFill(Risk.Settings.colors[Risk.Territories[t].color]);
            	path.setOpacity(0.4);
            	group.moveTo(Risk.mapLayer);
            	Risk.topLayer.draw();
            	Risk.mapLayer.draw();
            }
		});

		group.on('click', function() {
//			modified by Shujian Ke
		if (Risk.Territories[t].color == null || Risk.Users[Risk.currentUser].color == Risk.Territories[t].color) {
    		if (Risk.Territories[t].armyNum == null) {
    			Risk.Territories[t].armyNum = 1;
    			Risk.Territories[t].color = Risk.Users[Risk.currentUser].color;

    			Risk.Users[Risk.currentUser].territoryCount += 1;
    			Risk.Users[Risk.currentUser].territories[t] = true;
    		} else {
    			Risk.Territories[t].armyNum += 1;
    		}
    		Risk.Territories[t].path.setFill(
                Risk.Settings.colors[Risk.Users[Risk.currentUser].color]);
            Risk.Territories[t].path.setOpacity(0.4);

    		text.setText(Risk.Territories[t].armyNum);
    		group.moveTo(Risk.mapLayer);
            Risk.topLayer.drawScene();
           	Risk.currentUser = (Risk.currentUser + 1) % Risk.userNumber;
           	Risk.stage.draw();
        }
//
		});

	},

	divideTerritories: function() {

		fillRandomColors();

		for(var id in Risk.Territories) {
			var color = Risk.Territories[id].color;
			
			var neighbours = Risk.Territories[id].neighbours;

			//a VERY simple algorithm to make the map more equal
			var similarNeighbours = 0;
			for(var i = 0; i < neighbours.length; i++) {

				var currNeighbour = neighbours[i];
				if (Risk.Territories[currNeighbour].color == color) {
					similarNeighbours++;
				}
			}

			//how many similar neighbours we allow
			if (similarNeighbours > 2) {
				var newColor = getRandomColor();
				while (color == newColor) {
					var newColor = getRandomColor();
				}
				Risk.Territories[id].color = newColor;

				Risk.Territories[id].path.setFill(Risk.Settings.colors[newColor]);
				Risk.Territories[id].path.setOpacity(0.4);				
			}
		}

		Risk.mapLayer.draw();

		function fillRandomColors() {
			for(var id in Risk.Territories) {
				var color = getRandomColor();
				Risk.Territories[id].color = color;
				Risk.Territories[id].path.setFill(Risk.Settings.colors[color]);
				Risk.Territories[id].path.setOpacity(0.4);			

			}
		}

		/**
		 * Returns a color name like 'yellow'
		 */
		function getRandomColor() {
			var colors = ['yellow', 'green', 'blue'];
			//Math.random() returns between [0, 1), so don't worry
			var randomNum = Math.floor(Math.random()*(colors.length)); 
			return colors[randomNum];
		}
	},


	deploymentPhase: function() {

	},

	attackingPhase: function() {

	},

	fortifyingPhase: function() {

	},
}
