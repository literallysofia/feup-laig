/**
 * BezierAnimation
 * @constructor
 */
function BezierAnimation(id, speed, cpoints) {
  Animation.call();

  this.id = id;
  this.speed = speed;
  this.cpoints = cpoints;

  this.setPoints();
  this.setDistance();
  this.totalTime = this.distance / this.speed; //tempo total da animação.
  this.angle = 0;
}

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor = BezierAnimation;

/*
 * função que retorna a matriz do objeto, fundamental para a animação.
 */
BezierAnimation.prototype.getMatrix = function(time) {
  var newX, newY, newZ; //nova posição do objeto
  var percentage = time / this.totalTime; //percentagem de movimento.

  //calculo das novas coordenadas
  newX =
    Math.pow(1 - percentage, 3) * this.p1x +
    3 * percentage * Math.pow(1 - percentage, 2) * this.p2x +
    3 * Math.pow(percentage, 2) * (1 - percentage) * this.p3x +
    Math.pow(percentage, 3) * this.p4x;

  newY =
    Math.pow(1 - percentage, 3) * this.p1y +
    3 * percentage * Math.pow(1 - percentage, 2) * this.p2y +
    3 * Math.pow(percentage, 2) * (1 - percentage) * this.p3y +
    Math.pow(percentage, 3) * this.p4y;

  newZ =
    Math.pow(1 - percentage, 3) * this.p1z +
    3 * percentage * Math.pow(1 - percentage, 2) * this.p2z +
    3 * Math.pow(percentage, 2) * (1 - percentage) * this.p3z +
    Math.pow(percentage, 3) * this.p4z;

  var a, b, c;
  a = Math.abs(this.x - newX);
  b = this.y - newY;
  c = this.z - newZ;

  //calculo do ângulo
  this.angle = Math.atan2(newZ - this.z, newX - this.x);

  this.x = newX;
  this.y = newY;
  this.z = newZ;

  var matrix = mat4.create();
  mat4.identity(matrix);

  mat4.translate(matrix, matrix, [this.x, this.y, this.z]);
  //mat4.rotate(matrix, matrix, Math.PI / 2 - this.angle, [0, 1, 0]);

  return matrix;
};

/*
 * funcão que retorna o tempo total da animação.
 */
BezierAnimation.prototype.getDuration = function() {
  return this.totalTime;
};

/*
 * obtém os pontos da curva de bezier e inicializa o ponto inicial do objeto.
 */
BezierAnimation.prototype.setPoints = function() {
  this.p1x = this.cpoints[0][0];
  this.p1y = this.cpoints[0][1];
  this.p1z = this.cpoints[0][2];

  this.p2x = this.cpoints[1][0];
  this.p2y = this.cpoints[1][1];
  this.p2z = this.cpoints[1][2];

  this.p3x = this.cpoints[2][0];
  this.p3y = this.cpoints[2][1];
  this.p3z = this.cpoints[2][2];

  this.p4x = this.cpoints[3][0];
  this.p4y = this.cpoints[3][1];
  this.p4z = this.cpoints[3][2];

  this.x = this.p1x;
  this.y = this.p1y;
  this.z = this.p1z;
};

/*
 * funcão dá set à ultima posicao
 */
BezierAnimation.prototype.lastPosition = function() {
  var matrix = mat4.create();
  mat4.identity(matrix);
  mat4.translate(matrix, matrix, [this.p4x, this.p4y, this.p4z]);
  return matrix;
};

/*
 * funcão que limpa e inicializa todas as variáveis da animação, assim que esta acaba.
 */
BezierAnimation.prototype.reset = function() {
  this.setPoints();
  this.angle = 0;
};

/*
 * funcão que obtém a distância total da curva de bezier.
 */
BezierAnimation.prototype.setDistance = function() {
  var l1 = vec3.fromValues(this.p1x, this.p1y, this.p1z);

  var auxp2 = vec3.fromValues(this.p2x, this.p2y, this.p2z);

  var auxp3 = vec3.fromValues(this.p3x, this.p3y, this.p3z);

  var r4 = vec3.fromValues(this.p4x, this.p4y, this.p4z);

  var divide_aux = vec3.fromValues(2, 2, 2);

  var l2 = vec3.create();
  vec3.add(l2, l1, auxp2);
  vec3.divide(l2, l2, divide_aux);

  var h = vec3.create();
  vec3.add(h, auxp2, auxp3);
  vec3.divide(h, h, divide_aux);

  var l3 = vec3.create();
  vec3.add(l3, l2, h);
  vec3.divide(l3, l3, divide_aux);

  var r3 = vec3.create();
  vec3.add(r3, auxp3, r4);
  vec3.divide(r3, r3, divide_aux);

  var r2 = vec3.create();
  vec3.add(r2, h, r3);
  vec3.divide(r2, r2, divide_aux);

  this.distance =
    vec3.distance(l1, l2) +
    vec3.distance(l2, l3) +
    vec3.distance(l3, r2) +
    vec3.distance(r2, r3) +
    vec3.distance(r3, r4);
};
