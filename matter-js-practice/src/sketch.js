let engine;
let scl;
let N=100;

function setup(){
  createCanvas(windowWidth, windowHeight);
  scl = min(windowWidth, windowHeight) / 50;

  engine = new Engine();
  let box_w = windowWidth/2;
  let box_h = windowHeight/2;
  engine.new_box(0, 0, box_w, box_h, scl);
  for(let i=0; i<N; i++){
    engine.new_rnd_ball(box_w, box_h, scl)
  }
}

function draw(){
  background(50);
  translate(width/2, height/2);
  stroke(180);
  strokeWeight(1);
  noFill();

  engine.draw();
}