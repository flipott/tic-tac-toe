const grid = document.querySelector(".grid");
const playerDisplay = document.querySelector(".player-display")
const firstPlayer = document.getElementById('first-player').value;
const secondPlayer = document.getElementById('second-player').value;
const gameBtn = document.getElementById('game-btn');

let gameBoard = (function() {
    // 0 1 2
    // 3 4 5
    // 6 7 8
    let boardArray = ['', '', '', '', '', '', '', '', '']
    const x = "x";
    const o = "o";
    let currentPlayer = x;
    let winner = false;

    function drawBoard() {
        grid.innerHTML = '';
        for (let i=0; i<boardArray.length; i++) {
            const square = document.createElement('div');
            square.textContent = boardArray[i];
            square.setAttribute('id', i);
            grid.appendChild(square);
        }
    }

    function playerSwitch(player) {
        if (player === x) {
            playerDisplay.textContent = "It is Player 2's (o) turn."
            return currentPlayer = o;
        } else {
            playerDisplay.textContent = "It is Player 1's (x) turn."
            return currentPlayer = x;
        }
    }

    function checkWinner(player) {
        winCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [6,4,2], [8,4,0]];
        for (let i=0;i<winCombos.length;i++) {
            if (boardArray[winCombos[i][0]] === player && boardArray[winCombos[i][1]] === player && boardArray[winCombos[i][2]] === player ) {
                playerDisplay.textContent = player + " wins!!!";
                return winner = true;
            } 
        }
    }

    function preGame() {
        gameBtn.addEventListener("click", function() {
            if (gameBtn.textContent === "Start Game") {
                displayMove();
                return;
            } else {
                boardArray = ['', '', '', '', '', '', '', '', '']
                gameBtn.textContent = "Start Game";
                drawBoard();
                return
            }
        });
    }


    function displayMove() {
        gameBtn.textContent = "Restart game";
        grid.addEventListener("click", function(e) {
            pushIndex = e.target.id;
            if (boardArray[pushIndex] === "" && !winner) {
                boardArray[pushIndex] = currentPlayer;
                console.log(boardArray);
                drawBoard();
                if (!checkWinner(currentPlayer) && !tieCheck(boardArray)) {
                    playerSwitch(currentPlayer);
                } else if (!checkWinner(currentPlayer)) {
                    tieCheck(boardArray);
                }
            } else {
                return;
            }
        });
    } 

    function tieCheck(array) {
        if (array.includes("")) {
            return false;
        } else {
            return playerDisplay.textContent = "Tie game! Please play again.";
        }
    }

    return drawBoard(), preGame();


})();