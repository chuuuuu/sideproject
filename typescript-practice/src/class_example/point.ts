
class Point {
  // only write private when they need to
  constructor(private _x: number, private _y: number, sayhi?: boolean){
    if(sayhi){
      console.log("hi");
    }
  }

  // you can add public as prefix, however, it is redundent
  draw(): void{
    console.log(`x: ${this._x}, y: ${this._y}`);
  }

  get_distance(another: Point): void{
    const dx = another._x - this._x;
    const dy = another._y - this._y;

    const dis = dx ** 2 + dy ** 2;
    console.log(`the distance is ${dis}`);
  }

  get x(): number{
    return this._x;
  }

  set x(x: number){
    this._x = x;
  }

  get y(): number{
    return this._y;
  }

  set y(y: number){
    this._y = y;
  }
}

const p1 = new Point(100, 123);
const p2 = new Point(200, 555);
p1.get_distance(p2);
