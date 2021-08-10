class Box{
  constructor(x, y, w, h, t){
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.t = t; // thickness

    this.down_wall = Matter.Bodies.rectangle(x, y+h/2+t/2, w, t, {isStatic: true});
    this.up_wall = Matter.Bodies.rectangle(x, y-h/2-t/2, w, t, {isStatic: true});
    this.right_wall = Matter.Bodies.rectangle(x+w/2+t/2, y, t, h, {isStatic: true});
    this.left_wall = Matter.Bodies.rectangle(x-w/2-t/2, y, t, h, {isStatic: true});

    this.bodies = [this.up_wall, this.down_wall, this.right_wall, this.left_wall];
  }

  draw(){
    let w = this.w;
    let h = this.h;
    let x = this.x;
    let y = this.y;
    rectMode(CENTER);
    rect(x, y, w, h);
  }
}