if [ ! -d build ]; then
  mkdir build
fi

gcc src/sqlite.c -o build/sqlite -lsqlite3
gcc src/sqlite_blob.c -o build/sqlite_blob -lsqlite3
gcc src/sqlite_join.c -o build/sqlite_join -lsqlite3