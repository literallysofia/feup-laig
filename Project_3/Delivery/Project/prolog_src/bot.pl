verifyRandomMove(Board, Row, Column, Res):-
    ((isValidPosLines(Board, Row, Column, ResIsValidPosLines), ResIsValidPosLines =:= 1, !, 
    Res is 1);
    Res is 0).

/*Gera um linha e coluna aleatória, verifica se é uma jogada válida, ou seja, 
se é uma célula que está nas linhas de visão de algum worker e se a célula está 
atualmente vazia. Caso seja válida, ele devolve essa linha e coluna, caso 
contrário este predicado chama-se a si própria para tentar gerar uma nova posição.*/
generatePlayerMove(Board, Row, Column):-
    random(0,11,RandomRow),
    random(0,11,RandomColumn),
    ((verifyRandomMove(Board, RandomRow, RandomColumn, ResVerifyRandomMove),ResVerifyRandomMove=:=1, 
    isEmptyCell(Board, RandomRow, RandomColumn, ResIsEmptyCell), ResIsEmptyCell=:=1,
        Row is RandomRow, Column is RandomColumn);
        generatePlayerMove(Board, Row, Column)).

/*Escolhe aleatoriamente se vai mover ou não o worker. Se escolher mover o worker,
 chama o predicado chooseWorker para escolher aleatoriamente o worker a mover e 
 seguidamente chama a função generateWorkerMove para saber a posição para qual 
 mover.*/
moveWorker(Board, WorkerRow, WorkerColumn, WorkerNewRow, WorkerNewColumn, Res) :-
    random(0,2, Bool),
    ((Bool =:= 1, 
    chooseWorker(Board, WorkerRow, WorkerColumn), generateWorkerMove(Board, WorkerNewRow, WorkerNewColumn), Res = 1);
    Res is 0).

%Escolhe aleatoriamente o worker a mover. 
chooseWorker(Board, WorkerRow, WorkerColumn) :-
    getWorkersPos(Board, WorkerRow1, WorkerColumn1, WorkerRow2, WorkerColumn2),
    random(1,3, Bool),
    ((Bool =:= 1, WorkerRow is WorkerRow1, WorkerColumn is WorkerColumn1);
    (Bool =:= 2, WorkerRow is WorkerRow2, WorkerColumn is WorkerColumn2)).


/*Gera um linha e coluna aleatória, verifica se é uma jogada válida, ou seja, 
se é uma célula que está nas linhas de visão de algum worker e se a célula 
está atualmente vazia. Caso seja válida, ele devolve essa linha e coluna, 
caso contrário este predicado chama-se a si própria para tentar gerar uma 
nova posição.*/
generateWorkerMove(Board,WorkerNewRow, WorkerNewColumn) :-
    random(0,11,RandomWorkerNewRow),
    random(0,11,RandomWorkerNewColumn),
    ((isEmptyCell(Board, RandomWorkerNewRow, RandomWorkerNewColumn, ResIsEmptyCell), ResIsEmptyCell=:=1,
        WorkerNewRow is RandomWorkerNewRow, WorkerNewColumn is RandomWorkerNewColumn);
        generateWorkerMove(Board, WorkerNewRow, WorkerNewColumn)).


