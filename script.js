document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    let currentPlayer = 'black';
    let gameBoard = Array(15).fill().map(() => Array(15).fill(null));

    // Initialize the board
    function initializeBoard() {
        board.innerHTML = '';
        gameBoard = Array(15).fill().map(() => Array(15).fill(null));
        currentPlayer = 'black';
        status.textContent = "Black's turn";

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
            }
        }
    }

    // Handle cell click
    function handleCellClick(e) {
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);

        if (gameBoard[row][col] !== null) return; // Cell already occupied

        gameBoard[row][col] = currentPlayer;
        e.target.classList.add(currentPlayer);

        if (checkWin(row, col)) {
            status.textContent = `${currentPlayer === 'black' ? 'Black' : 'White'} wins!`;
            board.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleCellClick));
            return;
        }

        currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
        status.textContent = `${currentPlayer === 'black' ? 'Black' : 'White'}'s turn`;
    }

    // Check for a win
    function checkWin(row, col) {
        const directions = [
            [0, 1],  // Horizontal
            [1, 0],  // Vertical
            [1, 1],  // Diagonal down-right
            [1, -1]  // Diagonal down-left
        ];

        for (const [dx, dy] of directions) {
            let count = 1;

            // Check in the positive direction
            for (let i = 1; i < 5; i++) {
                const newRow = row + i * dx;
                const newCol = col + i * dy;
                if (newRow < 0 || newRow >= 15 || newCol < 0 || newCol >= 15 || gameBoard[newRow][newCol] !== currentPlayer) break;
                count++;
            }

            // Check in the negative direction
            for (let i = 1; i < 5; i++) {
                const newRow = row - i * dx;
                const newCol = col - i * dy;
                if (newRow < 0 || newRow >= 15 || newCol < 0 || newCol >= 15 || gameBoard[newRow][newCol] !== currentPlayer) break;
                count++;
            }

            if (count >= 5) return true;
        }

        return false;
    }

    // Restart game
    restartButton.addEventListener('click', initializeBoard);

    // Initialize the game
    initializeBoard();
});