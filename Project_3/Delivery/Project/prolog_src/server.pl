:-use_module(library(sockets)).
:-use_module(library(lists)).
:-use_module(library(codesio)).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%                                        Server                                                   %%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% To run, enter 'server.' on sicstus command line after consulting this file.
% You can test requests to this server by going to http://localhost:8081/<request>.
% Go to http://localhost:8081/quit to close server.

% Made by Luis Reis (ei12085@fe.up.pt) for LAIG course at FEUP.

port(8081).

% Server Entry Point
server :-
	port(Port),
	write('Opened Server'),nl,nl,
	socket_server_open(Port, Socket),
	server_loop(Socket),
	socket_server_close(Socket),
	write('Closed Server'),nl.

% Server Loop 
% Uncomment writes for more information on incomming connections
server_loop(Socket) :-
	repeat,
	socket_server_accept(Socket, _Client, Stream, [type(text)]),
		% write('Accepted connection'), nl,
	    % Parse Request
		catch((
			read_request(Stream, Request),
			read_header(Stream)
		),_Exception,(
			% write('Error parsing request.'),nl,
			close_stream(Stream),
			fail
		)),
		
		% Generate Response
		handle_request(Request, MyReply, Status),
		format('Request: ~q~n',[Request]),
		format('Reply: ~q~n', [MyReply]),
		
		% Output Response
		format(Stream, 'HTTP/1.0 ~p~n', [Status]),
		format(Stream, 'Access-Control-Allow-Origin: *~n', []),
		format(Stream, 'Content-Type: text/plain~n~n', []),
		format(Stream, '~p', [MyReply]),
	
		% write('Finnished Connection'),nl,nl,
		close_stream(Stream),
	(Request = quit), !.
	
close_stream(Stream) :- flush_output(Stream), close(Stream).

% Handles parsed HTTP requests
% Returns 200 OK on successful aplication of parse_input on request
% Returns 400 Bad Request on syntax error (received from parser) or on failure of parse_input
handle_request(Request, MyReply, '200 OK') :- catch(parse_input(Request, MyReply),error(_,_),fail), !.
handle_request(syntax_error, 'Syntax Error', '400 Bad Request') :- !.
handle_request(_, 'Bad Request', '400 Bad Request').

% Reads first Line of HTTP Header and parses request
% Returns term parsed from Request-URI
% Returns syntax_error in case of failure in parsing
read_request(Stream, Request) :-
	read_line(Stream, LineCodes),
	print_header_line(LineCodes),
	
	% Parse Request
	atom_codes('GET /',Get),
	append(Get,RL,LineCodes),
	read_request_aux(RL,RL2),	
	
	catch(read_from_codes(RL2, Request), error(syntax_error(_),_), fail), !.
read_request(_,syntax_error).
	
read_request_aux([32|_],[46]) :- !.
read_request_aux([C|Cs],[C|RCs]) :- read_request_aux(Cs, RCs).


% Reads and Ignores the rest of the lines of the HTTP Header
read_header(Stream) :-
	repeat,
	read_line(Stream, Line),
	print_header_line(Line),
	(Line = []; Line = end_of_file),!.

check_end_of_header([]) :- !, fail.
check_end_of_header(end_of_file) :- !,fail.
check_end_of_header(_).

% Function to Output Request Lines (uncomment the line bellow to see more information on received HTTP Requests)
% print_header_line(LineCodes) :- catch((atom_codes(Line,LineCodes),write(Line),nl),_,fail), !.
print_header_line(_).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%                                       Commands                                                  %%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:- consult('fabrik.pl').
:- consult('menus.pl').
:- consult('display.pl').
:- consult('logic.pl').
:- consult('utilities.pl').
:- consult('input.pl').
:- consult('bot.pl').

parse_input(handshake, handshake).
parse_input(test(C,N), Res) :- test(C,Res,N).
parse_input(quit, goodbye).

parse_input(initial_board,Board):-
	initialBoard(BoardTemp),
	boardToNumbers(BoardTemp, Board).

/*State: 0 - nothing happened, 1 - player won, 2 - draw*/
parse_input(check_state(Player,Board), State) :-
	checkGameState(Player, Board, State).

parse_input(add_worker(Board, Row, Column), Response) :-
	RowIndex is Row -1,
	ColumnIndex is Column -1,
	checkMove(Board, red, NewBoardTemp, empty, ColumnIndex, RowIndex, Error),
	boardToNumbers(NewBoardTemp, NewBoard),
	((list_empty(NewBoard), Response = Error);
	(Response = NewBoard)), !.

parse_input(add_player(Board, Row, Column, Player), Response) :-
	RowIndex is Row -1,
	ColumnIndex is Column -1,
	checkMove(Board, Player, NewBoardTemp, empty, ColumnIndex, RowIndex, Error),
	boardToNumbers(NewBoardTemp, NewBoard),
	((list_empty(NewBoard), Response = Error);
	(Response = NewBoard)), !.

parse_input(is_worker_cell(Board, Row, Column), Bool) :-
	RowIndex is Row -1,
	ColumnIndex is Column -1,
	isWorkerCell(Board, RowIndex, ColumnIndex, Bool).

parse_input(move_worker(Board, Row, Column, NewRow, NewColumn), Response):-
	RowIndex is Row -1,
	ColumnIndex is Column -1,
	NewRowIndex is NewRow -1,
	NewColumnIndex is NewColumn -1,
	checkMove(Board, empty, TempBoard, red, ColumnIndex, RowIndex, _),
	checkMove(TempBoard, red, NewBoardTemp, empty, NewColumnIndex, NewRowIndex, Error),
	boardToNumbers(NewBoardTemp, NewBoard),
	((list_empty(NewBoard), Response = Error);
	(Response = NewBoard)), !.

parse_input(add_worker_bot(Board), [WorkerRow, WorkerColumn]):-
	sleep(1),
 	generateWorkerMove(Board, WorkerRowIndex, WorkerColumnIndex),
	WorkerRow is WorkerRowIndex + 1,
	WorkerColumn is WorkerColumnIndex + 1.

      
parse_input(add_player_bot(Board), [Row, Column]):-
	sleep(1),
	generatePlayerMove(Board, RowIndex, ColumnIndex),
	Row is RowIndex + 1,
	Column is ColumnIndex + 1.

parse_input(get_worker_bot(Board), [WorkerRow, WorkerColumn]):-
	chooseWorker(Board, WorkerRowIndex, WorkerColumnIndex),
	WorkerRow is WorkerRowIndex + 1,
	WorkerColumn is WorkerColumnIndex + 1.


test(_,[],N) :- N =< 0.
test(A,[A|Bs],N) :- N1 is N-1, test(A,Bs,N1).

