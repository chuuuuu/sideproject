class Engine{
  constructor(){
    this.engine = Matter.Engine.create();
    this.runner = Matter.Runner.create();
    Matter.Runner.run(this.runner, this.engine);

    this.bodies = [];
  }

  new_box(x, y, w, h, t){
    let box = new Box(x, y, w, h, t);

    Matter.Composite.add(this.engine.world, box.bodies);
    this.bodies.push(box);
  }

  new_ball(x, y, r){
    let ball = new Ball(x, y, r);

    Matter.Composite.add(this.engine.world, ball.bodies);
    this.bodies.push(ball);
  }

  draw(){
    this.bodies.forEach((body)=>{
      body.draw();
    })
  }

  new_rnd_ball(w, h, r){
    let x = random(-w/2+r, w/2-r);
    let y = random(-h/2+r, h/2-r);
    engine.new_ball(x, y, r);  
  }
}