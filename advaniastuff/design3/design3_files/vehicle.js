function Vehicle(x, y, type) {
	// this.pos = createVector(random(width), random(height)); // setting initial pos to a random pos
	this.x = x;
	this.y = y;
	// this.pos = createVector(x + tr[0], y + tr[1])
	// this.pos = createVector(x, y)
	let mw = w;
	let mh = h;
	this.type = type;

	switch (type) {
		case 'top-up':
			this.lines = [
				[x, y, x+mw, y],
				[x, y, x + mw / 2, y-mh],
				[x+mw, y, x+mw / 2, y-mh]];
			break;
		case 'top-down':
			this.lines = [
				[x, y, x+mw, y],
				[x, y, x + mw / 2, y+mh],
				[x+mw, y, x+mw / 2, y+mh]];
			break;
		case 'left-up':
			this.lines = [
				[x, y, x+mw / 2, y+mh],
				[x+mw / 2, y+mh, x+mw / 2, y+mh * 3],
				[x+mw / 2, y+mh * 3, x, y]];
			break;
		case 'left-down':
			this.lines = [
				[x+mw / 2, y+mh * 3, x, y],
				[x, y, x, y+mh * 2],
				[x, y+mh * 2, x+mw / 2, y+mh * 3]];
			break;
		case 'right-up':
			this.lines = [
				[x+mw / 2, y+mh * 3, x+mw / 2, y+mh],
				[x+mw / 2, y+mh * 3, x+mw, y],
				[x+mw / 2, y+mh, x+mw, y]];
			break;
		case 'right-down':
			this.lines = [
				[x+mw, y, x+mw, y+mh * 2],
				[x+mw / 2, y+mh * 3, x+mw, y],
				[x+mw / 2, y+mh * 3, x+mw, y+mh * 2]];
			break;
		default:
			break;
	}

	let [cx, cy] = calcCentroid(this.lines);
	this.centerPos = createVector(cx, cy);
	console.log(cx, cy)

	for (let i = 0; i < this.lines.length; i++) {
		let [x1, y1, x2, y2] = this.lines[i];
		this.lines[i] = [x1 - cx, y1 - cy, x2 - cx, y2 - cy]
	}

	// this.pos = createVector(this.centerPos.x, this.centerPos.y)

	this.target = createVector(this.centerPos.x, this.centerPos.y);
	this.vel = p5.Vector.random2D();
	this.acc = createVector();
	this.maxspeed = 15;
	this.maxforce = 1;
}

Vehicle.prototype.behaviors = function () {
	var arrive = this.arrive(this.target);
	var mouse = createVector(mouseX -w/2, mouseY - h);
	var flee = this.flee(mouse);

	arrive.mult(1);
	flee.mult(5);

	this.applyForce(arrive);
	this.applyForce(flee);
};

Vehicle.prototype.applyForce = function (f) {
	this.acc.add(f);
};

Vehicle.prototype.arrive = function (target) {
	var desired = p5.Vector.sub(target, this.centerPos);
	var d = desired.mag();
	var speed = this.maxspeed;
	if (d < 50) {
		speed = map(d, 0, 100, 0, this.maxspeed);
	}
	desired.setMag(speed);
	var steer = p5.Vector.sub(desired, this.vel);
	steer.limit(this.maxforce);
	return steer;
};

Vehicle.prototype.flee = function (target) {
	var desired = p5.Vector.sub(target, this.centerPos);
	var d = desired.mag();
	if (d < 50) {
		desired.setMag(this.maxspeed);
		desired.mult(-1);
		var steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxforce);
		return steer;
	} else {
		return createVector(0, 0);
	}
};

Vehicle.prototype.update = function () {
	// this.pos.add(this.vel);
	this.centerPos.add(this.vel);
	this.vel.add(this.acc);
	this.acc.mult(0);

	// for (let i = 0; i < this.lines.length; i++) {
	// 	var l = this.lines[i];
	// 	l[0] += this.pos.x;
	// 	l[1] += this.pos.y;
	// 	l[2] += this.pos.x;
	// 	l[3] += this.pos.y;
	// 	this.lines[i] = [l[0], l[1], l[2], l[3]];
	// }
}

Vehicle.prototype.show = function () {

	stroke(0);
	strokeWeight(2);
	for (let i = 0; i < this.lines.length; i++) {
		var l = this.lines[i];
		// line(l[0], l[1], l[2], l[3]);
		line(l[0] + this.centerPos.x, l[1] + this.centerPos.y, l[2] + this.centerPos.x, l[3] + this.centerPos.y);
	}
	if (this.centerPos) {
		stroke(255, 0, 0)
		strokeWeight(12)
		// point(this.centerPos.x, this.centerPos.y)

		// stroke(100, 25, 100)
		// strokeWeight(10)
		// point(this.pos.x, this.pos.y)
	} else {
		// console.log("hello")
		// let [cx, cy] = calcCentroid(this.lines);
		// this.centerPos = createVector(cx, cy);
	}
}