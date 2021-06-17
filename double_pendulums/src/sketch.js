let dbp1;
let dbp2;
let theta1 = Math.PI*1/2;
let theta2 = Math.PI*1/2;
let epsilon1 = 1e-3;
let epsilon2 = 1e-3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  dbp1 = new DoublePendulums(theta1, theta2, '#00ff00');
  dbp2 = new DoublePendulums(theta1+epsilon1, theta2+epsilon2, '#0000ff');
}

function draw() {
  background(0);
  translate(width/2, height/2);
  dbp1.draw();
  dbp1.update(0.1);

  dbp2.draw();
  dbp2.update(0.1);
}