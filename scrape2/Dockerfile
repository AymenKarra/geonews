FROM python:latest
WORKDIR /usr/app/src

COPY scrapeNews.py .

RUN pip install kafka-python
RUN pip install requests
RUN pip install beautifulsoup4
RUN pip install lxml

CMD [ "python", "./scrapeNews.py" ]
