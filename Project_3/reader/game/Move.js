/**
 * Move
 * @constructor
 */

function Move(type, color, newCell, cell, state, player ) {
    this.type = type;
    this.color = color;
    this.cell=cell;
    this.newCell = newCell;
    this.state = state;
    this.player = player;
}
  