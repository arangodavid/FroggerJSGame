var Obstacle = function(x, y, mph) {
    this.x = Math.floor(Math.random() * 400); //px length of land grid x-axis
    this.y = Math.floor(Math.random() * 300); //px length of land grid y-axis
    this.mph = Math.floor(Math.random() * 100);
    this.cover = 'images/enemy-bug.png';
};

Obstacle.prototype.update = function(direction) {//need to update the location
	switch(direction) {
		case 'left':
			this.y--;
		break;
		case 'right':
			this.y++;
		break;
		default:
			console.log('Enter a valid direction');
		break;
	};
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
