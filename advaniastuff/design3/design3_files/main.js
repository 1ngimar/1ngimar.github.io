// const anime = require('animejs');
// import anime from 'animejs';

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

function calcCentroid(t, r, b, l) {
    let c_x = (r - l) / 2 + l;
    let c_y = (b - t) / 2 + t;
    return [c_x, c_y];
}

window.onload = function () {
    // const anime = require('anime');

    const svg = document.getElementById(SVG);

    var triangles = []
    let triangles_with_centroid = []

    // Array.prototype.forEach.call(svg.children, mainGroup => {
    //     Array.prototype.forEach.call(mainGroup.children, side => {
    //         Array.prototype.forEach.call(side.children, triangle => {
    //             let attr = triangle.getBoundingClientRect();
    //             let top = attr.top;
    //             let right = attr.right;
    //             let bottom = attr.bottom;
    //             let left = attr.left;
    //             triangles_with_centroid.push(triangle, calcCentroid(top, right, bottom, left));
    //             triangles.push(triangle);
    //         });
    //     });
    // });

    let animation = anime({
        targets: 'div',
        translateX: 100,
        borderRadius: 50,
        duration: 2000,
        easing: 'linear',
        direction: 'alternate'
      });
    // console.log(triangles)

    // var unique = require('uniq');

    // var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];

    // console.log(unique(data));
}