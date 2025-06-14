const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function handleClick(event) {
  const index = event.target.dataset.index;

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add('filled');

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    highlightWinningCells();
    return;
  }

  if (!board.includes('')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winningConditions.some(condition => {
    return condition.every(index => board[index] === currentPlayer);
  });
}

function highlightWinningCells() {
  winningConditions.forEach(condition => {
    if (condition.every(index => board[index] === currentPlayer)) {
      condition.forEach(index => {
        cells[index].style.backgroundColor = '#00ffcc';
        cells[index].style.color = '#000';
        cells[index].style.boxShadow = '0 0 20px #fff';
      });
    }
  });
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('filled');
    cell.style.backgroundColor = 'rgba(255,255,255,0.05)';
    cell.style.color = '#00ffff';
    cell.style.boxShadow = '0 0 10px #00ffff';
  });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
