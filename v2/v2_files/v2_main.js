/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Búum til bókstafinn H úr þremur teningum
//
//    Hjálmtýr Hafsteinsson, febrúar 2022
/////////////////////////////////////////////////////////////////
var canvas;
var gl;
var program;
var sheepColorBuffer;
var wolfColorBuffer;
var floorColorBuffer;
var sheepVerticesBuffer;
var wolfVerticesBuffer;
var floorVerticesBuffer;

var sheepColors = [
    [0.0, 1.0, 0.0, 1.0],  // 
    [0.0, 1.0, 0.0, 1.0],  // 
    [0.0, 1.0, 0.0, 1.0],  // 
    [0.0, 1.0, 0.0, 1.0],  // green
    [0.0, 1.0, 0.0, 1.0],  // 
    [0.0, 1.0, 0.0, 1.0],  //
    [0.0, 1.0, 0.0, 1.0],  //
    [0.0, 1.0, 0.0, 1.0]   // 
];

var wolfColors = [
    [1.0, 0.0, 0.0, 1.0],  // 
    [1.0, 0.0, 0.0, 1.0],  // 
    [1.0, 0.0, 0.0, 1.0],  // 
    [1.0, 0.0, 0.0, 1.0],  // red
    [1.0, 0.0, 0.0, 1.0],  // 
    [1.0, 0.0, 0.0, 1.0],  //
    [1.0, 0.0, 0.0, 1.0],  //
    [1.0, 0.0, 0.0, 1.0]   // 
];

var floorColors = [
    [0.0, 0.0, 1.0, 1.0],  // 
    [0.0, 0.0, 1.0, 1.0],  // 
    [0.0, 0.0, 1.0, 1.0],  // 
    [0.0, 0.0, 1.0, 1.0],  // blue
    [0.0, 0.0, 1.0, 1.0],  // 
    [0.0, 0.0, 1.0, 1.0],  //
    [0.0, 0.0, 1.0, 1.0],  //
    [0.0, 0.0, 1.0, 1.0]   // 
];

var numVertices = 36; // TODO: sko�a seinna

var points = [];
var colors = [];

var movement = false;     // Do we rotate?
var spinX = 0;
var spinY = 0;
var origX;
var origY;
var grid;
var cols, rows;
var path = [];
var spot;
var n = 10;              // Hyperparameter
var buff = n / (n * 20);
var x_floor_width = n / 10;
var z_floor_length = x_floor_width;
var spacing = x_floor_width / n;

var allSheep = [];
// var firstSheep = vec2(-((n / 40) - buff), ((n / 40) - buff));
// allSheep.push(firstSheep);

var matrixLoc;

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    colorCube();
    // colorSheep();

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    // ------
    cols = Math.floor(x_floor_width / spacing);
    rows = Math.floor(z_floor_length / spacing);
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }
    grid[0][0].hasSheep = true;
    spot = grid[0][0]; // initial spot of one sheep 
    // var firstSheep = vec2(spot.x, spot.y);
    var firstSheep = new Sheep(spot);
    allSheep.push(firstSheep);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    matrixLoc = gl.getUniformLocation(program, "rotation");

    //event listeners for mouse
    canvas.addEventListener("mousedown", function (e) {
        movement = true;
        origX = e.offsetX;
        origY = e.offsetY;
        e.preventDefault();         // Disable drag and drop
    });

    canvas.addEventListener("mouseup", function (e) {
        movement = false;
    });

    canvas.addEventListener("mousemove", function (e) {
        if (movement) {
            spinY = (spinY + (e.offsetX - origX)) % 360;
            spinX = (spinX + (e.offsetY - origY)) % 360;
            origX = e.offsetX;
            origY = e.offsetY;
        }
    });

    render();
}

function colorCube() {
    quad(1, 0, 3, 2);
    quad(2, 3, 7, 6);
    quad(3, 0, 4, 7);
    quad(6, 5, 1, 2);
    quad(4, 5, 6, 7);
    quad(5, 4, 0, 1);
}

function quad(a, b, c, d) {
    var vertices = [
        vec3(-0.5, -0.5, 0.5),
        vec3(-0.5, 0.5, 0.5),
        vec3(0.5, 0.5, 0.5),
        vec3(0.5, -0.5, 0.5),
        vec3(-0.5, -0.5, -0.5),
        vec3(-0.5, 0.5, -0.5),
        vec3(0.5, 0.5, -0.5),
        vec3(0.5, -0.5, -0.5)
    ];

    var vertexColors = [
        [0.0, 0.0, 0.0, 1.0],  // black
        [1.0, 0.0, 0.0, 1.0],  // red
        [1.0, 1.0, 0.0, 1.0],  // yellow
        [0.0, 1.0, 0.0, 1.0],  // green
        [0.0, 0.0, 1.0, 1.0],  // blue
        [1.0, 0.0, 1.0, 1.0],  // magenta
        [0.0, 1.0, 1.0, 1.0],  // cyan
        [1.0, 1.0, 1.0, 1.0]   // white
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices

    //vertex color assigned by the index of the vertex

    var indices = [a, b, c, a, c, d];

    for (var i = 0; i < indices.length; ++i) {
        points.push(vertices[indices[i]]);
        colors.push(vertexColors[a]);
    }
}

function leavingBoard(i, j) {
    if (i < 0 || i >= cols || j < 0 || j >= rows) {
        return true;
    }
    return false;
    // return !grid[i][j].hasWolf;
}

function goToOtherSide(nx, ny) {
    var xy = [0, 0];
    if (nx < 0) {
        xy[0] = n - 1;
    }
    else if (nx >= cols) {
        xy[0] = 1;
    }

    if (ny < 0) {
        xy[1] = n - 1;
    }
    else if (ny >= rows) {
        xy[1] = 1;
    }
    return xy;
}

function moveSheep(s) {
    spot = spot.nextSpot(1);
}

function updateSteps() {
    for (let i = 0; i < allSheep.length; i++) {
        let s = allSheep[i];
        moveSheep(s);
    }
}

var x_floor_halfwidth = x_floor_width / 2;
var z_floor_halflength = z_floor_length / 2;
var halfspacing = spacing / 2;

function render() {

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var mv = mat4();
    mv = mult(mv, rotateX(spinX));
    mv = mult(mv, rotateY(spinY));
    var vColor = gl.getAttribLocation(program, 'vColor');
    var vPosition = gl.getAttribLocation(program, 'vPosition');
    // draw all sheeps
    for (let i = 0; i < allSheep.length; i++) {
        let s = allSheep[i];
        s[0] = spot.x;
        s[1] = spot.y;
        // myColors.push(sheepColors);
        mv1 = mult(mv, translate(-x_floor_halfwidth + halfspacing, 0.0, -z_floor_halflength + halfspacing));
        mv1 = mult(mv1, translate(s[0], -0.44, s[1]));
        mv1 = mult(mv1, scalem(0.1, 0.1, 0.1));
        gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
        // gl.uniformMatrix4fv(matrixLoc, false, flatten(sheepColors));
        gl.uniformMatrix4fv(matrixLoc, false, flatten(mv1));
        gl.drawArrays(gl.TRIANGLES, 0, numVertices);
    }
    

    // draw the floor
    mv1 = mult(mv, translate(0.0, -0.5, 0.0));
    mv1 = mult(mv1, scalem(x_floor_width, 0.02, z_floor_length));
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.uniformMatrix4fv(matrixLoc, false, flatten(mv1));
    gl.drawArrays(gl.TRIANGLES, 0, numVertices);

    // var vColor = gl.getAttribLocation(program, 'verColor');

    // gl.bindBuffer(gl.ARRAY_BUFFER, sheepColorBuffer);
    // gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(vColor);
    // gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(sheepColors));

    // gl.bindBuffer(gl.ARRAY_BUFFER, wolfColorBuffer);
    // gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(vColor);
    // gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(wolfColors));

    // gl.bindBuffer(gl.ARRAY_BUFFER, floorColorBuffer);
    // gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(vColor);
    // gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(floorColors));


    // var vPosition = gl.getAttribLocation(program, 'vPosition');

    // gl.bindBuffer(gl.ARRAY_BUFFER, sheepVerticesBuffer);
    // gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(vPosition);
    // gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));

    // gl.bindBuffer(gl.ARRAY_BUFFER, wolfVerticesBuffer);
    // gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(vPosition);
    // gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));

    // gl.bindBuffer(gl.ARRAY_BUFFER, floorVerticesBuffer);
    // gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(vPosition);
    // gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));

    // gl.drawArrays(gl.TRIANGLES, 0, numVertices);


    requestAnimFrame(render);
}

