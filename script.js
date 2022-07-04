const game = document.querySelector('#game');
const instruction = document.querySelector('h2');
let current_move = 'X';
let current_position = 0;
let move_count = 1;
let game_is_finished = false;

const game_pos_status = ['', '', '', '', '', '', '', '', ''];

const winning_strategies = [
  [
    [1, 2],
    [3, 6],
    [4, 8],
  ],
  [
    [0, 2],
    [4, 7],
  ],
  [
    [0, 1],
    [5, 8],
    [4, 6],
  ],
  [
    [0, 6],
    [4, 5],
  ],
  [
    [1, 7],
    [3, 5],
    [0, 8],
    [2, 6],
  ],
  [
    [2, 8],
    [3, 4],
  ],
  [
    [0, 3],
    [4, 2],
    [7, 8],
  ],
  [
    [6, 8],
    [1, 4],
  ],
  [
    [6, 7],
    [2, 5],
    [0, 4],
  ],
];

function nextMove() {
  if (current_move === 'X') {
    document.getElementById(current_position.toString()).style =
      'cursor: default; animation: pulsateX 1.5s infinite alternate;';
    if (checkWin() === true) {
      // create restart button plus dont allow anymore entry
      instruction.innerHTML =
        'Player X WIN!&nbsp;&nbsp;&nbsp;<span>RESTART</span>';
      game_is_finished = true;
    } else {
      if (move_count === 9) {
        console.log(instruction.textContent);
        // create restart button
        instruction.innerHTML =
          'TIE!&nbsp;&nbsp;&nbsp;<span>RESTART</span>';
        game_is_finished = true;
      } else {
        current_move = 'O';
        instruction.textContent = 'Player O please make a move!';
        move_count++;
      }
    }
  } else {
    document.getElementById(current_position.toString()).style =
    'cursor: default; animation: pulsateO 1.5s infinite alternate;';
    if (checkWin() === true) {
      // create restart button plus dont allow anymore entry
      instruction.innerHTML =
        'Player O WIN!&nbsp;&nbsp;&nbsp;<span>RESTART</span>';
      game_is_finished = true;
    } else {
      if (move_count === 9) {
        console.log(instruction.textContent);
        // create restart button
        instruction.innerHTML =
          'TIE!&nbsp;&nbsp;&nbsp;<span>RESTART</span>';
        game_is_finished = true;
      } else {
        current_move = 'X';
        instruction.textContent = 'Player X please make a move!';
        move_count++;
      }
    }
  }
}

function checkWin() {
  let result = false;
  if (move_count < 3) {
    return result;
  } else {
    let winning_strategy = winning_strategies[current_position];
    winning_strategy.forEach(function (combo) {
      if (
        game_pos_status[combo[0]] === current_move &&
        game_pos_status[combo[1]] === current_move
      ) {
        result = true;
      }
    });
    return result;
  }
}

function handleClickPosition(evt) {
  evt.preventDefault();
  if (game_is_finished === false) {
    if (evt.target.classList[0] === 'pos') {
      if (evt.target.textContent === '') {
        evt.target.textContent = current_move;
        current_position = Number(evt.target.classList[1]);
        game_pos_status[current_position] = current_move;
        nextMove();
      } else {
        instruction.textContent = 'Occupied!';
      }
    }
  } else {
    instruction.innerHTML =
      'Invalid entry! Game is finished!&nbsp;&nbsp;&nbsp;<span>RESTART</span>';
  }
}

function handleClickRestart(evt) {
  evt.preventDefault();
  console.log(evt.target.tagName);
  if (evt.target.tagName === 'SPAN') {
    location.reload();
  }
}

game.addEventListener('click', handleClickPosition);
instruction.addEventListener('click', handleClickRestart);
