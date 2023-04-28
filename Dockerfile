FROM node:19-alpine AS build
WORKDIR /app
COPY package.json package.json
RUN yarn install
COPY . .
RUN yarn build


FROM nginx:1.19-alpine
COPY --from=build /app/dist /opt/site/memebingo
COPY nginx.conf /etc/nginx/nginx.conf
