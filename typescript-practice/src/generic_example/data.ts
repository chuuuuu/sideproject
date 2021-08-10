interface Data<T> {
  raw: T;
}

export type NumData = Data<number>;
export type StringData = Data<string>;

function clone<T extends {}>(obj: T) {
  return {
    ...obj,
  };
}

type Pokemon = {
  idx: number;
  type: string;
  level: number;
};

const pikachu = { idx: 25, type: "electric", level: 100 };
const pikachu_clone = clone<Pokemon>(pikachu);

console.log(pikachu_clone);
