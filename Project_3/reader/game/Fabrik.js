/**
 * Fabrik
 * @constructor
 */
function Fabrik(scene, gameMode) {

    console.log(" > FABRIK: NEW GAME");
    
    this.scene = scene;
    this.gameMode = gameMode;
    
    this.board = [];
    this.getInitialBoard();

    this.player = 0; //0 - none, 1 - black, 2 - white

    this.state = { 
        WAITING_FOR_START: 0,
        ADDING_FIRST_WORKER:1,
        ADDING_SECOND_WORKER:2,
        CHOOSING_MOVE_WORKER: 3,
        CHOOSING_WORKER_NEW_CELL: 4,
        ADDING_PLAYER: 5,
        WON_GAME:6,
        DRAW_GAME:7,
        CONNECTION_ERROR: 10,
    };

    this.savedRow;
    this.savedColumn;

    this.currentState = this.state.WAITING_FOR_START;
};

Fabrik.prototype.constructor = Fabrik;


Fabrik.prototype.nextPlayer = function() {
  switch (this.player) {
    case 0:
      this.player = 1;
      console.log(" > FABRIK: BLACK PLAYER'S TURN");
      break;
    case 1:
      this.player = 2;
      console.log(" > FABRIK: WHITE PLAYER'S TURN");
      break;
    case 2:
      this.player = 1;
      console.log(" > FABRIK: BLACK PLAYER'S TURN");
      break;
    default:
      break;
  }
};

Fabrik.prototype.getCurrPlayerColor = function() {
  if (this.player == 1) return "black";
  else if (this.player == 2) return "white";
};

Fabrik.prototype.nextState = function(aux) {
  switch (this.currentState) {
    case this.state.WAITING_FOR_START: 
      this.currentState = this.state.ADDING_FIRST_WORKER;
      this.nextPlayer();
      console.log(" > FABRIK: Choose a cell to add the first worker");
      break;
    case this.state.ADDING_FIRST_WORKER:
      this.currentState = this.state.ADDING_SECOND_WORKER;
      this.nextPlayer();
      console.log(" > FABRIK: Choose a cell to add the second worker");
      break;
    case this.state.ADDING_SECOND_WORKER:
      this.currentState = this.state.CHOOSING_MOVE_WORKER;
      this.nextPlayer();
      console.log(" > FABRIK: If you want to move a worker choose a cell with a worker, otherwise choose a cell to put one of your pieces");
      break;
    case this.state.CHOOSING_MOVE_WORKER:
      if (aux) {
        this.currentState = this.state.CHOOSING_WORKER_NEW_CELL;
        console.log(" > FABRIK: Choose the new position for the worker you want to move");
      } else {
        this.currentState = this.state.ADDING_PLAYER;
      }
      break;
    case this.state.CHOOSING_WORKER_NEW_CELL:
      this.currentState = this.state.ADDING_PLAYER;
      console.log(" > FABRIK: Choose a cell for one of your pieces");
      break;
    case this.state.ADDING_PLAYER:
      if(aux == "1"){
        this.currentState = this.state.WON_GAME;
        console.log(" > FABRIK: You won!");
      }
      else if(aux == "2"){
        this.currentState = this.state.DRAW_GAME;
        console.log(" > FABRIK: Woops, no more space left! It is a draw!");
      }
      else{
        this.currentState = this.state.CHOOSING_MOVE_WORKER;
        this.nextPlayer();
        console.log(" > FABRIK: If you want to move a worker choose a cell with a worker, otherwise choose a cell to put one of your pieces");
      }
      break;
    default:
      break;
  }
};

Fabrik.prototype.pickingHandler = function(row, column) {
  switch (this.currentState) {
    case this.state.ADDING_FIRST_WORKER:
      this.addWorker(row, column);
      break;
    case this.state.ADDING_SECOND_WORKER:
      this.addWorker(row, column);
      break;
    case this.state.CHOOSING_MOVE_WORKER:
      this.isWorkerCell(row, column);
      break;
    case this.state.CHOOSING_WORKER_NEW_CELL:
      this.moveWorker(row, column);
      break;
    case this.state.ADDING_PLAYER:
      this.addPlayer(row, column);
      break;
    default:
      break;
  }
};


Fabrik.prototype.getInitialBoard = function() {
  var this_game = this;

  this.scene.client.getPrologRequest(
    "initial_board",
    function(data) {
      this_game.board = this_game.parseBoardToJS(data.target.response);
      this_game.nextState();
    },
    function(data) {
      console.log("CONNECTION ERROR");
    }
  );
};


Fabrik.prototype.addWorker = function(row, column) {
  var this_game = this;

  let boardString = this.parseBoardToPROLOG();
  var command = "add_worker(" + boardString + "," + row + "," + column + ")";

  this.scene.client.getPrologRequest(
    command,
    function(data) {
      if (data.target.response[0] == "[") {
        this_game.board = this_game.parseBoardToJS(data.target.response);
        this_game.nextState();
      } else {
        console.log(" > FABRIK: ERROR - " + data.target.response);
      }
    },
    function(data) {
      console.log("CONNECTION ERROR");
    }
  );
};

Fabrik.prototype.isWorkerCell = function(row, column) {
  var this_game = this;

  let boardString = this.parseBoardToPROLOG();
  var command =
    "is_worker_cell(" + boardString + "," + row + "," + column + ")";

  this.scene.client.getPrologRequest(
    command,
    function(data) {
      if (data.target.response == "1") {
        this_game.savedRow = row;
        this_game.savedColumn = column;

        this_game.nextState(1);
      } else {
        this_game.nextState(0);
        this_game.pickingHandler(row, column);
      }
    },
    function(data) {
      console.log("CONNECTION ERROR");
    }
  );
};

Fabrik.prototype.moveWorker = function(row, column) {
  var this_game = this;

  let boardString = this.parseBoardToPROLOG();

  var command = "move_worker(" + boardString + "," + this.savedRow + "," + this.savedColumn + "," + row + "," + column + ")";

  this.scene.client.getPrologRequest(
    command,
    function(data) {
      if (data.target.response[0] == "[") {
        this_game.board = this_game.parseBoardToJS(data.target.response);
        this_game.nextState();
      } else {
        console.log(" > FABRIK: ERROR - " + data.target.response);
      }
    },
    function(data) {
      console.log("CONNECTION ERROR");
    }
  );
};

Fabrik.prototype.addPlayer = function(row, column) {
  var this_game = this;

  let boardString = this.parseBoardToPROLOG();
  var color = this.getCurrPlayerColor();
  var command = "add_player(" + boardString + "," + row + "," + column + "," + color + ")";

  this.scene.client.getPrologRequest(
    command,
    function(data) {
      if (data.target.response[0] == "[") {
        this_game.board = this_game.parseBoardToJS(data.target.response);
        this_game.checkGameState();
      } else {
        console.log(" > FABRIK: ERROR - " + data.target.response);
      }
    },
    function(data) {
      console.log("CONNECTION ERROR");
    }
  );
};

Fabrik.prototype.checkGameState=function(){

    var this_game = this;

    let boardString = this.parseBoardToPROLOG();
    var color = this.getCurrPlayerColor();
    var command = "check_state(" + color + "," +boardString+ ")" ;


    this.scene.client.getPrologRequest(command, function(data) {

        this_game.nextState(data.target.response);
        
    }, function(data) {
        console.log("CONNECTION ERROR");
    });
   
}



/*
* PARSER DO BOARD
*/

Fabrik.prototype.parseBoardToJS = function(stringBoard) {
  var numbersBoard = [];
  var i = 0;
  for (let rows = 0; rows < 11; rows++) {
    var numbersLine = [];
    var column = 0;
    while (column != 11) {
      if (stringBoard[i] != "[" && stringBoard[i] != "," && stringBoard[i] != "]") {
        numbersLine.push(stringBoard[i]);
        column++;
      }
      i++;
    }
    numbersBoard.push(numbersLine);
  }

  var board = [];
  for (var i = 0; i < numbersBoard.length; i++) {
    var line = [];
    for (var j = 0; j < numbersBoard[i].length; j++) {
      line.push(new MyPiece(this.scene, j, i, numbersBoard[i][j]));
    }
    board.push(line);
  }

  return board;
};

Fabrik.prototype.parseBoardToPROLOG = function() {
  var boardString = "";

  boardString = boardString + "[";

  for (let i = 0; i < this.board.length; i++) {
    boardString = boardString + "[";

    for (let j = 0; j < this.board[i].length; j++) {
      var elem;

      switch (this.board[i][j].type) {
        case "0":
          elem = "empty";
          break;
        case "1":
          elem = "black";
          break;
        case "2":
          elem = "white";
          break;
        case "3":
          elem = "red";
          break;
        default:
          break;
      }

      boardString = boardString + elem;
      if (j != this.board[i].length - 1) boardString = boardString + ",";
    }

    boardString = boardString + "]";
    if (i != this.board.length - 1) boardString = boardString + ",";
  }

  boardString = boardString + "]";

  return boardString;
};