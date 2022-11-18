FROM python:latest
WORKDIR /usr/app/src

COPY consumer.py .

RUN pip install kafka-python
RUN pip install requests
RUN pip install beautifulsoup4
RUN pip install lxml
RUN pip install pymongo

CMD [ "python", "./consumer.py" ]
