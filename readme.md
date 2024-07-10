observations 
1. we have a basic grid for the game board it has a total of 9 spaces
2. after player 1 makes a move, its then time for player 2
- making a move means they put down a shape somewhere on the board, 
- or else it is blank because nobody has selected that space
3. the different players have different shapes
4. if either player manages to get three in a row anywhere across the board, they win
 - they can go diaganol, vertical, or horizontal 
5. otherwise, its a tie 
6. after the game ends, it shows which player won the game, or a tie

- we have to keep track of the positions on the board

State

1. every time a player makes a move, a shape appears on the board
- what name for this variable? 
let activePlayer = player1 
let player1 = x
let player2 = o
- the total number of moves that can be made is 9 
2. the board - needs to have 9 total spaces, each of which can be clicked
on so a shape can be added, and we dont want overlapping shapes 
let board = [ _ , o, _, o, x, x, _ , _ , _ ]
let board = [ x , o, _, _, x, _ , o , x , o ]
let board = [ _ , _, _, _, _, _ , _ , _ , _ ]
it will always be alternating 

Functions to modify state

function makeMove - a player has selected a space where they want to add their shape, it modifies board array, it only has those 9 spaces so its a total of 9 indexes(8), once a space has been selected it cannot be reselected

function togglePlayer - we're toggling which player is allowed to make a move - let activePlayer = player1 || player2

function checkGameEnd - function will check the board array for the winning patterns of either player1 or player2 - diagonal, vertical, horizontal

Render 
function render {
renderShape
renderBoard
renderGameEnd
}

Script 
1. once a space has been selected it cannot be reselected, it will not register if you try - we disable that space 
2. if its not your turn you're not allowed to make a move - thats the whole point of togglePlayer 
3. a player makes a move by clicking on the space 
















