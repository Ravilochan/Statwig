FROM node:buster

WORKDIR /usr/src/app

COPY package.json .

RUN apt update \
    && apt install python3-pip -y \
    && apt-get install python-dev build-essential -y \
    && pip3 install --upgrade pip \
    && pip3 install -U numpy \
    && pip install -U nltk \
    && pip3 install pandas \
    && pip3 install sklearn \
    && npm install \

EXPOSE 3001

CMD [ "npm", "start" ]

COPY . .
