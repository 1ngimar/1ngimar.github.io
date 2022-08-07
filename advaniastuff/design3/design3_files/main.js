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
    var vehicles = []

    Array.prototype.forEach.call(svg.children, mainGroup => {
        Array.prototype.forEach.call(mainGroup.children, side => {
            Array.prototype.forEach.call(side.children, triangle => {
                let attr = triangle.getBoundingClientRect();
                let top = attr.top;
                let right = attr.right;
                let bottom = attr.bottom;
                let left = attr.left;
                let centroid = calcCentroid(top, right, bottom, left);
                // console.log(centroid[0], centroid[1]);
                var vehicle = new Vehicle(centroid[0], centroid[1]);
                triangles.push(triangle);
            });
        });
    });


    // calculating the whole distance of all the paths because why not
    var paths = document.getElementsByClassName('path');
    let paths_length = 0;
    for (let i = 0; i < paths.length; i++) {
        paths_length += paths[i].getTotalLength();
    }
    svg.dataset.len = paths_length;


    const getRandomNumber = (num) => {
        return Math.floor(Math.random() * (num + 1));
    };

    // const container = document.getElementById('grab-me');
    // const singleTriangle = document.getElementById('right-right')

    // const animateMove = (element, prop, pixels) =>
    //     anime({
    //         targets: element,
    //         [prop]: `${pixels}px`,
    //         easing: "easeOutCirc"
    //     });
    // ["mouseover", "click"].forEach(function (ev) {
    //     container.addEventListener(ev, function (event) {
    //         console.log('ev', ev)
    //         console.log('event', event)
    //         console.log('this', this)
    //         let attr = this.getBoundingClientRect();
    //         let h = attr.height;
    //         let w = attr.width;
    //         const top = getRandomNumber(window.innerHeight - h);
    //         const left = getRandomNumber(window.innerWidth - w);
    //         console.log(top, left)
    //         animateMove(this, "left", left).play();
    //         animateMove(this, "top", top).play();
    //     });
    // });

    

}