const grid = document.querySelector(".grid");
const playerDisplay = document.querySelector(".player-display")

let gameBoard = (function() {
    // 0 1 2
    // 3 4 5
    // 6 7 8
    let boardArray = ['', '', '', '', '', '', '', '', '']
    const x = "x";
    const o = "o";
    let currentPlayer = x;

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
                playerDisplay.textContent = "YOYOYOYOO";
                freezeBoard();
            } 
        }
    }

    function freezeBoard() {
        console.log("Yeah")
    }

    function displayMove() {
        grid.addEventListener("click", function(e) {
            pushIndex = e.target.id;
            if (boardArray[pushIndex] === "") {
                boardArray[pushIndex] = currentPlayer;
                console.log(boardArray);
                drawBoard();
                checkWinner(currentPlayer);
                playerSwitch(currentPlayer);
            } else {
                return;
             }
        });
    } 

    

    return drawBoard(), displayMove();


})();