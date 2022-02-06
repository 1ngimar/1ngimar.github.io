/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Teiknar punkt á strigann þar sem notandinn smellir músinni
//
//    Hjálmtýr Hafsteinsson, janúar 2021
/////////////////////////////////////////////////////////////////
var canvas;
var gl;
var program;
var verticesBuffer;
var colorBuffer;
// var myVertices = [];
// var myColors = [];

// svæði er frá -maxX til maxX og frá -maxY til maxY
var maxX = 1.0;
var maxY = 1.0;
const m_maxSpeed = 0.6;

const g = 0.3; // gravity, meters/second

// Initial position of mario
var mario = vec2(-0.85, -0.5);
// stefna og hraði Mario
var m_dX = 0.0;
var m_dY = 0.0;
const r = 0.05;
const m_height = r * 2;
const m_width = r * 2;
var m_vx = 0;
var m_vy = 0;
var m_ax = 0;
var m_ay = 0.1;
var m_box = mario;
var m_boxVertices = [
    vec2(m_box[0] - r, m_box[1] + r),
    vec2(m_box[0] + r, m_box[1] + r),
    vec2(m_box[0] + r, m_box[1] - r),
    vec2(m_box[0] - r, m_box[1] + r),
    vec2(m_box[0] - r, m_box[1] - r),
    vec2(m_box[0] + r, m_box[1] - r)
];
var m_boxColors = [
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0)
];

var m_orientation = 0;      // hvernig mario snýr (0 := hægri, 1 := vinstri)
var m_jumping = false;
var m_falling = true;
var m_jump_time = 5;
var m_jumpCounter = 0;
var pressed_right = 0;
var pressed_left = 0;

var maxNumGold = 20;
const coinResolution = 30;
const coinRadius = 0.04;

var coinVertices = [];
var coinPositions = [];
var coinColors = [];
var countOfAllCoins = 0;


var killerTriangles = vec2(0.0, -1.0 );
var killerTrianglesWidth = 0.3;
var kt_halfWidth = killerTrianglesWidth / 2;
var kt_qWidth = kt_halfWidth / 2;
var killerTrianglesHeight = 0.2;
var kt_halfHeight = killerTrianglesHeight / 2;
var kt_qHeight = kt_halfHeight / 2;
var killerTrianglesVertices = [
    vec2(killerTriangles[0] - kt_halfWidth, killerTriangles[1]),
    vec2(killerTriangles[0] - kt_qWidth, killerTriangles[1] + kt_qHeight),
    vec2(killerTriangles[0], killerTriangles[1]),
    vec2(killerTriangles[0] + kt_halfWidth, killerTriangles[1]),
    vec2(killerTriangles[0] + kt_qWidth, killerTriangles[1] + kt_qHeight),
    vec2(killerTriangles[0], killerTriangles[1]),
];
var onTriangle = false;

var gameOver = false;

// var box2Position = vec2(0.0, -0.7);
// var box2Width = 0.3;
// var box2Height = 0.2;
// var box2Vertices = [
//     // top rectangle
//     vec2(-0.15, -0.6),
//     vec2(-0.15, -0.8),
//     vec2(0.15, -0.8),
//     vec2(-0.15, -0.6),
//     vec2(0.15, -0.6),
//     vec2(0.15, -0.8)
// ];
// var onBox2 = false;

// allBoxVertices.push(...box2Vertices);

var killerTrianglesColors = [];
for (let i = 0; i < killerTrianglesVertices.length; i++) {
    killerTrianglesColors.push(vec4(1.0, 0.0, 0.0, 1.0));
}



var score = 0;
var scoreColors = [];

function updateScore() {
    var scorevertices = [];
    scoreColors = [];
    var buff = -0.95;
    for (let i = 0; i < score; i++) {
        buff += 0.06;
        scorevertices.push(vec2( buff-0.02, 0.85 ));
        scorevertices.push(vec2( buff, 0.85 ));
        scorevertices.push(vec2( buff-0.02, 0.7 ));
        scorevertices.push(vec2( buff-0.02, 0.7 ));
        scorevertices.push(vec2( buff, 0.85 ));
        scorevertices.push(vec2( buff, 0.7 ));
        scoreColors.push(vec4(1.0, 1.0, 0.0, 1.0));
        scoreColors.push(vec4(1.0, 1.0, 0.0, 1.0));
        scoreColors.push(vec4(1.0, 1.0, 0.0, 1.0));
        scoreColors.push(vec4(1.0, 1.0, 0.0, 1.0));
        scoreColors.push(vec4(1.0, 1.0, 0.0, 1.0));
        scoreColors.push(vec4(1.0, 1.0, 0.0, 1.0));
    }
    return scorevertices;
}


const marioColors = [
    vec4(0.0, 0.0, 1.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0),
];

function drawMario() {

    if (pressed_right === 1 && !m_falling) {
        if (Math.abs(mario[0] + m_dX) < maxX - r || mario[0] + r < maxX) {
            m_dX += 0.01; // sweetspot
            // mario[0] += 0.05;
        }
        else {
            m_dX = 0.0;
            // mario[0] = 0.0;
        }
        m_orientation = 0;
    }
    else if (pressed_left === 1 && !m_falling) {
        if (Math.abs(mario[0] + m_dX) < maxX - r || mario[0] - r > -maxX) {
            m_dX -= 0.01; // sweetspot
            // mario[0] -= 0.05;
        }
        else {
            m_dX = 0.0;
            // mario[0] = 0.0;
        }
        m_orientation = 1;
    }
    else if (m_falling && m_dX > 0) {
        if (Math.abs(mario[0] + m_dX) < maxX - r || mario[0] + r < maxX) {
            m_dX *= 1.25; // sweetspot
            // mario[0] += 0.05;
        }
        else {
            m_dX = 0.0;
            // mario[0] = 0.0;
        }
    }
    else if (m_falling && m_dX < 0) {
        if (Math.abs(mario[0] + m_dX) < maxX - r || mario[0] - r > -maxX) {
            m_dX *= 1.25; // sweetspot
            // mario[0] += 0.05;
        }
        else {
            m_dX = 0.0;
            // mario[0] = 0.0;
        }
    }

    if (checkMarioCollision(mario, killerTriangles, m_width, killerTrianglesWidth, m_height, killerTrianglesHeight)) {
        m_dY = 0.0;
        m_dX = 0.0;
        m_falling = false;
        onTriangle = true;
        gameOver = true;
    }

    mario[0] += m_dX;

    // update mario's position on x-axis
    m_dX /= 1.3

    if (m_jumping) {
        m_dY += 0.06;
        m_falling = false;
        m_jumping = false;
    }
    else if (Math.abs(mario[1] + m_dY) < maxY - r) {
        m_falling = true;
        m_jumping = false;
    }
    else {
        m_falling = false;
        m_dY = 0.0;
    }
    if (m_falling) {
        m_dY -= 0.01 * g;
    }
    
    mario[1] += m_dY;

    if (m_orientation == 0) {
        return [
            vec2(mario[0] + r, mario[1]),         // Head
            vec2(mario[0] - r, mario[1] + r),     // Left
            vec2(mario[0] - r, mario[1] - r)      // right
        ];
    }
    else {
        return [
            vec2(mario[0] - r, mario[1]),         // Head
            vec2(mario[0] + r, mario[1] - r),     // Left
            vec2(mario[0] + r, mario[1] + r)      // Right
        ];
    }
}

// f1c is "figure 1 center" is the position of the center of figure 1
// f2c is the position of the figure that figure 1 could be hitting
// example: figure 1 could be mario, and figure 2 could be be a coin
// both are vec2
// r1 is the radius of figure 1
// r2 is the radius of figure 2
function checkCollision(a, b, a_width, b_width, a_height, b_height) {
    if (a[0] + a_width*2 >= b[0] &&
        a[0] <= b[0] + b_width*2 &&
        a[1] + a_height*2 >= b[1] &&
        a[1] <= b[1] + b_height*2) {
        return true;
    }
    return false;
}

function checkMarioCollision(a, b, a_width, b_width, a_height, b_height) {
    if (!m_jumping) {
        if (Math.abs(a[0] + a_width / 2 + m_dX) < Math.abs(b[0] - b_width / 2) &&
            (a[1] + m_height < b[1] + b_height)) {
            return true;
        }
    }
    return false;
}


function drawCoins() {
    // var countOfCoins = Math.round(Math.random() * 2); // one to three coins
    var countOfCoins = 1;
    if (countOfAllCoins < 1) {
        for (let j = 0; j < countOfCoins; j++) {
            countOfAllCoins++;
            var k = coinResolution;
            var rad = coinRadius;
            var dAngle = (2 * Math.PI / k) * 3;
            k = Math.floor(k / 3);
            var a = 0;
            var a2 = 0;
            var coinPos = getRandomPosition();
            coinPositions.push(coinPos);
            for (i = 0; i < k; i += 1) {
                coinVertices.push(coinPos); // middle of the coin
                a = i * dAngle;
                var p = vec2(rad * Math.sin(a) + coinPos[0], rad * Math.cos(a) + coinPos[1]);
                coinVertices.push(p); // corner 1 

                a2 = (i + 1) * dAngle;
                var p2 = vec2(rad * Math.sin(a2) + coinPos[0], rad * Math.cos(a2) + coinPos[1]);
                coinVertices.push(p2); // corner 2
            }
            for (let i = 0; i < coinResolution; i++) {
                coinColors.push(vec4(0.8, 0.8, 0.0, 1.0));
            }
        }
    }
    return coinVertices;
}

// Meðhöndlun á lyklaborðaskipunum
function Down(e) {
    switch (e.keyCode) {
        case 38:
            if (!m_falling) { // stopping double-jumps
                m_jumping = true;
            }
            break;
        case 39:	    // right
            pressed_right = 1;
            break;
        case 37:	    // left
            pressed_left = 1;
            break;
    }
}
// Meðhöndlun á lyklaborðaskipunum
function Up(e) {
    switch (e.keyCode) {
        case 39:	    // right
            pressed_right = 0;
            break;
        case 37:	    // left
            pressed_left = 0;
            break;
    }
}

function deleteCoin(coin) {
    countOfAllCoins--;
    for (let i = 0; i < coinPositions.length; i++) {
        if (coin === coinPositions[i]) {
            coinPositions[i] = vec2(1.1, 0.0); // lets just place it outside the canvas for now...
        }
    }
    coinVertices = [];
    coinColors = [];
}

function getRandomPosition() {
    var x;
    var x = (Math.random() * 2) - 1;
    var y = (Math.random() * 0.4) - 1;
    if (x > -killerTrianglesWidth / 2 && x < killerTrianglesWidth / 2) {
        y += killerTrianglesHeight; //+ box2Height;
    }
    return vec2(x, y);
}


// setInterval(spawnCoin(coinPos), 1000);
// setInterval(myColors.push(...generateCoinColors()), 1000);

function checkCoinCollision() {
    for (let i = 0; i < coinPositions.length; i++) {
        var cPos = coinPositions[i];
        if (checkCollision(mario, cPos, r, coinRadius, r, coinRadius)) {
            deleteCoin(cPos);
            ++score;
        }
    }
}

var count = 0;
function updateEveryting(myVertices, myColors) {
    if (!gameOver) {
        myVertices.push(...drawMario());
        myColors.push(...marioColors);
        
        myVertices.push(...killerTrianglesVertices);
        myColors.push(...killerTrianglesColors);
        myVertices.push(...drawCoins());
        myColors.push(...coinColors);

        myVertices.push(...updateScore());
        myColors.push(...scoreColors);
        
        checkCoinCollision();
    }
    else {
        myVertices.push(...updateScore());
        myColors.push(...scoreColors);
    }
}

function render() {

    var myVertices = [];
    var myColors = [];
    updateEveryting(myVertices, myColors);

    var vPosition = gl.getAttribLocation(program, 'verPosition');
    var vColor = gl.getAttribLocation(program, 'verColor');

    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(myVertices));

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(myColors));

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, myVertices.length);

    window.requestAnimFrame(render);
}

// Window init fall ////////////////////////////////////////////////////////

window.onload = function init() {

    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.7, 0.7, 0.9, 1.0);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Tökum frá minnispláss í grafíkminni
    verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 10000, gl.DYNAMIC_DRAW);

    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 10000, gl.DYNAMIC_DRAW);



    render();
}
/////////////////////////////////////////////////////////


