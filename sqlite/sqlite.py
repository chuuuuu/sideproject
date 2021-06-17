import sqlite3
conn = sqlite3.connect('test_py.db')

# The sqlite3.Cursor class is an instance using which you can invoke methods that execute SQLite statements, fetch data from the result sets of the queries. You can create Cursor object using the cursor() method of the Connection object/class.
c = conn.cursor()
c.execute('''CREATE TABLE COMPANY
  (ID INT PRIMARY KEY NOT NULL,
  NAME TEXT NOT NULL,
  AGE INT NOT NULL,
  ADDRESS CHAR(50),
  SALARY REAL);''')

c.execute('''INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
  VALUES (1, 'Paul', 32, 'California', 20000.00 )''')

c.execute('''INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
  VALUES (2, 'Allen', 25, 'Texas', 15000.00 )''')

c.execute('''INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
  VALUES (3, 'Teddy', 23, 'Norway', 20000.00 )''')

c.execute('''INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
  VALUES (4, 'Mark', 25, 'Rich-Mond ', 65000.00 )''')

# This is what everybody thinks of at first sight: When a change to the database is committed, it becomes visible for other connections. Unless it is committed, it remains visible only locally for the connection to which the change was done. Because of the limited concurrency features of sqlite, the database can only be read while a transaction is open.
conn.commit()
conn.close()
