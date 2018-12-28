/*
	FIX OBSTACLE ISSUES FIRST ***
	NOTE: 1.) REMOVE ALL OBSTACLES AFTER THEY GO OUT OF BOUNDS ***
	NOTE: 2.) START PLAYER CLASS ***
	NOTE: 3.) PLAYER SHOULD BE ABLE TO MOVE BASED ON USER INPUT
	NOTE 4.) CREATE FUNCTION TO CHECK FOR COLLISIONS
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
			if(elBounding.x > outOfBounds) {
				el.parentNode.removeChild(el);
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
		this.xRange = stoneBarBounding.width;
		this.moveLeft = this.xRange / 5;
		this.moveLeft += 'px';
	};
	Player.prototype.addPlayer = function() {
		var playerEl = document.createElement('img'),
			playerStartLoc = landBarsArray[0].children[2];
		playerEl.src = this.cover;
		playerEl.className = 'player';
		this.activePlayer = playerEl;
		playerStartLoc.appendChild(playerEl);
	}
	// Player.prototype.movePlayer = function(rowWidth, divideBy) {
		
	// }
	Player.prototype.handleInput = function(direction) {
		//When moving the obstacle it should be calculated, get the width of the row from boundingclientrect and divide that by 5
		switch(direction) {
			case 'left':
				// this.activePlayer.style.right += this.moveLeft;
				// console.log(this.moveLeft);
			break;

			case 'up':
				console.log('up');
			break;

			case 'right':
				console.log('right');
			break;

			case 'down':
				console.log('down');
			break;

			default:
				console.log('other');
			break;
		};
	};

	var obstacle = new Obstacle(),
			player = new Player();

	function run() {
		gameOn = !gameOn;
		if(gameOn) {
			startButton.innerHTML = 'RESET';
			repeatObstacles = setInterval(function() {
				obstacle.createElement();
			}, 1000);
			player.addPlayer();
		}else {
			startButton.innerHTML = 'START GAME';
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