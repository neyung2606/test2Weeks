const canvas = document.querySelector('#draw');
const modeA = document.querySelector('.maxmin');
const modeB = document.querySelector('.infinity');
const ctx = canvas.getContext('2d');
const oneSquare = canvas.width / 20;
let x = y = 10;
let xApple = yApple = 0;
let lastKey;
let snake = [];
let check = '';
let move;
let current = [];
let noThrough ;

snake.push([x,y]);


function moveSnake(e) {
    if (lastKey == 37 || lastKey == 39) {
        if (e.keyCode == 37 || e.keyCode == 39) return; 
    }
    if (lastKey == 38 || lastKey == 40) {
        if (e.keyCode == 38 || e.keyCode == 40) return;
    }
    switch(e.keyCode) {
        case 37:
            clearInterval(move);
            check = 'left';
            move = setInterval(secondMove, 100);
            break;
        case 38:
            clearInterval(move);
            check = 'up';
            move = setInterval(secondMove, 100);
            break;
        case 39:
            clearInterval(move);
            check = 'right';
            move = setInterval(secondMove, 100);
            break;
        case 40:
            clearInterval(move);
            check = 'down';
            move = setInterval(secondMove, 100);
            break;
    }
    lastKey = e.keyCode;
}

function randomApple() {
    xApple = Math.round(Math.random() * 19);
    yApple = Math.round(Math.random() * 19);
    ctx.fillStyle = 'red';
    ctx.fillRect(xApple * oneSquare, yApple * oneSquare, oneSquare, oneSquare);
}

function secondMove() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) return;
    }
    switch(check) {
        case 'left':
            if (noThrough == true) {
                if (x == 0) {
                    x = 19;
                    break;
                } 
                else {
                    x -= 1;
                    break;
                }
            }
            if (noThrough == false) {
                if (x < 0) {
                    return;
                }
                else {
                    x -= 1;
                    break;
                }
            }
        case 'up':
            if (noThrough == true) {
                if (y == 0) {
                    y = 19;
                    break;
                } else {
                    y -= 1;
                    break;
                }
            }
            if (noThrough == false) {
                if (y < 0) {
                    return;
                }
                else {
                    y -= 1;
                    break;
                }
            }
        case 'right':
            if (noThrough == true) {
                if (x == 19) {
                    x = 0;
                    break;
                } 
                else {
                    x += 1;
                    break;
                }
            }
            if (noThrough == false) {
                if (x > 19) {
                    return;
                }
                else {
                    x += 1;
                    break;
                }
            }
        case 'down':
            if (noThrough == true) {
                if (y == 19) {
                    y = 0;
                    break;
                } else {
                    y += 1;
                    break;
                }
            }
            if (noThrough == false) {
                if (y > 19) {
                    return;
                }
                else {
                    y += 1;
                    break;
                }
            }
    }
    if (xApple == x && yApple == y) {
        randomApple();
        for (e of snake) {
            if (xApple == e[0] && yApple == e[1]) {
                randomApple();
            }
        }
        current = [x, y];
        snake.push(current);
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = 'black';
            ctx.fillRect(snake[i][0] * oneSquare, snake[i][1] * oneSquare, oneSquare, oneSquare);
        }
    } 
    else {
        ctx.fillStyle = 'gray';
        ctx.fillRect(snake[0][0] * oneSquare, snake[0][1] * oneSquare, oneSquare, oneSquare);
        current = [x, y];
        snake.push(current);
        snake.shift();
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = 'black';
            ctx.fillRect(snake[i][0] * oneSquare, snake[i][1] * oneSquare, oneSquare, oneSquare);
        }
    }
}

function wall() {
    clearInterval(move);
    x = y = 10;
    xApple = yApple = 0;
    lastKey = 0;
    snake = [];
    check = '';
    current = [];

    snake.push([x,y]);

    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(xApple, yApple, oneSquare, oneSquare);
    ctx.fillStyle = 'black';
    ctx.fillRect(x * oneSquare, y * oneSquare, oneSquare, oneSquare);
}


window.addEventListener('keyup', moveSnake);
modeA.addEventListener('click',() => {
    wall();
    noThrough = false;
});
modeB.addEventListener('click',() => {
    wall();
    noThrough = true;
});