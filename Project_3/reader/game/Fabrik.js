function Fabrik(scene, gameMode) {
    this.scene = scene;
    this.gameMode = gameMode;

    
    this.board = [];
    this.getInitialBoard();
    //this.testBoard();
    this.pawns = [];

    this.player = 1;

    this.state = { //TODO: ordenar melhor
        ADDING_FIRST_WORKER:1,
        ADDING_SECOND_WORKER:2,
        ADDING_PLAYER: 3,
        END_GAME:5,
        WINNER:6,
        CONNECTION_ERROR: 7,
        WAITING_FOR_START:8
    };

    this.currentState = this.state.WAITING_FOR_START;
    console.log("CURRENT STATE: waiting_for_start");


    if (this.gameMode != XMLscene.gameMode.MOVIE) { //TODO: mudar os modos de jogo para Fabrik.js
        this.scene.movieArray = [];
    } 
};

Fabrik.prototype.constructor = Fabrik;

Fabrik.prototype.getInitialBoard = function()
{
    var this_game = this;

    this.scene.client.getPrologRequest('initial_board', function(data) {

        this_game.board= this_game.parseBoardToJS(data.target.response);
        this_game.currentState = this_game.state.ADDING_FIRST_WORKER;
        console.log("CURRENT STATE: selecting_worker_first_position");
        
    }, function(data) {
        //this.currentState = this_t.state.CONNECTION_ERROR;
        console.log("CONNECTION ERROR");
    });
}


Fabrik.prototype.pickingHandler=function(row, column) {

    switch (this.currentState) {
        case this.state.ADDING_FIRST_WORKER:
            this.addWorker(row, column);
            break;
        case this.state.ADDING_SECOND_WORKER:
            this.addWorker(row, column);
            break;
        case this.state.ADDING_PLAYER:
            this.addPlayer(row,column);
            break;
        /*case this.state.SELECTING_WORKER:
            this.selectingWorker(obj);
            break;
        case this.state. SELECTING_WORKER_NEXT_POSITION:
            this.selectingWorkerNewPosition(obj);
            break;
        case this.state.SELECTING_SECOND_WALL_POSITION:
            this.selectingSecondWallPosition(obj);
            break;*/
        default:
            console.log('default');
    }
}


Fabrik.prototype.addWorker=function(row, column){

    var this_game = this;

    let boardString = this.parseBoardToPROLOG();

    var command = "add_worker(" +boardString+ "," + row + "," + column +")" ;

    this.scene.client.getPrologRequest(command, function(data) {

        if(data.target.response!="[]"){
            this_game.board= this_game.parseBoardToJS(data.target.response);

            if(this_game.currentState == this_game.state.ADDING_FIRST_WORKER)
                this_game.currentState = this_game.state.ADDING_SECOND_WORKER;
            else if(this_game.currentState == this_game.state.ADDING_SECOND_WORKER)
                this_game.currentState = this_game.state.ADDING_PLAYER;
        }
        else{ //TODO: ir buscar a mensagem de erro a prolog
            console.log("ERROR: POSITION NOT VALID");
        }
        
        
    }, function(data) {
        //this.currentState = this_t.state.CONNECTION_ERROR;
        console.log("CONNECTION ERROR");
    });
}


Fabrik.prototype.addPlayer=function(row, column){

    var this_game = this;

    let boardString = this.parseBoardToPROLOG();

    var color;

    if(this.player==1)
        color="black";
    else if(this.player==2)
        color="white";

    console.log("PLAYER: " + this.player + "    COLOR: " + color);

    var command = "add_player(" +boardString+ "," + row + "," + column + ","+ color +")" ;

    this.scene.client.getPrologRequest(command, function(data) {

        if(data.target.response!="[]"){
            this_game.board= this_game.parseBoardToJS(data.target.response);
            
            if(this_game.player==1){
                this_game.player=2;
                console.log("PLAYER WHITE: " + this_game.player);
            }
            else if(this_game.player==2){
                this_game.player=1;
                console.log("PLAYER BLACK: " + this_game.player);
            }
                
        }
        else{ //TODO: ir buscar a mensagem de erro a prolog
            console.log("ERROR: POSITION NOT VALID");
        }
        
        
    }, function(data) {
        //this.currentState = this_t.state.CONNECTION_ERROR;
        console.log("CONNECTION ERROR");
    });
}


/*
* PARSER DO BOARD
*/

Fabrik.prototype.parseBoardToJS = function(stringBoard)
{
    var numbersBoard = [];
    var i=0;
    for(let rows =0 ; rows < 11; rows++){
        var numbersLine = [];
        var column=0;
        while(column!=11){
            if(stringBoard[i]!='[' && stringBoard[i]!=',' && stringBoard[i] != ']'){
                numbersLine.push(stringBoard[i]);
                column++;
            }
            i++;
        }
        numbersBoard.push(numbersLine);
    }

    var board=[];
    for (var i = 0; i < numbersBoard.length; i++) {
        var line = [];
        for (var j = 0; j <  numbersBoard[i].length; j++) {
          line.push(new MyPiece(this.scene, j, i, numbersBoard[i][j]));
        }
        board.push(line);
      }

    return board;

}

Fabrik.prototype.parseBoardToPROLOG = function(){

    var boardString = "";

    boardString = boardString+'[';

    for(let i= 0; i < this.board.length; i++){
        boardString = boardString+'[';

        for(let j = 0; j < this.board[i].length; j++){
            var elem;


            switch(this.board[i][j].type){
                case '0':
                    elem='empty';
                    break;
                case '1':
                    elem='black';
                    break;
                case '2':
                    elem='white';
                    break;
                case '3':
                    elem='red';
                    break;
                default:
                    break
            }

            boardString = boardString + elem;
            if(j!=this.board[i].length - 1) boardString = boardString +',';
        }

        boardString = boardString+']';
        if(i!=this.board.length - 1) boardString = boardString +',';
    }

    boardString = boardString+']';

    return boardString;

}