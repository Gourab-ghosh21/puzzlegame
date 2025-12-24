const board = document.getElementById("board");
const movesText = document.getElementById("moves");
const message = document.getElementById("message");

let tiles = [];
let moves = 0;

function initGame() {
  tiles = [...Array(8).keys()].map(x => x + 1);
  tiles.push(null);
  shuffle(tiles);
  moves = 0;
  message.textContent = "";
  render();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function render() {
  board.innerHTML = "";
  tiles.forEach((value, index) => {
    const tile = document.createElement("div");
    tile.className = value ? "tile" : "tile empty";
    tile.textContent = value || "";
    tile.onclick = () => moveTile(index);
    board.appendChild(tile);
  });
  movesText.textContent = `Moves: ${moves}`;
}

function moveTile(index) {
  const emptyIndex = tiles.indexOf(null);
  const validMoves = [
    index - 1,
    index + 1,
    index - 3,
    index + 3
  ];

  if (validMoves.includes(emptyIndex)) {
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    moves++;
    render();
    checkWin();
  }
}

function checkWin() {
  for (let i = 0; i < 8; i++) {
    if (tiles[i] !== i + 1) return;
  }
  message.textContent = "🎉 YOU WIN! Amazing!";
}

function resetGame() {
  initGame();
}

initGame();
