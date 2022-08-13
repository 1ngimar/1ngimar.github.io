function dot(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
}

dot.prototype.show = function() {
    stroke(10, 25, 100);
    strokeWeight(this.r);
    point(this.x, this.y);
}