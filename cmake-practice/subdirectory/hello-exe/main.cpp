#include <iostream>
#include <say-hello/hello.hpp>

int main(){
  hello::say_hello();
  std::cout << "The say-hello lib is version " << SAY_HELLO_VERSION << "\n";
}