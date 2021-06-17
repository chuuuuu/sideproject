let g = 9.8
let sin = Math.sin;
let cos = Math.cos;
let MAX_LEN = 500;

class DoublePendulums{
  constructor(theta1, theta2, color, m1=1, m2=1, l1=100, l2=100){
    this.color = color;
    this.theta1 = theta1;
    this.dtheta1 = 0;
    this.theta2 = theta2;
    this.dtheta2 = 0;

    this.l1 = l1;
    this.l2 = l2;

    this.m1 = m1;
    this.m2 = m2;

    this.states = [];
  }

  draw(){
    // draw balls
    let [x1, y1, x2, y2] = this.get_pos();
    this.states.push([x2, y2]);
    if(this.states.length > MAX_LEN){
      this.states.shift();
    }
    stroke(this.color);
    fill(this.color);
    line(0, 0, x1, -y1);
    line(x1, -y1, x2, -y2);
    ellipse(x1, -y1, 20, 20);
    ellipse(x2, -y2, 20, 20);

    // draw trace
    for(let i=0; i<this.states.length; i++){
      let [x, y] = this.states[i];
      point(x, -y)
    }
  }

  get_pos(){
    let theta1 = this.theta1;
    let theta2 = this.theta2;
    let l1 = this.l1;
    let l2 = this.l2;

    let x1 = l1 * sin(theta1);
    let y1 = -l1 * cos(theta1);
    let x2 = x1 + l2 * sin(theta2);
    let y2 = y1 - l2 * cos(theta2);

    return [x1, y1, x2, y2];
  }

  // https://web.mit.edu/jorloff/www/chaosTalk/double-pendulum/double-pendulum-en.html
  get_ddtheta(theta1, theta2, dtheta1, dtheta2){
    let m1 = this.m1;
    let m2 = this.m2;
    let l1 = this.l1;
    let l2 = this.l2;

    let ddtheta1 = -g * (2*m1 + m2) * sin(theta1);
    ddtheta1 += -m2 * g * sin(theta1 - 2*theta2);
    ddtheta1 += -2*sin(theta1 - theta2) * m2 * (dtheta2**2 * l2 + dtheta1**2 * l1 * cos(theta1 - theta2));
    ddtheta1 /= l1 * (2*m1 + m2 - m2 * cos(2*theta1 - 2*theta2));

    let ddtheta2 = dtheta1**2 * l1 * (m1 + m2);
    ddtheta2 += g * (m1 + m2) * cos(theta1);
    ddtheta2 += dtheta2**2 * l2 * m2 * cos(theta1 - theta2);
    ddtheta2 *= 2*sin(theta1 - theta2);
    ddtheta2 /= l2 * (2*m1 + m2 - m2 * cos(2*theta1 - 2*theta2));

    return [ddtheta1, ddtheta2];
  }

  get_dtheta(dtheta1, dtheta2){
    return [dtheta1, dtheta2];
  }

  // rk4
  update(dt){
    let theta1 = this.theta1;
    let theta2 = this.theta2;
    let dtheta1 = this.dtheta1;
    let dtheta2 = this.dtheta2;

    let [k1dtheta1, k1dtheta2] = this.get_ddtheta(theta1, theta2, dtheta1, dtheta2);
    let [k1theta1, k1theta2] = this.get_dtheta(dtheta1, dtheta2);

    let [k2dtheta1, k2dtheta2] = this.get_ddtheta(theta1+dt/2*k1theta1, theta2+dt/2*k1theta2, dtheta1+dt/2*k1dtheta1, dtheta2+dt/2*k1dtheta2)
    let [k2theta1, k2theta2] = this.get_dtheta(dtheta1+dt/2*k1dtheta1, dtheta2+dt/2*k1dtheta2)

    let [k3dtheta1, k3dtheta2] = this.get_ddtheta(theta1+dt/2*k2theta1, theta2+dt/2*k2theta2, dtheta1+dt/2*k2dtheta1, dtheta2+dt/2*k2dtheta2)
    let [k3theta1, k3theta2] = this.get_dtheta(dtheta1+dt/2*k2dtheta1, dtheta2+dt/2*k2dtheta2)

    let [k4dtheta1, k4dtheta2] = this.get_ddtheta(theta1+dt*k3theta1, theta2+dt*k3theta2, dtheta1+dt*k3dtheta1, dtheta2+dt*k3dtheta2)
    let [k4theta1, k4theta2] = this.get_dtheta(dtheta1+dt*k3dtheta1, dtheta2+dt*k3dtheta2)

    this.theta1 += dt/6 * (k1theta1 + 2*k2theta1 + 2*k3theta1 + k4theta1)
    this.theta2 += dt/6 * (k1theta2 + 2*k2theta2 + 2*k3theta2 + k4theta2)
    this.dtheta1 += dt/6 * (k1dtheta1 + 2*k2dtheta1 + 2*k3dtheta1 + k4dtheta1)
    this.dtheta2 += dt/6 * (k1dtheta2 + 2*k2dtheta2 + 2*k3dtheta2 + k4dtheta2)
  }
}