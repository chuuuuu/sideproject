class Ball {
  constructor(private _x: number, private _y: number, private _r: number){
    console.log("ball creating")
  }

  draw(){
    circle(this._x, this._y, this._r);
  }
}
