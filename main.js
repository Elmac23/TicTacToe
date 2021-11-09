const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const game = {
    pointsO: 0,
    pointsX: 0,
    turn: 'O',
    isDark: false,
}

const updateBoard = function (x, y) {
    board[y][x] = game.turn;
}

const swapTurn = function () {
    game.turn = game.turn === 'O' ? 'X' : 'O';
}

const testWin = function () {
    if (
        (board[0][0] === 'O' && board[0][1] === 'O' && board[0][2] === 'O') ||
        (board[1][0] === 'O' && board[1][1] === 'O' && board[1][2] === 'O') ||
        (board[2][0] === 'O' && board[2][1] === 'O' && board[2][2] === 'O') ||

        (board[0][0] === 'O' && board[1][0] === 'O' && board[2][0] === 'O') ||
        (board[0][1] === 'O' && board[1][1] === 'O' && board[2][1] === 'O') ||
        (board[0][2] === 'O' && board[1][2] === 'O' && board[2][2] === 'O') ||

        (board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O') ||
        (board[0][2] === 'O' && board[1][1] === 'O' && board[2][0] === 'O')
    ) {
        return 'O';
    } else if (
        (board[0][0] === 'X' && board[0][1] === 'X' && board[0][2] === 'X') ||
        (board[1][0] === 'X' && board[1][1] === 'X' && board[1][2] === 'X') ||
        (board[2][0] === 'X' && board[2][1] === 'X' && board[2][2] === 'X') ||

        (board[0][0] === 'X' && board[1][0] === 'X' && board[2][0] === 'X') ||
        (board[0][1] === 'X' && board[1][1] === 'X' && board[2][1] === 'X') ||
        (board[0][2] === 'X' && board[1][2] === 'X' && board[2][2] === 'X') ||

        (board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X') ||
        (board[0][2] === 'X' && board[1][1] === 'X' && board[2][0] === 'X')
    ) {
        return 'X';
    } else if (!board.flat().includes('')) {
        return 'Draw';
    } else {
        return false;
    }
}

const updateUi = function () {
    document.querySelector('.points-o').textContent = 'O: ' + game.pointsO;
    document.querySelector('.points-x').textContent = 'X: ' + game.pointsX;
    document.querySelector('.turn').textContent = 'Turn: ' + game.turn;
}

const clear = function () {
    const fields = [...document.querySelectorAll('.field')];
    fields.forEach(element => {
        element.firstElementChild.textContent = '';
    });
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = '';
        }
    }
    this.remove();
}

const winScreen = function () {
    const clickToContinue = document.createElement('div');
    clickToContinue.classList.add('click-to-continue');
    const text = document.createElement('p');
    text.textContent = 'Press to continue';
    clickToContinue.addEventListener('click', clear);
    document.body.appendChild(clickToContinue);
    clickToContinue.appendChild(text);
}

const processGame = function (e) {
    if (!this.firstElementChild.textContent) {
        this.firstElementChild.textContent = game.turn;
        updateBoard(e.target.dataset.x, e.target.dataset.y);
        let winner = testWin();
        swapTurn();
        if (winner === 'X') {
            game.pointsX++;
        } else if (winner === 'O') {
            game.pointsO++;
        }
        winner && winScreen();
        updateUi();
    }
}

const setDark = () => {
    document.querySelector('.game-wrapper').classList.remove('gradient');
    document.documentElement.style.setProperty('--border-color', 'rgb(255, 255, 255)');
    document.documentElement.style.setProperty('--field-color', 'rgb(12, 12, 12)');
    document.documentElement.style.setProperty('--field-hover-color', 'rgb(30, 30, 30)');
    game.isDark = true;
}

const setLight = () => {
    document.querySelector('.game-wrapper').classList.add('gradient');
    document.documentElement.style.setProperty('--border-color', 'rgb(12, 12, 12)');
    document.documentElement.style.setProperty('--field-color', 'rgb(255, 255, 255)');
    document.documentElement.style.setProperty('--field-hover-color', 'rgb(196, 196, 196)');
    game.isDark = false;
}

const toggleDarkMode = () => {
    if (game.isDark) {
        setLight();
    } else {
        setDark();
    }
    document.querySelector('.toggle-thumb').classList.toggle('thumb-toggled');
}

const fields = [...document.querySelectorAll('.field')];
fields.forEach(element => element.addEventListener('click', processGame));

document.getElementById('darkmode').addEventListener('click', toggleDarkMode)