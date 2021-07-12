const balls = [new Ball(0, 0, 50)];

function setup() {
  console.log("🚀 - Setup initialized - P5 is running");

  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER).noFill().frameRate(30);
}

function draw() {
  
  background(0);

  translate(width/2, height/2);
  stroke(180);
  strokeWeight(1);
  noFill();

  balls.forEach(ball => {
    ball.draw();
  })
}