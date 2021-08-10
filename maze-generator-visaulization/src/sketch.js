function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

async function draw(){
  background(0);
  translate(width/2, height/2);
  let mazz = new Mazz(25, 25, width/2, height/2);
  await new Promise((res)=>{
    mazz.build_road([0, 0], res);
  })
  mazz.draw();
}