/////////////////////////////////////////////////////////////////
//    S�nid�mi � T�lvugraf�k
//     Teikna n�lgun � hring sem TRIANGLE_FAN
//
//    Hj�lmt�r Hafsteinsson, jan�ar 2022
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

// numCirclePoints er fj�ldi punkta � hringnum

var numCirclePoints = 20;
var triangleMultiplier = 3;
numCirclePoints *= triangleMultiplier;

var radius = 0.4;
var center = vec2(0, 0);

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

    // Create the circle
    // points.push(center);

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
    console.log(points);
}

window.onload = init;

function render() {

    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw circle using Triangles
    gl.drawArrays(gl.TRIANGLES, 0, numCirclePoints + 2);

    window.requestAnimFrame(render);
}
