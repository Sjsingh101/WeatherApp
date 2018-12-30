import requests
import psycopg2
from datetime import datetime
import logging
import  psycopg2.extras


def fetch_data():
    url="http://api.openweathermap.org/data/2.5/weather?id=1273294&APPID=API_KEY"
    re=requests.get(url).json()
#print(re['main']['temp'])
# http://openweathermap.org/img/w/10d.png
    wicon = re['weather'][0]['icon']
    temp = re['main']['temp']
    humid = re['main']['humidity']
    wspeed = re['wind']['speed']
    visible = re['visibility']
    icon_url = "http://openweathermap.org/img/w/"+wicon+".png"

    #open database
    try:
        conn = psycopg2.connect(dbname="weather",user="postgres",host="localhost",password="PASSWORD")
        print("connection established")
    except:
        print("unable to connect")
        return
    else:
        curr = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    curr.execute("""INSERT INTO station_reading(temp,wspeed,visible,icon_url,humid)
                    VALUES (%s,%s,%s,%s,%s)""",(temp,wspeed,visible,icon_url,humid))

    conn.commit()
    curr.close()
    conn.close()
    print("data successfully written",datetime.now())

fetch_data()