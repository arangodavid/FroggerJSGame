var Obstacle = function(x, y, mph) {
    //testing git commit contributions
    //test #2...set up email address in terminal and on github.com
    //Test #3
    // Test #4 re-initialized repo
    //Test #5 accesed dot .gitconfig file to re-write my email address
    this.x = 400;
    this.y = 300;

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
