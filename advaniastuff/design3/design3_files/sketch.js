
const h = 74;
const w = 256;

const tb1 = [300, 120]

var ww = window.innerWidth;
var wh = window.innerHeight;

var box1 = [];
var box2 = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	angleMode(DEGREES);
	current = createVector(0, 0);
	previous = createVector(0, 0);

	let t01 = new Vehicle(0, 0, 'top-up', tb1);
	box1.push(t01);
	let t02 = new Vehicle(0, 0, 'top-down', tb1);
	box1.push(t02);
	let t03 = new Vehicle(0, 0, 'left-up', tb1);
	box1.push(t03);
	let t04 = new Vehicle(0, 0, 'left-down', tb1);
	box1.push(t04);
	let t05 = new Vehicle(0, 0, 'right-up', tb1);
	box1.push(t05);
	let t06 = new Vehicle(0, 0, 'right-down', tb1);
	box1.push(t06);
	
	// let t11 = new Vehicle(0, 0, 'top-up');
	// box2.push(t11);
	// let t12 = new Vehicle(0, 0, 'top-down');
	// box2.push(t12);
	// let t13 = new Vehicle(0, 0, 'left-up');
	// box2.push(t13);
	// let t14 = new Vehicle(0, 0, 'left-down');
	// box2.push(t14);
	// let t15 = new Vehicle(0, 0, 'right-up');
	// box2.push(t15);
	// let t16 = new Vehicle(0, 0, 'right-down');
	// box2.push(t16);

};

function draw() {

	background(200);

	translate(300, 120);
	for (var i = 0; i < box1.length; i++) {
		var t = box1[i];
		t.behaviors();
		t.update();
		t.show();
	}

	// translate(-w/2, h*3);
	// for (var i = 0; i < box2.length; i++) {
	// 	var t = box2[i];
	// 	t.behaviors();
	// 	t.update();
	// 	t.show();
	// }
}





