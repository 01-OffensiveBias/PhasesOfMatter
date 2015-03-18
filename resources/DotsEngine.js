var c = document.querySelector('#canvas-vp');
var gl, glProgram;

var width = 640;
var height = 480;

c.width = width;
c.height = height;

var requestAnimationFrame =
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.requestAnimationFrame;

function initGL() {
    gl = c.getContext('webgl') || c.getContext('experimental-webgl');

    if (gl) {
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        glProgram = gl.createProgram();
    } else {
        alert('Your browser does not support WebGL');
    }
}

function initShaders() {
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    var vsSource = document.querySelector('#shader-vs').innerHTML;
    var fsSource = document.querySelector('#shader-fs').innerHTML;

    gl.shaderSource(vertexShader, vsSource);
    gl.shaderSource(fragmentShader, fsSource);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);

    gl.linkProgram(glProgram);

    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize shaders");
    }

    gl.useProgram(glProgram);
}

initGL();
initShaders();

/**
 * I originally had an idea for a nice object-oriented
 * approach but had to rush it
 */
function Dots(num, grav, fric, speed, bounce) {
    this.grav = grav;
    this.fric = fric;
    this.speed = speed;
    this.bounce = bounce;

    var that = this;
    var length = num * 2;
    var i, j, t, u;
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    var aVertexPosition = gl.getAttribLocation(glProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(aVertexPosition);
    gl.vertexAttribPointer(aVertexPosition, 2, gl.FLOAT, false, 0, 0);
    var uResolution = gl.getUniformLocation(glProgram, 'uResolution');
    gl.uniform2f(uResolution, c.width, c.height);

    // Stored as [x, y, x, y] and [run, rise, run, rise]
    this.dotlist = new Float32Array(length);
    this.dotdir = new Float32Array(length);

    // Initialize dot positions and directions
    for (i = 0; i < length; i += 2) {
        this.dotlist[i] = Math.random() * c.width;
        this.dotlist[i + 1] = Math.random() * c.height;
        this.dotdir[i] = ((Math.random() * 2) - 1) * this.speed;
        this.dotdir[i + 1] = ((Math.random() * 2) - 1) * this.speed;
    }

    function distance(x1, y1, x2, y2) {
        return Math.sqrt(
            Math.pow(x2 - x1, 2) +
            Math.pow(y2 - y1, 2)
        );
    }

    // Calculate new positions
    this.update = function () {
        for (i = 0; i < length; i += 2) {
            // Check if hitting wall
            // Reverse rise/run respectively
            if (that.dotlist[i] < 0 || width < that.dotlist[i]) {
                that.dotlist[i] = (that.dotlist[i] < 0 ? 1 : width - 1);
                that.dotdir[i] *= -this.bounce;
            }
            if (that.dotlist[i + 1] < 0 || height < that.dotlist[i + 1]) {
                that.dotlist[i + 1] = (that.dotlist[i + 1] < 0 ? 1 : height - 1);
                that.dotdir[i + 1] *= -this.bounce;
            }

            // Check if hitting other dot (distance formula)
            // Reverse direction (rise * -1, run * -1)
            for (j = 0; j < length; j += 2) {
                if (distance(that.dotlist[i], that.dotlist[i + 1],
                        that.dotlist[j], that.dotlist[j + 1]) < 4) {
                    t = that.dotdir[i];
                    u = that.dotdir[i + 1];
                    that.dotdir[i] = that.dotdir[j];
                    that.dotdir[i + 1] = that.dotdir[j + 1];
                    that.dotdir[j] = t;
                    that.dotdir[j + 1] = u;
                }
            }

            // Add gravity and friction
            if (that.dotdir[i] < 0) {
                that.dotdir[i] += that.fric;
            } else {
                that.dotdir[i] -= that.fric;
            }
            if (that.dotdir[i + 1] < 0) {
                that.dotdir[i + 1] = that.dotdir[i + 1] + that.grav + that.fric;
            } else {
                that.dotdir[i + 1] = that.dotdir[i + 1] + that.grav - that.fric;
            }

            // Update position
            that.dotlist[i] += that.dotdir[i];
            that.dotlist[i + 1] += that.dotdir[i + 1];
        }
    }

    this.draw = function () {
        gl.bufferData(gl.ARRAY_BUFFER, that.dotlist, gl.DYNAMIC_DRAW);
        gl.drawArrays(gl.POINTS, 0, num);
    }
}