/////////////////////////////////////////////////////////////////
//    S�nid�mi � T�lvugraf�k
//     Teiknar punkt � strigann �ar sem notandinn smellir m�sinni
//
//    Hj�lmt�r Hafsteinsson, jan�ar 2021
/////////////////////////////////////////////////////////////////
var canvas;
var gl;


var maxNumTriangles = 200;       // H�marksfj�ldi punkta sem forriti� r��ur vi�!

var index = 0;                // N�mer n�verandi punkts

var points = [];

window.onload = function init() {

    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 1.0, 1.0);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    // T�kum fr� minnispl�ss � graf�kminni fyrir maxNumTriangles tv�v�� hnit (float er 4 b�ti)
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8 * 3 * maxNumTriangles, gl.DYNAMIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Me�h�ndlun � m�sarsmellum
    canvas.addEventListener("mousedown", function (e) {

        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

        // Reikna heimshnit m�sarinnar �t fr� skj�hnitum
        var t = vec2(2 * e.offsetX / canvas.width - 1, 2 * (canvas.height - e.offsetY) / canvas.height - 1);
        points = [];

        // Create a triangle in the middle of where the mouse clicked
        triangle(t);

        // F�ra �essi hnit yfir � graf�kminni, � r�ttan sta�
        gl.bufferSubData(gl.ARRAY_BUFFER, 8 * 3 * index, flatten(points));

        index++;
    });

    render();
}

// Math for a triangle with all sides even
const r = 0.05;             // (hyperparameter) radius from center to each side of triangle
const sq = Math.sqrt(3);    // doing this to save computation time
const a = (6 * r) / sq;     // length of each outer triangle side ...BAM!
const half_a = a / 2;
const R = (a * sq) / 3;     // length of each inner triangle side ...DOUBLE BAM!

// Create a triangle with all sides even
function triangle(t) {
    var top = vec2(t[0], t[1] + R);
    points.push(top);
    var left = vec2(t[0] - half_a, t[1] - r);
    points.push(left);
    var right = vec2(t[0] + half_a, t[1] - r);
    points.push(right);
}


function render() {

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3 * index); // Need to multiply index with 3 to find correct placement in buffer

    window.requestAnimFrame(render);
}
