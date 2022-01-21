/////////////////////////////////////////////////////////////////
//    S�nid�mi � T�lvugraf�k
//     Teikna n�lgun � hring sem TRIANGLE_FAN
//
//    Hj�lmt�r Hafsteinsson, jan�ar 2022
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

// numCirclePoints er fj�ldi punkta � hringnum
// Heildarfj�ldi punkta er tveimur meiri (mi�punktur + fyrsti punktur kemur tvisvar)

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
    // b�um til einn �r�hyrning � hverri �trun
    // �.e. �rj� punkta � hverri �trun
    for (i = 0; i < k; i += 1) {
        points.push(center); // mi�ja hrings fyrir nuverandi thrihyrning
        a = i * dAngle;
        var p = vec2(rad * Math.sin(a) + cent[0], rad * Math.cos(a) + cent[1]);
        points.push(p); // horn 1 � nuverandi thrihyrning

        a2 = (i + 1) * dAngle;
        var p2 = vec2(rad * Math.sin(a2) + cent[0], rad * Math.cos(a2) + cent[1]);
        points.push(p2); // horn 2 � nuverandi thrihyrning
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
