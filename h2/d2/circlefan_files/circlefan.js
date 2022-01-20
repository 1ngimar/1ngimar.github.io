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

var numCirclePoints = 20 * 3; // við þurfum að margfalda með 3 til að hafa sama "smoothness"

var radius = 0.4;
var center = vec2(0, 0);

var points = [];

window.onload = function init() {

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

    // Create the circle
    points.push(center);
    createCirclePoints(center, radius, numCirclePoints);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    render();
}

function createCirclePoints(cent, rad, k) {
    var dAngle = (2 * Math.PI / k) * 3;
    // búum til einn þríhyrning í hverri ítrun
    // þ.e. þrjá punkta í hverri ítrun
    // við fáum miðjuna í byrjun sem einn punkt (don't know why...)
    for (i = (k/3); i > 0; i--) {
        a = i * dAngle;
        var p = vec2(rad * Math.sin(a) + cent[0], rad * Math.cos(a) + cent[1]);
        points.push(p); // horn 1 á núverandi þríhyrning

        a2 = (i - 1) * dAngle;
        var p2 = vec2(rad * Math.sin(a2) + cent[0], rad * Math.cos(a2) + cent[1]);
        points.push(p2); // horn 2 á núverandi þríhyrning

        points.push(cent); // miðjan á hringnum fyrir NÆSTA þríhyrning
    }
}

function render() {

    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw circle using Triangles
    gl.drawArrays(gl.TRIANGLES, 0, numCirclePoints + 2);

    window.requestAnimFrame(render);
}
