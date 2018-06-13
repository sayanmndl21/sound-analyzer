import sys
import mysql.connector as mc
import getpass

tablename = input('tablename: ')
password = getpass.getpass('password: ')

try:
#    connection = db.connect(host = 198.86.29.23, port= 24470, passwd=password, db = "logfile")
    connection = mc.connect(host = "localhost", user = "root", passwd=password, db = "logfile")

except mc.Error as e:
    print("Error %d: %s" % (e.args[0], e.args[1]))
    sys.exit(1)

cursor = connection.cursor()

cursor.execute("TRUNCATE TABLE "+tablename)

cursor.close()
connection.close()
