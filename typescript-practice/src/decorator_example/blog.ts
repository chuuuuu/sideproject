console.log("blog.ts");

function decorator1<T>(target: T){
  console.log("This is decorator1");
  console.log(target);
}

function decorator2<T>(target: T){
  console.log("This is decorator2");
  console.log(target);
}

@decorator1
@decorator2
class Blog{
  constructor(){
    console.log("This is Blog");
  }

  helloWorld(){
    console.log("hello world");
  }
}

const blog = new Blog();
blog.helloWorld();

// This is decorator2
// [class Blog]
// This is decorator1
// [class Blog]
// This is Blog
// hello world
