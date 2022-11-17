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

def scrape2(d):
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
                    data["title"]=title[title.find(':'):]
                    data["location"]=title[:title.find(':')]
                else :
                    data[title]=title[title.rfind('.')+1:]
                    data["location"]=title[:title.find("..")]
            
            news_page='https://www.alchourouk.com'+element.find('div',class_='views-field-title').find('a')['href']
            data['content']=BeautifulSoup(requests.get(news_page).text,'lxml').find('article')
            data["url"]=news_page

            print(data)
        i=i+1
    




#scrape(datetime.now() - timedelta(days=10))

scrape2(datetime.now() - timedelta(days=1))
