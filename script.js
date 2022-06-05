const grid = document.querySelector(".grid");

let gameBoard = (function() {
    let boardArray = ['x', 'o', 'x', 'x', 'x', 'o', 'x', 'o', 'o']
    const x = "x";
    const o = "o";

    function drawBoard() {
        for (let i=0; i<boardArray.length; i++) {
            const square = document.createElement('div');
            square.textContent = boardArray[i];
            square.setAttribute('id', i+1);
            grid.appendChild(square);
        }
    }

    

    return drawBoard();


})();