const boxs = document.querySelectorAll('.box');
const won = document.querySelector('.winner');
let lastTick = '';
let alreadyTick = [];
let end = false;

function restart() {
    end = false;
    alreadyTick = [];
    lastTick = '';
    won.textContent = '';
    boxs.forEach(box => box.textContent = '');
    boxs.forEach(box => box.classList.remove('win'));
}

function makeHighlight(a, b, c) {
    document.querySelector(`[data-box="${a}"]`).classList.add('win');
    document.querySelector(`[data-box="${b}"]`).classList.add('win');
    document.querySelector(`[data-box="${c}"]`).classList.add('win');
}

function winner() {
    const arr = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ]

    for (e of arr) {
        if (alreadyTick[e[0]] && alreadyTick[e[1]] && alreadyTick[e[2]]) {
            if (alreadyTick[e[0]] === alreadyTick[e[1]] &&
                alreadyTick[e[0]] === alreadyTick[e[2]]) {
                    won.textContent = `The winner is ${alreadyTick[e[0]]}`;
                    makeHighlight(e[0], e[1], e[2]);
                    return end = true;
                }
        }
    }
}

function tick() {
    if (end) return;
    if (this.textContent != '') return;
    this.textContent = 'X';
    lastTick == 'X' ? this.textContent = 'O' : 'X';
    alreadyTick[this.dataset.box] = this.textContent;
    lastTick = this.textContent;
    winner();
}

boxs.forEach(box => box.addEventListener('click', tick));