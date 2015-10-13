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
	newArmies: 0,

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

	phaseButton: function() {

//		a button to start game
		var startText = new Kinetic.Text({
        	text: "start",
        	x: 0,
        	y: 0,
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'black'
    	});
        Risk.mapLayer.add(startText);

        startText.on('click', function() {
        	startText.setFontSize(30);
        	startText.setFill('red');
            Risk.mapLayer.draw();
        	Risk.startPhase();
        	startText.off('click');
        	startText.off('mouseover');
        	startText.off('mouseout');
        });
        startText.on('mouseover', function() {
        	startText.setFontSize(50);
        	Risk.mapLayer.draw();
        });
        startText.on('mouseout', function() {
            startText.setFontSize(30);
            Risk.mapLayer.draw();
        });

//		a button to deploy
		var deployText = new Kinetic.Text({
        	text: "deploy",
      		x: 100,
            y: 0,
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'black'
    	});
        Risk.mapLayer.add(deployText);
		deployText.on('click', function() {
        	deployText.setFontSize(30);
        	deployText.setFill('red');
        	Risk.mapLayer.draw();
        	Risk.deployPhase();
        	deployText.off('click');
        	deployText.off('mouseover');
        	deployText.off('mouseout');
        });
        deployText.on('mouseover', function() {
        	deployText.setFontSize(50);
        	Risk.mapLayer.draw();
        });
        deployText.on('mouseout', function() {
            deployText.setFontSize(30);
            Risk.mapLayer.draw();
        });

//		a button to attack
		var attackText = new Kinetic.Text({
        	text: "attack",
            fontSize: 30,
            x: 200,
            y: 0,
            fontFamily: 'Calibri',
            fill: 'black'
    	});
        Risk.mapLayer.add(attackText);
		attackText.on('click', function() {
        	attackText.setFontSize(30);
        	attackText.setFill('red');
        	Risk.mapLayer.draw();
        	Risk.attackPhase();
        	attackText.off('click');
        	attackText.off('mouseover');
        	attackText.off('mouseout');
        });
        attackText.on('mouseover', function() {
        	attackText.setFontSize(50);
        	Risk.mapLayer.draw();
        });
        attackText.on('mouseout', function() {
            attackText.setFontSize(30);
            Risk.mapLayer.draw();
        });
//
//		a button to fortify
		var fortifyText = new Kinetic.Text({
        	text: "fortify",
            fontSize: 30,
            x: 300,
            y: 0,
            fontFamily: 'Calibri',
            fill: 'black'
    	});
        Risk.mapLayer.add(fortifyText);
		fortifyText.on('click', function() {
        	fortifyText.setFontSize(30);
        	fortifyText.setFill('red');
        	Risk.mapLayer.draw();
//        	Risk.startPhase(0);
        	fortifyText.off('click');
        	fortifyText.off('mouseover');
        	fortifyText.off('mouseout');
        });
        fortifyText.on('mouseover', function() {
        	fortifyText.setFontSize(50);
        	Risk.mapLayer.draw();
        });
        fortifyText.on('mouseout', function() {
            fortifyText.setFontSize(30);
            Risk.mapLayer.draw();
        });
//

	},

	drawTerritories: function() {

		Risk.phaseButton();

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
			Risk.mouseFunction(path, t, text, group, 0);
		}
	},

	deployPhase: function() {

		Risk.newArmies = Risk.Users[Risk.currentUser].newArmies;
		for (t in Risk.Territories) {
			var path = Risk.Territories[t].path;
			var text = Risk.Territories[t].text;
			var group = Risk.Territories[t].group;
//			console.log(text.getText());
			Risk.mouseFunction(path, t, text, group, 1);
		}
	},

	attackPhase: function() {
		for (t in Risk.Territories) {
			var group = Risk.Territories[t].group;
 			group.off('click');
            group.off('mouseover');
            group.off('mouseout');
		}
	},


//	phase: 0 = initialize(start), 1 = deploy new armies in each turn
//		   2 = attack, 3 = fortify
	mouseFunction: function(path, t, text, group, phase) {

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
			if (Risk.Territories[t].color == null ||
				Risk.Users[Risk.currentUser].color == Risk.Territories[t].color) {

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

               	switch (phase) {
               		case 0:
               			Risk.currentUser = (Risk.currentUser + 1) % Risk.userNumber;
                    case 1:
                    	Risk.newArmies -= 1;
                       	if (Risk.newArmies == 0) {
                        	Risk.currentUser = (Risk.currentUser + 1) % Risk.userNumber;
                        	Risk.attackPhase();
                        }
               	}
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
