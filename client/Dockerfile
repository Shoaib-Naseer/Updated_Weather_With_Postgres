FROM node:alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
# we have port set to 3001 in package.json
CMD [ "npm","run","serve" ]