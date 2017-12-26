function Fabrik(scene, gameMode) {
    this.scene = scene;
    this.gameMode = gameMode;

    
    this.board = [];
    this.getInitialBoard();
    this.pawns = [];

    this.player = 1; //TODO: mudar para a nossa versão


    if (this.gameMode != XMLscene.gameMode.MOVIE) { //TODO: mudar os modos de jogo para Fabrik.js
        this.scene.movieArray = [];
    } 
};

Fabrik.prototype.constructor = Fabrik;

Fabrik.prototype.getInitialBoard = function()
{

    console.log("JU: GETINITIALBOARD");

    this.scene.client.getPrologRequest('initial_board', function(data) {
        this.board = JSON.parse(data.target.response);

        //if (this.currentState != this_t.state.INVALID_GAME) {
            //this.currentState = this_t.state.INITIALIZE_BOARD;
        //}
        console.log("JU: INITIALIZE BOARD");
    }, function(data) {
        //this.currentState = this_t.state.CONNECTION_ERROR;
        console.log("JU: CONNECTION ERROR");
    });
}