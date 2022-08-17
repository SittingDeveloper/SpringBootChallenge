#FROM node:14.17.6-alpine
#
#WORKDIR /app
#
#ENV PATH /app/node_modules/.bin:$PATH
#
#COPY package.json /app/package.json
#RUN npm install
#
#CMD ["npm", "start"]

FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

ADD package.json /app/package.json
RUN npm install
RUN npm install react-scripts@3.4.1 -g
RUN npm install axios

CMD ["npm", "start"]