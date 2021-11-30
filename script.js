var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var fruitX = 10;
var fruitY = 10;

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawFruit();
	drawSnake();
}

function drawFruit() {
	ctx.beginPath();
	ctx.arc(fruitX, fruitY, 10, 0, Math.PI * 2);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function drawSnake() {
	
}

setInterval(draw, 16.6667);