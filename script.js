var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// sizes for various objects in the game
var tileLength = 16;
var fruitRadius = 10; // should be less than tileLength
var canvasLength = 50; // is in tiles

// the fruit's x and y position in the tile system
var fruitX = 5;
var fruitY = 3;

// store the snake as an array of positions, the direction it is moving, its length, and if it is growing
var snake = new Array();
var snakeDirection = "Right";
var snakeLength = 4;
var snakeGrowing = false;

var tiles;

document.addEventListener("keydown", keyDownHandler, false);

function initializeGame() {
	// create the 2d array of the game space
	tiles = new Array(canvasLength);
	for (let i = 0; i < canvasLength; i++) {
		tiles[i] = new Array(canvasLength);
	}

	// set default values for the snake
	snakeDirection = "Right";
	snakeLength = 4;
	snakeGrowing = false;

	snake = new Array(4);
	snake[0] = [10, 10];
	snake[1] = [9, 10];
	snake[2] = [8, 10];
	snake[3] = [7, 10];

	setInterval(draw, 10);
	setInterval(updateSnake, 50);
}

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

	for (let i = 0; i < snake.length; i++) {
		ctx.rect(snake[i][0] * tileLength, snake[i][1] * tileLength, tileLength, tileLength);
	}

	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function updateSnake() {
	switch (snakeDirection) {
		case "Up":
			snake.unshift([snake[0][0], snake[0][1] - 1);
			break;
		case "Down":
			snake.unshift([snake[0][0], snake[0][1] + 1);
			break;
		case "Left":
			snake.unshift([snake[0][0] - 1, snake[0][1]);
			break;
		case "Right":
			snake.unshift([snake[0][0] + 1, snake[0][1]);
			break;
	}

	if (!snakeGrowing)
		snake.pop();
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

initializeGame();