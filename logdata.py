import sys
import mysql.connector as mc
import getpass
import time


#hostname = input('hostname: ')
#username = input('username: ')
password = getpass.getpass('password: ')

try:
#    connection = db.connect(host = 198.86.29.23, port= 24470, passwd=password, db = "logfile")
    connection = mc.connect(host = "198.86.29.23", port = "37746", user = "root", passwd=password, db = "drone_data")

except mc.Error as e:
    print("Error %d: %s" % (e.args[0], e.args[1]))
    sys.exit(1)

cursor = connection.cursor()

cursor.execute ("DROP TABLE IF EXISTS log")

# delete
#cursor.execute("""DROP TABLE employee;""")

sql_command = """
CREATE TABLE IF NOT EXISTS log(
id INTEGER PRIMARY KEY,
log_date DATETIME,
coordinate_X FLOAT,
coordinate_Y FLOAT,
coordinate_Z FLOAT,
confidence_level INTEGER
);"""



cursor.execute(sql_command)

log_data = [(time.strftime('%Y-%m-%d %H:%M:%S'),"8","3.3","9.6","05")]

cursor.execute("SELECT log, COUNT(*) FROM id WHERE log = '%s' GROUP BY log")
    # gets the number of rows affected by the command executed
row_count = cursor.rowcount
#    print ("number of affected rows: {}".format(row_count))
#    if row_count == 0:
#        print ("It Does Not Exist")

for data, p in enumerate(log_data):
    format_str = """INSERT INTO log (id, log_date, coordinate_X,coordinate_Y,coordinate_Z,confidence_level)
    VALUES ({log_no}, '{date}', '{x}', '{y}', '{z}', '{alert}');"""

    sql_command = format_str.format(log_no=data+row_count, date=p[0], x=p[1], y = p[2], z = p[3], alert = p[4])
    print(sql_command)
    cursor.execute(sql_command)

connection.commit()


cursor.close()
connection.close()
