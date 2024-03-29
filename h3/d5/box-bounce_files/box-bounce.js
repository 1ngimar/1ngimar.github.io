/////////////////////////////////////////////////////////////////
//    S�nid�mi � T�lvugraf�k
//     Ferningur skoppar um gluggann.  Notandi getur breytt
//     hra�anum me� upp/ni�ur �rvum.
//
//    Hj�lmt�r Hafsteinsson, jan�ar 2022
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

// N�verandi sta�setning mi�ju ferningsins
var box = vec2(0.0, 0.0);

// Stefna (og hra�i) fernings
var dX;
var dY;

// Sv��i� er fr� -maxX til maxX og -maxY til maxY
var maxX = 1.0;
var maxY = 1.0;

// H�lf breidd/h�� ferningsins
var boxRad = 0.05;

// Ferningurinn er upphaflega � mi�junni
var vertices = new Float32Array([
    box[0] - boxRad, box[1] - boxRad,
    box[0] - boxRad, box[1] + boxRad,
    box[0] + boxRad, box[1] + boxRad,
    box[0] + boxRad, box[1] - boxRad]);
// -0.05, -0.05, 0.05, -0.05, 0.05, 0.05, -0.05, 0.05]);


window.onload = function init() {

    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.8, 0.8, 0.8, 1.0);

    // Gefa ferningnum slembistefnu � upphafi
    dX = Math.random() * 0.1 - 0.05;
    dY = Math.random() * 0.1 - 0.05;

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.DYNAMIC_DRAW);

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    locBox = gl.getUniformLocation(program, "boxPos");

    // Me�h�ndlun �rvalykla
    window.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
            case 37:    // vinstri �r
                if (dX > 0) {
                    dX = 0.0;
                }
                dX -= 0.03;
                break;
            case 39:    // h�gri �r
                if (dX < 0) {
                    dX = 0.0;
                }
                dX += 0.03;
                break;
            case 38:	// upp �r
                boxRad += 0.03;
                break;
            case 40:	// ni�ur �r
                if (boxRad - 0.03 > 0) {
                    boxRad -= 0.03;
                }
                break;
        }
    });

    render();
}

function drawBox() {
    vertices = new Float32Array([
        box[0] - boxRad, box[1] - boxRad,
        box[0] - boxRad, box[1] + boxRad,
        box[0] + boxRad, box[1] + boxRad,
        box[0] + boxRad, box[1] - boxRad]);
    return vertices;
}

function render() {


    // L�t ferninginn skoppa af veggjunum
    if (Math.abs(box[0] + dX) > maxX - boxRad) dX = -dX;
    if (Math.abs(box[1] + dY) > maxY - boxRad) dY = -dY;

    // Uppf�ra sta�setningu
    box[0] += dX;
    box[1] += dY;

    drawBox();
    //------------- new stuff
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));
    // -----------------

    gl.clear(gl.COLOR_BUFFER_BIT);

    // gl.uniform2fv(locBox, flatten(box));

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    window.requestAnimFrame(render);
}
