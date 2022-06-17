//Grab DOM elements
const grid = document.querySelector(".grid");
const playerDisplay = document.querySelector(".player-display")
const gameBtn = document.getElementById('game-btn');

const game = (function() {
    // 0 1 2
    // 3 4 5
    // 6 7 8

    //Array that stores the game board 
    let boardArray = ['', '', '', '', '', '', '', '', '']
    let winner = false;

    //Factory for creating players
    const playerCreate = (name, position) => {
        return { name, position };
    }

    //Define default player names and positions
    let playerOne  = playerCreate(document.getElementById('first-player').value, "x");
    let playerTwo = playerCreate(document.getElementById('second-player').value, "o");
    let currentPlayer = playerOne;

    //Handles button click for starting and ending game
    function gameController() {
        gameBtn.addEventListener("click", function() {
            if (gameBtn.textContent === "Start Game") {
                playerOne  = playerCreate(document.getElementById('first-player').value, "x");
                playerTwo = playerCreate(document.getElementById('second-player').value, "o");
                document.getElementById('first-player').disabled = true;
                document.getElementById('second-player').disabled = true;
                displayMove();
                playerDisplay.textContent = `It is ${playerOne.name}'s turn.`
            } else {
                boardArray = ['', '', '', '', '', '', '', '', '']
                gameBtn.textContent = "Start Game";
                document.getElementById('first-player').disabled = false;
                document.getElementById('second-player').disabled = false;
                currentPlayer = playerOne;
                winner = false;
                gameBoard();
                playerDisplay.textContent = "";
            }
        });
    }

    //Draws the game board based on the board array
    function gameBoard() {
        grid.innerHTML = '';
        for (let i=0; i<boardArray.length; i++) {
            const square = document.createElement('div');
            square.textContent = boardArray[i];
            square.setAttribute('id', i);
            grid.appendChild(square);
        }
    }

    //Switches player
    function playerSwitch(player) {
        if (player.position === "x") {
            playerDisplay.textContent = `It is ${playerTwo.name}'s turn.`
            return currentPlayer = playerTwo;
        } else {
            playerDisplay.textContent = `It is ${playerOne.name}'s turn.`
            return currentPlayer = playerOne;
        }
    }

    //Checks array to see if there is a winner 
    function checkWinner(player) {
        winCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [6,4,2], [8,4,0]];
        for (let i=0;i<winCombos.length;i++) {
            if (boardArray[winCombos[i][0]] === player.position && boardArray[winCombos[i][1]] === player.position && boardArray[winCombos[i][2]] === player.position ) {
                playerDisplay.textContent = player.name + " wins!!!";
                return winner = true;
            } 
        }
    }

    //Validates, adds move to board, and displays it
    function displayMove() {
        gameBtn.textContent = "Restart game";
        grid.addEventListener("click", function(e) {
            pushIndex = e.target.id;
            if (boardArray[pushIndex] === "" && !winner && gameBtn.textContent !== "Start Game") {
                boardArray[pushIndex] = currentPlayer.position;
                gameBoard();
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
    
    //Checks to see if there is a draw
    function tieCheck(array) {
        if (array.includes("")) {
            return false;
        } else {
            return playerDisplay.textContent = "Tie game! Please play again.";
        }
    }

    return gameBoard(), gameController();
})();