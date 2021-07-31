const X_TOKEN = 'X';
const O_TOKEN = 'O'; 

const board = (() => {
    let gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    let p1 = undefined;
    let p2 = undefined;
    let currentPlayer = undefined;

    const markBoard = (row, col) => {
        if (gameBoard[row][col] === X_TOKEN || gameBoard[row][col] === O_TOKEN) {
            return false;
        }
        gameBoard[row][col] = currentPlayer.getToken();
        return true;
    }; 

    const checkWinner = (sym) => {
        let win = false;
        for (let i = 0; i < gameBoard.length; i++) {
            win = gameBoard[i].every(token => token === sym); //check rows

            if (gameBoard[0][i] === sym && gameBoard[1][i] === sym && gameBoard[2][i] === sym) {
                win = true; //check columns
            }
            
            if (win) {
                break;
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
    };

    const initPlayers = () => {
        clearBoard();
        clearPlayerHeader();
        let p1Name = prompt("Enter player 1 name (player 1 will have X token)");
        let p2Name = prompt("Enter player 2 name (player 2 will have O token)");
        p1 = Player(p1Name, X_TOKEN);
        p2 = Player(p2Name, O_TOKEN);
        currentPlayer = p1;

        let playerHeader = document.getElementById("player-header");
        let p1Title = document.createElement("p");
        let p2Title = document.createElement("p");
        p1Title.textContent = p1Name;
        p2Title.textContent = p2Name;

        playerHeader.innerHTML = '';
        playerHeader.appendChild(p1Title);
        playerHeader.appendChild(p2Title);

        setupBoard();
    };

    const setupBoard = () => {
        let grid = document.getElementsByClassName("token");
        for (let i = 0; i < grid.length; i++) {
            grid[i].addEventListener("click", function() {
                if (typeof p1 === "undefined") {
                    return; // a game hasn't been initiated yet
                }
                let row = Math.floor(i / 3);
                let col = i % 3;
                if (!markBoard(row, col)) {
                    alert("this position has already been marked");
                    return;
                } 
                updateBoard(grid[i], currentPlayer.getToken());
                if (checkWinner(currentPlayer.getToken())) {
                    alert(currentPlayer.getName() +'won!');
                    resetGame();
                }
                currentPlayer = (currentPlayer.getToken() === X_TOKEN) ? p2 : p1;
            });
        }
    };

    const resetGame = () => {
        p1 = undefined;
        p2 = undefined;
        currentPlayer = undefined;
    };

    const clearBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameBoard[i][j] = '';
            }
        }
        
        let grid = document.getElementsByClassName("token");
        for (let i = 0; i < 9; i++) {
            grid[i].textContent = '';
        }
    };

    const clearPlayerHeader = () => {
        let pHeader = document.getElementById("player-header");
        pHeader.textContent = "";
    };

    const updateBoard = (boardSquare, token) => {
        boardSquare.textContent = token;
    };
    
    return {markBoard, checkWinner, getToken, initPlayers};
})();

const Player = (pName, gameToken) => {
    let token = gameToken;
    let name = pName;

    const getName = () => {return name};
    const getToken = () => {return token};

    return {getName, getToken};
};


let newGameBtn = document.getElementById("new-game-btn");
newGameBtn.addEventListener("click", board.initPlayers);

