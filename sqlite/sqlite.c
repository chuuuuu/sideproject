#include <sqlite3.h>
#include <stdio.h>
#include <stdlib.h>

static int callback(void* data, int argc, char** argv, char** azColName) {
   fprintf(stderr, "%s: ", (const char*)data);
   for(int i = 0; i<argc; i++) {
      printf("%s = %s\n", azColName[i], argv[i] ? argv[i] : "NULL");
   }
   printf("\n");

   return 0;
}

void connect(sqlite3** db_pp, const char* db_name){
  // open connection, rc: return code
  int rc = sqlite3_open(db_name, db_pp);
  if(rc){
    fprintf(stderr, "Can't open database: %s\n", sqlite3_errmsg(*db_pp));
    exit(1);
  }
  else{
    fprintf(stderr, "Opened database successfully\n");
  }
}

void execute(sqlite3* db_p, const char* sql){
  // char *zErrMsg = 0;
  char *errMsg = NULL;
  const char* data = "Callback function called";

  int rc = sqlite3_exec(db_p, sql, callback, (void*)data, &errMsg);
  if(rc != SQLITE_OK ){
    fprintf(stderr, "SQL error: %s\n", errMsg);
    sqlite3_free(errMsg);
  } else {
    fprintf(stdout, "SQL executed successfully\n");
  }
}

void close(sqlite3* db_p){
  sqlite3_close(db_p);
  fprintf(stdout, "Closed database successfully\n");
}

int main(int argc, char *argv[])
{
  // https://www.zhihu.com/question/29905170
  sqlite3* db_p;

  // connect
  char* db_name = "test_c.db";
  connect(&db_p, db_name);

  // create table
  char* sql = "CREATE TABLE COMPANY("  \
              "ID INT PRIMARY KEY NOT NULL," \
              "NAME TEXT NOT NULL," \
              "AGE INT NOT NULL," \
              "ADDRESS CHAR(50)," \
              "SALARY REAL);";
 
  execute(db_p, sql);

  // insert operation
  sql = "INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) "  \
        "VALUES (1, 'Paul', 32, 'California', 20000.00 ); " \
        "INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) "  \
        "VALUES (2, 'Allen', 25, 'Texas', 15000.00 ); "     \
        "INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)" \
        "VALUES (3, 'Teddy', 23, 'Norway', 20000.00 );" \
        "INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)" \
        "VALUES (4, 'Mark', 25, 'Rich-Mond ', 65000.00 );";
  execute(db_p, sql);

  // select operation
  sql = "SELECT * from COMPANY";
  execute(db_p, sql);

  // update operation
  sql = "UPDATE COMPANY set SALARY = 25000.00 where ID=1; " \
        "SELECT * from COMPANY";
  execute(db_p, sql);

  // delete operation
  sql = "DELETE from COMPANY where ID=2; " \
        "SELECT * from COMPANY";
  execute(db_p, sql);

  // close
  close(db_p);
}