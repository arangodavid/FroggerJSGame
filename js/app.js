/*
	FIX OBSTACLE ISSUES FIRST ***
	NOTE: 1.) REMOVE ALL OBSTACLES AFTER THEY GO OUT OF BOUNDS ***
	NOTE: 2.) START PLAYER CLASS ***
	NOTE: 3.) PLAYER SHOULD BE ABLE TO MOVE BASED ON USER INPUT ***
	NOTE: 4.) PREVENT PLAYER FROM GOING OUT OF BOUNDS (not high priority)
	NOTE 5.) CREATE FUNCTION TO CHECK FOR COLLISIONS (high priority)
	NOTE 6.) RE-START PLAYER IF IT COLLIDES WITH OBSTACLES
	NOTE 7.) GIVE PLAYER POINTS AND LIVES
	NOTE 8.) CREATE A GAME STATE, FOR LEVELS
	NOTE 9.) ADD NEW LEVELS, ADD COLLECTIBLES, EXTRA LIVES..
*/
(function() {
	'use strict'
	var gameOn = false,
		stoneBarsHtmlCollection = document.getElementsByClassName('stone_bar'),
		stoneBlocksHtmlCollection = document.getElementsByClassName('stone_block'),
		landBarsHtmlCollection = document.getElementsByClassName('land_bar'),
		stoneBarsArray = Array.prototype.slice.call(stoneBarsHtmlCollection),
		stoneBlocksArray = Array.prototype.slice.call(stoneBlocksHtmlCollection),
		landBarsArray = Array.prototype.slice.call(landBarsHtmlCollection),
		stoneBarBounding = stoneBarsArray[0].getBoundingClientRect(),
		startButton = document.getElementById('start'),
		repeatObstacles;

	var	Obstacle = function() {
	    this.cover = 'images/bug.png';
	    this.x = 0;
	    this.obstaclesOnBoard = [];
	};

	Obstacle.prototype.createElement = function() {
		var obstacle = document.createElement('img');
		obstacle.src = this.cover;
		obstacle.className = 'obstacle';
		this.enterGame(obstacle);
	};

	Obstacle.prototype.enterGame = function(obstacle) {
		var loc = Math.floor(Math.random() * 4),
			locToAddObstacle = stoneBarsArray[loc].children[0]; //random 1 of 4 rows to add an obstacle
			locToAddObstacle.appendChild(obstacle);
			this.update(obstacle);
		this.obstaclesOnBoard.push(obstacle);
	};

	Obstacle.prototype.outOfBounds = function() {
		var outOfBounds = stoneBarBounding.x + stoneBarBounding.width;
		this.obstaclesOnBoard.forEach(function(el, i) {
			var elBounding = el.getBoundingClientRect();
			if(elBounding.x >= outOfBounds) {
				el.parentNode.removeChild(el);
			};
		});
	};
	Obstacle.prototype.handleCollision = function() {//THIS MIGHT HAVE TO BE A OBSTACLE FUNCTION
		var obstaclesHtmlCollection = document.getElementsByClassName('obstacle'),
			obstaclesArray = Array.prototype.slice.call(obstaclesHtmlCollection),
			$this = this;
		obstaclesArray.forEach(function(el, i) {
			var elBounding = el.getBoundingClientRect(),
				playerBounding = document.getElementById('player').getBoundingClientRect();
			if(elBounding.y === playerBounding.y && elBounding.x >= playerBounding.x) { //THINK ABOUT THIS ONE THOROUGHLY
				//needs to check for exact x-axis and y-axis
				console.log('bump');		
			};
		});
	};

	Obstacle.prototype.update = function(obstacle) {
		var obstacleOnBoard = obstacle,
			xAxis = 0; 
		setInterval(function() {//Stop this interval to 'pause game' & re-start it to 'un-pause'
			xAxis++;
			var movement = xAxis + '%';
			obstacleOnBoard.style.left = movement;
		}, 5);
		this.outOfBounds();
		this.handleCollision();
		//CHECK FOR COLLISIONS HERE AS WELL...
	};

	function reset() {
		var obstacles = document.getElementsByClassName('obstacle'),
			obstacleArray = Array.prototype.slice.call(obstacles);
		obstacleArray.forEach(function(el, i) {
			el.parentNode.removeChild(el);
		});
	};

	function Player() {
		this.cover = 'images/boy.png';
		this.activePlayer;
		this.rangeX = stoneBarBounding.width;
		this.moveY = stoneBarBounding.height; //Does not need the same process as the x-axis
		this.moveX = this.rangeX / 5 - 4;
		this.jumpX = 0;
		this.jumpY = 0;
	};

	Player.prototype.addPlayer = function() {
		var playerEl = document.createElement('img'),
			playerStartLoc = landBarsArray[0].children[2];
		playerEl.src = this.cover;
		playerEl.setAttribute('id',  'player');
		this.activePlayer = playerEl;
		playerStartLoc.appendChild(playerEl);
	};
	// Player.prototype.movePlayer = function(direction) {
		
	// }
	Player.prototype.handleInput = function(direction) {
		switch(direction) { //RE-FACTOR!!!! INTO movePlayer FUNCTION ABOVE
			case 'left':
				var spaces = this.jumpX + this.moveX;
				this.jumpX = spaces;
				var gameSpaces = this.jumpX + 'px';
				this.activePlayer.style.right = gameSpaces;
			break;

			case 'up':
				var spaces = this.jumpY + this.moveY;
				this.jumpY = spaces;
				var gameSpaces = this.jumpY + 'px';
				this.activePlayer.style.bottom = gameSpaces;
			break;

			case 'right':
				var spaces = this.jumpX - this.moveX;
				this.jumpX = spaces;
				var gameSpaces = this.jumpX + 'px';
				this.activePlayer.style.right = gameSpaces;
			break;

			case 'down':
				var spaces = this.jumpY - this.moveY;
				this.jumpY = spaces;
				var gameSpaces = this.jumpY + 'px';
				this.activePlayer.style.bottom = gameSpaces;
			break;

			default:
				console.log('other');
			break;
		};
	};

	Player.prototype.removePlayer = function() {
		var removePlayer = document.getElementById('player');
		removePlayer.parentNode.removeChild(removePlayer);
	};

	var obstacle = new Obstacle(),
			player = new Player();

	function run() {
		gameOn = !gameOn;
		if(gameOn) {2
			startButton.innerHTML = 'RESET';
			repeatObstacles = setInterval(function() {
				obstacle.createElement();
			}, 1000);
			player.addPlayer();
		}else {
			startButton.innerHTML = 'START GAME';
			player.removePlayer();
			clearInterval(repeatObstacles);
			reset();
		};
	};

	document.addEventListener('keyup', function(e) {
	    var allowedKeys = {
	        37: 'left',
	        38: 'up',
	        39: 'right',
	        40: 'down'
	    };
	    player.handleInput(allowedKeys[e.keyCode]);
	});

	startButton.addEventListener('click', run);

})();