let RADIUS = 200;
let in_cnt = 0;
let tot_cnt = 0;
let num_per_frame = 1000;
let p;

function setup() {
  createCanvas(windowWidth, windowHeight);
  p = createP();
  p.style('color', '#FFFFFF')
  p.position(width/2-RADIUS, height/2+RADIUS);
  // createCanvas(2*RADIUS, 2*RADIUS);
  frameRate(120);
  background(0);
  draw_circle();
  draw_square();
  // console.log({windowWidth, windowHeight});

  // you can use noLoop to cancel loop from draw()
  // however, it wont give a good visulization which is the purpose of p5js
  // noLoop();
}

function draw() {

  for(let i=0; i<num_per_frame; i++){
    new_rndpt();
  }

  update_cnt();
}

function update_cnt(){
  p.html(`INSIDE: ${in_cnt}, TOTAL: ${tot_cnt}, PI = ${get_pi()}`)
}

function get_pi(){
  let pi = 4 * in_cnt / tot_cnt;
  return pi.toFixed(10);
}

function new_rndpt(){
  let x = RADIUS * 2 * (Math.random() - 0.5)
  let y = RADIUS * 2 * (Math.random() - 0.5)

  tot_cnt += 1;

  if(x**2+y**2 < RADIUS**2){
    in_cnt += 1;
    draw_pt({x, y}, '#00FF00');
    return;
  }
  
  draw_pt({x, y}, '#0000FF');
}

function draw_pt(pt, color){
  push();

  let x = pt.x;
  let y = pt.y;
  translate(width/2, height/2);
  stroke(color);
  strokeWeight(1);
  point(x, y);

  pop();

  return {x, y};
}

function draw_circle(){
  push();

  translate(width/2, height/2);
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(0, 0, 2*RADIUS, 2*RADIUS);

  pop();
}

function draw_square(){
  push();

  translate(width/2, height/2);
  stroke(255);
  strokeWeight(4);
  noFill();
  rectMode(CENTER);
  rect(0, 0, 2*RADIUS, 2*RADIUS);

  pop();
}

function draw_time(){
  push();

  let h = hour();
  let m = minute();
  let s = second();

  translate(width/2, height/2);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  text(h + ':' + m + ':' + s, 0, 0);

  pop();
}