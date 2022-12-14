from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import requests
import json
import time
from kafka import KafkaProducer

TOPIC="news"

producer = KafkaProducer(bootstrap_servers=['localhost:9092'])

def scrape(d):
    flag = True
    i=1
    while(flag==True):
        url='https://www.mosaiquefm.net/ar/actualites/2/'+str(i)+'/أخبار-تونس-جهات'
        page=requests.get(url)
        soup=BeautifulSoup(page.text,'lxml')
        elements = soup.findAll('div',class_ = 'col-xl-3 col-md-4 col-6 item')
        for element in elements :
            news_date=datetime.strptime(element.find('time').contents[0].text,'%d/%m/%Y %H:%M')
            if(news_date < d):
                flag = False
                break

            data={}
            title=element.find('div',class_='desc').find('h3').find('a').contents[0]
            if(title.find(':')!=-1):
                data["title"]=title[title.find(':')+1:]
                data["location"]=title[:title.find(':')]
            else :
                data["title"]=title
                data["location"]=""
            news_page='https://www.mosaiquefm.net'+element.find('div',class_='desc').find('h3').find('a')['href']
            data['url']=news_page
            article=BeautifulSoup(requests.get(news_page).text,'lxml').find('article',class_='article')
            
            #get content
            content = ""
            for p in article.find_all('p') :
                content = content + p.text
            data['content']=content

            #get media
            media=[]
            for img in article.find_all('img'):
                if img.has_attr('data-srcset'):
                    media_element=(img['data-srcset']).split(',')[0].split(' ')[0]
                    media.append(media_element)
            data['media']=media

            data['date']=str(news_date)
            
            print(data)
            #send data to kafka
            producer.send(TOPIC, json.dumps(data).encode('utf-8'))   
            
        i=i+1


scrape(datetime.now() - timedelta(days=30))

while True:
    time.sleep(5*60)
    scrape(datetime.now() - timedelta(seconds=5*60))