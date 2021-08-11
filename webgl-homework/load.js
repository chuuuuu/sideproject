function handleLoaded(data) {
  vertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertexNormals), gl.STATIC_DRAW);
  vertexNormalBuffer.itemSize = 3;
  vertexNormalBuffer.numItems = data.vertexNormals.length / 3;

  vertexFrontColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexFrontColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertexFrontcolors), gl.STATIC_DRAW);
  vertexFrontColorBuffer.itemSize = 3;
  vertexFrontColorBuffer.numItems = data.vertexFrontcolors.length / 3;

  vertexBackColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBackColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertexBackcolors), gl.STATIC_DRAW);
  vertexBackColorBuffer.itemSize = 3;
  vertexBackColorBuffer.numItems = data.vertexBackcolors.length / 3;

  vertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertexPositions), gl.STATIC_DRAW);
  vertexPositionBuffer.itemSize = 3;
  vertexPositionBuffer.numItems = data.vertexPositions.length / 3;

  return {
    vertexNormalBuffer,
    vertexFrontColorBuffer,
    vertexBackColorBuffer,
    vertexPositionBuffer
  }
}


function load(filename, shadingType) {
  var request = new XMLHttpRequest();
  request.open("GET", filename);
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      var item = new Item()
      item.vBuffer = handleLoaded(JSON.parse(request.responseText))
      item.initShaders(shadingType)
      items.push(item)
    }
  }
  request.send();
}