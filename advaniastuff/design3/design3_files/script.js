const SVG = 'advania-logo-1';
const RIGHTGROUP = 'rightGroup'
const LEFTGROUP = 'leftGroup'
const TOPGROUP = 'topGroup'

class Triangle {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.className = '';
        this.color = 'transparent';
        this.stroke = '';
    }
}

// EXAMPLE ATTRIBUTES OF ONE LINE 
// bottom: 458.5
// height: 64.87600708007812
// left: 305
// right: 417.4330139160156
// top: 393.6239929199219
// width: 112.43301391601562
// x: 305
// y: 393.6239929199219

function calcCentroid(t, r, b, l) {
    let c_x = (r-l)/2 + l;
    let c_y = (b-t)/2 + t;
    return [c_x, c_y];
}

window.onload = function () {
    const svg = document.getElementById(SVG);

    var triangles = []
    let triangles_with_centroid = []

    Array.prototype.forEach.call(svg.children, mainGroup => {
        Array.prototype.forEach.call(mainGroup.children, side => {
            Array.prototype.forEach.call(side.children, triangle => {
                var attr = triangle.getBoundingClientRect();
                let top = attr.top;
                let right = attr.right;
                let bottom = attr.bottom;
                let left = attr.left;
                triangles_with_centroid.push(triangle, calcCentroid(top, right, bottom, left));
                triangles.push(triangle);
            });
        });
    });

    console.log("FINALLY")
    console.log(triangles_with_centroid);

    // for (let i = 0; i < triangles.length; i++) {
    //     const t = triangles[i];


    // }


    // svg.onclick = () => {
    //     const colors = ['red', 'green', 'blue', 'orange', 'pink', 'purple'];
    //     const rando = () => colors[Math.floor(Math.random() * colors.length)];
    //     document.documentElement.style.cssText = `
    //         --dark-color: ${rando()};
    //         --light-color: ${rando()};
    //     `
    // }
}