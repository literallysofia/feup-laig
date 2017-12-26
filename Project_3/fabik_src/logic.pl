/*Verifica o estato atual do jogo após cada jogada. Caso alguma dos predicados se satisfaca, acaba o jogo.*/
checkGameState(Player, Board) :-
      (
            (checkVictory(Player, 'Row', Board), write('You won!'));
            (checkVictory(Player, 'Column', Board), write('You won!'));
            (checkVictory(Player, 'DiagonalDown', Board), write('You won!'));
            (checkVictory(Player, 'DiagonalUp', Board), write('You won!'));
            (checkFullBoard(Board), write('Woops, no more space left! It is a draw!'));
            (checkValidSpots(Board, 0, 0, Result), Result =:= 0, write('Woops, no more space left! It is a draw!'))
      ).

/*Verifica se existe o padrão de 5 X's seguidos numa linha do tabuleiro.*/
checkVictory(X, 'Row', Board) :-
      append(_, [R|_], Board),
      append(_, [X,X,X,X,X|_], R).

/*Verifica se existe o padrão de 5 X's seguidos numa coluna do tabuleiro.*/
checkVictory(X, 'Column', Board) :-
      append(_, [R1,R2,R3,R4,R5|_], Board),
	append(C1, [X|_], R1), append(C2, [X|_], R2),
	append(C3, [X|_], R3), append(C4, [X|_], R4), append(C5, [X|_], R5),
	length(C1, M), length(C2, M), length(C3, M), length(C4, M), length(C5, M).

/*Verifica se existe o padrão de 5 X's seguidos numa "diagonal a descer" do tabuleiro.*/
checkVictory(X, 'DiagonalDown', Board) :-
      append(_, [R1,R2,R3,R4,R5|_], Board),
	append(C1, [X|_], R1), append(C2, [X|_], R2),
	append(C3, [X|_], R3), append(C4, [X|_], R4), append(C5, [X|_], R5),
	length(C1, M1), length(C2, M2), length(C3, M3), length(C4, M4), length(C5, M5),
	M2 is M1+1, M3 is M2+1, M4 is M3+1, M5 is M4+1.

/*Verifica se existe o padrão de 5 X's seguidos numa "diagonal a subir" do tabuleiro.*/
checkVictory(X, 'DiagonalUp', Board) :-
      append(_, [R1,R2,R3,R4,R5|_], Board),
	append(C1, [X|_], R1), append(C2, [X|_], R2),
	append(C3, [X|_], R3), append(C4, [X|_], R4), append(C5, [X|_], R5),
	length(C1, M1), length(C2, M2), length(C3, M3), length(C4, M4), length(C5, M5),
	M2 is M1-1, M3 is M2-1, M4 is M3-1, M5 is M4-1.

/*Verifica se existe alguma posição válida tendo em conta as linhas de visão do worker para o próximo jogador colocar a peça. Atribui 0 a Result
se não existir nenhuma, e atribui 1 se existir pelo menos uma.*/
checkValidSpots(Board, Row, Column, Result) :-
      (
            (Column =:= 11, Row1 is Row + 1, checkValidSpots(Board, Row1, 0, Result));
            (Row =:= 11, Result is 0);
            ((isValidPosLines(Board, Row, Column, Res)), 
                  ((Res =:= 0, Column1 is Column + 1, checkValidSpots(Board, Row, Column1, Result));
                  (Res =:=1 , Result is 1)))
      ), !.

/*Verifica se a célula está na linha de visão do worker. Foi feito o overload 
deste predicado para cada um dos sentidos com o intuito do código se tornar mais
percetível.*/
%Default
verifyLine(_Board, _WorkerRow, _WorkerColumn, _Row, _Column, 12, Res, _Ray) :-
      Res is 0.
%O
verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index, Res, 'O' ):-
      (Column =:= WorkerColumn - Index, Row =:= WorkerRow, Res is 1);
      ((ColumnTemp is WorkerColumn - Index, getValueFromMatrix(Board, WorkerRow, ColumnTemp, Value), Value \= empty, Res is 0),!);
      (Index < 12,
      Index1 is Index + 1,
      verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index1, Res, 'O')).
%NO
verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index, Res, 'NO' ):-
      (Row =:= WorkerRow - Index, Column =:= WorkerColumn - Index, Res is 1); %NO
      ((RowTemp is WorkerRow - Index, ColumnTemp is WorkerColumn - Index, getValueFromMatrix(Board, RowTemp, ColumnTemp, Value), Value \= empty, Res is 0),!);
      (Index < 12,
      Index1 is Index + 1,
      verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index1, Res, 'NO')).
%N
verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index, Res, 'N' ):-
      (Row =:= WorkerRow - Index, Column =:= WorkerColumn, Res is 1);
      ((RowTemp is WorkerRow - Index, getValueFromMatrix(Board, RowTemp, WorkerColumn, Value), Value \= empty, Res is 0),!);
      (Index < 12,
      Index1 is Index + 1,
      verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index1, Res, 'N')).
%NE
verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index, Res, 'NE' ):-
      (Row =:= WorkerRow - Index, Column =:= WorkerColumn + Index, Res is 1);
      ((RowTemp is WorkerRow -Index, ColumnTemp is WorkerColumn + Index, getValueFromMatrix(Board, RowTemp, ColumnTemp, Value), Value \= empty, Res is 0),!);
      (Index < 12,
      Index1 is Index + 1,
      verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index1, Res, 'NE')).
%E
verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index, Res, 'E' ):-
      (Column =:= WorkerColumn + Index, Row =:= WorkerRow, Res is 1);
      ((ColumnTemp is WorkerColumn + Index, getValueFromMatrix(Board, WorkerRow, ColumnTemp, Value), Value \= empty, Res is 0),!);
      (Index < 12,
      Index1 is Index + 1,
      verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index1, Res, 'E')).
%SE
verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index, Res, 'SE' ):-
      (Row =:= WorkerRow + Index, Column =:= WorkerColumn + Index, Res is 1);
      ((RowTemp is WorkerRow + Index, ColumnTemp is WorkerColumn + Index, getValueFromMatrix(Board, RowTemp, ColumnTemp, Value), Value \= empty, Res is 0),!);
      (Index < 12,
      Index1 is Index + 1,
      verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index1, Res, 'SE')).
%S
verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index, Res, 'S'):-
      (Row =:= WorkerRow + Index, Column =:= WorkerColumn, Res is 1);
      ((RowTemp is WorkerRow + Index, getValueFromMatrix(Board, RowTemp, WorkerColumn, Value), Value \= empty, Res is 0),!);
      (Index < 12,
      Index1 is Index + 1,
      verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index1, Res, 'S')).
%SO
verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index, Res, 'SO' ):-
      (Row =:= WorkerRow + Index, Column =:= WorkerColumn - Index, Res is 1);
      ((RowTemp is WorkerRow + Index, ColumnTemp is WorkerColumn - Index, getValueFromMatrix(Board, RowTemp, ColumnTemp, Value), Value \= empty, Res is 0),!);
      (Index < 12,
      Index1 is Index + 1,
      verifyLine(Board, WorkerRow, WorkerColumn, Row, Column, Index1, Res, 'SO')).

/*Verifica se a célula (Row, Column) está nalguma das linhas de visão do worker 
(WorkerRow, WorkerColumn) com a ajuda do predicado verifyLine.*/
%Res = 1 if that cell is in the worker lines, Res = 0 if it's not.
isWorkerLines(Board, WorkerRow, WorkerColumn, Row, Column, Res) :-
      (verifyLine(Board, WorkerRow, WorkerColumn, Row, Column,1, ResN, 'N' ), ResN =:= 1, Res is 1);
      (verifyLine(Board, WorkerRow, WorkerColumn, Row, Column,1, ResNE, 'NE' ), ResNE =:= 1, Res is 1);
      (verifyLine(Board, WorkerRow, WorkerColumn, Row, Column,1, ResE, 'E' ), ResE =:= 1, Res is 1);
      (verifyLine(Board, WorkerRow, WorkerColumn, Row, Column,1, ResSE, 'SE' ), ResSE =:= 1, Res is 1);
      (verifyLine(Board, WorkerRow, WorkerColumn, Row, Column,1, ResS, 'S' ), ResS =:= 1, Res is 1);
      (verifyLine(Board, WorkerRow, WorkerColumn, Row, Column,1, ResSO, 'SO' ), ResSO =:= 1, Res is 1);
      (verifyLine(Board, WorkerRow, WorkerColumn, Row, Column,1, ResO, 'O' ), ResO =:= 1, Res is 1);
      (verifyLine(Board, WorkerRow, WorkerColumn, Row, Column,1, ResNO, 'NO' ), ResNO =:= 1, Res is 1);
      Res is 0.

/*Verifica se a célula (Row, Column) está vazia recorrendo à chamadas ao predicado 
getValueFromMatrix.*/
isEmptyCell(Board, Row, Column, Res) :-
    ((getValueFromMatrix(Board, Row, Column, Value), Value == empty, !, 
    Res is 1);
    Res is 0).

/*Vai buscar as posições dos workers com a ajuda do predicado getWorkersPos e 
verifica se a célula (Row, Column) está na linha de visão de pelo menos um dos
workers.*/
%Res = 1 that cell is valid, Res = 0 if not.
isValidPosLines(Board, Row, Column, Res) :-
      (
            (isEmptyCell(Board, Row, Column, Res), Res =:= 1,
                  (getWorkersPos(Board, Worker1Row, Worker1Column, Worker2Row, Worker2Column),
                  ((isWorkerLines(Board, Worker1Row, Worker1Column, Row, Column, ResIsWorkerLines1), ResIsWorkerLines1 =:= 1, Res is 1);
                  (isWorkerLines(Board, Worker2Row, Worker2Column, Row, Column, ResIsWorkerLines2), ResIsWorkerLines2 =:= 1, Res is 1);
                  Res is 0)));
            (Res is 0)
      ).

/*É chamado para verificar todas as jogadas (tanto do jogador, como do worker) 
recorrendo ao predicado isValidPosLines e  getValueFromMatrix. Este ultimo serve
para verificar se naquela célula do tabuleiro está o conteúdo pretendido 
(Expected). Por exemplo, se for para  adicionar uma peça, o conteúdo pretendido
é ‘empty’, mas caso seja para escolher o worker a mover, o conteúdo pretendido 
vai ser ‘red’. Se não for possível fazer o movimento, este predicado chama o 
write que informa o jogador qual a razão da falha, pedindo umas novas 
coordenadas.*/
checkMove(Board, Player, NewBoard, Expected, ColumnIndex, RowIndex):-
      (((Player == empty, Expected == red),
            ((getValueFromMatrix(Board, RowIndex, ColumnIndex, Expected),
                  replaceInMatrix(Board, RowIndex, ColumnIndex, Player, NewBoard));
                  (write('INVALID MOVE: There is no worker in that cell, please try again!\n\n'),
                  askCoords(Board, Player, NewBoard, Expected))));
      ((Player == red, Expected == empty),
            ((getValueFromMatrix(Board, RowIndex, ColumnIndex, Expected),
                  replaceInMatrix(Board, RowIndex, ColumnIndex, Player, NewBoard));
                  (write('INVALID MOVE: That cell is not empty, please try again!\n\n'),
                  askCoords(Board, Player, NewBoard, Expected))));
      ((Player == empty),
            ((getValueFromMatrix(Board, RowIndex, ColumnIndex, Expected),
                  replaceInMatrix(Board, RowIndex, ColumnIndex, Player, NewBoard));
                  (write('INVALID MOVE: That cell is not empty, please try again!\n\n'),
                  askCoords(Board, Player, NewBoard, Expected))));
      ((Player == white; Player == black),
            ((getValueFromMatrix(Board, RowIndex, ColumnIndex, Expected),
                   ((isValidPosLines(Board, RowIndex, ColumnIndex, ResIsValidPosLines), ResIsValidPosLines =:= 1),
                        replaceInMatrix(Board, RowIndex, ColumnIndex, Player, NewBoard);
                        (write('INVALID MOVE: That cell is not within the workers lines of sight, please try again!\n\n'),
                        askCoords(Board, Player, NewBoard, Expected))));
            (write('INVALID MOVE: That cell is not empty, please try again!\n\n'),
            askCoords(Board, Player, NewBoard, Expected))))).


checkMove(Board, Player, NewBoard, Expected, ColumnIndex, RowIndex, ERROR):-
      (((Player == empty, Expected == red),
            ((getValueFromMatrix(Board, RowIndex, ColumnIndex, Expected),
                  replaceInMatrix(Board, RowIndex, ColumnIndex, Player, NewBoard));
                  (ERROR = 'INVALID MOVE: There is no worker in that cell, please try again!')));
      ((Player == red, Expected == empty),
            ((getValueFromMatrix(Board, RowIndex, ColumnIndex, Expected),
                  replaceInMatrix(Board, RowIndex, ColumnIndex, Player, NewBoard));
                  (ERROR = 'INVALID MOVE: That cell is not empty, please try again!')));
      ((Player == empty),
            ((getValueFromMatrix(Board, RowIndex, ColumnIndex, Expected),
                  replaceInMatrix(Board, RowIndex, ColumnIndex, Player, NewBoard));
                  (ERROR = 'INVALID MOVE: That cell is not empty, please try again!')));
      ((Player == white; Player == black),
            ((getValueFromMatrix(Board, RowIndex, ColumnIndex, Expected),
                   ((isValidPosLines(Board, RowIndex, ColumnIndex, ResIsValidPosLines), ResIsValidPosLines =:= 1),
                        replaceInMatrix(Board, RowIndex, ColumnIndex, Player, NewBoard);
                        (ERROR = 'INVALID MOVE: That cell is not within the workers lines of sight, please try again!')));
            (ERROR='INVALID MOVE: That cell is not empty, please try again!')))).

/*Predicado que pede e analisa cada jogada.*/
askCoords(Board, Player, NewBoard, Expected) :-
      manageRow(NewRow),
      manageColumn(NewColumn),
      write('\n'),
      ColumnIndex is NewColumn - 1,
      RowIndex is NewRow - 1,
      checkMove(Board, Player, NewBoard, Expected, ColumnIndex, RowIndex).


printComputerWorkerMove(WorkerRowIndex, WorkerColumnIndex, WorkerNewRowIndex, WorkerNewColumnIndex):-
      WorkerRow is WorkerRowIndex + 1,
      WorkerColumn is WorkerColumnIndex + 1,
      WorkerNewRow is WorkerNewRowIndex + 1,
      WorkerNewColumn is WorkerNewColumnIndex + 1,
      letter(WorkerRow, WorkerRowLetter),
      letter(WorkerNewRow, WorkerNewRowLetter),
      write(' > Computer moved the worker in the cell [row: '), write(WorkerRowLetter), write(' column: '), write(WorkerColumn), write('] to the cell [row: '),  write(WorkerNewRowLetter), write(' column: '), write(WorkerNewColumn), write('].\n').

printComputerMove(NewRowIndex, NewColumnIndex):-
      NewRow is NewRowIndex + 1,
      NewColumn is NewColumnIndex + 1,
      letter(NewRow, RowLetter),
      write(' > Computer added a piece in the cell [row: '), write(RowLetter), write(' column: '), write(NewColumn), write(']\n').

printComputerAddWorker(WorkerRowIndex, WorkerColumnIndex):-
      WorkerRow is WorkerRowIndex + 1,
      WorkerColumn is WorkerColumnIndex + 1,
      letter(WorkerRow, WorkerRowLetter),
      write(' > Computer added a worker in the cell [row: '), write(WorkerRowLetter), write(' column: '), write(WorkerColumn), write(']\n').

computerMoveWorkers(Board1, NewBoard):-
      ((moveWorker(Board1, WorkerRowIndex, WorkerColumnIndex, WorkerNewRowIndex, WorkerNewColumnIndex, ResMoveWorker), ResMoveWorker =:= 1,
      sleep(1),
      replaceInMatrix(Board1,  WorkerRowIndex, WorkerColumnIndex, empty, Board2), 
      replaceInMatrix(Board2,  WorkerNewRowIndex, WorkerNewColumnIndex, red, NewBoard),
      printComputerWorkerMove(WorkerRowIndex, WorkerColumnIndex, WorkerNewRowIndex, WorkerNewColumnIndex));
      (NewBoard = Board1, sleep(1), write(' > Computer did not move any worker.\n'))).

moveWorker(Board, 1, NewBoard) :-
        write('\n2. Choose worker current cell.\n'),
        askCoords(Board, empty, NoWorkerBoard, red),
        write('3. Choose worker new cell.\n'),
        askCoords(NoWorkerBoard, red, NewBoard, empty),
        printBoard(NewBoard),
        write('\n4. Choose your cell.\n').

moveWorker(Board, 0, NewBoard) :-
        NewBoard = Board,
        write('\n2. Choose your cell.\n').


addWorkers(InitialBoard, WorkersBoard, 'P', 'P') :-
      printBoard(InitialBoard),
      write('\n------------------ PLAYER X -------------------\n\n'),
      write('1. Choose worker 1 cell.\n'),
      askCoords(InitialBoard, red, Worker1Board, empty),
      printBoard(Worker1Board),
      write('\n------------------ PLAYER O -------------------\n\n'),
      write('1. Choose worker 2 cell.\n'),
      askCoords(Worker1Board, red, WorkersBoard, empty),
      printBoard(WorkersBoard).

addWorkers(InitialBoard, WorkersBoard, 'P', 'C') :-
      printBoard(InitialBoard),
      write('\n------------------ PLAYER X -------------------\n\n'),
      write('1. Choose worker 1 cell.\n'),
      askCoords(InitialBoard, red, Worker1Board, empty),
      printBoard(Worker1Board),
      write('\n----------------- COMPUTER O ------------------\n\n'),
      generateWorkerMove(Worker1Board, WorkerRowIndex, WorkerColumnIndex),
      sleep(1),
      replaceInMatrix(Worker1Board,  WorkerRowIndex, WorkerColumnIndex, red, WorkersBoard),
      printComputerAddWorker(WorkerRowIndex, WorkerColumnIndex),
      printBoard(WorkersBoard).

addWorkers(InitialBoard, WorkersBoard, 'C', 'C') :-
      printBoard(InitialBoard),
      write('\n----------------- COMPUTER X ------------------\n\n'),
      generateWorkerMove(InitialBoard, WorkerRowIndex1, WorkerColumnIndex1),
      sleep(1),
      replaceInMatrix(InitialBoard,  WorkerRowIndex1, WorkerColumnIndex1, red, Worker1Board),
      printComputerAddWorker(WorkerRowIndex1, WorkerColumnIndex1),
      printBoard(Worker1Board),
      write('\n----------------- COMPUTER O ------------------\n\n'),
      generateWorkerMove(Worker1Board, WorkerRowIndex2, WorkerColumnIndex2),
      sleep(1),
      replaceInMatrix(Worker1Board,  WorkerRowIndex2, WorkerColumnIndex2, red, WorkersBoard),
      printComputerAddWorker(WorkerRowIndex2, WorkerColumnIndex2),
      printBoard(WorkersBoard).


blackPlayerTurn(Board, NewBoard, 'P') :-
      write('\n------------------ PLAYER X -------------------\n\n'),
      write('1. Do you want to move a worker? [0(No)/1(Yes)]'),
      manageMoveWorkerBool(MoveWorkerBoolX),
      moveWorker(Board, MoveWorkerBoolX, Board1),
      askCoords(Board1, black, NewBoard, empty),
      printBoard(NewBoard).

blackPlayerTurn(Board, NewBoard, 'C') :-
      write('\n----------------- COMPUTER X ------------------\n\n'),
      computerMoveWorkers(Board, Board1),
      generatePlayerMove(Board1, NewRowIndex, NewColumnIndex),
      replaceInMatrix(Board1,  NewRowIndex, NewColumnIndex, black, NewBoard),
      printComputerMove(NewRowIndex, NewColumnIndex),
      printBoard(NewBoard).

whitePlayerTurn(NewBoard, FinalBoard, 'P') :-
      write('\n------------------ PLAYER O -------------------\n\n'),
      write('1. Do you want to move a worker? [0(No)/1(Yes)]'),
      manageMoveWorkerBool(MoveWorkerBoolO),
      moveWorker(NewBoard, MoveWorkerBoolO, Board1),
      askCoords(Board1, white, FinalBoard, empty),
      printBoard(FinalBoard).

whitePlayerTurn(Board, FinalBoard, 'C') :-
      write('\n----------------- COMPUTER O ------------------\n\n'),
      computerMoveWorkers(Board, Board1),
      generatePlayerMove(Board1, NewRowIndex, NewColumnIndex),
      replaceInMatrix(Board1,  NewRowIndex, NewColumnIndex, white, FinalBoard),
      printComputerMove(NewRowIndex, NewColumnIndex),
      printBoard(FinalBoard).

/*Loop do jogo, em que recebe a jogada de cada jogador e verifica o estado do jogo a seguir.*/
gameLoop(Board, Player1, Player2) :-
      blackPlayerTurn(Board, NewBoard, Player1),
      (
            (checkGameState('black', NewBoard), write('\nThanks for playing!\n'));
            (whitePlayerTurn(NewBoard, FinalBoard, Player2),
                  (
                        (checkGameState('white', FinalBoard), write('\nThanks for playing!\n'));
                        (gameLoop(FinalBoard, Player1, Player2))
                  )
            )
      ).

startGame(Player1, Player2) :-
      initialBoard(InitialBoard),
      addWorkers(InitialBoard, WorkersBoard, Player1, Player2),
      gameLoop(WorkersBoard, Player1, Player2).