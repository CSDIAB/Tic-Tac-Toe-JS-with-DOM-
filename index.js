//State

let player1 = "x";
let player2 = "o";
let activePlayer = player1;

let board = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];

//Functions to Modify State

function makeMove(position) {
  //when a player makes a move, they add an x or an o to the array
  //if the position is already taken, return false
  //if the position is not taken, add the activePlayer to the position
  //check if the game has ended
  //if the game has ended, render the game end
  //we call renderShape to display the x or o on the board every time we use the makeMove function
  //we call checkGameEnd to check if the game has ended every time we use the makeMove function
  //we call renderGameEnd to display the game end message every time we use the makeMove function
  //we call togglePlayer to change the activePlayer every time we use the makeMove function

  if (board[position] !== "_") {
    return false;
  } else {
    board[position] = activePlayer;
    return true;
  }
}

function togglePlayer() {
  //this will change activePlayer to player1 or player2
  if (activePlayer === player1) {
    activePlayer = player2;
    console.log("toggled");
  } else if (activePlayer === player2) {
    activePlayer = player1;
    console.log("toggled");
  }
}

function checkGameEnd() {
  // 0  ,   1  ,   2

  // 3   ,   4,    5

  // 6,  ,   7   ,   8

  //i is starting at 0, 1, 2 - i + 3
  //i is starting at 0, 3, 6 - i + 1
  //diagonal right - i + 4 starting at 0
  //diagonal left - i + 2 starting at 2

  //4 possible returns
  // gameStillGoing and ('x' or '0' or 'tie'),

  //What needs to be modified here is we need to lock in the first winner
  //so if somebody gets three in a row early we can early return
  //are if statement checks the most efficient way of handling this? probably not
  //think about a way to optimize this function once its completely dialed in and working
  //vertical

  for (let i = 0; i < 3; i++) {
    if (
      board[i] !== "_" &&
      board[i + 3] === board[i] &&
      board[i + 6] === board[i]
    ) {
      return board[i];
    }
  }
  //horizontal
  for (let i = 0; i <= 6; i += 3) {
    if (
      board[i] !== "_" &&
      board[i + 1] === board[i] &&
      board[i + 2] === board[i]
    ) {
      return board[i];
    }
  }
  //diagonals
  if (board[0] !== "_" && board[0] === board[4] && board[8] === board[0]) {
    return board[0];
  }
  if (board[2] !== "_" && board[2] === board[4] && board[6] === board[2]) {
    return board[2];
  }
  //this will check if empty spaces are there
  if (board.indexOf("_") >= 0) {
    return "gameStillGoing";
  } else {
    return "tie";
  }
}

function renderShape(shape, position) {
  /* 
the whole point of a render function is to take the state, as well as the function 
that modifies state, and dislplay it within the UI

this means that you have to select the element you want from html file 
and link it to your javascript variables/functions 

so 
What does it mean to render a shape?
What does it mean to render the board?
What does it mean to render the gameEnd? 
*/
  const $shape = document.createElement("div");

  $shape.innerHTML = shape;

  $shape.addEventListener("click", function (event) {
    const moveMade = makeMove(position);
    if (moveMade) {
      checkGameEnd();
      togglePlayer();
      render();
    } else {
      console.log("space taken");
    }
  });

  return $shape;
}

function renderBoard() {
  //why the forEach method?
  //we can use the forEach method to iterate over the board array
  //and then for each shape in the board array we call the renderShape function
  //and the shape should come up on the board
  //why not map?
  //we do not use map because map returns a new array
  //e.x. [1,2,3].map((num) => num + 1) will return [2,3,4]
  const $board = document.createElement("div");
  $board.classList.add("board");
  /*
  $board.innerHTML = "";
  board.forEach((shape, position) => {
    const $shape = renderShape(shape, position);
    $board.append($shape);
  });
  */
  const $shapes = board.map((shape, position) => renderShape(shape, position));
  $board.replaceChildren(...$shapes);
  return $board;
}

function renderGameEnd() {
  const $endMessage = document.createElement("div");
  $endMessage.classList.add("gameEndMessage");
  $endMessage.textContent = checkGameEnd();
  return $endMessage;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = "";
  const $board = renderBoard();
  $app.append($board);
  const $endMessage = renderGameEnd();
  $app.append($endMessage);
}
render();
