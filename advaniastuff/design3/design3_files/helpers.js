const getRandomNumber = (num) => {
	return Math.floor(Math.random() * (num + 1));
};

function uniq(a) {
	var seen = {};
	return a.filter(function (item) {
		return seen.hasOwnProperty(item) ? false : (seen[item] = true);
	});
}


function calcCentroid(lines) {
	let points = []
	for (let i = 0; i < lines.length; i++) {
		let [x1, y1, x2, y2] = lines[i];
		points.push([x1, y1]);
		points.push([x2, y2]);
	}
	let finalPoints = uniq(points);
	let xAll = []
	let yAll = []
	for (let i = 0; i < finalPoints.length; i++) {
		let [x, y] = finalPoints[i];
		xAll.push(x);
		yAll.push(y);
	}
	let [x1, x2, x3] = xAll;
	let [y1, y2, y3] = yAll;
	let c_x = (x1 + x2 + x3) / 3;
	let c_y = (y1 + y2 + y3) / 3
	return [c_x, c_y];
}