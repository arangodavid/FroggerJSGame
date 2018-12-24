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
	};

	Obstacle.prototype.addObstacles = function() {
		var obstacleCounter = 0,
			$this = this;
		function clear() {
			if(obstacleCounter >= 12) {
				clearInterval(repeatObstacle);
				startButton.disabled = false;
			}
		};
		var repeatObstacle = setInterval(function() {
			obstacleCounter++;
			$this.createElement();
			clear();
		}, 100);
	};
	// Obstacle.prototype.checkDuplicates = function() {

	// }
	// Obstacle.prototype.update = function(direction) {

	// };
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