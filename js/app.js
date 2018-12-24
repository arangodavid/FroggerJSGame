(function() {
	'use strict'
	var gameOn = false,
		landGrid = document.getElementById('stone-grid'),
		stoneBarsHtmlCollection = document.getElementsByClassName('stone_bar'),
		stoneBlocksHtmlCollection = document.getElementsByClassName('stone_block'),
		stoneBarsArray = Array.prototype.slice.call(stoneBarsHtmlCollection),
		stoneBlocksArray = Array.prototype.slice.call(stoneBlocksHtmlCollection),
		startButton = document.getElementById('start');

	var	Obstacle = function() {
	    this.cover = 'images/enemy-bug.png';
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
		var loc = Math.floor(Math.random() * 20); //20 = stoneBlocksArray.length + 1
		var obstacleSiblings = Array.prototype.slice.call(stoneBlocksArray[loc].children);
		if(obstacleSiblings.length === 0) {
			stoneBlocksArray[loc].appendChild(obstacle);
		}else {
			console.log('Oops, looks like there\'s already an obstacle here');
		};
		this.obstaclesOnBoard.push(obstacle);
	};

	Obstacle.prototype.addObstacles = function() {
		var obstacleCounter = 0,
			$this = this;
		function clear() {
			if(obstacleCounter >= 12) { //Desired # of obstacles on the board at one time
				clearInterval(repeatObstacle);
				startButton.disabled = false;
				$this.update();
			}
		};
		var repeatObstacle = setInterval(function() {
			obstacleCounter++;
			$this.createElement();
			clear();
		}, 100);
	};
	Obstacle.prototype.update = function() {
		var $this = this;
		setInterval(function() {
			$this.x++;
			var movement = $this.x + '%';
			$this.obstaclesOnBoard.forEach(function(el, i) {
				el.style.left = movement;
				// $this.checkObstaclePos();
			});
		}, 7);
	};
// document.addEventListener('keyup', function(e) {
//     var allowedKeys = {
//         37: 'left',
//         38: 'up',
//         39: 'right',
//         40: 'down'
//     };

//     player.handleInput(allowedKeys[e.keyCode]);
// });
function reset() {
	var obstacles = document.getElementsByClassName('obstacle'),
		obstacleArray = Array.prototype.slice.call(obstacles);
	obstacleArray.forEach(function(el, i) {
		el.parentNode.removeChild(el);
	});
};
function run() {
	gameOn = !gameOn;
	var test = new Obstacle();
	if(gameOn) {
		startButton.disabled = true;
		startButton.innerHTML = 'RESET';
		test.addObstacles();
	}else {
		startButton.innerHTML = 'START GAME';
		reset();
	}
};
startButton.addEventListener('click', run);
})();