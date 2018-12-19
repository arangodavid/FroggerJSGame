(function() {
	'use strict'
	var gameOn = false,
		landGrid = document.getElementById('stone-grid'),
		stoneBarsHtmlCollection = document.getElementsByClassName('stone_bar'),
		stoneBlocksHtmlCollection = document.getElementsByClassName('stone_block'),
		stoneBarsArray = Array.prototype.slice.call(stoneBarsHtmlCollection),
		stoneBlocksArray = Array.prototype.slice.call(stoneBlocksHtmlCollection),
		startButton = document.getElementById('start');

	var	Obstacle = function(loc) {
		this.loc = loc;
	    this.cover = 'images/enemy-bug.png';
	};
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

function setObstacles() {
	stoneBarsArray.forEach(function(el, i) {//loops through each stone bar
		var locationArray = [],
			obstacleCount = Math.floor(1 + Math.random() * 3), //A random # of instances per stone_bar, # between 0-4
			barSquaresCollection = el.children, //Each stone block per stone bar collection
			barSquaresArray = Array.prototype.slice.call(barSquaresCollection); ///Each stone block per stone bar array
		el.obstacleCount = obstacleCount; //Setting obstacleCount as a property of each stone bar(serves good for future reference)
		
		for(var i = 1; i<=el.obstacleCount; i++) {
			var loc = Math.floor(Math.random() * 5),//A random # from 0-4, will be relative
				obstacle = new Obstacle(loc),
				newObstacle = document.createElement('img');
			newObstacle.properties = obstacle;
			newObstacle.src = newObstacle.properties.cover;
			newObstacle.className = 'obstacle';
			locationArray.push(loc);
			barSquaresArray[loc].appendChild(newObstacle);
		};
	});
};
function run() {
	gameOn = !gameOn;
	if(gameOn) {
		startButton.innerHTML = 'RESET';
		setObstacles();
	} 
	else {
		startButton.innerHTML = 'START GAME';
	}
};
startButton.addEventListener('click', run);
})();