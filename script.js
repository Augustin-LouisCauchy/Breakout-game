"use strict";

const set = document.querySelector(".set");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const ballDiameter = 20;
const boardHeight = 300;
let timeId;
let xDirection = 2;
let yDirection = 2;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

//class block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

//all blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

//Draw all blocks
function drawBlock() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    set.appendChild(block);
  }
}

drawBlock();

//add user
const user = document.createElement("div");
user.classList.add("user");
userDraw();
set.appendChild(user);

//Draw user
function userDraw() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//Draw ball
function ballDraw() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

function userMove(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        userDraw();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        userDraw();
      }
      break;
  }
}

document.addEventListener("keydown", userMove);

//create ball
const ball = document.createElement("div");
ball.classList.add("ball");
ballDraw();
set.appendChild(ball);

function ballMove() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  ballDraw();
  collisions();
}

timeId = setInterval(ballMove, 30);

// Check collisions
function collisions () {
  //wall collisions
  if (
    ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
    ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
    ballCurrentPosition[0] <= 0
    ) {
    directionChange();
  }
  // if game over
}

function directionChange() {
  if (xDirection === 2 && yDirection === 2) {
     yDirection = -2;
     return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  } 
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return
  } 
}