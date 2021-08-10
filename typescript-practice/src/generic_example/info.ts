type Info = {
  firstName: string;
  lastName: string;
};

const makeFullName = <T extends Info>(obj: T): T => {
  return {
    ...obj,
    fullName: `${obj.firstName} ${obj.lastName}`,
  };
};

let me = {firstName: "Hello", lastName: "World"};
me = makeFullName(me);
console.log(me);