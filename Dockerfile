FROM node:18-alpine

RUN apk add --no-cache nodejs npm

WORKDIR /app

RUN npm install -g pnpm
RUN npm install -g typescript

COPY . .

RUN pnpm install

RUN pnpm run build

EXPOSE 7075

CMD ["pnpm", "start"]