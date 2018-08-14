class Character {
    constructor(x, y, speed, sprite) {
        this._x = x;
        this._y = y;
        this._speed = speed;

        this._sprite = sprite;
    }

    update() {
        throw new Error('The method must be implemented');
    }
    render() {
        ctx.drawImage(Resources.get(this._sprite), this._x, this._y)
    }

}
class Enemy extends Character {

    
    update(dt) {

        this._x = this._x + this._speed * dt;
        if (this._x > 550) {
            this._x = -100;
            this._speed = 100 + Math.floor(Math.random() * 512);
        }

        this.checkCollision(player);
    }
    checkCollision(jogador){
        
        if (jogador._y + 131 >= this._y + 90 &&
            jogador._y + 73 <= this._y + 135 &&
            jogador._x + 25 <= this._x + 88 &&
            jogador._x + 76 >= this._x + 11) {
       
        gameReset();
        }
    }

}

class Player extends Character {

    update() {

        this._x = this._x;
        this._y = this._y;
    }

    reset() {
        this._x = 202.5;
        this._y = 383;
    }

    handleInput(key) {
        if (this._y <= (83 - 48)) {
            console.log('won')
            won();
            return;
        }

        key === 'left' && this._x > 50 ? this._x -= this._speed + 50 : 0;
        key === 'right' && this._x < 400 ? this._x += this._speed + 50 : 0;
        key === 'down' && this._y < 380 ? this._y += this._speed + 30 : 0;
        key === 'up' && this._y > -20 ? this._y -= this._speed + 30 : 0;
    }

}

var score = 0;
var player = new Player(200, 380, 50, 'images/char-boy.png');
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
        new Enemy(0, Math.random() * 150 + 50, Math.random() * 100 + 40, 'images/enemy-bug.png'),
        new Enemy(0, Math.random() * 150 + 70, Math.random() * 100 + 60, 'images/enemy-bug.png'),
        new Enemy(0, Math.random() * 160 + 50, Math.random() * 90 + 70, 'images/enemy-bug.png')
    );
}

function won() {
    player.reset();
    score += 1;
    updateDisplay();
    if (score % 2 == 0 && allEnemies.length < 4) {
        allEnemies.push(new Enemy(0, Math.random() * 160 + 50, Math.random() * 90 + 70, 'images/enemy-bug.png'));
    }
}

function updateDisplay() {
    scoreDiv.innerHTML = 'Score ' + score;
}

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

