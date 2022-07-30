const SVG = 'test-svg';
// const RIGHTGROUP = 'rightGroup'
// const LEFTGROUP = 'leftGroup'
// const TOPGROUP = 'topGroup'

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


window.onload = function () {
    const svg = document.getElementById(SVG);

    // var mainGroups = [];
    // var rightGroup = (document.getElementById(RIGHTGROUP));
    // mainGroups.push(rightGroup);
    // var leftGroup = (document.getElementById(LEFTGROUP));
    // mainGroups.push(leftGroup);
    // var topGroup = (document.getElementById(TOPGROUP));
    // mainGroups.push(topGroup);

    var triangles = []
    var t
    var lines = []
    Array.prototype.forEach.call(svg.children, mainGroup => {
        Array.prototype.forEach.call(mainGroup.children, side => {
            t = side;
            Array.prototype.forEach.call(side.children, line => {
                console.log(line);
                lines.push(line);
            });
        });
    });


    console.log('t', t);
    var t_attr = t.getBoundingClientRect();
    console.log('t_attr', t_attr);
    var t_x = t_attr.x;
    var t_y = t_attr.y;
    console.log(t_x, t_y);

    console.log()
    var points = []
    for (let i = 0; i < lines.length; i++) {
        const el = lines[i];
        var pt = [] // [x, y]
        var DOM_rect = el.getBoundingClientRect();
        pt.push(DOM_rect.x);
        pt.push(DOM_rect.y);
        points.push(pt);
    }

    console.log(points)
    let A = points[0];
    let B = points[1];
    let C = points[2];
    // let x1 = A[0];
    // let y1 = A[1];
    // let x2 = B[0];
    // let y2 = B[1];
    // let x3 = C[0];
    // let y3 = C[1];

    // let Centroid_x = (x1 + x2 + x3) / 3;
    // let Centroid_y = (y1 + y2 + y3) / 3;

    // console.log('Centroid: ', Centroid_x, ', ', Centroid_y);

    // for (let i = 0; i < triangles.length; i++) {
    //     const t = triangles[i];
    //     console.log(t);
    // }

    // Array.prototype.forEach.call(rightGroup.children, child => {
    //     console.log(child);
    //   });

    // svg.onmouseover

    // svg.onclick = () => {
    //     const colors = ['red', 'green', 'blue', 'orange', 'pink', 'purple'];
    //     const rando = () => colors[Math.floor(Math.random() * colors.length)];
    //     document.documentElement.style.cssText = `
    //         --dark-color: ${rando()};
    //         --light-color: ${rando()};
    //     `
    // }
}