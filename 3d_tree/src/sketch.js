// https://www.youtube.com/watch?v=tdbaIHjCKtA
let scl = 10;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  noLoop();
}

function draw() {
  camera(0, 1000, (height/2)/tan(30), 0, 0, 0, 0, 1, 0);
  background(200);

  randomSeed(0);
  for(let i=0; i<5; i++){
    push();
    translate(-300, i*250, 0);
    draw_tree();
    pop();  

    push();
    translate(300, i*250, 0);
    draw_tree();
    pop();  
  }

  
  let rows = height/scl;
  let cols = width/scl;

  for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      stroke(255);
      noFill();
      rect((i-rows/2)*scl, (j-rows/2)*scl, scl, scl);
      // rect(i*scl, j*scl, scl, scl);
    }
  }
}

function draw_tree(){
  branch(100);
}

function branch(len){
  strokeWeight(map(len, 10, 100, 0.5, 5));
  stroke(70, 40, 20);
  line(0, 0, 0, 0, 0, len);
  translate(0, 0, len);
  if(len > 10){
    for(let i=0; i<3; i++){
      rotateZ(random(100, 140));
      push();
      rotateX(random(20, 50));
      branch(0.7* len);
      pop();    
    }
  }else{
    let [r, g, b] = [80+random(-20, 20), 120+random(-20, 20), 40+random(-20, 20)];
    fill(r, g, b);
    noStroke();
    translate(5, 0, 0)
    rotateX(90)
    beginShape();
    for(let i=45; i<135; i++){
      let rad = 7;
      let x = rad * cos(i);
      let z = rad * sin(i);
      vertex(x, 0, z)
    }
    for(let i=135; i>45; i--){
      let rad = 7;
      let x = rad * cos(i);
      let z = rad * sin(-i) + 10;
      vertex(x, 0, z)
    }
    endShape(CLOSE);
  }
}