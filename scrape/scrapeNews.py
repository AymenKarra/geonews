from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import requests
import json
import time
from kafka import KafkaProducer

TOPIC="news"

producer = KafkaProducer(bootstrap_servers=['localhost:9092'])



def scrape(d):
    print("scraping :")
    i=0
    flag = True 
    while(flag==True): 
        url='https://www.alchourouk.com/جهاتنا?page='+str(i)
        page=requests.get(url)
        soup=BeautifulSoup(page.text,'lxml')
        elements=soup.find('div',class_='views-infinite-scroll-content-wrapper clearfix form-group').findAll('div',class_='row-article')
        for element in elements :
            news_date=datetime.strptime(element.find('div',class_='views-field-created').span.contents[0].text,'%H:%M - %Y/%m/%d')
            if(news_date < d):
                flag = False
                break
            #send data to kafka
            data={}
            title=element.find('div',class_='views-field-title').find('a').contents[0]
            if(title.find(':')!=-1 or title.find("..")!=-1):
                if(title.find(':')!=-1):
                    data["title"]=title[title.find(':')+1:]
                    data["location"]=title[:title.find(':')]
                else :
                    data[title]=title[title.rfind('.')+1:]
                    data["location"]=title[:title.find("..")]
            else :
                data["title"]=title
                data["location"]=""
            
            news_page='https://www.alchourouk.com'+element.find('div',class_='views-field-title').find('a')['href']
            article=BeautifulSoup(requests.get(news_page).text,'lxml').find('article')
            #data['content']=BeautifulSoup(requests.get(news_page).text,'lxml').find('article')
            data["url"]=news_page
            data["content"]=article.find('div',class_='field--type-text-with-summary').text
            data["date"]=str(news_date)
            data["media"]=[]
            for img in article.find_all('img'):
                if img.has_attr('src'):
                    data["media"].append('https://www.alchourouk.com'+ str(img['src']))

            print(data)
            producer.send(TOPIC, json.dumps(data).encode('utf-8'))
        i=i+1

    


scrape(datetime.now() - timedelta(days=30))

while True:
    time.sleep(5*60)
    scrape(datetime.now() - timedelta(seconds=5*60))

