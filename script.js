var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// sizes for various objects in the game
var tileLength = 16;
var fruitRadius = 10; // should be less than tileLength
var canvasLength = 50; // is in tiles

// the fruit's x and y position in the tile system
var fruitX = 5;
var fruitY = 3;

var snakeHeadX = 10;
var snakeHeadY = 10;
var snakeDirection = "Right";
var snakeGrowing = false;

document.addEventListener("keydown", keyDownHandler, false);

function spawnFruit() {
	// get the set of all empty tiles

	// spawn the fruit on a randomly selected tile in the set
	fruitX = Math.floor(Math.random() * canvasLength);
	fruitY = Math.floor(Math.random() * canvasLength);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawFruit();
	drawSnake();

	updateSnake();
}

function drawFruit() {
	ctx.beginPath();
	ctx.arc((fruitX * tileLength) + (tileLength / 2), (fruitY * tileLength) + (tileLength / 2), fruitRadius, 0, Math.PI * 2);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function drawSnake() {
	ctx.beginPath();
	ctx.rect(snakeHeadX * tileLength, snakeHeadY * tileLength, tileLength, tileLength);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function updateSnake() {
	switch (snakeDirection) {
		case "Up":
			snakeHeadY--;
			break;
		case "Down":
			snakeHeadY++;
			break;
		case "Left":
			snakeHeadX--;
			break;
		case "Right":
			snakeHeadX++;
			break;
	}

	// if the snake did not just eat a fruit, remove the oldest tile from the snake, the tail
	if (!snakeGrowing) {

	}
	
}

function resizeCanvas() {
	canvas.width = tileLength * canvasLength;
	canvas.height = tileLength * canvasLength;
}

resizeCanvas();

spawnFruit();

function keyDownHandler(e) {
	if (e.key == "Up" || e.key == "ArrowUp") {
		snakeDirection = "Up";
	} else if (e.key == "Down" || e.key == "ArrowDown") {
		snakeDirection = "Down";
	} else if (e.key == "Left" || e.key == "ArrowLeft") {
		snakeDirection = "Left";
	} else if (e.key == "Right" || e.key == "ArrowRight") {
		snakeDirection = "Right";
	}
}

setInterval(draw, 16.6667);