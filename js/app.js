//let rows = [83 * 1 - 20, 83 * 2 - 20, 83 * 3 - 20];

// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        this._x =x;
        this._y = y;
        this._speed = speed;

        this._sprite = 'images/enemy-bug.png';
    }

    update(dt) {
       
        this._x = this._x + this._speed * dt;
        if (this._x > 550) {
            this._x = -100;
            this._speed = 100 + Math.floor(Math.random() * 512);
        }
       
        this.checkCollision();
    }

    render() {
        ctx.drawImage(Resources.get(this._sprite), this._x, this._y)
    }
    checkCollision(){
        if (player._y + 131 >= this._y + 90 &&
            player._y + 73 <= this._y + 135 &&
            player._x + 25 <= this._x + 88 &&
            player._x + 76 >= this._x + 11) {
            console.log('collision');
            gameReset();
        }
    }
}


// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started

//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };

// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };

// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y, speed) {
        this._x = x;
        this._y = y;
        this._speed = speed
        this._sprite = 'images/char-boy.png';
    }

    update() {
       
        this._x = this._x;
        this._y = this._y;
      }

    handleInput(key) {
        if (this._y <= (83 - 48)) {
            console.log('won')
            won();
            return;
        }

        key ==='left'&& this._x > 0 ? this._x -= this._speed + 50 : 0 ;
        key ==='right'&& this._x < 400  ? this._x += this._speed + 50 : 0 ;
        key ==='down'&& this._y < 380  ? this._y += this._speed + 30 :0;
        key ==='up' && this._y > -20  ?  this._y -= this._speed + 30 : 0 ;
    }
    reset(){
        this._x = 202.5;
        this._y = 383;
    }

    render() {
        ctx.drawImage(Resources.get(this._sprite), this._x, this._y)
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var score = 0;
var player = new Player(200, 380, 50);
var allEnemies = [];
var scoreDiv = document.createElement('div');
var canvasDiv = document.getElementsByTagName('canvas')[0];
document.body.insertBefore(scoreDiv, canvasDiv);
gameReset();


function gameReset() {
    player.reset();
    score = 0;
    updateDisplay();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0, Math.random() * 150 + 50, Math.random() * 100 + 40),
        new Enemy(0, Math.random() * 150 + 70, Math.random() * 100 + 60),
        new Enemy(0, Math.random() * 160 + 50, Math.random() * 90 + 70)
    );
}

function won() {
    player.reset();
    score += 1;
    updateDisplay();
    if (score % 2 == 0 && allEnemies.length < 4) {
        allEnemies.push(new Enemy(0, Math.random() * 160 + 50, Math.random() * 90 + 70));
    }
}

function updateDisplay() {
    scoreDiv.innerHTML = 'Score ' + score;
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

