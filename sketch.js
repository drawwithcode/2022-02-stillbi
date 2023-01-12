var maxCount = 5000; // max count of the cirlces
var currentCount = 1;
var x = [];
var y = [];
var r = [];
let myPersonalBalls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(0.5);

  // first circle
  x[0] = width / 2;
  y[0] = height / 2;
  r[0] = 10;
  for (let i = 0; i < 1; i++) {
    addBall();
  }
}

function draw() {
  clear();

  // create a random set of parameters
  var newR = random(1, 7);
  var newX = random(newR, width - newR);
  var newY = random(newR, height - newR);

  var closestDist = Number.MAX_VALUE;
  var closestIndex = 0;

  for (var i = 0; i < currentCount; i++) {
    var newDist = dist(newX, newY, x[i], y[i]);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }

    for (let i = 0; i < myPersonalBalls.length; i++) {
      //the variable permits to add a ball
      myPersonalBalls[i].run();
    }
  }

  // aline it to the closest circle outline
  var angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);
  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);
  r[currentCount] = newR;
  currentCount++;

  // draw them
  for (var i = 0; i < currentCount; i++) {
    fill(50);
    ellipse(x[i], y[i], r[i] * 2, r[i] * 2);
  }

  if (currentCount >= maxCount) noLoop();
}

function mouseClicked() {
  //I define that when the mouse clicks, the function of adding a ball is triggered
  addBall();
}

function addBall() {
  //I define the function of adding a ball and define its parameters
  const r = "black";
  const BallColor = color(r);
  const aNewBall = new Ball( //every time I go to create a ball I define that.
    random(windowWidth), //is going to be placed at a random x within the canvas
    random(windowHeight), //and in a random y within the canvas
    random(3, 40),
    BallColor
  );
  myPersonalBalls.push(aNewBall); //I then add a new ball to the group of balls defined by the class Ball
}

class Ball {
  constructor(temp_x, temp_y, temp_r, temp_color) {
    this.x = temp_x;
    this.y = temp_y;
    this.r = temp_r;
    this.color = temp_color;
  }

  display() {
    push();
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r);
    pop();
  }

  updatePosition() {
    //the position varies randomly on both the x-axis and y-axis by oscillating between two parameters
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  run() {
    //each time you go to create the ball you update the position you update the aesthetics of the ball
    this.updatePosition();
    this.display();
  }
}
