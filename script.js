class Automatonia {
    constructor(boardHeight, boardWidth, cellSize) {
        // set board properties
        this.boardHeight = boardHeight;
        this.boardWidth = boardWidth;
        this.cellSize = cellSize;

        // create board
        this.board = this.createBoard(boardHeight, boardWidth);
        
        // set canvas properties
        this.canvas = document.getElementById('automatonia');
        this.canvas.height = boardHeight * cellSize;
        this.canvas.width = boardWidth * cellSize;
        this.context = this.canvas.getContext('2d');
        
        // display initial board state
        this.displayBoard();
    }

    // create a random board of size (boardHeight x boardWidth)
    createBoard(boardHeight, boardWidth) {
        let board = [];
        for (let i = 0; i < boardHeight; i++) {
            board[i] = [];
            for (let j = 0; j < boardWidth; j++) {
                board[i][j] = Math.round(Math.random());
            }
        }
        return board;
    }

    // calculates next generation creating a new board
    nextGeneration() {
        let newBoard = this.createBoard(this.boardHeight, this.boardWidth);
        for (let i = 0; i < this.boardHeight; i++) {
            for (let j = 0; j < this.boardWidth; j++) {
                let neighbors = this.countNeighbors(i, j);
                if (this.board[i][j] === 1) {
                    newBoard[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
                } else {
                    newBoard[i][j] = neighbors === 3 ? 1 : 0;
                }
            }
        }
        this.board = newBoard;
        this.displayBoard();
    }

    // counts neighbors of a cell (up,down,left,right)
    countNeighbors(x, y) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                let newX = (x + i + this.boardHeight) % this.boardHeight;
                let newY = (y + j + this.boardWidth) % this.boardWidth;
                if (this.board[newX][newY] === 1) {
                    count++;
                }
            }
        }
        return count;
    }

    // clears canvas and updates with current board state
    displayBoard() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        for (let i = 0; i < this.boardHeight; i++) {
            for (let j = 0; j < this.boardWidth; j++) {
                if (this.board[i][j] === 1) {
                    this.context.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
    }

    // draws a grid over the canvas
    drawGrid() {
        this.context.strokeStyle = '#ddd';  // Grid color
        this.context.lineWidth = 0.5;  // Grid line width

        // Draw vertical grid lines.
        for (let i = 0; i <= this.boardWidth; i++) {
            this.context.beginPath();
            this.context.moveTo(i * this.cellSize, 0);
            this.context.lineTo(i * this.cellSize, this.boardHeight * this.cellSize);
            this.context.stroke();
        }

        // Draw horizontal grid lines.
        for (let j = 0; j <= this.boardHeight; j++) {
            this.context.beginPath();
            this.context.moveTo(0, j * this.cellSize);
            this.context.lineTo(this.boardWidth * this.cellSize, j * this.cellSize);
            this.context.stroke();
        }
    }
}

let run = false 

let game = new Automatonia(215,510,5);
setInterval(() => {
    if (run) {
        game.nextGeneration();
    }
}, 10);

function toggleSimulation() {
    run = !run;
}


// Once document is ready... assign buttons
$(document).ready(() => {
    $('#toggleSimulation').click(() => {
        toggleSimulation();
    });
    $('#stepSimulation').click(() => {
        game.nextGeneration();
    });


    // Open and close modal
    $('#openModal').click(() => {
        $('.modal').css("display", "block");
        $("body").css("overflow", "hidden");
    });
    $('#closeModal').click(() => {
        $('.modal').css("display", "none");
        $("body").css("overflow", "auto");
    });
    $(window).click((event) => {
        if (event.target == $('.modal')[0]) {
            $('.modal').css("display", "none");
            $("body").css("overflow", "auto");
        }
    });
});
