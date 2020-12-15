FROM python:3.8.6-alpine3.12
RUN pip install pipenv

ADD . /app

ADD Pipfile /app
ADD Pipfile.lock /app

WORKDIR /app
RUN pipenv lock --requirements > requirements.txt
RUN pip install -r requirements.txt

CMD python -u main/main.py
