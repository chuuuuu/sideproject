function decorator<T>(name: string){
  console.log("this is decorator");

  return function(target: T, propertyKey: string, descriptor: PropertyDescriptor){
    console.log(`name: ${name}`);
    console.log(`target: ${JSON.stringify(target)}`);
    console.log(`propertyKey: ${propertyKey}`);
    console.log(`descriptor: ${JSON.stringify(descriptor)}`);
  };
}

class Car{
  constructor(){
    console.log("this is Car");
  }

  @decorator("pikachu")
  helloWorld(): void{
    console.log("helloWorld");
  }  
}

const car = new Car();
car.helloWorld();

// this is decorator
// name: pikachu
// target: {}
// propertyKey: helloWorld
// descriptor: {"writable":true,"enumerable":false,"configurable":true}
// this is Car
// helloWorld