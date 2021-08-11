class Item{
  constructor() {
    this.vBuffer = undefined;
    this.shaderProgram = undefined;
    this.mvMatrix = mat4.create();
    this.pMatrix = mat4.create();
    this.nMatrix = mat4.create();
    this.kDiffuse = 1;
    this.kSpecular = 10;
    this.kAmbient = 1;

    this.nSpecular = 10;

    this.originPos = [Math.random()-0.5, Math.random()-0.5, Math.random()-0.5-5];

    this.radius = 1.5 * Math.random();

    this.angularV = Math.random() + 1;

    this.direction = [Math.random(), Math.random(), Math.random(),]

  }
  
  drawScene() {
    if (this.vBuffer.vertexPositionBuffer == null || this.vBuffer.vertexNormalBuffer == null || this.vBuffer.vertexFrontColorBuffer == null || this.vBuffer.vertexBackColorBuffer == null) {
      return;
    }

    // pMatrix
    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, this.pMatrix);

    // mvMatrix
    var angle = elapsed * 0.1 * this.angularV;
    var shearX = angle * 0.01
    var scale = Math.sin(angle * 0.01) + 1.5;
    var displacement = [this.originPos[0] + this.radius * Math.sin(angle * 0.02),
      this.originPos[1] + this.radius * Math.cos(angle * 0.02),
      this.originPos[2] + this.radius,]

    var shearMatrix = mat4.create();
    mat4.identity(shearMatrix);
    shearMatrix[1] = 2 * Math.cos(shearX);
    mat4.identity(this.mvMatrix);
    mat4.translate(this.mvMatrix, displacement); // 往-z direction移動，因為眼睛在(0, 0, 0)
    mat4.multiply(this.mvMatrix, shearMatrix, this.mvMatrix);
    mat4.rotate(this.mvMatrix, degToRad(angle), this.direction);
    mat4.scale(this.mvMatrix, [0.5, 0.5, 0.5])
    mat4.scale(this.mvMatrix, [scale, scale, scale])

    // nMatrix
    mat4.set(this.mvMatrix, this.nMatrix);
    mat4.inverse(this.nMatrix);
    mat4.transpose(this.nMatrix);

    gl.uniform1i(this.shaderProgram.samplerUniform, 0);

    // attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer.vertexPositionBuffer);
    gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.vBuffer.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer.vertexFrontColorBuffer);
    gl.vertexAttribPointer(this.shaderProgram.vertexFrontColorAttribute, this.vBuffer.vertexFrontColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer.vertexNormalBuffer);
    gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, this.vBuffer.vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    this.setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, this.vBuffer.vertexPositionBuffer.numItems);
  }

  setMatrixUniforms() {
    gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
    gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
    gl.uniformMatrix4fv(this.shaderProgram.nMatrixUniform, false, this.nMatrix);

    gl.uniform3fv(this.shaderProgram.lightPostionUniform0, lights[0].pos);
    gl.uniform3fv(this.shaderProgram.lightIntensityUniform0, lights[0].intensity);

    gl.uniform3fv(this.shaderProgram.lightPostionUniform1, lights[1].pos);
    gl.uniform3fv(this.shaderProgram.lightIntensityUniform1, lights[1].intensity);

    gl.uniform3fv(this.shaderProgram.lightPostionUniform2, lights[2].pos);
    gl.uniform3fv(this.shaderProgram.lightIntensityUniform2, lights[2].intensity);

    gl.uniform3fv(this.shaderProgram.envIntensityUniform, envIntensity);

    gl.uniform1f(this.shaderProgram.kAmbient, this.kAmbient)
    gl.uniform1f(this.shaderProgram.kDiffuse, this.kDiffuse)
    gl.uniform1f(this.shaderProgram.kSpecular, this.kSpecular)

    gl.uniform1f(this.shaderProgram.nSpecular, this.nSpecular)
  }

  initShaders(shadingType) {
    var fragmentShader = getShader(gl, shadingType + "FragmentShader");
    var vertexShader = getShader(gl, shadingType + "VertexShader");

    this.shaderProgram = gl.createProgram();
    gl.attachShader(this.shaderProgram, vertexShader);
    gl.attachShader(this.shaderProgram, fragmentShader);
    gl.linkProgram(this.shaderProgram);

    if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
    }

    gl.useProgram(this.shaderProgram);

    this.shaderProgram.vertexNormalAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);

    this.shaderProgram.vertexFrontColorAttribute = gl.getAttribLocation(this.shaderProgram, "aFrontColor");
    gl.enableVertexAttribArray(this.shaderProgram.vertexFrontColorAttribute);

    this.shaderProgram.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);

    this.shaderProgram.pMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uPMatrix");
    this.shaderProgram.mvMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
    this.shaderProgram.nMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uNMatrix");

    this.shaderProgram.lightPostionUniform0 = gl.getUniformLocation(this.shaderProgram, "uLightPosition0");
    this.shaderProgram.lightIntensityUniform0 = gl.getUniformLocation(this.shaderProgram, "uLightIntensity0");

    this.shaderProgram.lightPostionUniform1 = gl.getUniformLocation(this.shaderProgram, "uLightPosition1");
    this.shaderProgram.lightIntensityUniform1 = gl.getUniformLocation(this.shaderProgram, "uLightIntensity1");

    this.shaderProgram.lightPostionUniform2 = gl.getUniformLocation(this.shaderProgram, "uLightPosition2");
    this.shaderProgram.lightIntensityUniform2 = gl.getUniformLocation(this.shaderProgram, "uLightIntensity2");

    this.shaderProgram.envIntensityUniform = gl.getUniformLocation(this.shaderProgram, "uEnvIntensity");

    this.shaderProgram.kAmbient = gl.getUniformLocation(this.shaderProgram, "uKAmbient")
    this.shaderProgram.kDiffuse = gl.getUniformLocation(this.shaderProgram, "uKDiffuse")
    this.shaderProgram.kSpecular = gl.getUniformLocation(this.shaderProgram, "uKSpecular")

    this.shaderProgram.nSpecular = gl.getUniformLocation(this.shaderProgram, "uNSpecular")

    this.shaderProgram.samplerUniform = gl.getUniformLocation(this.shaderProgram, "uSampler");
  }
}
