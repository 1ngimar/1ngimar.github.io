
const h = 37; // 74
const w = 128; //256
const halfW = w / 2;

// const tb1 = [300, 120]

var ww = window.innerWidth;
var wh = window.innerHeight;

var triangles = [];
var box2 = [];

var dots = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	angleMode(DEGREES);

	// box1
	triangles.push(new Vehicle(halfW * 3, h, 'top-up'));
	triangles.push(new Vehicle(halfW * 3, h, 'top-down'));
	triangles.push(new Vehicle(halfW * 3, h, 'left-up'));
	triangles.push(new Vehicle(halfW * 3, h, 'left-down'));
	triangles.push(new Vehicle(halfW * 3, h, 'right-up'));
	triangles.push(new Vehicle(halfW * 3, h, 'right-down'));

	// box2
	triangles.push(new Vehicle(halfW*2, h * 4, 'top-up'));
	triangles.push(new Vehicle(halfW*2, h * 4, 'top-down'));
	triangles.push(new Vehicle(halfW*2, h * 4, 'left-up'));
	triangles.push(new Vehicle(halfW*2, h * 4, 'left-down'));
	triangles.push(new Vehicle(halfW*2, h * 4, 'right-up'));
	triangles.push(new Vehicle(halfW*2, h * 4, 'right-down'));

	// box3
	triangles.push(new Vehicle(halfW * 3, h * 7, 'top-up'));
	triangles.push(new Vehicle(halfW * 3, h * 7, 'top-down'));
	triangles.push(new Vehicle(halfW * 3, h * 7, 'left-up'));
	triangles.push(new Vehicle(halfW * 3, h * 7, 'left-down'));
	triangles.push(new Vehicle(halfW * 3, h * 7, 'right-up'));
	triangles.push(new Vehicle(halfW * 3, h * 7, 'right-down'));

	// extras on bottom left
	triangles.push(new Vehicle(0, h * 4, 'right-up'));
	triangles.push(new Vehicle(0, h * 4, 'right-down'));

	triangles.push(new Vehicle(halfW, h * 7, 'top-up'));
	triangles.push(new Vehicle(halfW, h * 7, 'top-down'));

	triangles.push(new Vehicle(halfW, h * 7, 'right-up'));
	triangles.push(new Vehicle(halfW, h * 7, 'right-down'));

	triangles.push(new Vehicle(halfW*2, h * 10, 'top-up'));
	triangles.push(new Vehicle(halfW*2, h * 10, 'top-down'));

	// for the grid of dots
	// for (let i = 0; i < wh; i += h) {
	// 	for (let j = 0; j < (ww * 2); j += w / 2) {
	// 		dots.push(new dot(j, i, 3))
	// 	}
	// }
};

function draw() {
	background(200);
	translate(w / 2, h);

	for (var i = 0; i < triangles.length; i++) {
		var t = triangles[i];
		t.behaviors();
		t.update();
		t.show();
	}

	// for the grid of dots
	// for (let i = 0; i < dots.length; i++) {
	// 	var dot = dots[i];
	// 	dot.show();
	// }
}





