# feup-laig
Projects for the Graphical Applications Laboratory (LAIG) class of the Master in Informatics and Computer Engineering (MIEIC) at the Faculty of Engineering of the University of Porto (FEUP).

- [First and Second Project](#first-and-second-project)
- [Third Project](#third-project)
- [Build](#build)

Made in colaboration with [Julieta Frade](https://github.com/julietafrade97).<br>
**Completed in 30/12/2017**

## First and Second Project
Development of a graphics engine in WebGL and improvement of WebGL utilization techniques. This scene was inspired in **The Wall of Game of Thrones**.

<img src="https://github.com/literallysofia/feup-laig/blob/master/Images/image1.png" width="800"><br><br>
<img src="https://github.com/literallysofia/feup-laig/blob/master/Images/image2.png" width="800"><br>

## Third Project
3D environment developed in WebGL to represent the game states of a [Prolog](https://en.wikipedia.org/wiki/Prolog) board game, Fabrik, and make use of a game [interface](http://workshop.chromeexperiments.com/examples/gui). See more about this game on my [feup-plog repository](https://github.com/literallysofia/feup-plog) or [here](https://boardgamegeek.com/boardgame/233447/fabrik).

![](https://github.com/literallysofia/feup-laig/blob/master/Images/gif1.gif)

![](https://github.com/literallysofia/feup-laig/blob/master/Images/gif2.gif)

Features:
- [X] Illumination.
- [x] Two different game scenarios.
- [x] Modeling and movement of game pieces.
- [x] Game mode: Player vs Player, Player vs Bot, Bot vs Bot
- [x] Game level: easy, hard.
- [x] Two different views: scene and player's point of view, which includes a camera animation.
- [x] Game menu: start, undo and quit.
- [X] Score.
- [X] Timer.
- [X] Movie: see the last game played (replay).
- [X] Guide.

## Build
Inside the project folder open terminal and insert:
```
python3 -m http.server 8080
```
Then go to http://localhost:8080/
