var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// sizes for various objects in the game
var tileLength = 16;
var fruitRadius = 10; // should be less than tileLength
var canvasLength = 50; // is in tiles

// the fruit's x and y position in the tile system
var fruitX = 5;
var fruitY = 3;

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
	
}

function resizeCanvas() {
	canvas.width = tileLength * canvasLength;
	canvas.height = tileLength * canvasLength;
}

resizeCanvas();

spawnFruit();

setInterval(draw, 16.6667);