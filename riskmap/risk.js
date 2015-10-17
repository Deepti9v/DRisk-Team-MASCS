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

	attacker: null,
	defender: null,

	sourceTerritory: null,
	destinationTerritory: null,

	fortifyText: null,
	deployText: null,
	attackText: null,
	finishText: null,

	displayInfo: null,
	remainArmies: 2,
	currentPhase: 1,


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
                fontSize: 20,
                fontFamily: 'Calibri',
                fill: 'red'
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
        	Risk.updateDisplayInformation();
        	startText.setFontSize(30);
            Risk.mapLayer.draw();
        	startText.off('click');
        	startText.off('mouseover');
        	startText.off('mouseout');
//        	Risk.activatePhaseLink('deploy');
        	Risk.startPhase();
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
		Risk.deployText = new Kinetic.Text({
        	text: "deploy",
      		x: 100,
            y: 0,
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'black'
    	});
        Risk.mapLayer.add(Risk.deployText);

//		a button to attack
		Risk.attackText = new Kinetic.Text({
        	text: "attack",
            fontSize: 30,
            x: 200,
            y: 0,
            fontFamily: 'Calibri',
            fill: 'black'
    	});
        Risk.mapLayer.add(Risk.attackText);

//		a button to fortify
		Risk.fortifyText = new Kinetic.Text({
        	text: "fortify",
            fontSize: 30,
            x: 300,
            y: 0,
            fontFamily: 'Calibri',
            fill: 'black'
    	});
        Risk.mapLayer.add(Risk.fortifyText);

//      a button to finish this turn
		Risk.finishText = new Kinetic.Text({
			text: "finish",
			fontSize: 30,
			x: 400,
			y: 0,
			fontFamily: 'Calibri',
			fill: 'black',
		});
		Risk.mapLayer.add(Risk.finishText);

//		display information
		Risk.displayInfo = new Kinetic.Text({
			text: "Click Start to begin",
			fontSize: 30,
			x: 700,
			y: 25,
			fontFamily: 'Calibri',
			fill: 'black',
			shadowColor: 'red',
			align: 'left'
		});
		Risk.mapLayer.add(Risk.displayInfo);

	},

	activatePhaseLink(phaseText){
		switch(phaseText){
			case('deploy'):
				Risk.deployText.on('click', function() {
					Risk.deployText.setFontSize(30);
					Risk.mapLayer.draw();
					Risk.deployText.off('click');
					Risk.deployText.off('mouseover');
					Risk.deployText.off('mouseout');
					Risk.deployPhase();
				});
				Risk.deployText.on('mouseover', function() {
					Risk.deployText.setFontSize(50);
					Risk.mapLayer.draw();
				});
				Risk.deployText.on('mouseout', function() {
					Risk.deployText.setFontSize(30);
					Risk.mapLayer.draw();
				});
				break;

			case('attack'):
				Risk.attackText.on('click', function() {
					Risk.attackText.setFontSize(30);
					Risk.mapLayer.draw();
					Risk.attackText.off('click');
					Risk.attackText.off('mouseover');
					Risk.attackText.off('mouseout');
					Risk.attackPhase();

				});
				Risk.attackText.on('mouseover', function() {
					Risk.attackText.setFontSize(50);
					Risk.mapLayer.draw();
				});
				Risk.attackText.on('mouseout', function() {
					Risk.attackText.setFontSize(30);
					Risk.mapLayer.draw();
				});
				break;

			case ('fortify'):
				Risk.fortifyText.on('click', function() {
					Risk.fortifyText.setFontSize(30);
					Risk.mapLayer.draw();
					Risk.fortifyText.off('click');
					Risk.fortifyText.off('mouseover');
					Risk.fortifyText.off('mouseout');
					Risk.fortifyPhase();

				});
				Risk.fortifyText.on('mouseover', function() {
					Risk.fortifyText.setFontSize(50);
					Risk.mapLayer.draw();
				});
				Risk.fortifyText.on('mouseout', function() {
					Risk.fortifyText.setFontSize(30);
					Risk.mapLayer.draw();
				});
				break;

			case ('finish'):
				Risk.finishText.on('click', function() {
					Risk.finishText.setFontSize(30);
                   	Risk.mapLayer.draw();
					console.log(Risk.currentUser);
					Risk.currentUser = (Risk.currentUser + 1) % Risk.userNumber;
					console.log(Risk.currentUser);
					Risk.finishText.off('click');
					Risk.finishText.off('mouseover');
					Risk.finishText.off('mouseout');
					Risk.deployPhase();

				});
				Risk.finishText.on('mouseover', function() {
					Risk.finishText.setFontSize(50);
					Risk.mapLayer.draw();
				});
				Risk.finishText.on('mouseout', function() {
					Risk.finishText.setFontSize(30);
					Risk.mapLayer.draw();
				});
				break;
		}
	},

	updateDisplayInformation: function(){
		Risk.mapLayer.draw();
		switch(Risk.currentPhase) {
			case 1:
				text = "start phase\n" + "User " + Risk.currentUser.toString() + "\nremain armies: "
					+ Risk.remainArmies.toString();
				break;

			case 2:
				text = "deploy phase\n" + "User " + Risk.currentUser.toString() + "\nremain armies: "
                	+ Risk.newArmies.toString();
              	break;

            case 3:
            	text = "attact phase\n" + "User " + Risk.currentUser.toString();
            	break;

            case 4:
            	text = "fortify phase\n" + "User " + Risk.currentUser.toString();
            	break;

		}
		Risk.displayInfo.setText(text);
		Risk.displayInfo.moveTo(Risk.mapLayer);
        Risk.mapLayer.drawScene();
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
		Risk.currentPhase = 1;
		for (t in Risk.Territories) {
			var path = Risk.Territories[t].path;
			var text = Risk.Territories[t].text;
			var group = Risk.Territories[t].group;
//			console.log(text.getText());
			Risk.mouseFunction(path, t, text, group, 0);
		}
	},

	deployPhase: function() {
		Risk.currentPhase = 2;
//		Risk.activatePhaseLink('attack');
		Risk.newArmies = Risk.Users[Risk.currentUser].newArmies;
		Risk.updateDisplayInformation();

		for (t in Risk.Territories) {
			var path = Risk.Territories[t].path;
			var text = Risk.Territories[t].text;
			var group = Risk.Territories[t].group;
			group.off('click');
            group.off('mouseover');
            group.off('mouseout');
//			console.log(text.getText());
			Risk.mouseFunction(path, t, text, group, 1);
		}
	},

	attackPhase: function() {
		Risk.currentPhase = 3;
		Risk.activatePhaseLink('fortify');
		Risk.updateDisplayInformation();
		Risk.selectAttackTerritory();
	},

	selectAttackTerritory: function(){

		for (t in Risk.Territories) {

            var path = Risk.Territories[t].path;
            var text = Risk.Territories[t].text;
            var group = Risk.Territories[t].group;

            group.off('click');
            group.off('mouseover');
            group.off('mouseout');

            (function(path, text, group){
                group.on('mouseover', function() {
                    if(path.attrs.id != Risk.attacker
                    	&& Risk.Users[Risk.currentUser].color == Risk.Territories[path.attrs.id].color
                    	&& Risk.Territories[path.attrs.id].armyNum > 1){

                        path.setOpacity(0.3);
                        group.moveTo(Risk.topLayer);
                        Risk.topLayer.drawScene();
                    }

                    if (Risk.attacker != null) {
                    	var neighbours = Risk.Territories[Risk.attacker].neighbours;
                        for(var i = 0; i < neighbours.length; i++) {
                        	if (neighbours[i] == Risk.Territories[path.attrs.id].name
                        		&& Risk.Territories[neighbours[i]].armyNum > 0
                        		&& Risk.Territories[neighbours[i]].color != Risk.Territories[Risk.attacker].color) {

                            	path.setOpacity(0.3);
                                group.moveTo(Risk.topLayer);
                                Risk.topLayer.drawScene();
                            }
                        }
                    }

                });

                group.on('mouseout', function() {
                    if (path.attrs.id != Risk.attacker
                    	&& Risk.Users[Risk.currentUser].color == Risk.Territories[path.attrs.id].color
                    	&& Risk.Territories[path.attrs.id].armyNum > 1){

                        path.setFill(Risk.Settings.colors[Risk.Territories[path.attrs.id].color]);
                        group.moveTo(Risk.mapLayer);
                        Risk.topLayer.draw();
                        Risk.mapLayer.draw();
                    }

                    if (Risk.attacker != null) {
                    	var neighbours = Risk.Territories[Risk.attacker].neighbours;
                        for(var i = 0; i < neighbours.length; i++) {
                        	if (neighbours[i] == Risk.Territories[path.attrs.id].name
                        		&& Risk.Territories[neighbours[i]].armyNum > 0
                        		&& Risk.Territories[neighbours[i]].color != Risk.Territories[Risk.attacker].color) {

								path.setFill(Risk.Settings.colors[Risk.Territories[path.attrs.id].color]);
                            	group.moveTo(Risk.mapLayer);
                            	Risk.topLayer.draw();
                            	Risk.mapLayer.draw();
                            }
                        }
                    }
                });

                group.on('click', function() {
                    if (path.attrs.id != Risk.attacker
                    	&& Risk.Users[Risk.currentUser].color == Risk.Territories[path.attrs.id].color
                    	&& Risk.Territories[path.attrs.id].armyNum > 1){
						if (Risk.attacker != null) {
							Risk.Territories[Risk.attacker].path.setOpacity(0.4);
						}
                        Risk.attacker = path.attrs.id;
                        Risk.Territories[path.attrs.id].path.setOpacity(0.8);
                        group.moveTo(Risk.topLayer);
                        Risk.topLayer.drawScene();
//                        Risk.selectDefendingTerritory();
                    }

                    if (Risk.attacker != null) {
                   		var neighbours = Risk.Territories[Risk.attacker].neighbours;
                    	for(var i = 0; i < neighbours.length; i++) {
                        	if (neighbours[i] == Risk.Territories[path.attrs.id].name
                        		&& Risk.Territories[neighbours[i]].armyNum > 0
                        		&& Risk.Territories[neighbours[i]].color != Risk.Territories[Risk.attacker].color) {
                            	Risk.defender = path.attrs.id;
//                           		path.setOpacity(0.8);
                            	group.moveTo(Risk.topLayer);
                            	Risk.topLayer.drawScene();
                            	Risk.fight();
                        }
                    }
                    }
                });
            })(path, text, group);
        }
	},

	fight: function(){
        var AttackerDice ;
        var DefenderDice ;

        while(Risk.Territories[Risk.attacker].armyNum != 1 && Risk.Territories[Risk.defender].armyNum != 0){
            AttackerDice = 1 + Math.floor(Math.random()*6);
            DefenderDice = 1 + Math.floor(Math.random()*6);

            if (AttackerDice > DefenderDice){
                Risk.Territories[Risk.defender].armyNum -= 1;
                Risk.Territories[Risk.defender].text.setText(Risk.Territories[Risk.defender].armyNum);
                Risk.Territories[Risk.defender].group.moveTo(Risk.mapLayer);
                Risk.topLayer.drawScene();
            }
            else{
                Risk.Territories[Risk.attacker].armyNum -= 1;
                Risk.Territories[Risk.attacker].text.setText(Risk.Territories[Risk.attacker].armyNum);
                Risk.Territories[Risk.attacker].group.moveTo(Risk.mapLayer);
                Risk.topLayer.drawScene();
            }
            Risk.stage.draw();
        }

        Risk.Territories[Risk.attacker].path.setOpacity(0.4);

        if (Risk.Territories[Risk.defender].armyNum == 0){

			for(i = 0; i < Risk.userNumber; i++){
				for (t in Risk.Territories){
					if( t == Risk.defender && Risk.Users[i].territories[t] == true){
						defendingUser = i;
						break;
					}
				}
			}

            Risk.Territories[Risk.defender].color = Risk.Territories[Risk.attacker].color;
            Risk.Users[Risk.currentUser].territories[Risk.defender] = true;
            Risk.Users[defendingUser].territories[Risk.defender] = false;
            Risk.Territories[Risk.defender].path.setFill(Risk.Settings.colors[Risk.Territories[Risk.attacker].color]);

            Risk.Territories[Risk.defender].armyNum = Risk.Territories[Risk.attacker].armyNum - 1;
            Risk.Territories[Risk.defender].text.setText(Risk.Territories[Risk.defender].armyNum);
            Risk.Territories[Risk.defender].group.moveTo(Risk.mapLayer);
            Risk.mapLayer.draw();
            Risk.topLayer.drawScene();

            Risk.Territories[Risk.attacker].armyNum = 1;
            Risk.Territories[Risk.attacker].text.setText(Risk.Territories[Risk.attacker].armyNum);
            Risk.Territories[Risk.attacker].group.moveTo(Risk.mapLayer);
            Risk.mapLayer.draw();
            Risk.topLayer.drawScene();

            //Risk.stage.draw();
        }
        else
        {
            Risk.Territories[Risk.attacker].path.setFill(Risk.Settings.colors[Risk.Territories[Risk.attacker].color]);
            Risk.Territories[Risk.defender].path.setFill(Risk.Settings.colors[Risk.Territories[Risk.defender].color]);
            Risk.Territories[Risk.attacker].group.moveTo(Risk.mapLayer);
            //Risk.topLayer.draw();
            //Risk.mapLayer.draw();
            Risk.Territories[Risk.defender].group.moveTo(Risk.mapLayer);
            Risk.topLayer.draw();
            Risk.mapLayer.draw();
        }
	    Risk.attacker = null;
	    Risk.defender = null;

	    Risk.selectAttackTerritory();
	},

	fortifyPhase: function(){
		Risk.currentPhase = 4;
		Risk.updateDisplayInformation();
		Risk.activatePhaseLink('finish');
		Risk.selectSourceTerritory();
	},

	selectSourceTerritory: function(){
		for (t in Risk.Territories) {
			var path = Risk.Territories[t].path;
			var text = Risk.Territories[t].text;
			var group = Risk.Territories[t].group;

			group.off('click');
			group.off('mouseover');
			group.off('mouseout');

			(function(path, text, group){
				group.on('mouseover', function() {
					if (Risk.Users[Risk.currentUser].color == Risk.Territories[path.attrs.id].color
						&& Risk.Territories[path.attrs.id].armyNum > 1){

						path.setOpacity(0.3);
						group.moveTo(Risk.topLayer);
						Risk.topLayer.drawScene();
					}
				});

				group.on('mouseout', function() {
					if(Risk.Users[Risk.currentUser].color == Risk.Territories[path.attrs.id].color
						&& Risk.Territories[path.attrs.id].armyNum > 1){

						path.setFill(Risk.Settings.colors[Risk.Territories[path.attrs.id].color]);
						group.moveTo(Risk.mapLayer);
						Risk.topLayer.draw();
						Risk.mapLayer.draw();
					}
				});

				group.on('click', function() {
					if(Risk.Users[Risk.currentUser].color == Risk.Territories[path.attrs.id].color
						&& Risk.Territories[path.attrs.id].armyNum > 1){

						Risk.sourceTerritory = path.attrs.id;
						Risk.Territories[path.attrs.id].path.setOpacity(0.8);
						group.moveTo(Risk.topLayer);
						Risk.topLayer.drawScene();
						Risk.selectDestinationTerritory();
					}
				});
			})(path, text, group);
		}
	},

	selectDestinationTerritory: function(){
		for (t in Risk.Territories) {

			var path = Risk.Territories[t].path;
			var text = Risk.Territories[t].text;
			var group = Risk.Territories[t].group;

			group.off('click');
			group.off('mouseover');
			group.off('mouseout');

			(function(path, text, group){
				group.on('mouseover', function() {
					if (Risk.sourceTerritory != path.attrs.id
						&& Risk.Users[Risk.currentUser].color == Risk.Territories[path.attrs.id].color) {

						path.setOpacity(0.3);
						group.moveTo(Risk.topLayer);
						Risk.topLayer.drawScene();
					}
				});

				group.on('mouseout', function() {
					if (Risk.sourceTerritory != path.attrs.id
						&& Risk.Users[Risk.currentUser].color == Risk.Territories[path.attrs.id].color) {
						path.setFill(Risk.Settings.colors[Risk.Territories[path.attrs.id].color]);

						group.moveTo(Risk.mapLayer);
						Risk.topLayer.draw();
						Risk.mapLayer.draw();
					}
				});

				group.on('click', function() {
					if (Risk.sourceTerritory != path.attrs.id
						&& Risk.Users[Risk.currentUser].color == Risk.Territories[path.attrs.id].color) {

						Risk.destinationTerritory = path.attrs.id;
						path.setOpacity(0.3);
						group.moveTo(Risk.topLayer);
						Risk.topLayer.drawScene();
						Risk.moveTroops();
						Risk.selectSourceTerritory();
					}
				});
			})(path, text, group);
		}
	},

	moveTroops: function(){

		Risk.Territories[Risk.sourceTerritory].armyNum -= 1;
		Risk.Territories[Risk.sourceTerritory].text.setText(
			Risk.Territories[Risk.sourceTerritory].armyNum);
		Risk.Territories[Risk.sourceTerritory].group.moveTo(Risk.mapLayer);
		Risk.topLayer.drawScene();
		Risk.stage.draw();

		Risk.Territories[Risk.destinationTerritory].armyNum += 1;
		Risk.Territories[Risk.destinationTerritory].text.setText(
			Risk.Territories[Risk.destinationTerritory].armyNum);
		Risk.Territories[Risk.destinationTerritory].group.moveTo(Risk.mapLayer);
		Risk.topLayer.drawScene();
		Risk.stage.draw();

		Risk.Territories[Risk.sourceTerritory].path.setOpacity(0.4);
		Risk.topLayer.drawScene();
        Risk.stage.draw();

		Risk.sourceTerritory = null;
		Risk.destinationTerritory = null;

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
               			if(Risk.currentUser == 0) {
               				Risk.remainArmies -= 1;
               			}
               			Risk.updateDisplayInformation();
               			if(Risk.remainArmies == 0) {
               				Risk.deployPhase();
               			}
               			break;

                    case 1:
                    	Risk.newArmies -= 1;
                    	Risk.updateDisplayInformation();
                       	if (Risk.newArmies == 0) {
                        	Risk.attackPhase();
                        }
                        break;
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

}
