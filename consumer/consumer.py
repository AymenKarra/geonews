import json
import requests
from kafka import KafkaConsumer
from pymongo import MongoClient

client=MongoClient('localhost',27018)
db=client['geonews']
collection=db['news']
TOPIC = "news"

map_url = "https://nominatim.openstreetmap.org/search?q=<input>&format=json"


consumer=KafkaConsumer(TOPIC,bootstrap_servers=['localhost:9092'])
while 1 :
    for msg in consumer:
        print("message received")
        news=json.loads(msg.value.decode('utf-8'))
        if(news["location"]!=""):
            location=requests.get(map_url.replace("<input>",news["location"].replace(" ","+")+"+تونس")).json()
            if(len(location)>0):
                news["coordenates"]={"lat":location[0]["lat"],"lon":location[0]["lon"]}
        print(news)
        print(type(news))
        collection.insert_one(news)
        
        
