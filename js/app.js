/*
	FIX OBSTACLE ISSUES FIRST ***
	NOTE: 1.) REMOVE ALL OBSTACLES AFTER THEY GO OUT OF BOUNDS ***
	NOTE: 2.) START PLAYER CLASS
	NOTE: 3.) PLAYER SHOULD BE ABLE TO MOVE BASED ON USER INPUT
	NOTE 4.) CREATE FUNCTION TO CHECK FOR COLLISIONS
*/
(function() {
	'use strict'
	var gameOn = false,
		landGrid = document.getElementById('stone-grid'),
		stoneBarsHtmlCollection = document.getElementsByClassName('stone_bar'),
		stoneBlocksHtmlCollection = document.getElementsByClassName('stone_block'),
		stoneBarsArray = Array.prototype.slice.call(stoneBarsHtmlCollection),
		stoneBlocksArray = Array.prototype.slice.call(stoneBlocksHtmlCollection),
		startButton = document.getElementById('start'),
		repeatObstacles;
		var stoneBarBounding = stoneBarsArray[0].getBoundingClientRect();

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
				console.log('out of bounds');
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
	// function Player(name) {

	// }
	function run() {
		gameOn = !gameOn;
		var initiator = new Obstacle(); //The obstacle that starts it all...
		if(gameOn) {
			startButton.innerHTML = 'RESET';
			repeatObstacles = setInterval(function() {
				initiator.createElement();
			}, 1000);
		}else {
			startButton.innerHTML = 'START GAME';
			clearInterval(repeatObstacles);
			reset();
		};
	};

	startButton.addEventListener('click', run);
	// document.addEventListener('keyup', function(e) {
	//     var allowedKeys = {
	//         37: 'left',
	//         38: 'up',
	//         39: 'right',
	//         40: 'down'
	//     };
	//     player.handleInput(allowedKeys[e.keyCode]);
	// });
})();