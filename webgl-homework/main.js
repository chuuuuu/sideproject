var gl;

function initGL(canvas) {
  try {
    gl = canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch (e) {
  }
  if (!gl) {
    alert("Could not initialise WebGL, sorry :-(");
  }
  if (!gl.getExtension('OES_standard_derivatives')){
    alert("OES_standard_derivatives not support")
  }
}


function getShader(gl, id) {
  var shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }

  var str = "";
  var k = shaderScript.firstChild;
  while (k) {
    if (k.nodeType == 3) {
      str += k.textContent;
    }
    k = k.nextSibling;
  }

  var shader;
  if (shaderScript.type == "fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }

  gl.shaderSource(shader, str);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

function drawScene() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  items.forEach((item) => {
    gl.useProgram(item.shaderProgram);
    item.drawScene();
  })
}


var lastTime = new Date().getTime();
var elapsed = 0

function animate() {
  var timeNow = new Date().getTime();
  elapsed = timeNow - lastTime;
}


function tick() {
  requestAnimFrame(tick);
  drawScene();
  animate();
}

var items = []

var lights = [] 

var envIntensity = [0.3, 0.3, 0.3]


function webGLStart(filename, shadingType) {
  var canvas = document.getElementById("ICG-canvas");
  initGL(canvas);

  load(filename, shadingType)

  gl.clearColor(0.0, 0.2, 0.2, 1.0);
  gl.enable(gl.DEPTH_TEST);

  tick();
}

function main(){

  lights.push({
    pos: [10, 0, 0],
    intensity: [1, 0, 0],
  })

  lights.push({
    pos: [0, 10, 0],
    intensity: [0, 1, 0],
  })

  lights.push({
    pos: [0, 0, 10],
    intensity: [0, 0, 1],
  })
  
  shadingType = "flat"
  filename = "./Model_Json_Format/Kangaroo.json"
  webGLStart(filename, shadingType);

  shadingType = "gouraud"
  filename = "./Model_Json_Format/Car_road.json"
  webGLStart(filename, shadingType);

  shadingType = "phong"
  filename = "./Model_Json_Format/Mig27.json"
  webGLStart(filename, shadingType)
}
