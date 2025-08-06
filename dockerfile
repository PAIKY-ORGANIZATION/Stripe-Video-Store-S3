FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm i 

COPY . .

CMD ["sh", "-c", "npx prisma migrate dev && npm run build_cloud && npm run start_cloud"]
