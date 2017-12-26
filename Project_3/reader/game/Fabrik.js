function Fabrik(scene, gameMode) {
    this.scene = scene;
    this.gameMode = gameMode;

    
    this.board = [];
    this.getInitialBoard();
    //this.testBoard();
    this.pawns = [];

    this.player = 1; //TODO: mudar para a nossa versão

    this.state = { //TODO: ordenar melhor
        SELECTING_WORKER_FIRST_POSITION:1,
        SELECTING_WORKER: 2,
        SELECTING_WORKER_NEXT_POSITION: 3,
        SELECTING_PLAYER_POSITION:4,
        END_GAME:5,
        WINNER:6,
        CONNECTION_ERROR: 7,
        WAITING_FOR_START:8
    };

   // this.currentState = this.state.WAITING_FOR_START;


    if (this.gameMode != XMLscene.gameMode.MOVIE) { //TODO: mudar os modos de jogo para Fabrik.js
        this.scene.movieArray = [];
    } 
};

Fabrik.prototype.constructor = Fabrik;

Fabrik.prototype.getInitialBoard = function()
{
    var this_game = this;

    this.scene.client.getPrologRequest('initial_board', function(data) {

        this_game.board= this_game.parseBoard(data.target.response);
        
        console.log(this_game.board);
       // this_game.currentState = this.state.SELECTING_WORKER_FIRST_POSITION;
        
    }, function(data) {
        //this.currentState = this_t.state.CONNECTION_ERROR;
        console.log("CONNECTION ERROR");
    });
}

Fabrik.prototype.parseBoard = function(stringBoard)
{
    var board = [];

    var i=0;

    for(let column =0 ; column < 11; column++){
        var line = [];

        var row=0;

        while(row!=11){
            if(stringBoard[i]!='[' && stringBoard[i]!=',' && stringBoard[i] != ']'){
                line.push(stringBoard[i]);
                row++;
            }
            i++;
        }
        board.push(line);
    }

    return board;
}

Fabrik.prototype.testBoard = function() {
  for (var i = 0; i < 11; i++) {
    var line = [];
    for (var j = 0; j < 11; j++) {
      line.push(new MyPiece(this.scene, i, j, 1));
    }
    this.board.push(line);
  }
};

/*
Fabrik.prototype.pickingHandler=function(row, column) {

    switch (this.currentState) {
        case this.state.SELECTING_WORKER_FIRST_POSITION:
            this.selectingWorkerFirstPosition(row, column);
            break;
        case this.state.SELECTING_PLAYER_POSITION:
            this.selectingPlayerPosition(obj);
            break;
        case this.state.SELECTING_WORKER:
            this.selectingWorker(obj);
            break;
        case this.state. SELECTING_WORKER_NEXT_POSITION:
            this.selectingWorkerNewPosition(obj);
            break;
        case this.state.SELECTING_SECOND_WALL_POSITION:
            this.selectingSecondWallPosition(obj);
            break;
        default:
            console.log('default');
    }
}


selectingPawn(obj) {
    this.chosenPawn = obj.pawnNumber;

    if (obj instanceof Pawn) {

        if (this.player == 1) {
            Board.prototype.validatePosition(this.player1.validPawnPosition(this.chosenPawn));
        } else if (this.player == 2) {
            Board.prototype.validatePosition(this.player2.validPawnPosition(this.chosenPawn));
        }

        this.currentState = this.state.SELECTING_PAWN_NEXT_POSITION;
    }
}*/