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
  if(rc != SQLITE_OK){
    fprintf(stderr, "Can't open database: %s\n", sqlite3_errmsg(*db_pp));
    exit(1);
  }
  else{
    fprintf(stderr, "Opened database successfully\n");
  }
}

void execute(sqlite3* db_p, const char* sql){
  char *errMsg = NULL;
  const char* data = "Callback function called";

  int rc = sqlite3_exec(db_p, sql, callback, (void*)data, &errMsg);
  if(rc != SQLITE_OK ){
    fprintf(stderr, "SQL error: %s\n", errMsg);
    sqlite3_free(errMsg);
  } 
  else {
    fprintf(stdout, "SQL executed successfully\n");
  }
}

void close(sqlite3* db_p){
  sqlite3_close(db_p);
  fprintf(stdout, "Closed database successfully\n");
}

int main(int argc, char **argv)
{
  sqlite3* db_p;

  // connect
  char* db_name = "test_blob.db";
  connect(&db_p, db_name);

  // delete previous table if exists
  char* sql = "DROP TABLE IF EXISTS IMAGES;";
  execute(db_p, sql);

  // create table
  sql = "CREATE TABLE IF NOT EXISTS IMAGES("  \
        "ID INTEGER PRIMARY KEY AUTOINCREMENT," \
        "DATA BLOB NOT NULL);";
  execute(db_p, sql);

  // insert data
  sqlite3_stmt* stmt_p;
  sql = "INSERT INTO IMAGES (DATA) VALUES (?);";
  int rc = sqlite3_prepare(db_p, sql, -1, &stmt_p, NULL);
  if(rc != SQLITE_OK){
    fprintf(stderr, "Cannot prepare statement: %s\n", sqlite3_errmsg(db_p));
    return 1;
  }

  int idx_param = 1;
  u_int8_t* data_p = (u_int8_t*)"i'm data";
  int size = sizeof((char*)data_p);
  sqlite3_bind_blob(stmt_p, idx_param, data_p, size, SQLITE_STATIC);

  rc = sqlite3_step(stmt_p);

  if (rc != SQLITE_DONE){
    printf("execution failed: %s", sqlite3_errmsg(db_p));
  }

  sqlite3_finalize(stmt_p);

  // read data
  sql = "SELECT DATA FROM IMAGES WHERE Id = 1";
  rc = sqlite3_prepare(db_p, sql, -1, &stmt_p, NULL);
  if(rc != SQLITE_OK){
    fprintf(stderr, "Cannot prepare statement: %s\n", sqlite3_errmsg(db_p));
    return 1;
  }

  rc = sqlite3_step(stmt_p);
  if (rc == SQLITE_ROW) {
    size = sqlite3_column_bytes(stmt_p, 0);
    fprintf(stderr, "size: %d\n", size);
  }
  data_p = (u_int8_t*)sqlite3_column_blob(stmt_p, 0);
  fprintf(stderr, "data: %s\n", (char*)data_p);

  sqlite3_finalize(stmt_p);

  // close
  close(db_p);

  return 0;
}
