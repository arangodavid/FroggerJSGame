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
	    // this.obstaclesOnBoard = [];
	};

	Obstacle.prototype.createElement = function() {
		var obstacle = document.createElement('img');
		obstacle.src = this.cover;
		obstacle.className = 'obstacle';
		this.enterGame(obstacle);
	};

	Obstacle.prototype.enterGame = function(obstacle) {
		var loc = Math.floor(Math.random() * 4);
		var locToAddObstacle = stoneBarsArray[loc].children[0]; //random 1 of 4 rows to add an obstacle
			// numOfObstacles = stoneBarsArray[loc].children[0].children.length;
		// if(numOfObstacles > 0) {
			// console.log('There\'s already an obstacle here');
		// }else {
			locToAddObstacle.appendChild(obstacle);
			this.update(obstacle);
		// };
		// this.obstaclesOnBoard.push(obstacle);
	};

	Obstacle.prototype.addObstacles = function() {
		var obstacleCounter = 0,
			$this = this;
		// function clear() {
		// 	if(obstacleCounter >= 12) { //Desired # of obstacles on the board at one time
		// 		clearInterval(repeatObstacle);
		// 		startButton.disabled = false;
		// 		$this.update();
		// 	}
		// };
		var repeatObstacle = setInterval(function() {
			obstacleCounter++;
			$this.createElement();
			// clear();
		}, 1000);
	};
	Obstacle.prototype.update = function(obstacle) {
		var boost = Math.floor(1 + Math.random() * 3),
			obstacleOnBoard = obstacle,
			xAxis = 0;
		setInterval(function() {
			xAxis++;
			var movement = xAxis + '%';
			obstacleOnBoard.style.left = movement;
		}, 10);
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
		// startButton.disabled = true;
		startButton.innerHTML = 'RESET';
		test.addObstacles();
	}else {
		startButton.innerHTML = 'START GAME';
		reset();
	}
};
startButton.addEventListener('click', run);
})();