/*Todos os predicados deste ficheiro analisam o input, relativamente às linhas e colunas inseridas pelo utilizador,
e se as mesmas estão dentro dos limites do tabuleiro. Caso não se satisfaca, pede novamente a informação.*/

manageRow(NewRow) :-
    readRow(Row),
    validateRow(Row, NewRow).

manageColumn(NewColumn) :-
    readColumn(Column),
    validateColumn(Column, NewColumn).

readRow(Row) :-
    write('  > Row    '),
    read(Row).

readColumn(Column) :-
    write('  > Column '),
    read(Column).

validateRow('A', NewRow) :-
    NewRow = 1.

validateRow('B', NewRow) :-
    NewRow = 2.

validateRow('C', NewRow) :-
    NewRow = 3.

validateRow('D', NewRow) :-
    NewRow = 4.

validateRow('E', NewRow) :-
    NewRow = 5.

validateRow('F', NewRow) :-
    NewRow = 6.

validateRow('G', NewRow) :-
    NewRow = 7.

validateRow('H', NewRow) :-
    NewRow = 8.

validateRow('I', NewRow) :-
    NewRow = 9.

validateRow('J', NewRow) :-
    NewRow = 10.

validateRow('K', NewRow) :-
    NewRow = 11.

validateRow(_Row, NewRow) :-
    write('ERROR: That row is not valid!\n\n'),
    readRow(Input),
    validateRow(Input, NewRow).

validateColumn(1, NewColumn) :-
    NewColumn = 1.

validateColumn(2, NewColumn) :-
    NewColumn = 2.

validateColumn(3, NewColumn) :-
    NewColumn = 3.

validateColumn(4, NewColumn) :-
    NewColumn = 4.

validateColumn(5, NewColumn) :-
    NewColumn = 5.

validateColumn(6, NewColumn) :-
    NewColumn = 6.

validateColumn(7, NewColumn) :-
    NewColumn = 7.

validateColumn(8, NewColumn) :-
    NewColumn = 8.

validateColumn(9, NewColumn) :-
    NewColumn = 9.

validateColumn(10, NewColumn) :-
    NewColumn = 10.

validateColumn(11, NewColumn) :-
    NewColumn = 11.

validateColumn(_Column, NewColumn) :-
    write('ERROR: That column is not valid!\n\n'),
    readColumn(Input),
    validateColumn(Input, NewColumn).

manageMoveWorkerBool(NewMoveWorkerBool):-
      read(MoveWorkerBool),
      validateMoveWorkerBool(MoveWorkerBool, NewMoveWorkerBool).

validateMoveWorkerBool(1, NewMoveWorkerBool) :-
    NewMoveWorkerBool = 1.

validateMoveWorkerBool(0, NewMoveWorkerBool) :-
    NewMoveWorkerBool = 0.

validateMoveWorkerBool(_Bool, NewMoveWorkerBool) :-
    write('\nERROR: That answer is not valid, please try again![0(No)/1(Yes)]'),
    read(Input),
    validateMoveWorkerBool(Input, NewMoveWorkerBool).