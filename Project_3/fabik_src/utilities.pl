boardToNumbers([],[]).
boardToNumbers([MatrixHead|MatrixTail], [NewMatrixHead|NewMatrixTail]):-
        lineToNumbers(MatrixHead, NewMatrixHead),
        boardToNumbers(MatrixTail, NewMatrixTail).

lineToNumbers([],[]).
lineToNumbers([Head|Tail], [NewHead|NewTail]):-
        number(Head,NewHead),
        lineToNumbers(Tail, NewTail).

number(empty, 0).
number(black, 1).
number(white, 2).
number(red, 3).


replaceInList([_H|T], 0, Value, [Value|T]).
replaceInList([H|T], Index, Value, [H|TNew]) :-
        Index > 0,
        Index1 is Index - 1,
        replaceInList(T, Index1, Value, TNew).

replaceInMatrix([H|T], 0, Column,Value, [HNew|T]) :-
        replaceInList(H, Column, Value, HNew).

replaceInMatrix([H|T], Row, Column, Value, [H|TNew]) :-
        Row > 0,
        Row1 is Row - 1,
        replaceInMatrix(T, Row1, Column, Value, TNew).

getValueFromList([H|_T], 0, Value) :-
        Value = H.

getValueFromList([_H|T], Index, Value) :-
        Index > 0,
        Index1 is Index - 1,
        getValueFromList(T, Index1, Value).

getValueFromMatrix([H|_T], 0, Column, Value) :-
        getValueFromList(H, Column, Value).

getValueFromMatrix([_H|T], Row, Column, Value) :-
        Row > 0,
        Row1 is Row - 1,
        getValueFromMatrix(T, Row1, Column, Value).

/*Analisa o que está na célula (Row, Column) da matriz. Retorna em Value o 
conteúdo daquela célula, ou, caso Value já esteja atribuído, a função falha.*/
getWorkersPosColumn(Board, Value, Row, Column, WorkerRow, WorkerColumn) :-
        (getValueFromMatrix(Board, Row, Column, Value),
        WorkerRow = Row, WorkerColumn = Column);
        (Column < 11,
        Column1 is Column + 1,
        getWorkersPosColumn(Board, Value, Row, Column1, WorkerRow, WorkerColumn)).

getWorkersPosRow(Board, Value, Row, Column, WorkerRow, WorkerColumn) :-
        getWorkersPosColumn(Board, Value, Row, Column, WorkerRow, WorkerColumn);
        (Row < 11,
        Row1 is Row + 1,
        getWorkersPosRow(Board, Value, Row1, Column, WorkerRow, WorkerColumn)).

/*Percorre o tabuleiro e com a ajuda do predicado getValueFromMatrix, devolve 
em WorkerRow1, WorkerColumn1, WorkerRow2 e WorkerColumn2 as posições dos workers 
na matriz. */
getWorkersPos(Board, WorkerRow1, WorkerColumn1, WorkerRow2, WorkerColumn2) :-
        Value = red,
        getWorkersPosRow(Board,Value, 0,0, WorkerRow1, WorkerColumn1),
        replaceInMatrix(Board, WorkerRow1, WorkerColumn1, 'RED', NewBoard), %substituir worker1 por RED para nao ser considerado quando  procurar worker2.
        getWorkersPosRow(NewBoard,Value, 0,0, WorkerRow2, WorkerColumn2).

/*Verifica se o tabuleiro está cheio, confirmando se não há nenhuma célula
‘empty’ no tabuleiro.*/
checkFullBoard(Board) :-
      \+ (append(_, [R|_], Board),
	append(_, ['empty'|_], R)).
