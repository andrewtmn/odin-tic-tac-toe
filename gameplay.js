const X_TOKEN = 'X';
const O_TOKEN = 'O'; 

const board = (() => {
    let gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const markBoard = (sym, row, col) => {
        if (gameBoard[row][col] === X_TOKEN || gameBoard[row][col] === O_TOKEN) {
            return false;
        }
        gameBoard[row][col] = sym;
        return true;
    }; 

    const checkWinner = (sym) => {
        let win = false;
        for (let i = 0; i < gameBoard.length; i++) {
            win = gameBoard[i].every(token => token === sym); //check rows

            if (gameBoard[0][i] === sym && gameBoard[1][i] === sym && gameBoard[2][i] === sym) {
                win = true; //check columns
            }
        }

        if (gameBoard[0][0] === sym && gameBoard[1][1] === sym && gameBoard[2][2] === sym) {
            win = true; 
        }

        if (gameBoard[2][0] === sym && gameBoard[1][1] === sym && gameBoard[0][2] === sym) {
            win = true;
        }
        return win;
    };

    const getToken = (row, col) => {
        return gameBoard[row][col];
    }
    
    return {markBoard, checkWinner, getToken};
})();

const Player = (name, token) => {
    let token = token;
    let name = name;

    const getName = () => {return name};
    const getToken = () => {return token};
    const playTurn = (board, row, col) => {
        if (!board.markBoard(token, row, col)) {
            // do something here, since position is already taken
        }
        board.checkWinner(token);
    };

    return {getName, getToken, playTurn};
};

// probably not a good approach
function playGame(p1Name, p2Name) {
    let gameOver = false;
    let player1 = Player(p1Name, X_TOKEN);
    let player2 = Player(p2Name, O_TOKEN);

    while (!gameOver) {
        // busy waiting??
    }
}