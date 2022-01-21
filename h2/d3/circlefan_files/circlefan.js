/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Teikna nálgun á hring sem TRIANGLE_FAN
//
//    Hjálmtýr Hafsteinsson, janúar 2022
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

// numCirclePoints er fjöldi punkta á hringnum
// Heildarfjöldi punkta er tveimur meiri (miðpunktur + fyrsti punktur kemur tvisvar)

var numCirclePoints = 4;
var triangleMultiplier = 3;
numCirclePoints *= triangleMultiplier;

var radius = 0.4;
var center = vec2(0, 0);

var bufferID;

var points = [];

function init() {

    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load data to GPU
    bufferID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
    gl.bufferData(gl.ARRAY_BUFFER, 8 * Math.pow(3, 6), gl.STATIC_DRAW);
    // gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    document.getElementById("slider").onchange = function (event) {
        numCirclePoints = event.target.value;
        numCirclePoints *= triangleMultiplier;
        render();
    };

    render();
}

function createCirclePoints(cent, rad, k) {
    var dAngle = (2 * Math.PI / k) * triangleMultiplier; // Thurfum ad staekka skrefin
    k = Math.floor(k / triangleMultiplier);
    // búum til einn þríhyrning í hverri ítrun
    // þ.e. þrjá punkta í hverri ítrun
    for (i = 0; i < k; i += 1) {
        points.push(center); // miðja hrings fyrir nuverandi thrihyrning
        a = i * dAngle;
        var p = vec2(rad * Math.sin(a) + cent[0], rad * Math.cos(a) + cent[1]);
        points.push(p); // horn 1 á nuverandi thrihyrning

        a2 = (i + 1) * dAngle;
        var p2 = vec2(rad * Math.sin(a2) + cent[0], rad * Math.cos(a2) + cent[1]);
        points.push(p2); // horn 2 á nuverandi thrihyrning
    }
}

window.onload = init;

function render() {

    points = [];
    createCirclePoints(center, radius, numCirclePoints);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw circle using Triangles
    gl.drawArrays(gl.TRIANGLES, 0, numCirclePoints + 2);
    points = [];
    // window.requestAnimFrame(render);
}
