var Obstacle = function(x, y, mph) {
    this.x = 400;
    this.y = 300;
    this.mph = Math.floor(Math.random() * 100);
    this.cover = 'images/enemy-bug.png';
};

Obstacle.prototype.update = function(dt) {

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
