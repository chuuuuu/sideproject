cmake_minimum_required(VERSION 3.12)
project(MyProject VERSION 1.0.0)

add_library(
  say-hello
  hello.hpp
  hello.cpp
)

add_executable(cmake-good main.cpp)

target_link_libraries(cmake-good PRIVATE say-hello)