# every parameter is a string e.g. VERSION, 3.12
cmake_minimum_required(VERSION 3.12)

project(MyProject VERSION 1.0.0)

# if you have white space in the string, use ""
set(MY_VARIABLE "I am a variable")
message(STATUS "The project version is: ${PROJECT_VERSION}")
message(STATUS "The project is: ${PROJECT_NAME}")
message(STATUS "The variable is: ${MY_VARIABLE}")

if("TRUE")
  message(STATUS "Condition was met")
else()
  message(STATUS "Condition failed")
endif()

set(s1 "This is s1")
set(s2 "This is s2")
set(x 1)
if((NOT s1 STREQUAL s2) AND ("1" EQUAL x))
  message(STATUS "s1 != s2")  
  message(STATUS "x == 1")
endif()

while(x LESS 10)
  message(STATUS "x: ${x}")
  math(EXPR x "${x}+1")
endwhile()

foreach(item IN ITEMS foo bar baz qux)
  message(STATUS "item: ${item}")
endforeach()

foreach(idx RANGE 5)
  message(STATUS "idx: ${idx}")
endforeach()

message(STATUS)

foreach(idx RANGE 3 9 2)
  message(STATUS "idx: ${idx}")
endforeach()

set_property(
  GLOBAL
  PROPERTY FOO
  1 2 3
)

get_cmake_property(foo_value FOO)
message(STATUS "Value of FOO is ${foo_value}")

set(my_list 4 5 6)
set(target DIRECTORY ${PROJECT_SOURCE_DIR})
set_property(
  ${target}
  PROPERTY BAR
  ${my_list}
)

get_property(bar_value ${target} PROPERTY BAR)
message(STATUS "Value of BAR is ${bar_value}")

function(do_cmake_good arg1 arg2)
  message("you call the function with arg1: ${arg1} arg2: ${arg2}")
endfunction()

do_cmake_good(pig dog)
do_cmake_good(cat sheep)

function(good_func arg1 arg2)
  foreach(argn IN LISTS ARGN)
    message(STATUS "Got argn: ${argn}")
  endforeach()

  message(STATUS)
  
  foreach(argv IN LISTS ARGV)
    message(STATUS "Got argv: ${argv}")
  endforeach()
endfunction()

good_func(a b c d e)

function(inc var)
  # message(STATUS "Value before increase is ${${var}}")
  math(EXPR new_val "${${var}} + 1")
  # message(STATUS "Value after increase is ${${var}}")
  # message(STATUS "New value after increase is ${new_val}")
  set(${var} ${new_val} PARENT_SCOPE)
endfunction()

set(val 14)
inc(val)
message(STATUS "Final val is ${val}")


function(sum out a b)
  math(EXPR ret "${a} + ${b}")
  set(${out} ${ret} PARENT_SCOPE)
endfunction()

sum(val 3 5)
message(STATUS "after sum called val is ${val}")