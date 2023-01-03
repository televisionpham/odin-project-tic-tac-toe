const game = (() => {
  let _board = [];
  let _currentTurn = "X";
  let _mode = 1;
  let _gameOver = false;
  const _resultDiv = document.getElementById("result");

  const setMode = (value) => {
    _mode = value;
  };

  const getCurrentTurn = () => {
    return _currentTurn;
  };

  const computerPlay = () => {
    const validIndexes = [];
    for (let i = 0; i < _board.length; i++) {
      if (!_board[i]) {
        validIndexes.push(i);
      }
    }
    if (validIndexes.length > 0) {
      const index = Math.floor(Math.random() * validIndexes.length);
      mark(validIndexes[index]);
    }
  };

  const checkResult = () => {
    let winner = "";
    const canContinue = _board.filter((x) => x === "").length > 0;
    if (!canContinue) {
      _gameOver = true;
      _resultDiv.innerHTML = `Tie`;
      return;
    }

    if (_board[2] && _board[2] === _board[4] && _board[4] === _board[6]) {
      winner = _board[2];
    } else if (
      _board[0] &&
      _board[0] === _board[4] &&
      _board[4] === _board[8]
    ) {
      winner = _board[0];
    } else {
      for (let i = 0; i < 6; i += 3) {
        if (
          _board[i] &&
          _board[i] === _board[i + 1] &&
          _board[i + 1] === _board[i + 2]
        ) {
          winner = _board[i];
          break;
        }
      }

      for (let i = 0; i <= 2; i++) {
        if (
          _board[i] &&
          _board[i] === _board[i + 3] &&
          _board[i + 3] === _board[i + 6]
        ) {
          winner = _board[i];
          break;
        }
      }
    }

    if (winner) {
      _gameOver = true;
      _resultDiv.innerHTML = `The winner is ${winner}`;
    }
  };

  const mark = (index) => {
    if (_gameOver) {
      return;
    }

    const cell = document.getElementById(`c-${index}`);
    if (!cell.textContent && cell.textContent !== _currentTurn) {
      cell.textContent = _currentTurn;
      _board[index] = _currentTurn;
      toggleTurn();
      checkResult();
    }
  };

  const toggleTurn = () => {
    if (_currentTurn === "X") {
      _currentTurn = "O";
    } else {
      _currentTurn = "X";
    }

    if (_currentTurn === "O" && _mode === 1) {
      computerPlay();
    }
  };

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      _board[i] = "";
    }
    _currentTurn = "X";
    _gameOver = false;
    _resultDiv.innerHTML = "";

    const board = document.getElementById("board");
    board.innerHTML = "";

    for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");
      div.id = `c-${i}`;
      div.classList.add("cell");
      div.style.border = "1px solid #e4e4e7";
      div.style.cursor = "pointer";
      div.addEventListener("click", () => {
        game.mark(i);
      });
      board.appendChild(div);
    }
  };

  return {
    getCurrentTurn,
    mark,
    setMode,
    restart,
  };
})();

game.restart();

const modes = document.querySelectorAll('input[name="mode"]');

for (const mode of modes) {
  mode.addEventListener("change", () => {
    game.setMode(parseInt(mode.value));
  });
}

document.getElementById("restart").addEventListener("click", () => {
  game.restart();
});
