from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import requests
import json

def scrape(d):
    flag = True
    i=1
    while(flag==True):
        url='https://www.mosaiquefm.net/fr/actualites/actualite-regional-tunisie/2/'+str(i)
        page=requests.get(url)
        soup=BeautifulSoup(page.text,'lxml')
        elements = soup.findAll('div',class_ = 'col-xl-3 col-md-4 col-6 item')
        for element in elements :
            news_date=datetime.strptime(element.find('time').contents[0].text,'%d/%m/%Y %H:%M')
            if(news_date < d):
                flag = False
                break
            #send data to kafka
            print(element.find('div',class_='desc').find('h3').find('a').contents[0])
        i=i+1