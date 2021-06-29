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

int main(int argc, char *argv[])
{
  // https://www.zhihu.com/question/29905170
  sqlite3* db_p;

  // connect
  char* db_name = "test_join.db";
  connect(&db_p, db_name);

  // delete previous table if exists
  char* sql = "DROP TABLE IF EXISTS HUMAN;";
  execute(db_p, sql);

  // create table
  sql = "CREATE TABLE HUMAN( \
        ID INTEGER PRIMARY KEY AUTOINCREMENT, \
        NAME TEXT NOT NULL); \
        ";
  execute(db_p, sql);

  // delete previous table if exists
  sql = "DROP TABLE IF EXISTS EMPLOYEE;";
  execute(db_p, sql);

  // create table
  sql = "CREATE TABLE EMPLOYEE(  \
        ID INTEGER PRIMARY KEY AUTOINCREMENT, \
        POSITION TEXT NOT NULL, \
        HUMAN INT NOT NULL, \
        FOREIGN KEY(HUMAN) REFERENCES HUMAN(ID)); \
        ";
  execute(db_p, sql);

  // delete previous table if exists
  sql = "DROP TABLE IF EXISTS COMPANY;";
  execute(db_p, sql);

  // create table
  sql = "CREATE TABLE COMPANY(  \
        ID INTEGER PRIMARY KEY AUTOINCREMENT, \
        NAME TEXT NOT NULL); \
        ";
  execute(db_p, sql);

  // delete previous table if exists
  sql = "DROP TABLE IF EXISTS COMPANY_EMPLOYEE;";
  execute(db_p, sql);

  // create table
  // store the employee list in company
  sql = "CREATE TABLE COMPANY_EMPLOYEE(  \
        COMPANY INT NOT NULL, \
        EMPLOYEE INT NOT NULL, \
        FOREIGN KEY(COMPANY) REFERENCES COMPANY(ID) \
        FOREIGN KEY(EMPLOYEE) REFERENCES EMPLOYEE(ID)); \
        ";
  execute(db_p, sql);

  // insert data
  sql = "INSERT OR REPLACE INTO HUMAN (NAME) VALUES ('Alice'); \
        INSERT OR REPLACE INTO HUMAN (NAME) VALUES ('Bob'); \
        INSERT OR REPLACE INTO HUMAN (NAME) VALUES ('Cat'); \
        INSERT OR REPLACE INTO HUMAN (NAME) VALUES ('Dodo');\
        INSERT OR REPLACE INTO EMPLOYEE (POSITION, HUMAN) VALUES ('Worker_a', 1); \
        INSERT OR REPLACE INTO EMPLOYEE (POSITION, HUMAN) VALUES ('Worker_b', 2); \
        INSERT OR REPLACE INTO EMPLOYEE (POSITION, HUMAN) VALUES ('Worker_c', 3); \
        INSERT OR REPLACE INTO EMPLOYEE (POSITION, HUMAN) VALUES ('Worker_d', 4); \
        INSERT OR REPLACE INTO COMPANY (NAME) VALUES ('Company_a'); \
        INSERT OR REPLACE INTO COMPANY (NAME) VALUES ('Company_b'); \
        INSERT OR REPLACE INTO COMPANY_EMPLOYEE (COMPANY, EMPLOYEE) VALUES (1, 1); \
        INSERT OR REPLACE INTO COMPANY_EMPLOYEE (COMPANY, EMPLOYEE) VALUES (1, 3); \
        INSERT OR REPLACE INTO COMPANY_EMPLOYEE (COMPANY, EMPLOYEE) VALUES (2, 2); \
        INSERT OR REPLACE INTO COMPANY_EMPLOYEE (COMPANY, EMPLOYEE) VALUES (2, 4); \
        ";   
  execute(db_p, sql);

  // get n_list of company_a
  sql = "SELECT COUNT(*) FROM COMPANY_EMPLOYEE WHERE COMPANY = 1;";
  execute(db_p, sql);

  // get n_list of company_a
  sql = "SELECT HUMAN.NAME, HUMAN.ID \
        FROM COMPANY_EMPLOYEE \
        INNER JOIN COMPANY \
        ON COMPANY_EMPLOYEE.COMPANY = COMPANY.ID \
        INNER JOIN EMPLOYEE \
        ON COMPANY_EMPLOYEE.EMPLOYEE = EMPLOYEE.ID \
        INNER JOIN HUMAN \
        ON EMPLOYEE.HUMAN = HUMAN.ID \
        WHERE COMPANY_EMPLOYEE.COMPANY = 1;";
  execute(db_p, sql);

  // close
  close(db_p);
}