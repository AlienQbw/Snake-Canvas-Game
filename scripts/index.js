"use strict";
(function () {
  var gameLost = false;
  var paused = false;
  var score = 0;

  var previousDirection;

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  var timer; //timer for our draw function

  var gameSpeed = 100; //speed of the game

  const cw = 800; //canvas width
  const ch = 800; //canvas height

  canvas.width = cw;
  canvas.height = ch;

  const wx = 20; //size of one grid square in x axis
  const hy = 20; //size of one grid square in y axis

  const headSize = 10; //size of snake's head
  var snakesHead = new SnakesHead(wx / 2, hy / 2, headSize, "#000");
  var tail = new Tail(wx / 2, hy / 2, headSize - headSize / 3, 0, "#9da6a7");

  var food = new Food(wx / 2, hy / 2, headSize - headSize / 3, "#FF0040");

  var initSnakePosition, initFoodPosition;

  var direction = "r";

  function SnakesHead(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }
  function Food(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }
  function Tail(x, y, r, lngth, color) {
    this.x = [x];
    this.y = [y];
    this.r = r;
    this.lngth = lngth;
    this.color = color;
  }

  function drawGrid(x, y, canvasWidth, canvasHeight) {
    let xAxisLength, yAxisLength;
    xAxisLength = canvasWidth / x;
    yAxisLength = canvasHeight / y;
    for (let i = 0; i < xAxisLength; i++) {
      for (let z = 0; z < yAxisLength; z++) {
        ctx.strokeStyle = "#e5e5e5";
        ctx.strokeRect(x * i, y * z, x, y);
      }
    }
  }

  function drawBall(c) {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();
  }

  function init() {
    console.log(`Loading...`);
    window.addEventListener("keydown", function (e) {
      if ([37, 38, 39, 40].indexOf(e.which) > -1) {
        e.preventDefault();
      }
      if (e.which === 80) {
        pauseGame();
      }
      if (e.which === 39) {
        previousDirection === "l" ? (direction = "l") : (direction = "r");
      } else if (e.which === 37) {
        previousDirection === "r" ? (direction = "r") : (direction = "l");
      } else if (e.which === 38) {
        previousDirection === "d" ? (direction = "d") : (direction = "u");
      } else if (e.which === 40) {
        previousDirection === "u" ? (direction = "u") : (direction = "d");
      }
      console.log(direction);
    });

    // initSnakePosition = randomCoordinates();
    initFoodPosition = randomCoordinates();

    // snakesHead.x = initSnakePosition[0];
    // snakesHead.y = initSnakePosition[1];

    food.x = initFoodPosition[0];
    food.y = initFoodPosition[1];

    timer = setInterval(draw, gameSpeed);
    console.log(`Game Ready!`);
  }

  function draw() {
    ctx.clearRect(0, 0, cw, ch);
    drawGrid(wx, hy, cw, ch);

    switch (direction) {
      case "r":
        snakesHead.x += wx;
        previousDirection = "r";
        break;
      case "l":
        snakesHead.x -= wx;
        previousDirection = "l";
        break;
      case "u":
        snakesHead.y -= hy;
        previousDirection = "u";
        break;
      case "d":
        snakesHead.y += hy;
        previousDirection = "d";
        break;
    }

    drawBall(snakesHead);
    tail.x.push(snakesHead.x);
    tail.y.push(snakesHead.y);
    if (tail.x.length > tail.lngth + 1) {
      tail.x.shift();
      tail.y.shift();
    }
    for (let v = 0; v < tail.lngth; v++) {
      let t = {
        x: tail.x[tail.x.length - 2 - v],
        y: tail.y[tail.y.length - 2 - v],
        r: tail.r,
        color: tail.color,
      };
      drawBall(t);
      if (snakesHead.x === t.x && snakesHead.y === t.y) {
        gameLost = true;
      }
    }

    if (snakesHead.x === food.x && snakesHead.y === food.y) {
      food.x = randomCoordinates()[0];
      food.y = randomCoordinates()[1];
      tail.lngth++;
      score++;
    }

    if (snakesHead.x >= cw) {
      gameLost = true;
    } else if (snakesHead.x < 0) {
      gameLost = true;
    }
    if (snakesHead.y >= ch) {
      gameLost = true;
    } else if (snakesHead.y < 0) {
      gameLost = true;
    }

    drawBall(food);
    checkGameStatus();
  }

  function randomCoordinates() {
    let x, y;
    x = Math.floor(Math.random() * (cw / wx)) * wx;
    y = Math.floor(Math.random() * (ch / hy)) * hy;
    x -= wx / 2;
    y -= hy / 2;
    if (x >= cw) {
      x -= wx;
    } else if (x < 0) {
      x += wx;
    }
    if (y >= ch) {
      y -= hy;
    } else if (y < 0) {
      y += hy;
    }
    return [x, y];
  }

  function pauseGame() {
    if (paused === false) {
      clearInterval(timer);
      paused = true;
    } else if (paused === true) {
      timer = setInterval(draw, gameSpeed);
      paused = false;
    }
  }

  function checkGameStatus() {
    if (gameLost === true) {
      clearInterval(timer);
      changeDomElements(score);
    }
    document.querySelector(".score").innerHTML = `Score: ${score}`;
  }
  function changeDomElements(sc) {
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".save_score_form").style.display = "block";
    document.querySelector(
      ".score_label"
    ).innerHTML = `You have lost, your score: ${sc}`;
  }

  init();
})();
var form = addEventListener("submit", function (e) {
  e.preventDefault(e);
  const userName = document.getElementById("user_name");
  const name = userName.value;
  console.log(userName);
  const domScore = document.querySelector(".score").innerHTML;

  const score = domScore.split(" ")[1];

  if (name.length > 0 && score > 0) {
    saveCookie(name, score, e);
  }
});

addEventListener("click", function (e) {
  if (e.target.className === "overlay") {
    hideOverlay();
  }
});

function hideOverlay() {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".save_score_form").style.display = "none";
}

function showLeaderboard() {
  document.querySelector(".overlay").style.display = "block";
}
