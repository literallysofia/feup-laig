/**
 * Fabrik
 * @constructor
 */
function Fabrik(scene, gameMode) {

    console.log(" > FABRIK: NEW GAME");
    
    this.scene = scene;

    this.defaultCamera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    this.rotationCamera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(0, 0, 0), vec3.fromValues(3, 0, 3));
    
    this.board = [];
    this.getInitialBoard();

    this.player = 0; //0 - none, 1 - black, 2 - white
    this.playerBlack = new Player(this.scene, 1);
    this.playerWhite = new Player(this.scene, 2);

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

    this.mode = { 
      PLAYER_VS_PLAYER: 0,
      PLAYER_VS_BOT: 1,
      BOT_VS_BOT: 2,
      MOVIE: 3
    };

    this.currentState = this.state.WAITING_FOR_START;
    this.gameMode = this.getGameMode(gameMode); 


    this.savedRow;
    this.savedColumn;
    this.scene.camera = this.defaultCamera;
};

Fabrik.prototype.getGameMode = function(gameMode) {
  switch (gameMode) {
    case "PLAYER_VS_PLAYER":
      return this.mode.PLAYER_VS_PLAYER;
    case "PLAYER_VS_BOT":
      return this.mode.PLAYER_VS_BOT;
    case "BOT_VS_BOT":
      return this.mode.BOT_VS_BOT;
    case "MOVIE":
      return this.mode.MOVIE;
    default:
      break;
  }
}

Fabrik.prototype.constructor = Fabrik;

Fabrik.prototype.setCamera = function() {
  if (this.scene.rotationCamera) {
    if (this.player == 0 || this.player == 1) {
      this.rotationCamera.setPosition(this.playerBlack.position);
    } else {
      this.rotationCamera.setPosition(this.playerWhite.position);
    }
    this.rotationCamera.zoom(4);
    this.scene.camera = this.rotationCamera;
  } else {
    this.scene.camera = this.defaultCamera;
  }
};

Fabrik.prototype.rotateCamera = function() {
  if (this.scene.rotationCamera) {
    this.scene.cameraRotationAngle = Math.PI;
    this.scene.cameraRotationActive = true;
  }
};

Fabrik.prototype.getCurrPlayerColor = function() {
  if (this.player == 1) return "black";
  else if (this.player == 2) return "white";
};


/*
* STATES AND MODES
*/
Fabrik.prototype.nextPlayer = function() {
  switch (this.player) {
    case 0:
      this.player = 1;
      console.log(" > FABRIK: BLACK PLAYER'S TURN");
      break;
    case 1:
      this.player = 2;
      this.rotateCamera();
      console.log(" > FABRIK: WHITE PLAYER'S TURN");
      break;
    case 2:
      this.player = 1;
      this.rotateCamera();
      console.log(" > FABRIK: BLACK PLAYER'S TURN");
      break;
    default:
      break;
  }
};

Fabrik.prototype.nextState= function(toMoveWorker) {

  switch (this.currentState) {
    case this.state.WAITING_FOR_START: 
      this.currentState = this.state.ADDING_FIRST_WORKER;
      this.nextPlayer();
      console.log(" > FABRIK: Choose a cell to add the first worker");
      if(this.gameMode == this.mode.BOT_VS_BOT) this.BOTaddWorker();
      break;
    case this.state.ADDING_FIRST_WORKER:
      this.currentState = this.state.ADDING_SECOND_WORKER;
      this.nextPlayer();
      console.log(" > FABRIK: Choose a cell to add the second worker");
      if(this.gameMode == this.mode.BOT_VS_BOT || this.gameMode == this.mode.PLAYER_VS_BOT) this.BOTaddWorker();
      break;
    case this.state.ADDING_SECOND_WORKER:
      this.currentState = this.state.CHOOSING_MOVE_WORKER;
      this.nextPlayer();
      console.log(" > FABRIK: If you want to move a worker choose a cell with a worker, otherwise choose a cell to put one of your pieces");
      if(this.gameMode == this.mode.BOT_VS_BOT) this.BOTchooseMoveWorker();
      break;
    case this.state.CHOOSING_MOVE_WORKER:
      if (toMoveWorker) {
        this.currentState = this.state.CHOOSING_WORKER_NEW_CELL;
        if(this.gameMode == this.mode.BOT_VS_BOT || (this.gameMode == this.mode.PLAYER_VS_BOT && this.player == 2)) this.BOTaddWorker();
        console.log(" > FABRIK: Choose the new position for the worker you want to move");
      } else {
        this.currentState = this.state.ADDING_PLAYER;
        if(this.gameMode == this.mode.BOT_VS_BOT || (this.gameMode == this.mode.PLAYER_VS_BOT && this.player == 2)) this.BOTaddPlayer();
      }
      break;
    case this.state.CHOOSING_WORKER_NEW_CELL:
      this.currentState = this.state.ADDING_PLAYER;
      console.log(" > FABRIK: Choose a cell for one of your pieces");
      if(this.gameMode == this.mode.BOT_VS_BOT || (this.gameMode == this.mode.PLAYER_VS_BOT && this.player == 2)) this.BOTaddPlayer();
      break;
    case this.state.ADDING_PLAYER:
      this.currentState = this.state.CHOOSING_MOVE_WORKER;
      this.nextPlayer();
      console.log(" > FABRIK: If you want to move a worker choose a cell with a worker, otherwise choose a cell to put one of your pieces");
      if(this.gameMode == this.mode.BOT_VS_BOT || (this.gameMode == this.mode.PLAYER_VS_BOT && this.player == 2))this.BOTchooseMoveWorker();
      break;
    case this.state.WON_GAME:
      console.log(" > FABRIK: You won!");
      break;
    case this.state.DRAW_GAME:
      console.log(" > FABRIK: Woops, no more space left! It is a draw!");
      break;
    default:
      break;
  }
}

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

Fabrik.prototype.checkGameState=function(){

  var this_game = this;

  let boardString = this.parseBoardToPROLOG();
  var color = this.getCurrPlayerColor();
  var command = "check_state(" + color + "," +boardString+ ")" ;


  this.scene.client.getPrologRequest(command, function(data) {

      if(data.target.response=="1"){
        this_game.currentState = this_game.state.WON_GAME;
      }
      else if(data.target.response=="2"){
        this_game.currentState = this_game.state.DRAW_GAME;
      }
      
      this_game.nextState();

  }, function(data) {
      console.log("CONNECTION ERROR");
  });
 
}


Fabrik.prototype.getInitialBoard = function() {
  var this_game = this;

  this.scene.client.getPrologRequest(
    "initial_board",
    function(data) {
      if(data.target.response.length == 265){
        this_game.board = this_game.parseBoardToJS(data.target.response);
        this_game.nextState();
      }
      else console.log("CONNECTION ERROR");
      
    },
    function(data) {
      console.log("CONNECTION ERROR");
    }
  );
};

/*
* PLAYER
*/
Fabrik.prototype.addWorker = function(row, column) {
  var this_game = this;

  let boardString = this.parseBoardToPROLOG();
  var command = "add_worker(" + boardString + "," + row + "," + column + ")";

  this.scene.client.getPrologRequest(
    command,
    function(data) {
      if (data.target.response[0] == "[") {
        if(data.target.response.length == 265){
          this_game.board = this_game.parseBoardToJS(data.target.response);
          this_game.nextState();
        }
        else console.log("CONNECTION ERROR");
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
        if(data.target.response.length == 265) {
          this_game.board = this_game.parseBoardToJS(data.target.response);
          this_game.nextState();
        }
        else console.log("CONNECTION ERROR");
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
        if(data.target.response.length == 265) {
          this_game.board = this_game.parseBoardToJS(data.target.response);
          this_game.checkGameState();
          this_game.board[row - 1][column - 1].setAnimation(0, 0, 0, column, 5.3, row);
        }
        else console.log("CONNECTION ERROR");
      } else {
        console.log(" > FABRIK: ERROR - " + data.target.response);
      }
    },
    function(data) {
      console.log("CONNECTION ERROR");
    }
  );
};

/*
* BOT
*/

Fabrik.prototype.BOTaddWorker = function() {
  var this_game = this;

  let boardString = this.parseBoardToPROLOG();

  var cell=[];
  
  var command = "add_worker_bot(" + boardString + ")";

  var flag = false;

  this.scene.client.getPrologRequest(
    command,
    function(data) {

      cell = this_game.parseCellToJS(data.target.response);
      this_game.pickingHandler(cell[0],  cell[1]);
      
    },
    function(data) {
      console.log("CONNECTION ERROR");
    }
  );

}

Fabrik.prototype.BOTchooseMoveWorker = function() {
  var this_game = this;
  
  var command = "choose_move_worker_bot";


  var toMove = Math.round(Math.random());

  if(toMove){
    var this_game = this;
    let boardString = this.parseBoardToPROLOG();
    var cell=[];
    var command = "get_worker_bot(" + boardString + ")";
    
    this.scene.client.getPrologRequest(
      command,
      function(data) {
  
        cell = this_game.parseCellToJS(data.target.response);
        this_game.savedRow = cell[0];
        this_game.savedColumn = cell[1];

        this_game.nextState(1);
        
      },
      function(data) {
        console.log("CONNECTION ERROR");
      }
    );
  }
  else{
    this_game.nextState(0);
  }

}


Fabrik.prototype.BOTgetWorker = function() {
  var this_game = this;
  
  var command = "choose_move_worker_bot";

  this.scene.client.getPrologRequest(
    command,
    function(data) {
      if(data.target.response == "0")
      

      nextState (1);
        
    },
    function(data) {
      console.log("CONNECTION ERROR");
    }
  );

}


Fabrik.prototype.BOTaddPlayer = function() {

  var this_game = this;

  let boardString = this.parseBoardToPROLOG();

  var cell=[];
  
  var command = "add_player_bot(" + boardString + ")";

  var flag = false;

  this.scene.client.getPrologRequest(
    command,
    function(data) {

      cell = this_game.parseCellToJS(data.target.response);
      this_game.pickingHandler(cell[0],  cell[1]);
      
    },
    function(data) {
      console.log("CONNECTION ERROR");
    }
  );

};



/*
* PARSER
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

Fabrik.prototype.parseCellToJS = function(stringList) {

  let rowString, columnString;

  if(stringList[2]!=","){
    rowString = stringList[1] + stringList[2];

    if(stringList[5]!="]"){
      columnString = stringList[4] + stringList [5];
    } else{
      columnString = stringList [4];
    }

  } else{
    rowString = stringList[1];

    if(stringList[4]!="]"){
      columnString = stringList[3] + stringList [4];
    } else{
      columnString = stringList [3];
    }
  }
  
  row = parseInt(rowString);
  column = parseInt(columnString);

  return [row, column];

}



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