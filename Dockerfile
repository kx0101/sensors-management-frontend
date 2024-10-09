FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --force --verbose

COPY . .

EXPOSE 5173

CMD ["npm", "run", "start"]
