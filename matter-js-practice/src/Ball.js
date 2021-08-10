class Ball{
  constructor(x, y, r){
    this.r = r;
    this.body = Matter.Bodies.circle(x, y, r);
    this.bodies = [this.body];
  }

  draw(){
    let r = this.r;
    let x = this.body.position.x;
    let y = this.body.position.y;
    circle(x, y, r*2);
  }
}