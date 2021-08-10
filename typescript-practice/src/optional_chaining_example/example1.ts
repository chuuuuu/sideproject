type MyError = {
  msg: string;
};

type MyWheel = {
  id: number;
  errors?: MyError[];
};

type MyCar = {
  id: number;
  wheel?: MyWheel;
};

const car1: MyCar = {
  id: 0,
  wheel: {
    id: 0,
    errors: [{msg: "lack of pressure"}]
  }
};

const car2: MyCar = {
  id: 1,
};

// you need to setup "strict": true,` in your tsconfig.json, or you wont get error message if you didn't put the `?` with object which is possibly undefined
console.log(car1.wheel?.errors);
console.log(car2.wheel?.errors);
