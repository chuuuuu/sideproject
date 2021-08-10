# sqlite
this is a simple example code for sqlite written in python and c.
you can use db-browser-for-sqlite to lookup the database you create in the program directly.

## database normalization
you'd better follow the database normalization rules
1. have a table for each class
2. single column primary key
3. if the member is object, store the primary key of it, and using foreign key
4. if the member is a list of object, store it into another table
  - in the table, you will store the primary key of both object

however, dont over-normalization
there's lots of normal form (NF), see [link](https://en.wikipedia.org/wiki/Database_normalization)

## Object Relational Mapping (ORM)
it is a concept to make sql easily to use. developer dont need to write sql any more. the package it into functions. and developer can store / access object directly though ORM

## protobuf
which is like json, but more light, and cross-language
developer no need to write class by themselve
they can build the class with .proto file which describe the class relationship
after that, they can easily serialize the object into binary file
and they can pass the file cross device, internet etc..., and easily deserialize the object in any language
see [proto-c](https://sjiang1.github.io/autoiodocu/protobuf-c_doc/)
see [google doc](https://developers.google.com/protocol-buffers/docs/reference/cpp/google.protobuf.message_lite)

## notes
call by reference is only for cpp