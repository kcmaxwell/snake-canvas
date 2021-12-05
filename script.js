var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// sizes for various objects in the game
var tileLength = 40;
var fruitRadius = 10; // should be less than tileLength
var canvasLength = 30; // is in tiles
var snakeSpacing = 10; // space left undrawn on a tile to the side of the snake

// the fruit's x and y position in the tile system
var fruitX = 5;
var fruitY = 3;

// store the snake as an array of positions, the direction it is moving, its length, and if it is growing
var snake = new Array();
var snakeDirection = "Right";
var headDirection = snakeDirection;
var tailDirection = snakeDirection;
var snakeLength = 4;
var snakeGrowing = 0;

var snakeChangingDirection = false;

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

	updateSnake();

	setInterval(draw, 10);
	setInterval(updateSnake, 1000);
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

	let lastDirection;
	for (let i = 0; i < snake.length; i++) {
		// if it is the head or tail, use the head or tail direction
		let direction;
		if (i == 0) {
			direction = headDirection;
		} else if (i == snake.length - 1) {
			direction = tailDirection;
		} else {
			direction = getDirection(snake[i], snake[i+1]);
		}

		// if direction is the same, draw 1 rect, if not, draw 2 rects
		if (direction == lastDirection) {
			if (direction == "Up" || direction == "Down") {
				ctx.rect((snake[i][0] * tileLength) + snakeSpacing, (snake[i][1] * tileLength), tileLength - (snakeSpacing * 2), tileLength);
			} else {
				ctx.rect((snake[i][0] * tileLength), (snake[i][1] * tileLength) + snakeSpacing, tileLength, tileLength - (snakeSpacing * 2));
			}
		} else {
			if (direction == "Up" || lastDirection == "Down") {
				ctx.rect((snake[i][0] * tileLength) + snakeSpacing, (snake[i][1] * tileLength), tileLength - (snakeSpacing * 2), tileLength - snakeSpacing);
			}
			if (direction == "Down" || lastDirection == "Up") {
				ctx.rect((snake[i][0] * tileLength) + snakeSpacing, (snake[i][1] * tileLength) + snakeSpacing, tileLength - (snakeSpacing * 2), tileLength - snakeSpacing);
			}
			if (direction == "Left" || lastDirection == "Right") {
				ctx.rect((snake[i][0] * tileLength), (snake[i][1] * tileLength) + snakeSpacing, tileLength - snakeSpacing, tileLength - (snakeSpacing * 2));
			}
			if (direction == "Right" || lastDirection == "Left") {
				ctx.rect((snake[i][0] * tileLength) + snakeSpacing, (snake[i][1] * tileLength) + snakeSpacing, tileLength - snakeSpacing, tileLength - (snakeSpacing * 2));
			}
		}

		lastDirection = direction;
	}

	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function getDirection(curr, next) {
	if (curr[1] > next[1]) {
		return "Up";
	} else if (curr[1] < next[1]) {
		return "Down";
	} else if (curr[0] > next[0]) {
		return "Left";
	} else {
		return "Right";
	}
}

function updateSnake() {
	switch (snakeDirection) {
		case "Up":
			snake.unshift([snake[0][0], snake[0][1] - 1]);
			break;
		case "Down":
			snake.unshift([snake[0][0], snake[0][1] + 1]);
			break;
		case "Left":
			snake.unshift([snake[0][0] - 1, snake[0][1]]);
			break;
		case "Right":
			snake.unshift([snake[0][0] + 1, snake[0][1]]);
			break;
	}

	snakeChangingDirection = false;

	// update the tail direction
	tailDirection = getDirection(snake[snake.length - 2], snake[snake.length - 1]);

	// update head direction
	headDirection = getDirection(snake[0], snake[1]);

	if (snakeGrowing == 0) {
		snake.pop();
	}
	else
		snakeGrowing--;

	// if the snake head is on the same tile as the fruit, eat it, spawn a new one, and make the snake grow
	if (snake[0][0] == fruitX && snake[0][1] == fruitY) {
		snakeGrowing = 2;
		spawnFruit();
	}
}

function resizeCanvas() {
	canvas.width = tileLength * canvasLength;
	canvas.height = tileLength * canvasLength;
}

function keyDownHandler(e) {
	// if the snake has changed direction, do not let the player input until the snake has moved at least 1 space
	if (snakeChangingDirection)
		return;

	// make sure the snake does not turn backwards, only left or right
	if ((e.key == "Up" || e.key == "ArrowUp") && snakeDirection != "Down" && snakeDirection != "Up") {
		snakeDirection = "Up";
		snakeChangingDirection = true;
	} else if ((e.key == "Down" || e.key == "ArrowDown") && snakeDirection != "Up" && snakeDirection != "Down") {
		snakeDirection = "Down";
		snakeChangingDirection = true;
	} else if ((e.key == "Left" || e.key == "ArrowLeft") && snakeDirection != "Right" && snakeDirection != "Left") {
		snakeDirection = "Left";
		snakeChangingDirection = true;
	} else if ((e.key == "Right" || e.key == "ArrowRight") && snakeDirection != "Left" && snakeDirection != "Right") {
		snakeDirection = "Right";
		snakeChangingDirection = true;
	}
}

resizeCanvas();
spawnFruit();
initializeGame();